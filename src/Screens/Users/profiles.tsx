// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import React from 'react';
import { useNavigate } from 'react-router-dom';
import avatar from 'src/assets/avatar.png';
import { UserProfileProto } from 'src/generated/common_pb';
import { GetStatsResponse } from 'src/generated/social_stats_pb';

type UserProfileWithStats = {
	profile: UserProfileProto;
	stats?: GetStatsResponse | null;
};

type UserProfileTableProps = {
	userProfilesWithStats: UserProfileWithStats[];
};

const UserProfileTable: React.FC<UserProfileTableProps> = ({ userProfilesWithStats }) => {
	const navigate = useNavigate();

	const navigateToProfile = (id: string) => {
		navigate(`/users/profile/${id}`);
	};

	return (
		<div className="overflow-x-auto">
			<table className="min-w-full divide-y divide-gray-200">
				<thead className="bg-gray-100">
					<tr>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Name
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Verified
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Followers
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Following
						</th>
						<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
							<div className="font-bold mb-8">Engagements</div>
							<div className="grid grid-cols-4 gap-1">
								<div>Reacts</div>
								<div>Comments</div>
								<div>Posts</div>
								<div>Total</div>
							</div>
						</th>
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{userProfilesWithStats.map(({ profile, stats }) => (
						<tr key={profile.getLoginid()} onClick={() => navigateToProfile(profile.getLoginid())}>
							<td className="px-6 py-4 whitespace-nowrap">
								<div className="flex items-center">
									<div className="flex-shrink-0 h-20 w-20">
										<img className="h-20 w-20" src={profile.getPhotourl() || avatar} alt={avatar} />
									</div>
									<div className="ml-4">
										<div className="text-sm font-medium text-gray-900">{profile.getName()}</div>
									</div>
								</div>
							</td>
							<td className="px-6 py-4 whitespace-nowrap">
								{profile.getIsverified() ? (
									<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
										Verified
									</span>
								) : (
									<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
										Not Verified
									</span>
								)}
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stats?.getFollowerscount()}</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stats?.getFollowingcount()}</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
								<div className="grid grid-cols-4 gap-1 text-center">
									{/* Reacts */}
									<div className="border rounded p-1">
										<div>{stats?.getReactcount()}</div>
									</div>

									{/* Comments */}
									<div className="border rounded p-1">
										<div>{stats?.getCommentscount()}</div>
									</div>

									{/* Posts */}
									<div className="border rounded p-1">
										<div>{stats?.getPostscount()}</div>
									</div>

									{/* Total */}
									<div className="border rounded p-1">
										<div>{stats ? (stats.getReactcount() + stats.getCommentscount() + stats.getPostscount() + stats.getEventscount()) : 0}</div>
									</div>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default UserProfileTable;
