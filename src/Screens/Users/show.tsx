// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import { Metadata, RpcError } from 'grpc-web';
import React, { useEffect, useState } from 'react';
import clients from 'src/clients';
import { UserProfileProto } from 'src/generated/common_pb';
import { ProfileListResponse } from 'src/generated/profile_pb';
import { GetStatsResponse } from 'src/generated/social_stats_pb';
import { IFetchProfiles } from 'src/types';

import UserProfileTable from './profiles';

type UserProfileWithStats = {
	profile: UserProfileProto;
	stats: GetStatsResponse;
};

const Show = () => {
	const [profiles, setProfiles] = useState<UserProfileProto[]>([]);
	const [userProfilesWithStats, setUserProfilesWithStats] = useState<(UserProfileWithStats | { profile: UserProfileProto; stats: null })[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const getStats = (userID: string): Promise<GetStatsResponse> => {
		return new Promise((resolve, reject) => {
			try {
				const metaData: Metadata | null = null;
				clients.social.stats.GetUserStats(
					userID,
					metaData,
					(err: RpcError, res: GetStatsResponse) => {
						if (err) {
							console.error('Error getting stats:', err);
							reject(err);
						} else {
							resolve(res);
						}
					}
				);
			} catch (err) {
				console.error('Error occurred:', err);
				reject(err);
			} 3;
		});
	};

	useEffect(() => {
		const fetchStatsAndCombine = async () => {
			const combinedData = await Promise.all(profiles.map(async (profile) => {
				try {
					const stats = await getStats(profile.getLoginid());
					return { profile, stats };
				} catch (error) {
					console.error(`Error fetching stats for user ${profile.getLoginid()}:`, error);
					return { profile, stats: null };
				}
			}));
			setUserProfilesWithStats(combinedData);
		};

		fetchStatsAndCombine();
	}, [profiles]);

	useEffect(() => {
		const fetchProfiles = async () => {
			try {
				const fetchprofiles: IFetchProfiles = {
					filters: {},
					pageNumber: 0,
					pageSize: 0
				};
				const metaData: Metadata | null = null;

				clients.auth.profile.FetchProfiles(fetchprofiles, metaData, (err: RpcError, response: ProfileListResponse) => {
					if (err) {
						console.error('Error fetching profiles:', err);
					} else {
						console.log(response.getProfilesList());
						setProfiles(response.getProfilesList());
					}
					setLoading(false);
				});
			} catch (err) {
				console.error('Error occurred:', err);
				setLoading(false);
			}
		};
		fetchProfiles();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<UserProfileTable userProfilesWithStats={userProfilesWithStats} />
	);
};

export default Show;
