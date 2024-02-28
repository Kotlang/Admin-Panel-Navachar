/* eslint-disable */

// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.


import React from "react";
import navArrowIcon from "src/assets/icons/navArrowIcon.svg";
import avatar from "src/assets/avatar.png";
import { TabsProps, Tabs } from "antd";
import { UserPostProto } from 'src/generated/social_pb';
import Comments from "./postComments";
import { UnixToLocalTime } from "./utils";

interface props {
    post: UserPostProto | undefined;
}
const ViewPost: React.FC<props> = ({ post }) => {

    const items: TabsProps["items"] = [
        {
            children: "likes",
            key: "1",
            label: (
                <div className="flex flex-wrap gap-2">
                    <svg
                        className="h-6 w-6"
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
                        <path d="M12 20l-7 -7a4 4 0 0 1 6.5 -6a.9 .9 0 0 0 1 0a4 4 0 0 1 6.5 6l-7 7" />
                    </svg>
                    <span>{post?.getNumreactsMap()?.map_?.like?.value || 0}</span>
                    <span>Likes</span>
                </div>
            ),
        },
        {
            children: <Comments postId={post?.getPostid() || ""} />,
            key: "2",
            label: (
                <div className="flex flex-wrap gap-2">
                    <svg
                        className="h-6 w-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        {" "}
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                    <span>{post?.getNumreplies()}</span>
                    <span>Comments</span>
                </div>
            ),
        },
    ];

    return (
        <>
            <div className="flex flex-row mt-5">
                <div className="flex flex-row w-[20%] px-4 gap-3 py-6 cursor-pointer">
                    <img src={navArrowIcon} className="content-center h-6 w-6" alt="" />
                    <a className=" uppercase tracking-widest  text-base">Back To Posts</a>
                </div>
                <h2 className="flex mt-4 w-full justify-center text-w_text font-barlow font-regular text-3xl leading-7 tracking-[10px] mb-8 ">
                    POST DETAILS
                </h2>
            </div>
            <div className="w-full p-5 border-2 border-f_text rounded-lg mt-2 flex flex-col gap-3 font-mainfont text-w_text bg-main_black">
                <div className="flex justify-between flex-wrap">
                    <div className="flex content-center w-full">
                        <div className="profile-image-container">
                            <img
                                src={
                                    post?.getAuthorinfo()?.getPhotourl() || avatar
                                }
                            />
                        </div>

                        <div className="flex pt-12 pl-8 w-full flex-col">
                            <h1 className="font-semibold text-2xl">{post?.getAuthorinfo()?.getName()}</h1>
                            <p className="text-base">{post?.getAuthorinfo()?.getOccupation()}</p>
                        </div>

                        <div className="flex justify-end w-[20%]">
                            <div className="flex flex-col justify-center ">
                                <h1 className="flex text-gray-400 text-xl ">POSTED ON</h1>
                                <h1 className="flex text-gray-400 text-xl justify-end">
                                    {UnixToLocalTime(post?.getCreatedon() || 0)}
                                </h1>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-col gap-3 w-[50%]">
                        <div className="mt-5 px-6 flex flex-col gap-3 ">
                            <div className="text-base">
                                <p>{post?.getPost()}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4  w-[40%] h-[100%] border-2 overflow-x-scroll overflow-y-hidden">
                        <div className="h-[252px] flex overflow-x-scroll  scrollbar-hide">
                            {Array.from(post?.getMediaurlsList() || []).map((mediaurl, index) => (
                                <div key={index} className="relative mr-2">
                                    <img
                                        src={mediaurl.getUrl()}
                                        style={{
                                            maxHeight: "252px",
                                            maxWidth: "394px",
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="">
                    <Tabs centered defaultActiveKey="1" items={items} size="large" />
                </div>
            </div>
        </>
    );
}

export default ViewPost;