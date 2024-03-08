/* eslint-disable */
// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import React, { useEffect, useState } from "react";
import { TabsProps, Tabs, Popconfirm, Button } from "antd";
import UserActivity from "./userActivity";
import { useParams } from "react-router-dom";
import { Metadata, RpcError } from "grpc-web";
import avatar from "src/assets/avatar.png";
import clients from "src/clients";
import { getFarmingType, getFarmingTypeColor, renderAddress, blockUser, unBlockUser } from './utils';
import navArrowIcon from "src/assets/icons/navArrowIcon.svg";
import {
    FarmingType,
    UserProfileProto,
} from "src/generated/common_pb";
import CropList from "./crops";

const UserDetails = () => {
    const { userId, phone } = useParams<{ userId: string, phone: string }>();
    const [Profile, setProfile] = useState<UserProfileProto>();
    const [loading, setLoading] = useState<boolean>(true);

    const items: TabsProps["items"] = [
        {
            children: <UserActivity filter="all" creatorId={userId || ""} />,
            key: "1",
            label: "ALL",
        },
        {
            children: "display liked posts, comments and events",
            key: "2",
            label: "Likes",
        },
        {
            children: <UserActivity filter="comments" creatorId={userId || ""} />,
            key: "3",
            label: "Comments",
        },
        {
            children: <UserActivity filter="posts" creatorId={userId || ""} />,
            key: "4",
            label: "Posts",
        },
    ];

    function blockOrUnblockUser(userId: string | undefined, isBlocked: boolean | undefined) {
        if (userId === undefined || isBlocked === undefined) {
            return
        }
        if (isBlocked) {
            unBlockUser(userId);
            Profile?.setIsblocked(false);
        } else {
            blockUser(userId);
            Profile?.setIsblocked(true);
        }
    }


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

        if (userId) {
            getProfile(userId);
        } else {
            setLoading(false);
            console.log("no id found");
        }
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>;
    }
    
    return (
        <>
            <div className="flex gap-5 cursor-pointer mt-5">
                <img src={navArrowIcon} alt="" />
                <a className=" uppercase tracking-widest  text-base" href="/users">
                    Back To Users
                </a>
            </div>
            <h2 className="flex mt-4 just justify-center text-w_text font-barlow font-regular text-3xl leading-7 tracking-[10px] mb-8 ">
                USER DETAILS
            </h2>
            <div className="w-full p-5 border-2 border-f_text rounded-lg mt-2 flex flex-col gap-3 font-mainfont text-w_text bg-main_black">
                <div className="flex flex-wrap">
                    <div className="flex flex-col w-full">
                        <div className="flex content-center w-full">
                            <div className="profile-image-container">
                                <img src={Profile?.getPhotourl()} alt={avatar} />
                            </div>

                            {/* middle portion */}
                            <div className="flex pt-12 pl-8 w-full flex-col">
                                <h1 className="font-semibold text-2xl">{Profile?.getName()}</h1>
                                <p className="text-base">{Profile?.getBio()}</p>
                            </div>

                            <div className="flex justify-end w-[20%]">
                                <div className="flex flex-col justify-center ">
                                    <h1 className="flex text-gray-400 text-xl ">Last Active</h1>
                                    <h1 className="flex text-gray-400 text-xl justify-end">
                                    {Profile?.getLastactive()
                                        ? new Date(Profile?.getLastactive() * 1000).toLocaleString()
                                        : "N/A"}
                                    </h1>
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 p-2 grid grid-cols-2">
                            <div className="mt-5 flex flex-row">
                                <svg
                                    className="m-1 h-6 w-6 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                                    />
                                </svg>

                                <p className="pl-4 text-lg text-gray-400">JOINED :</p>
                                <p className="pl-5 text-lg">
                                    {Profile?.getCreatedon()
                                        ? new Date(Profile?.getCreatedon() * 1000).toLocaleString()
                                        : "N/A"}
                                </p>
                            </div>
                            <div className="mt-5 flex flex-row">
                                <svg
                                    className="m-1.5 h-5 w-5 text-gray-400"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    {" "}
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                                <p className="pl-4 text-lg text-gray-400">PHONE NUMBER :</p>
                                <p className="pl-5 text-lg">{phone}</p>
                            </div>
                            <div className="mt-5 flex flex-row">
                                <svg
                                    className="m-1 h-6 w-6 text-gray-400"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    {" "}
                                    <circle cx="12" cy="12" r="10" />{" "}
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                                <p className="pl-4 text-lg text-gray-400">
                                    YEAR SINCE ORGANIC FARMING :
                                </p>
                                <p className="pl-5 text-lg">
                                    {Profile?.getYearssinceorganicfarming()}
                                </p>
                            </div>
                            <div className="mt-5 flex flex-row">
                                <svg
                                    className="h-6 w-6 text-gray-400"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    stroke-width="2"
                                    stroke="currentColor"
                                    fill="none"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    {" "}
                                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                                    <polyline points="6 21 21 6 18 3 3 18 6 21" />{" "}
                                    <line x1="15" y1="6" x2="18" y2="9" />{" "}
                                    <path d="M9 3a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />{" "}
                                    <path d="M19 13a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
                                </svg>
                                <p className="pl-4 text-lg text-gray-400">FARMING PRACTICE :</p>
                                <p className={`pl-5 text-lg  ${getFarmingTypeColor(getFarmingType(Profile?.getFarmingtype() || FarmingType.UNSPECIFIEDFARMING))}`}>
                                    {getFarmingType(Profile?.getFarmingtype() || FarmingType.UNSPECIFIEDFARMING)}
                                </p>
                            </div>
                            <div className="mt-5 flex flex-row">
                                <svg
                                    className="m-1 h-6 w-6 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                <p className="pl-4 text-lg text-gray-400">LOCATION :</p>
                                <div className="pl-5 text-lg">
                                    {Profile?.getAddressesMap() &&
                                        renderAddress(Profile?.getAddressesMap())}
                                </div>
                            </div>
                            <div className="mt-5 flex flex-row">
                                <svg
                                    className="m-1 h-6 w-6 text-gray-400"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    stroke-width="2"
                                    stroke="currentColor"
                                    fill="none"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    {" "}
                                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                                    <circle cx="12" cy="9" r="6" />{" "}
                                    <polyline
                                        points="9 14.2 9 21 12 19 15 21 15 14.2"
                                        transform="rotate(-30 12 9)"
                                    />{" "}
                                    <polyline
                                        points="9 14.2 9 21 12 19 15 21 15 14.2"
                                        transform="rotate(30 12 9)"
                                    />
                                </svg>
                                <p className="pl-4 text-lg text-gray-400">CERTIFICATION :</p>
                                <p className="pl-5 text-lg">
                                    {renderCertificationDetails(Profile?.getCertificationdetails())}
                                </p>
                            </div>
                        </div>
                        <div className="mt-5 flex flex-row">
                                <svg
                                    className="m-1 h-6 w-6 text-gray-400"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    stroke-width="2"
                                    stroke="currentColor"
                                    fill="none"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    {" "}
                                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                                    <rect x="4" y="3" width="8" height="14" rx="4" />{" "}
                                    <rect x="12" y="7" width="8" height="10" rx="3" />{" "}
                                    <line x1="8" y1="21" x2="8" y2="13" />{" "}
                                    <line x1="16" y1="21" x2="16" y2="14" />
                                </svg>
                                <div className="flex flex-col w-full">
                                    <p className="pl-4 text-lg text-gray-400">CROPS FARMED :</p>
                                    <CropList crops={Profile?.getCropsList() || []} />
                                </div>
                            </div>
                            
                    </div>
                    <Popconfirm
						title={Profile?.getIsblocked() ? 'Unblock user' : 'Block user'}
						description={Profile?.getIsblocked() ? 'Are you sure you want to unblock user?' : 'Are you sure you want to block user?'}
						onConfirm={() => blockOrUnblockUser(userId, Profile?.getIsblocked())}

						okText="Yes"
						cancelText="No"
					>
						<Button type='primary' danger>{ Profile?.getIsblocked() ? 'Unblock' : 'Block'}</Button>
					</Popconfirm>
                </div>
            </div>

            <h2 className="flex mt-14 just justify-center text-w_text font-barlow font-regular text-3xl leading-7 tracking-[10px] mb-8 ">
                USER ACTIVITIES
            </h2>
            <div className="w-full p-5 border-2 border-f_text rounded-lg mt-2 flex flex-col gap-3 font-mainfont text-w_text bg-main_black">
                <div className="">
                    <Tabs centered defaultActiveKey="1" items={items} size="large" />
                </div>
            </div>
        </>
    );
};

export default UserDetails;
