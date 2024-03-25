/* eslint-disable */

// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React from "react";
import { useLocation } from "react-router-dom";
import navArrowIcon from "src/assets/icons/navArrowIcon.svg";
import { QuickReplyButtons } from "src/generated/messaging-service_pb";

const TemplateDetailsPage = () => {
    const { state } = useLocation();
    const {
        name,
        body,
        templateId,
        baid,
        bodyParams,
        headerParams,
        footer,
        mediaUrl,
        mediaType,
        actionsType,
        actionsResponseLinkOrNumber,
        quickReplies,
    } = state;

    return (
        <div>
            <div className="mt-6 flex mb-6 items-center">
                <a href="/marketing/templates">
                    <img className="h-6 w-6" src={navArrowIcon} alt="" />
                </a>
                <h2 className="flex w-full justify-center text-w_text font-barlow font-regular text-2xl leading-7 tracking-[10px] m-3 ">
                    TEMPLATE DETAILS
                </h2>
            </div>
            <div className="w-full p-5 border-2 border-f_text rounded-lg mt-2 flex flex-col gap-3 font-mainfont text-w_text bg-main_black">
                <div className="flex flex-row w-[100%] justify-between">
                    <div className="flex flex-col p-4 gap-y-2">
                        <div className="flex flex-row text-lg">
                            <p className=" font-bold mr-2">Template Name: </p>
                            <p className="">{name}</p>
                        </div>

                        <div className="flex flex-row text-lg">
                            <p className=" font-bold mr-2">Template Id: </p>
                            <p className="">{templateId}</p>
                        </div>

                        <div className="flex flex-row text-lg">
                            <p className=" font-bold mr-2">Whatsapp Business Id: </p>
                            <p className="">{baid}</p>
                        </div>

                        <div className="flex flex-row text-lg">
                            <p className=" font-bold mr-2">Body: </p>
                            <p className="">{body}</p>
                        </div>

                        {headerParams &&
                            headerParams.map((item: string, index: any) => (
                                <div className="flex flex-row mb-1 text-lg" key={index}>
                                    <div className=" font-bold mr-2">Header Paramters : </div>
                                    <div className="">{item}</div>
                                </div>
                            ))
                        }

                        {bodyParams &&
                            bodyParams.map((item: string, index: any) => (
                                <div className="flex flex-row mb-1 text-lg" key={index}>
                                    <div className=" font-bold mr-2">Body Paramters : </div>
                                    <div className="">{item}</div>
                                </div>
                            ))
                        }

                        {footer && (
                            <div className="flex flex-row text-lg">
                                <p className=" font-bold mr-2">Footer: </p>
                                <p>{footer}</p>
                            </div>
                        )}

                        {actionsType && actionsType === 1 ? (
                            <div>
                                <div className="flex flex-row text-lg">
                                    <p className=" font-bold mr-2">Reponse: </p>
                                    <p className=" text-green-500">VISIT LINK</p>
                                </div>
                                <div className="flex flex-row text-lg">
                                    <p className=" font-bold mr-2">LINK: </p>
                                    <p>{actionsResponseLinkOrNumber}</p>
                                </div>
                            </div>
                        ) : actionsType === 0 && actionsResponseLinkOrNumber ? (
                            <div>
                                <div className="flex flex-row text-lg">
                                    <p className=" font-bold mr-2">Response: </p>
                                    <p className=" text-green-500">CALL ON NUMBER: </p>
                                </div>
                                <div className="flex flex-row text-lg">
                                    <p className=" font-bold mr-2">Mobile Number: </p>
                                    <p>{actionsResponseLinkOrNumber}</p>
                                </div>
                            </div>
                        ) : null}

                        {quickReplies && (
                            quickReplies.map((item: any, index: any) => (
                                <div className="flex flex-row mb-1 text-lg" key={index}>
                                    <div className=" font-bold mr-2">Replies : </div>
                                    <div className="">{item.array[0]}</div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="w-[40%] h-[60%] border-2 overflow-x-scroll overflow-y-hidden">
                        <div className="h-[252px] flex overflow-x-scroll scrollbar-hide">
                            {mediaType === "video" ? (
                                <div className="relative mr-2">
                                    <video
                                        src={mediaUrl}
                                        style={{
                                            maxWidth: "394px",
                                            maxHeight: "252px",
                                        }}
                                        controls
                                    >
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            ) : (
                                <div className="relative mr-2">
                                    <img
                                        src={mediaUrl}
                                        alt={"Poster"}
                                        style={{
                                            maxWidth: "394px",
                                            maxHeight: "252px",
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemplateDetailsPage;
