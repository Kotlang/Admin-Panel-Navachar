// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
/* eslint-disable sort-keys */
import { saveAs } from 'file-saver';
import { AddressProto } from 'src/generated/common_pb';
import { LeadProto, OperatorType } from 'src/generated/lead_pb';
import * as XLSX from 'xlsx';

const operatorTypeMapping = (operatorType: OperatorType) => {
	switch (operatorType) {
	case OperatorType.FARMER:
		return 'Farmer';
	case OperatorType.INPUT_PROVIDER:
		return 'Input Provider';
	case OperatorType.AGRI_CONSULTANT:
		return 'Agri Consultant';
	case OperatorType.TRACENET_CONSULTANT:
		return 'Tracenet Consultant';
	default:
		return 'Unspecified Operator';
	}
};

// Returns date and time from unix time
function getDateAndTimeFromUnixTimestamp(timestamp: number): string {
	// Create a new Date object using the provided Unix timestamp
	const date = new Date(timestamp * 1000); // Convert seconds to milliseconds

	// Extract date components
	const year = date.getFullYear();
	const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add leading zero if needed
	const day = ('0' + date.getDate()).slice(-2); // Add leading zero if needed

	// Extract time components
	const hours = ('0' + date.getHours()).slice(-2); // Add leading zero if needed
	const minutes = ('0' + date.getMinutes()).slice(-2); // Add leading zero if needed
	const seconds = ('0' + date.getSeconds()).slice(-2); // Add leading zero if needed

	// Construct the date and time string
	const dateTimeString = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

	return dateTimeString;
}

function getCurrentUnixTimestamp(): number {
	return Math.floor(Date.now() / 1000);
}

function ExportLeadToExcel(data : LeadProto[]){
	const fileType =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
	const fileExtension = '.xlsx';
	const formattedData = data.map((lead : LeadProto) => {

		const addressList = lead.getAddressesList();
		let address: string = '';

		addressList.forEach((addressProto: AddressProto) => {
			address = address + '\n' + addressProto.getCity() + ', ' + addressProto.getState() + ', ' + addressProto.getCountry() + ', ' + addressProto.getAddress();
		});

		return {
			'Phone Number': lead.getPhonenumber(),
			'Lead Name': lead.getName(),
			'Lead\'s Operator Type': lead.getOperatortype().toString(),
			'Lead Channel': lead.getChannel(),
			'Lead Source': lead.getSource(),
			'Lead\'s Location': address,
			'Land Size in Acres': lead.getLandsizeinacres().toString(),
			'Farming Type': lead.getFarmingtype().toString(),
			'Certification Status': lead.getCertificationdetails()?.getIscertified() ? 'Certified' : 'Not Certified',
			'Crops Grown || Output Products': lead.getCropsList().join(', '), // cropsList is a repeated field
			'Main Profession': lead.getMainprofession(),
			'Organization Name': lead.getOrganizationname(),
			'Side Profession': lead.getSideprofession(),
			'User-Interview Notes': lead.getUserinterviewnotes(),
			'Education': lead.getEducation(),
			'Status': lead.getStatus().toString()
		};
	});

	const ws = XLSX.utils.json_to_sheet(formattedData);
	const wb = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

	const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
	const dataBlob = new Blob([excelBuffer], { type: fileType });
	saveAs(dataBlob, 'exported_data' + fileExtension);
}

// Removes +91 or 91 prefix from phone number
function RemoveCountryCode(phoneNumbers: string[]): string[] {
	if (!phoneNumbers) {
		return [];
	}

	return phoneNumbers.map((phoneNumber) => {
		if(phoneNumber.length === 13 && phoneNumber.startsWith('+91')){
			return phoneNumber.slice(3);
		} else if(phoneNumber.length === 12 && phoneNumber.startsWith('91')){
			return phoneNumber.slice(2);
		}
		return phoneNumber;
	});
}

// Add +91 country code to phone number
function AddCountryCode(phoneNumbers: string[]): string[] {
	if (!phoneNumbers) {
		return [];
	}

	return phoneNumbers.map((phoneNumber) => {
		if (phoneNumber.length === 10) {
			return '+91' + phoneNumber;
		} else if (phoneNumber.length === 11 && phoneNumber.startsWith('0')) {
			return '+91' + phoneNumber.slice(1);
		} else if (phoneNumber.length === 12 && phoneNumber.startsWith('91')) {
			return '+' + phoneNumber;
		}
		return phoneNumber;
	});
}

export { operatorTypeMapping, getDateAndTimeFromUnixTimestamp, getCurrentUnixTimestamp, ExportLeadToExcel, RemoveCountryCode, AddCountryCode };