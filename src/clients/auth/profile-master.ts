// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Metadata, RpcError } from 'grpc-web';
import { addJwtToken } from 'src/clients/utils';
import { AddProfileMasterRequest, BulkGetProfileMasterRequest, DeleteProfileMasterRequest, DeleteProfileMasterResponse, GetProfileMasterRequest, ProfileMasterProto, ProfileMasterResponse } from 'src/generated/profile-master_pb';
import { ProfileMasterClient } from 'src/generated/Profile-masterServiceClientPb';
import { IProfileMaster } from 'src/types';

const getProfileMasterClient = (() => {
	const authURL = process.env.REACT_APP_AUTH_URL;
	let client: ProfileMasterClient;
	if (authURL) {
		client = new ProfileMasterClient(authURL);
	}
	return () => {
		return client;
	};
})();

const getProfileMasterRequest = (language: string) => {
	const profileMasterRequest = new GetProfileMasterRequest();
	profileMasterRequest.setLanguage(language);
	return profileMasterRequest;
};

const getBulkGetProfileMasterRequest = () => {
	const bulkGetProfileMasterRequest = new BulkGetProfileMasterRequest();
	return bulkGetProfileMasterRequest;
};

const getDeleteProfileMasterRequest = (profileMasterId: string) => {
	const deleteProfileMasterRequest = new DeleteProfileMasterRequest();
	deleteProfileMasterRequest.setId(profileMasterId);
	return deleteProfileMasterRequest;
};

const getAddProfileMasterRequest = (profileMaster: IProfileMaster) => {
	const addProfileMasterRequest = new AddProfileMasterRequest();

	if (profileMaster.field) {
		addProfileMasterRequest.setField(profileMaster.field);
	}
	if (profileMaster.language) {
		addProfileMasterRequest.setLanguage(profileMaster.language);
	}
	if (profileMaster.type) {
		addProfileMasterRequest.setType(profileMaster.type);
	}
	if (profileMaster.options) {
		addProfileMasterRequest.setOptionsList(profileMaster.options);
	}
	return addProfileMasterRequest;
};

const profileMasterClient = {
	AddProfileMaster: (profileMaster: IProfileMaster, metaData: Metadata | null, callback: (err: RpcError, response: ProfileMasterProto) => void) => {
		getProfileMasterClient().addProfileMaster(getAddProfileMasterRequest(profileMaster),addJwtToken(metaData), callback);
	},
	BulkGetProfileMaster: (metaData: Metadata | null, callback: (err: RpcError, response: ProfileMasterResponse) => void) => {
		getProfileMasterClient().bulkGetProfileMaster(getBulkGetProfileMasterRequest(),addJwtToken(metaData), callback);
	},
	DeleteProfileMaster: (profileMasterId: string, metaData: Metadata | null, callback: (err: RpcError, response: DeleteProfileMasterResponse) => void) => {
		getProfileMasterClient().deleteProfileMaster(getDeleteProfileMasterRequest(profileMasterId),addJwtToken(metaData), callback);
	},
	GetProfileMaster: (language: string, metaData: Metadata | null, callback: (err: RpcError, response: ProfileMasterResponse) => void) => {
		getProfileMasterClient().getProfileMaster(getProfileMasterRequest(language),addJwtToken(metaData), callback);
	}
};

export default profileMasterClient;