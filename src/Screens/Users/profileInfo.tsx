/* eslint-disable */

// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import { Metadata, RpcError } from "grpc-web";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clients from "src/clients";
import avatar from 'src/assets/avatar.png';
import { GetStatsResponse } from "src/generated/social_stats_pb";
import {
	AddressProto,
	FarmingType,
	UserProfileProto,
	LandSizeInAcres,
} from "src/generated/common_pb";
import PostsPage from "./posts";
import CommentsTable from "./comments";

const ProfileView = () => {
	const { id } = useParams<{ id: string }>();
	const [loading, setLoading] = useState<boolean>(true);
	const [Profile, setProfile] = useState<UserProfileProto>();
	const [Stats, setStats] = useState<GetStatsResponse>();
	const [showPosts, setShowPosts] = useState(true);

	function PostsContainer() {
		if (typeof id === "undefined") {
			return <div>Loading or No ID available</div>;
		}
		return <PostsPage CreatorID={id} />;
	}

	function CommentsContainer() {
		if (typeof id === "undefined") {
			return <div>Loading or No ID available</div>;
		}
		return <CommentsTable CreatorID={id} />;
	}

	useEffect(() => {
		const getProfile = (profileId: string) => {
			try {
				const metaData: Metadata | null = null;
				clients.auth.profile.GetProfileByID(
					profileId,
					metaData,
					(err: RpcError, res: UserProfileProto) => {
						if (err) {
							console.error("Error fetching profiles:", err);
						} else {
							setProfile(res);
							setLoading(false);
						}
					}
				);
			} catch (err) {
				console.error("Error occurred:", err);
				setLoading(false);
			}
		};

		if (id) {
			getProfile(id);
		} else {
			setLoading(false);
			console.log("no id found");
		}
	}, [id]);

	useEffect(() => {
		const getStats = (userID: string) => {
			try {
				const metaData: Metadata | null = null;
				clients.social.stats.GetUserStats(
					userID,
					metaData,
					(err: RpcError, res: GetStatsResponse) => {
						if (err) {
							console.error("Error getting stats:", err);
						} else {
							setStats(res);
							setLoading(false);
						}
					}
				);
			} catch (err) {
				console.error("Error occurred:", err);
				setLoading(false);
			}
		};

		if (id) {
			getStats(id);
		} else {
			setLoading(false);
			console.log("no id found");
		}
	}, [id]);

	const getFarmingTypeString = (type: any) => {
		switch (type) {
			case FarmingType.ORGANIC:
				return "Organic";
			case FarmingType.CHEMICAL:
				return "Chemical";
			case FarmingType.MIX:
				return "Mix";
			default:
				return "Unknown";
		}
	};

	const getLandSizeString = (landsize: any) => {
		switch (landsize) {
			case LandSizeInAcres.LESSTHAN2:
				return "Less than 2";
			case LandSizeInAcres.BETWEEN2AND10:
				return "Between 2 and 10";
			case LandSizeInAcres.GREATERTHAN10:
				return "Greater than 10";
			default:
				return "Unknown";
		}
	};

	const renderCertificationDetails = (certificationDetails: any) => {
		if (!certificationDetails || !certificationDetails.isCertified) {
			return null;
		}

		return (
			<div className="grid grid-cols-8 gap-2 border-0">
				<span className="font-bold text-gray-700 p-2">Certification Name:</span>
				<span className="p-2">
					{certificationDetails?.getCertificationname()}
				</span>
				<span className="font-bold text-gray-700 p-2">Certification ID:</span>
				<span className="p-2">
					{certificationDetails?.getCertificationid()}
				</span>
				<span className="font-bold text-gray-700 p-2">
					Certification Agency:
				</span>
				<span className="p-2">
					{certificationDetails?.getCertificationagency()}
				</span>
			</div>
		);
	};

	const renderAddress = (addressesMap: Map<string, AddressProto>) => {
		const addressesArray: Array<{
			key: string;
			city: string;
			state: string;
			country: string;
			address: string;
		}> = [];

		addressesMap.forEach((value, key) => {
			addressesArray.push({
				address: value.getAddress(),
				city: value.getCity(),
				country: value.getCountry(),
				key: key,
				state: value.getState(),
			});
		});

		return addressesArray.map((address, index) => (
			<div key={index} className="grid p-2 grid-cols-8 gap-2">
				<span className="font-bold text-gray-700">{address.key} address:</span>
				<span>{`${address.address}, ${address.city}, ${address.state}, ${address.country}`}</span>
			</div>
		));
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<div className="flex justify-center items-center mt-0">
				<div className="w-1/2  grid grid-cols-4 text-center border-0flex flex-col md:flex-row rounded-lg overflow-hidden  mt-3">
					
					<div>
						<div className="font-bold text-lg mb-1">
							{Stats?.getReactcount() || "0"}
						</div>
						<div className="text-sm text-gray-600">Reacts</div>
					</div>
					<div>
						<div className="font-bold text-lg mb-1">
							{Stats?.getCommentscount() || "0"}
						</div>
						<div className="text-sm text-gray-600">Comments</div>
					</div>
					<div>
						<div className="font-bold text-lg mb-1">
							{Stats?.getPostscount() || "0"}
						</div>
						<div className="text-sm text-gray-600">Posts</div>
					</div>
					<div>
						<div className="font-bold text-lg mb-1">
							{Stats?.getEventscount() || "0"}
						</div>
						<div className="text-sm text-gray-600">Events</div>
					</div>
				</div>
			</div>

			<div className="container mx-auto p-4 border-l-red_primary">
				<div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
					<div className="w-full md:w-1/3 flex flex-col justify-center md:justify-start p-4">
						{/* Profile photo */}
						<div className="flex flex-col items-center">
							<img
								src={Profile?.getPhotourl() || avatar}
								alt={avatar}
								className="rounded-full h-48 w-48 object-cover"
							/>
						</div>

						<div className="py-6 px-12 grid grid-cols-2 text-center border-0">
							<div>
								<div className="font-bold text-lg mb-1">
									{Stats?.getFollowerscount() || "0"}
								</div>
								<div className="text-sm text-gray-600">Followers</div>
							</div>
							<div>
								<div className="font-bold text-lg mb-1">
									{Stats?.getFollowingcount() || "0"}
								</div>
								<div className="text-sm text-gray-600">Following</div>
							</div>
						</div>
					</div>

					{/* {profile info } */}
					<div className="w-full p-4">
						<div className="grid grid-cols-8 gap-2 border-0">
							<span className="font-bold text-gray-700 p-2">Name:</span>
							<span className="p-2">{Profile?.getName()}</span>
							<span className="font-bold text-gray-700 p-2">Bio:</span>
							<span className="p-2">{Profile?.getBio()}</span>
							<span className="font-bold text-gray-700 p-2">Gender:</span>
							<span className="p-2">
								{Profile?.getGender() === 1
									? "Male"
									: Profile?.getGender() === 2
										? "Female"
										: "Unspecified"}
							</span>
							<span className="font-bold text-gray-700 p-2">Verified:</span>
							{Profile?.getIsverified() ? (
								<span className="p-2 px-10 inline-flex leading-5 font-semibold rounded-full text-green-800">
									True
								</span>
							) : (
								<span className="p-2 px-10 inline-flex leading-5 font-semibold rounded-full text-red-800">
									False
								</span>
							)}
							<span className="font-bold text-gray-700 p-2">FarmingType:</span>
							<span className="p-2">
								{getFarmingTypeString(Profile?.getFarmingtype())}
							</span>
							<span className="font-bold text-gray-700 p-2">Crops:</span>
							<span className="p-2">{Profile?.getCropsList().join(", ")}</span>
							<span className="font-bold text-gray-700 p-2">
								Farming Since:
							</span>
							<span className="p-2">
								{Profile?.getYearssinceorganicfarming()} years
							</span>
							<span className="font-bold text-gray-700 p-2">
								Prefrred Language:
							</span>
							<span className="p-2">{Profile?.getPreferredlanguage()}</span>
							<span className="font-bold text-gray-700 p-2">LandSize:</span>
							<span className="p-2">
								{getLandSizeString(Profile?.getLandsizeinacres())}
							</span>
							<span className="font-bold text-gray-700 p-2">Created On:</span>
							<span className="p-2">
								{Profile?.getCreatedon()
									? new Date(Profile.getCreatedon() * 1000).toLocaleString()
									: "N/A"}
							</span>
						</div>
						{Profile?.getAddressesMap() &&
							renderAddress(Profile.getAddressesMap())}
						{renderCertificationDetails(Profile?.getCertificationdetails())}
					</div>
				</div>
			</div>

			<div className="container mx-auto">
				{/* Toggle Button */}
				<div className="flex justify-center py-4">
					<button
						className={`px-8 py-2 rounded-l-lg font-semibold ${showPosts ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
							}`}
						onClick={() => setShowPosts(true)}
					>
						Posts
					</button>
					<button
						className={`px-4 py-2 rounded-r-lg font-semibold ${!showPosts
								? "bg-blue-500 text-white"
								: "bg-gray-200 text-gray-700"
							}`}
						onClick={() => setShowPosts(false)}
					>
						Comments
					</button>
				</div>

				{/* Content */}
				{showPosts ? <PostsContainer /> : <CommentsContainer />}
			</div>
		</>
	);
};

export default ProfileView;
