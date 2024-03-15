// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Metadata, RpcError } from 'grpc-web';
import { addJwtToken } from 'src/clients/utils';
import { StatusResponse } from 'src/generated/common_pb';
import { CreateOrUpdateLeadRequest, FetchLeadsRequest, LeadIdRequest,LeadListResponse,LeadProto } from 'src/generated/lead_pb';
import { LeadServiceClient } from 'src/generated/LeadServiceClientPb';
import { ICreateLeads, IFetchLeads } from 'src/types';

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
	createordupdateLeadRequest.setPhonenumber(lead.phoneNumber || '');
	createordupdateLeadRequest.setName(lead.name);
	createordupdateLeadRequest.setOperatortype(lead.operatorType || 0);
	createordupdateLeadRequest.setChannel(lead.channel || 0);
	createordupdateLeadRequest.setSource(lead.source || '');
	createordupdateLeadRequest.setAddressesList(lead.addresses || []);
	if (lead.certificationDetails) {
		createordupdateLeadRequest.setCertificationdetails(lead.certificationDetails);
	}
	createordupdateLeadRequest.setLandsizeinacres(lead.landSizeInAcres || 0);
	createordupdateLeadRequest.setCropsList(lead.crops || []);
	createordupdateLeadRequest.setMainprofession(lead.mainProfession || '');
	createordupdateLeadRequest.setOrganizationname(lead.organizationName || '');
	createordupdateLeadRequest.setSideprofession(lead.sideProfession || '');
	createordupdateLeadRequest.setUserinterviewnotes(lead.userInterviewNotes || '');
	createordupdateLeadRequest.setEducation(lead.education || '');
	createordupdateLeadRequest.setFarmingtype(lead.farmingType || 0);
	return createordupdateLeadRequest;
};

const getFetchLeadsRequest = (leadsRequest: IFetchLeads) => {
	const fetchLeadsRequest = new FetchLeadsRequest();
	if (leadsRequest.leadfilters) {
		fetchLeadsRequest.setLeadfilters(leadsRequest.leadfilters);
	}
	fetchLeadsRequest.setPagenumber(leadsRequest.PageNumber || 0);
	fetchLeadsRequest.setPagesize(leadsRequest.pageSize || 10);
	return fetchLeadsRequest;
};

const getLeadByIdRequest = (id: string) => {
	const leadIdRequest = new LeadIdRequest();
	leadIdRequest.setLeadid(id);
	return leadIdRequest;
};

const marketingClient = {
	CreateLead: (lead: ICreateLeads, metadata: Metadata | null, callback: (err: RpcError, response: LeadProto) => void) => {
		getLeadServiceClient().createLead(getCreateOrUpdateLeadRequest(lead), addJwtToken(metadata), callback);
	},
	DeleteLeadById: (id: string, metadata: Metadata | null, callback: (err: RpcError, response: StatusResponse) => void) => {
		getLeadServiceClient().deleteLead(getLeadByIdRequest(id), addJwtToken(metadata), callback);
	},
	FeatchLeads: (fetchLeadsRequest: IFetchLeads, metadata: Metadata | null, callback: (err: RpcError, response: LeadListResponse) => void) => {
		getLeadServiceClient().fetchLeads(getFetchLeadsRequest(fetchLeadsRequest), addJwtToken(metadata), callback);
	},
	GetLeadById: (id: string, metadata: Metadata | null, callback: (err: RpcError, response: LeadProto) => void) => {
		getLeadServiceClient().getLeadById(getLeadByIdRequest(id), addJwtToken(metadata), callback);
	}
};

export default marketingClient;
