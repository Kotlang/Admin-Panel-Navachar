// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Metadata, RpcError } from 'grpc-web';
import { StatusResponse } from 'src/generated/common_pb';
import { AuthResponse, LoginRequest, VerifyRequest } from 'src/generated/login_pb';
import { LoginClient } from 'src/generated/LoginServiceClientPb';

const getLoginClient = (() => {
	const authURL = process.env.REACT_APP_AUTH_URL;
	let client: LoginClient;
	if (authURL) {
		client = new LoginClient(authURL);
	}
	return () => {
		return client;
	};
})();

const getLoginRequest = (emailOrPhone: string) => {
	const loginRequest = new LoginRequest();
	const authDomain = process.env.REACT_APP_AUTH_DOMAIN_DEV;
	if (authDomain) {
		loginRequest.setDomain(authDomain);
	}
	loginRequest.setEmailorphone(emailOrPhone);
	return loginRequest;
};

const getVerifyRequest = (emailOrPhone: string, otp: string) => {
	const verifyRequest = new VerifyRequest();
	const authDomain = process.env.REACT_APP_AUTH_DOMAIN_DEV;
	if (authDomain) {
		verifyRequest.setDomain(authDomain);
	}
	verifyRequest.setEmailorphone(emailOrPhone);
	verifyRequest.setOtp(otp);
	return verifyRequest;
};

const loginClient = {
	Login: (emailOrPhone: string, metadata: Metadata | null, callback: (err: RpcError, response: StatusResponse) => void) => {
		getLoginClient().login(getLoginRequest(emailOrPhone), metadata, callback);
	},
	Verify: (emailOrPhone: string, otp: string, metaData: Metadata | null, callback: (err: RpcError, response: AuthResponse) => void) => {
		getLoginClient().verify(getVerifyRequest(emailOrPhone, otp), metaData, callback);
	}
};

export default loginClient;