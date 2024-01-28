// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { loginClient, profileClient, profileMasterClient } from './auth';
import { adminClient } from './localization';
import { ActionsClient, EventClient, socialStatsClient, userPostClient } from './social';

const clients = {
	auth: {
		login: loginClient,
		profile: profileClient,
		profileMaster: profileMasterClient
	},
	localization: {
		admin: adminClient
	},
	social: {
		actions: ActionsClient,
		content: userPostClient,
		event : EventClient,
		stats: socialStatsClient
	}
};

export default clients;