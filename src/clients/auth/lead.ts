// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Metadata, RpcError } from 'grpc-web';
import { CreateOrUpdateLeadRequest, LeadProto } from 'src/generated/lead_pb';
import { LeadServiceClient } from 'src/generated/LeadServiceClientPb';
import { ICreateLeads } from 'src/types';

const getLeadServiceClient = (() => {
	const authURL = process.env.REACT_APP_AUTH_URL;
	let client: LeadServiceClient;
	if (authURL) {
		client = new LeadServiceClient(authURL);
	}
	return () => {
		return client;
	};
})();

const getCreateOrUpdateLeadRequest = (lead: ICreateLeads) => {
	const createordupdateLeadRequest = new CreateOrUpdateLeadRequest();
	createordupdateLeadRequest.setName(lead.name);
	createordupdateLeadRequest.setPhonenumber(lead.phoneNumber || '');
	createordupdateLeadRequest.setOperatortype(lead.operatorType || 0);
	createordupdateLeadRequest.setChannel(lead.channel || 0);
	createordupdateLeadRequest.setSource(lead.source || '');
	createordupdateLeadRequest.setAddressesList(lead.addresses || []);
	createordupdateLeadRequest.setCertificationdetails(lead.certificationDetails);
	createordupdateLeadRequest.setCropsList(lead.crops || []);
	createordupdateLeadRequest.setMainprofession(lead.mainProfession || '');
	createordupdateLeadRequest.setOrganizationname(lead.organizationName || '');
	createordupdateLeadRequest.setSideprofession(lead.sideProfession || '');
	createordupdateLeadRequest.setUserinterviewnotes(lead.userInterviewNotes || '');
	createordupdateLeadRequest.setEducation(lead.education || '');
	return createordupdateLeadRequest;
};

const marketingClient = {
	CreateLead: (lead: ICreateLeads, metadata: Metadata | null, callback: (err: RpcError, response: LeadProto) => void) => {
		getLeadServiceClient().createLead(getCreateOrUpdateLeadRequest(lead), metadata, callback);
	}
};

export default marketingClient;
