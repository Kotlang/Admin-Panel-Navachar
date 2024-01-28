// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import { Metadata, RpcError } from 'grpc-web';
import { GetStatsRequest, GetStatsResponse } from 'src/generated/social_stats_pb';
import { SocialStatsClient } from 'src/generated/Social_statsServiceClientPb';

import { addJwtToken } from '../utils';

export const getsocialStatsClient = (() => {
	const socialURL = process.env.REACT_APP_SOCIAL_URL;
	let client: SocialStatsClient;
	if (socialURL) {
		client = new SocialStatsClient(socialURL);
	}
	return () => {
		return client;
	};
})();

const getStatsRequest = (userID: string) => {
	const statsRquest = new GetStatsRequest();
	statsRquest.setUserid(userID);
	return statsRquest;
};

const socialStatsClient = {

	GetUserStats: (userID: string,
		metaData: Metadata | null,
		callback: (err: RpcError, response: GetStatsResponse) => void
	) => {
		getsocialStatsClient().getStats(getStatsRequest(userID), addJwtToken(metaData), callback);
	}

};

export default socialStatsClient;