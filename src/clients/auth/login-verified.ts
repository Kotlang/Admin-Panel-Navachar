/* eslint-disable */

// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Metadata, RpcError } from 'grpc-web';
import { addJwtToken } from 'src/clients/utils';
import { StatusResponse, ProfileListResponse, IdRequest } from 'src/generated/common_pb';
import {
	GetProfileDeletionRequest
} from 'src/generated/login-verified_pb';
import { LoginVerifiedClient } from 'src/generated/Login-verifiedServiceClientPb';
import { IFetchDeletionRequests } from 'src/types/index';

const getLoginVerifiedClient = (() => {
	const authURL = process.env.REACT_APP_AUTH_URL;
	let client: LoginVerifiedClient;
	if (authURL) {
		client = new LoginVerifiedClient(authURL);
	}
	return () => {
		return client;
	};
})();


const getIdRequest = (userId: string) => {
	const idRequest = new IdRequest();
	idRequest.setUserid(userId);
	return idRequest;
};

const getProfileDeletionRequests = (fetchDeletionRequests: IFetchDeletionRequests) => {
	const req = new GetProfileDeletionRequest();
	req.setPagenumber(fetchDeletionRequests.pageNumber);
	req.setPagesize(fetchDeletionRequests.pageSize);
	return req;
}

const loginVerifiedClient = {
	GetPendingProfileDeletionRequests: (fetchDeletionRequests: IFetchDeletionRequests, metaData: Metadata | null, callback: (err: RpcError, response: ProfileListResponse) => void) => {
		getLoginVerifiedClient().getPendingProfileDeletionRequests(getProfileDeletionRequests(fetchDeletionRequests), addJwtToken(metaData), callback);
	},
	DeleteProfile: (userId: string, metaData: Metadata | null, callback: (err: RpcError, response: StatusResponse) => void) => {
		getLoginVerifiedClient().deleteProfile(getIdRequest(userId), addJwtToken(metaData), callback);
	},
	CancelProfileDeletionRequest: (userId: string, metaData: Metadata | null, callback: (err: RpcError, response: StatusResponse) => void) => {
		getLoginVerifiedClient().cancelProfileDeletionRequest(getIdRequest(userId), addJwtToken(metaData), callback);
	},
	BlockUser: (userId: string, metaData: Metadata | null, callback: (err: RpcError, response: StatusResponse) => void) => {
		getLoginVerifiedClient().blockUser(getIdRequest(userId), addJwtToken(metaData), callback);
	},
	UnBlockUser: (userId: string, metaData: Metadata | null, callback: (err: RpcError, response: StatusResponse) => void) => {
		getLoginVerifiedClient().unblockUser(getIdRequest(userId), addJwtToken(metaData), callback);
	}
};

export default loginVerifiedClient;