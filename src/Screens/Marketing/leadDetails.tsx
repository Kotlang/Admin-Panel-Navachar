/* eslint-disable */
import React from "react";
import { TabsProps, Tabs, Popconfirm, Button } from "antd";
import {
    getFarmingType,
    getFarmingTypeColor,
    renderAddress,
    blockUser,
    unBlockUser,
} from "../Users/utils";
import { FarmingType, UserProfileProto } from "src/generated/common_pb";
import {
    JoinIcon,
    PhoneIcon,
    ClockIcon,
    SickleIcon,
    LocationIcon,
    CertificationIcon,
    CropsIcon,
    AvatarIcon,
    SourceIcon,
    MessageIcon,
    CountIcon,
    StatusIcon,
    ResponseIcon,
} from "src/assets";
const LeadDetails = () => {
    return (
        <>
            <h2 className="flex mt-8 just justify-center text-w_text font-barlow font-regular text-3xl leading-7 tracking-[10px] mb-8 ">
                LEAD DETAILS
            </h2>
            <div className="w-full p-5 border-2 border-f_text rounded-lg mt-2 flex flex-col gap-3 font-mainfont text-w_text bg-main_black">
                <div className="flex flex-wrap">
                    <div className="flex flex-col w-full">
                        <div className="flex content-center w-full px-8">
                            <div className="profile-image-container">
                                <img
                                    src={
                                        "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
                                    }
                                    alt={"avatar"}
                                />
                            </div>

                            {/* middle portion */}
                            <div className="flex pt-12 pl-8 w-full flex-col">
                                <h1 className="font-semibold text-2xl">Laukik Chahande</h1>
                                <p className="text-base">Nothing like anything</p>
                            </div>
                        </div>
                        <div className="px-5">
                            <div className="mt-5 p-2 grid grid-cols-2">
                                <div className="mt-5 flex flex-row">
                                    <JoinIcon />
                                    <p className="pl-4 text-lg text-gray-400">JOINED :</p>
                                    <p className="pl-5 text-lg">12/03/2024</p>
                                </div>
                                <div className="mt-5 flex flex-row">
                                    <AvatarIcon />
                                    <p className="pl-4 text-lg text-gray-400">Leads's Type :</p>
                                    <p className="pl-5 text-lg">Farmer</p>
                                </div>
                                <div className="mt-5 flex flex-row">
                                    <PhoneIcon />
                                    <p className="pl-4 text-lg text-gray-400">PHONE NUMBER :</p>
                                    <p className="pl-5 text-lg">7499618811</p>
                                </div>
                                <div className="mt-5 flex flex-row">
                                    <MessageIcon />
                                    <p className="pl-4 text-lg text-gray-400">Last Message:</p>
                                    <p className="pl-5 text-lg">12/03/2024</p>
                                </div>
                                <div className="mt-5 flex flex-row">
                                    <SickleIcon />
                                    <p className="pl-4 text-lg text-gray-400">
                                        FARMING PRACTICE :
                                    </p>
                                    <p
                                        className={`pl-5 text-lg  ${getFarmingTypeColor(
                                            getFarmingType(FarmingType.UNSPECIFIEDFARMING)
                                        )}`}
                                    >
                                        {getFarmingType(FarmingType.UNSPECIFIEDFARMING)}
                                    </p>
                                </div>
                                <div className="mt-5 flex flex-row">
                                    <SourceIcon />
                                    <p className="pl-4 text-lg text-gray-400">Source :</p>
                                    <p className="pl-5 text-lg">Facebook</p>
                                </div>
                                <div className="mt-5 flex flex-row">
                                    <LocationIcon />
                                    <p className="pl-4 text-lg text-gray-400">LOCATION :</p>
                                    <div className="pl-5 text-lg">Pune</div>
                                </div>
                                <div className="mt-5 flex flex-row">
                                    <StatusIcon />
                                    <p className="pl-4 text-lg text-gray-400">App Status:</p>
                                    <p className="pl-5 text-lg">Installed</p>
                                </div>
                                <div className="mt-5 flex flex-row">
                                    <CertificationIcon />
                                    <p className="pl-4 text-lg text-gray-400">CERTIFICATION :</p>
                                    <p className="pl-5 text-lg">N/A</p>
                                </div>
                                <div className="mt-5 flex flex-row">
                                    <CountIcon />
                                    <p className="pl-4 text-lg text-gray-400">Mess Count:</p>
                                    <p className="pl-5 text-lg">05</p>
                                </div>

                                <div className="mt-5 flex flex-row">
                                    <ClockIcon />
                                    <p className="pl-4 text-lg text-gray-400">
                                        YEAR SINCE ORGANIC FARMING :
                                    </p>
                                    <p className="pl-5 text-lg">2</p>
                                </div>
                                <div className="mt-5 flex flex-row">
                                    <ResponseIcon />
                                    <p className="pl-4 text-lg text-gray-400">Mess Response:</p>
                                    <p className="pl-5 text-lg">Yes</p>
                                </div>
                            </div>

                            <div className="mt-3 flex flex-row pl-2">
                                <CropsIcon />
                                <div className="flex flex-col w-full">
                                    <p className="pl-4 text-lg text-gray-400">CROPS FARMED :</p>
                                </div>
                            </div>
                            <div className="pl-4 mt-5 flex flex-row">
                                <button
                                    type="button"
                                    className="focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 me-2 mb-2"
                                >
                                    Remove Lead
                                </button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default LeadDetails;
