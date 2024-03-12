/* eslint-disable */
import { useState } from 'react';
import * as XLSX from 'xlsx';
import { ICreateLeads } from 'src/types';
import clients from 'src/clients';

async function HandleImportedData(file: any) {

    if (file) {
        try{
            const ab = await file.arrayBuffer();
            const wb = XLSX.read(ab);
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const rows: ICreateLeads[] = XLSX.utils.sheet_to_json<ICreateLeads>(ws, { header: 1 });
            rows.slice(1).forEach((colName: any) => {
                console.log("Number:", colName[0])
                console.log("Name:", colName[1])
                console.log("Type:", colName[2])
                console.log("Channel:", colName[3])
                console.log("Source:", colName[4])
                console.log("Location:", colName[5])
                console.log("Area:", colName[6])
                console.log("FarmingType:", colName[7])
                console.log("Certification:", colName[8])
                console.log("CropsGrown:", colName[9])
                console.log("Profession:", colName[10])
            });
        }catch(err){
            console.error("Error While Extracting Data", err)
        }
    }
}
export default HandleImportedData;