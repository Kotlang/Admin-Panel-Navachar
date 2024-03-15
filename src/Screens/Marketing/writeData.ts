/* eslint-disable */
import { useState } from 'react';
import * as XLSX from 'xlsx';
import { ICreateLeads } from 'src/types';
import clients from 'src/clients';
import { AddressProto, CertificationDetails, LandSizeInAcres, FarmingType } from 'src/generated/common_pb';
import { Metadata, RpcError } from 'grpc-web';
import { LeadProto, LeadChannel, OperatorType } from 'src/generated/lead_pb';

async function createLead(lead: ICreateLeads) {
    const metaData: Metadata | null = null;
    clients.auth.marketing.CreateLead(lead, metaData, (err: RpcError, response: LeadProto) => {
        if (err) {
            console.error("Error While Creating Lead", err)
        } else {
            console.log("Lead Created", response)
        }
    });
}


const operatorTypeMapping = (operatorType: string) => {
    switch (operatorType) {
        case 'UNSPECIFIED_OPERATOR':
            return OperatorType.UNSPECIFIED_OPERATOR;
        case 'FARMER':
            return OperatorType.FARMER;
        case 'INPUT_PROVIDER':
            return OperatorType.INPUT_PROVIDER;
        case 'AGRI_CONSULTANT':
            return OperatorType.AGRI_CONSULTANT;
        case 'TRACENET_CONSULTANT':
            return OperatorType.TRACENET_CONSULTANT;
        default:
            return OperatorType.UNSPECIFIED_OPERATOR;
    }
}

const leadChannelMapping = (channel: string) => {
    switch (channel) {
        case 'UNSPECIFIED_CHANNEL':
            return LeadChannel.UNSPECIFIED_CHANNEL;
        case 'WHATSAPP_GROUP':
            return LeadChannel.WHATSAPP_GROUP;
        case 'FACEBOOK_GROUP':
            return LeadChannel.FACEBOOK_GROUP;
        case 'FACEBOOK_AD':
            return LeadChannel.FACEBOOK_AD;
        default:
            return LeadChannel.UNSPECIFIED_CHANNEL;
    }
}


const landsizeInAcresMapping = (landSize: string) => {
    switch (landSize) {
        case 'UnspecifiedLandSize':
            return LandSizeInAcres.UNSPECIFIEDLANDSIZE;
        case 'LESSTHAN2':
            return LandSizeInAcres.LESSTHAN2;
        case 'BETWEEN2AND10':
            return LandSizeInAcres.BETWEEN2AND10;
        case 'GREATERTHAN10':
            return LandSizeInAcres.GREATERTHAN10;
        default:
            return LandSizeInAcres.UNSPECIFIEDLANDSIZE;
    }

}

const farmingTypeMapping = (farmingType: string) => {
    switch (farmingType) {
        case 'UnspecifiedFarming':
            return FarmingType.UNSPECIFIEDFARMING;
        case 'ORGANIC':
            return FarmingType.ORGANIC;
        case 'CHEMICAL':
            return FarmingType.CHEMICAL;
        case 'MIX':
            return FarmingType.MIX;
        default:
            return FarmingType.UNSPECIFIEDFARMING;
    }
}

async function HandleImportedData(file: any) {
    if (file) {
        try {
            const ab = await file.arrayBuffer();
            const wb = XLSX.read(ab);
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const rows: ICreateLeads[] = XLSX.utils.sheet_to_json<ICreateLeads>(ws, { header: 1 });
            rows.slice(1).forEach(async (colName: any) => {
                const address = new AddressProto();
                address.setType('Default')
                address.setCity(colName[5]);
                const certification = new CertificationDetails();
                if (colName[8]) {
                    certification.setCertificationid(colName[8].split(',')[0]);
                    certification.setCertificationname(colName[8].split(',')[1]);
                    certification.setCertificationagency(colName[8].split(',')[2]);
                    certification.setIscertified(true);
                }
                const lead: ICreateLeads = {
                    name: colName[1],
                    phoneNumber: colName[0].toString(),
                    operatorType: operatorTypeMapping(colName[2]),
                    channel: leadChannelMapping(colName[3]),
                    source: colName[4],
                    addresses: [address],
                    landSizeInAcres: landsizeInAcresMapping(colName[6]),
                    farmingType: farmingTypeMapping(colName[7]),
                    certificationDetails: certification,
                    crops: colName[9].split(','),
                    mainProfession: colName[10],
                    organizationName: colName[11],
                    sideProfession: colName[12],
                    userInterviewNotes: colName[13],
                    education: colName[14]
                }
                console.log(lead);
                await createLead(lead);
            });
        } catch (err) {
            console.error("Error While Extracting Data", err)
        }
    }
}
export default HandleImportedData;