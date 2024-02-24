/* eslint-disable */

// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import React from "react";
import { TabsProps, Tabs } from 'antd';

const UserDetails = () => {
    const items: TabsProps['items'] = [
        {
            children: 'display all user activities',
            key: '1',
            label: 'ALL'
        },
        {
            children: 'display liked posts, comments and events',
            key: '2',
            label: 'Likes'
        },
        {
            children: 'display user comments',
            key: '3',
            label: 'Comments'
        },
        {
            children: 'display user posts',
            key: '4',
            label: 'Posts'
        },
    ];

    return (
        <>
            <h2 className="flex mt-14 just justify-center text-w_text font-barlow font-regular text-3xl leading-7 tracking-[10px] mb-8 ">
                USER DETAILS
            </h2>
            <div className="w-full p-5 border-2 border-f_text rounded-lg mt-2 flex flex-col gap-3 font-mainfont text-w_text bg-main_black">
                <div className="flex flex-wrap">
                    <div className="flex flex-col w-full">
                        <div className="flex content-center w-full  -rose-600">
                            <img
                                src={
                                    "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
                                }
                                alt=""
                                className=" w-40 h-40 rounded-full"
                            />

                            {/* middle portion */}
                            <div className="flex pt-12 pl-8 w-full flex-col  -white">
                                <h1 className="font-semibold text-2xl">Laukik Chahande</h1>
                                <p className="text-base">
                                    Hi my name is laukik, speed one terahertz, memory one setabyte
                                </p>
                            </div>

                            <div className="flex justify-end w-[20%]">
                                <div className="flex flex-col justify-center  -white">
                                    <h1 className="flex text-gray-400 text-xl ">Last Active</h1>
                                    <h1 className="flex text-gray-400 text-xl justify-end">
                                        1 HR AGO
                                    </h1>
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 p-2 grid grid-cols-2  boder-white">
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
                                <p className="pl-4 text-lg text-gray-400">PHONE NUMBER:</p>
                                <p className="pl-5 text-lg">7499618811</p>
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
                                    YEAR SINCE ORGANIC FARMING:
                                </p>
                                <p className="pl-5 text-lg">2 YEARS</p>
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
                                <p className="pl-4 text-lg text-gray-400">FARMING PRACTICE:</p>
                                <p className="pl-5 text-lg  text-green-500">ORGANIC</p>
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
                                <p className="pl-4 text-lg text-gray-400">LOCATION:</p>
                                <p className="pl-5 text-lg">PUNE</p>
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
                                <p className="pl-4 text-lg text-gray-400">CROPS FARMED:</p>
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
                                <p className="pl-4 text-lg text-gray-400">CERTIFICATION:</p>
                                <p className="pl-5 text-lg">APEDA</p>
                            </div>
                        </div>
                        <button className="mt-4 uppercase w-[10%] tracking-wider rounded-lg font-semibold px-2 py-2 bg-red_primary border">
                            Block User
                        </button>
                    </div>
                </div>
            </div>

            <h2 className="flex mt-14 just justify-center text-w_text font-barlow font-regular text-3xl leading-7 tracking-[10px] mb-8 ">
                USER ACTIVITIES
            </h2>
            <div className="w-full p-5 border-2 border-f_text rounded-lg mt-2 flex flex-col gap-3 font-mainfont text-w_text bg-main_black">

                <div className="flex justify-center">
                    <Tabs className="" defaultActiveKey="1" items={items} size='large' />
                </div>

            </div>
        </>
    );
};

export default UserDetails;
