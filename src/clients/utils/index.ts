// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Metadata } from 'grpc-web';
import { UserProfileProto } from 'src/generated/common_pb';
import { AuthResponse } from 'src/generated/login_pb';
import { useLoginStore } from 'src/store';
import { IAuthResponse, IUserProfile } from 'src/types';

const getAuthResponse: (authResponse: AuthResponse) => IAuthResponse = (authResponse) => {
	const userProfileProto = authResponse.getProfile();
	return {
		jwt: authResponse.getJwt(),
		profile: userProfileProto? getUserProfile(userProfileProto): {},
		userType: authResponse.getUsertype()
	};
};

const getUserProfile: (userProfileProto: UserProfileProto) => IUserProfile = (userProfileProto) => {
	return {
		attributesList: userProfileProto.getAttributesList(),
		createdOn: userProfileProto.getCreatedon(),
		gender: userProfileProto.getGender(),
		loginId: userProfileProto.getLoginid(),
		name: userProfileProto.getName(),
		photoUrl: userProfileProto.getPhotourl(),
		preferredLanguage: userProfileProto.getPreferredlanguage()
	};
};

const addJwtToken = (metaData: Metadata | null) => {
	const jwt = useLoginStore.getState().authResponse.jwt;
	const newMetaData: Metadata = {
		...metaData,
		'Authorization': `Bearer ${jwt}`
	};
	return newMetaData;
};

export { getAuthResponse, addJwtToken, getUserProfile };