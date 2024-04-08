// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import { Metadata, RpcError } from 'grpc-web';
import clients from 'src/clients';
import { AddressProto, CertificationDetails, FarmingType,LandSizeInAcres } from 'src/generated/common_pb';
import { LeadChannel, LeadProto, OperatorType } from 'src/generated/lead_pb';
import { ICreateLeads } from 'src/types';
import * as XLSX from 'xlsx';

async function CreateLead(lead: ICreateLeads): Promise<void> {
	return new Promise<void>((resolve, reject) => {
		const metaData: Metadata | null = null;
		clients.auth.marketing.CreateLead(lead, metaData, (err: RpcError, response: LeadProto) => {
			if (err) {
				console.error('Error While Creating Lead', err);
				reject(err); // Reject the promise if there's an error
			} else {
				console.log('Lead Created', response);
				resolve(); // Resolve the promise when lead creation is successful
			}
		});
	});
}

const operatorTypeMapping = (operatorType: string | undefined) => {

	if(operatorType === undefined || operatorType === '') {
		return OperatorType.UNSPECIFIED_OPERATOR;
	}

	switch (operatorType.toUpperCase()) {
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
};

const leadChannelMapping = (channel: string | undefined) => {
	if (channel === undefined || channel === '') {
		return LeadChannel.UNSPECIFIED_CHANNEL;
	}
	switch (channel.toUpperCase()) {
	case 'WHATSAPP_GROUP':
		return LeadChannel.WHATSAPP_GROUP;
	case 'FACEBOOK_GROUP':
		return LeadChannel.FACEBOOK_GROUP;
	case 'FACEBOOK_AD':
		return LeadChannel.FACEBOOK_AD;
	default:
		return LeadChannel.UNSPECIFIED_CHANNEL;
	}
};

const landsizeInAcresMapping = (landSize: string | undefined) => {
	if (landSize === undefined || landSize === '') {
		return LandSizeInAcres.UNSPECIFIEDLANDSIZE;
	}

	switch (landSize.toUpperCase()) {
	case 'LESSTHAN2':
		return LandSizeInAcres.LESSTHAN2;
	case 'BETWEEN2AND10':
		return LandSizeInAcres.BETWEEN2AND10;
	case 'GREATERTHAN10':
		return LandSizeInAcres.GREATERTHAN10;
	default:
		return LandSizeInAcres.UNSPECIFIEDLANDSIZE;
	}

};

const farmingTypeMapping = (farmingType: string | undefined) => {
	if (farmingType === undefined || farmingType === '') {
		return FarmingType.UNSPECIFIEDFARMING;
	}
	switch (farmingType) {
	case 'ORGANIC':
		return FarmingType.ORGANIC;
	case 'CHEMICAL':
		return FarmingType.CHEMICAL;
	case 'MIX':
		return FarmingType.MIX;
	default:
		return FarmingType.UNSPECIFIEDFARMING;
	}
};

async function GetLeadsFromExcelData(file: any): Promise<ICreateLeads[]> {
	const leads: ICreateLeads[] = [];
	if (file) {
		try {
			const ab = await file.arrayBuffer();
			const wb = XLSX.read(ab);
			const wsname = wb.SheetNames[0];
			const ws = wb.Sheets[wsname];
			const rows: ICreateLeads[] = XLSX.utils.sheet_to_json<ICreateLeads>(ws, { header: 1 });
			rows.slice(1).forEach(async (colName: any) => {
				if (colName[0] === undefined || colName[0] === '') {
					return;
				}
				if (colName[1] === undefined || colName[1] === '') {
					return;
				}
				const phoneNum = colName[0].toString().replace(/^\+91|91/, '');
				const address = new AddressProto();
				address.setType('Default');
				address.setCity(colName[5]);
				const certification = new CertificationDetails();

				if (colName[8]) {
					certification.setCertificationid(colName[8].split(',')[0]);
					certification.setCertificationname(colName[8].split(',')[1]);
					certification.setCertificationagency(colName[8].split(',')[2]);
					certification.setIscertified(true);
				}
				const lead: ICreateLeads = {
					addresses: [address],
					certificationDetails: certification,
					channel: leadChannelMapping(colName[3]),
					crops: colName[9] ? colName[9].split(',') : [],
					education: colName[14] || 'NA',
					farmingType: farmingTypeMapping(colName[7]),
					landSizeInAcres: landsizeInAcresMapping(colName[6]),
					mainProfession: colName[10] || 'NA',
					name: colName[1],
					operatorType: operatorTypeMapping(colName[2]),
					organizationName: colName[11] || 'NA',
					phoneNumber: phoneNum,
					sideProfession: colName[12] || 'NA',
					source: colName[4]?.toString(),
					userInterviewNotes: colName[13] || 'NA'
				};
				leads.push(lead);
			});
		} catch (err) {
			console.error('Error While Extracting Data', err);
		}
	}
	return leads;
}
export { GetLeadsFromExcelData, CreateLead };