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
import {
    JoinIcon,
    PhoneIcon,
    ClockIcon,
    SickleIcon,
    LocationIcon,
    CertificationIcon,
    CropsIcon,
} from "src/assets";

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
                                <JoinIcon />
                                <p className="pl-4 text-lg text-gray-400">JOINED :</p>
                                <p className="pl-5 text-lg">
                                    {Profile?.getCreatedon()
                                        ? new Date(Profile?.getCreatedon() * 1000).toLocaleString()
                                        : "N/A"}
                                </p>
                            </div>
                            <div className="mt-5 flex flex-row">
                                <PhoneIcon />
                                <p className="pl-4 text-lg text-gray-400">PHONE NUMBER :</p>
                                <p className="pl-5 text-lg">{phone}</p>
                            </div>
                            <div className="mt-5 flex flex-row">
                                <ClockIcon />
                                <p className="pl-4 text-lg text-gray-400">
                                    YEAR SINCE ORGANIC FARMING :
                                </p>
                                <p className="pl-5 text-lg">
                                    {Profile?.getYearssinceorganicfarming()}
                                </p>
                            </div>
                            <div className="mt-5 flex flex-row">
                                <SickleIcon />
                                <p className="pl-4 text-lg text-gray-400">FARMING PRACTICE :</p>
                                <p className={`pl-5 text-lg  ${getFarmingTypeColor(getFarmingType(Profile?.getFarmingtype() || FarmingType.UNSPECIFIEDFARMING))}`}>
                                    {getFarmingType(Profile?.getFarmingtype() || FarmingType.UNSPECIFIEDFARMING)}
                                </p>
                            </div>
                            <div className="mt-5 flex flex-row">
                                <LocationIcon />
                                <p className="pl-4 text-lg text-gray-400">LOCATION :</p>
                                <div className="pl-5 text-lg">
                                    {Profile?.getAddressesList() &&
                                        renderAddress(Profile?.getAddressesList())}
                                </div>
                            </div>
                            <div className="mt-5 flex flex-row">
                                <CertificationIcon />
                                <p className="pl-4 text-lg text-gray-400">CERTIFICATION :</p>
                                <p className="pl-5 text-lg">
                                    {renderCertificationDetails(Profile?.getCertificationdetails())}
                                </p>
                            </div>
                        </div>
                        <div className="mt-5 flex flex-row">
                            <CropsIcon />
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
                        <Button type='primary' danger>{Profile?.getIsblocked() ? 'Unblock' : 'Block'}</Button>
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
