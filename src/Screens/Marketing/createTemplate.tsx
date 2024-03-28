/* eslint-disable */
import React, { useState, useEffect } from "react";
import navArrowIcon from "src/assets/icons/navArrowIcon.svg";
import clients from "src/clients";
import { IMessagingTemplate } from "src/types";
import { CallToActionButtons, QuickReplyButtons, Url } from "src/generated/messaging-service_pb";
import { ProfileImageUploadURL } from "src/generated/profile_pb";
import { useNavigate } from "react-router-dom";

const CreateTemplate = () => {
    const [quickReplyCount, setquickReplyCount] = useState([0]);
    const [responseOptions, setResponseOptions] = useState("none");
    const [actionsOptions, setActionsOptions] = useState("visitLink");
    const [mediaOptions, setMediaOptions] = useState("none");
    const [quickReplyButton, setQckReplyButton] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [templateName, setTemplateName] = useState("");
    const [templateId, setTemplateId] = useState("");
    const [businessAccountId, setBusinessAccountId] = useState("");
    const [headers, setHeaders] = useState("");
    const [headerParamsCount, setHeaderParamsCount] = useState(1);
    const [body, setBody] = useState("");
    const [bodyParamsCount, setBodyParamsCount] = useState(1);
    const [quickReply, setQuickReply] = useState(Array(quickReplyCount.length).fill(''));
    const [footer, setFooter] = useState("");
    const [isMedia, setIsMedia] = useState(false);
    const [mobileOrLink, setMobileOrLink] = useState("");
    const [buttonText, setButtonText] = useState("");
    const [mediaUrl, setMediaUrl] = useState("");
    const [fileName, setFileName] = useState("");

    const navigate = useNavigate();

    const getMediaType = (mediaType: string) => {
        switch (mediaType) {
            case "image":
                return 0;
            case "video":
                return 1;
            case "audio":
                return 2;
            default:
                return 0;
        }
    }

    async function getPresignedUrl(extension: string): Promise<ProfileImageUploadURL> {
        return new Promise((resolve, reject) => {
            clients.auth.profile.GetProfileImageUploadURL(extension, {}, (err, response) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(response);
                }
            });
        });
    }

    const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { type, files } = e.target;
        if (type === "file") {
            if (files) {
                const fileName = files[0].name.split('.').pop();
                if (fileName) {
                    try {
                        setUploading(true)
                        const preSignedUrl = await getPresignedUrl(fileName);
                        const response = await fetch(preSignedUrl.getUploadurl(), {
                            method: 'PUT',
                            body: files[0],
                            headers: {
                                'Content-Type': files[0].type,
                            },
                        });
                        if (!response.ok) {
                            throw new Error('Failed to upload file');
                        }
                        setMediaUrl(preSignedUrl.getMediaurl());
                        setFileName(files[0].name);
                        console.log('File uploaded successfully.');
                    } catch (error) {
                        console.error('An error occurred while uploading the file:', error);
                    } finally {
                        setUploading(false);
                    }

                }
            }
        }
    }

    const registerMessagingTemplate = async () => {
        const media = {
            mediaType: getMediaType(mediaOptions),
            link: mediaUrl,
            filename: fileName
        }

        let calltoActions: CallToActionButtons[] = [];
        let quickReplies: QuickReplyButtons[] = [];
        if (responseOptions === 'callToActions') {
            const actions = new CallToActionButtons();
            actions.setActiontype(actionsOptions === 'visitLink' ? 1 : 0);
            actions.setText(buttonText);
            if (actionsOptions === 'visitLink') {
                const url = new Url();
                url.setLink(mobileOrLink);
                actions.setUrl(url);
            }
            if (actionsOptions === 'callOnNumber') {
                actions.setPhonenumber(mobileOrLink);
            }
            calltoActions.push(actions);
        }

        if (quickReplyButton) {
            quickReply.forEach((value) => {
                const quickReply = new QuickReplyButtons();
                quickReply.setText(value);
                quickReplies.push(quickReply);
            });
        }

        const bodyParmas = new Map<string, string>();
        const headerParmas = new Map<string, string>();

        if(bodyParamsCount > 1) {
            for(let i = 1; i < bodyParamsCount; i++) {
                bodyParmas.set(`variable${i}`, `value ${i}`);
            }
        }

        if(headerParamsCount > 1) {
            for(let i = 1; i < headerParamsCount; i++) {
                headerParmas.set(`variable${i}`, `value ${i}`);
            }
        }

        const messaggeTemplate: IMessagingTemplate = {
            templateId: templateId,
            templateName: templateName,
            headerParameters: headerParmas.size > 1 ? headerParmas : undefined,
            bodyParameters: bodyParmas.size > 1 ? bodyParmas : undefined,
            mediaParameters: isMedia ? media : undefined,
            body: body,
            header: headers,
            footer: footer ? footer : undefined,
            category: 1,
            wabaId: businessAccountId,
            buttonType: 0,
            buttons: {
                callToActionButtons: responseOptions === 'callToActions' ? calltoActions : [],
                quickReplyButtons: quickReplyButton ? quickReplies : []
            }
        }

        console.log(messaggeTemplate);

        clients.messaging.messaging.RegisterMessagingTemplate(messaggeTemplate, {}, (err, response) => {
            if (err) {
                console.log(err);
            } else {
                navigate('/marketing/templates');
                console.log(response);
            }
        })

    }

    const handleSubmit = async () => {
        setUploading(true)
        await registerMessagingTemplate();
        setUploading(false)
    }

    const handleAddHeaderParams = () => {
        setHeaderParamsCount(headerParamsCount + 1);
        setHeaders((prevHeaders) => prevHeaders + `$(variable${headerParamsCount})`);
    }

    const handleAddBodyParams = () => {
        setBodyParamsCount(bodyParamsCount + 1);
        setBody((prevBody) => prevBody + `$(variable${bodyParamsCount})`);
    }

    const addquickReplyCount = () => {
        setquickReplyCount((prevquickReplyCount) => [...prevquickReplyCount, prevquickReplyCount.length]);
    };

    const removequickReplyCount = (index: number) => {
        setquickReplyCount((prevquickReplyCount) =>
            prevquickReplyCount.filter((_, i) => i !== index)
        );
    };

    useEffect(() => {
        const regex = /\$\(variable\d+\)/g;
        const match = body.match(regex);
        const count = match ? match.length + 1 : 1;
        setBodyParamsCount(count);
    }, [body]);

    useEffect(() => {
        const regex = /\$\(variable\d+\)/g;
        const match = headers.match(regex);
        const count = match ? match.length + 1 : 1;
        setHeaderParamsCount(count);
    }, [headers]);

    return (
        <>
            {uploading && (
                <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
                </div>
            )}
            <div className="mt-14">
                <div className="flex mb-6 items-center">
                <a href="/marketing/templates">
                        <img className="h-6 w-6" src={navArrowIcon} alt="" />
                    </a>
                    <h2 className="flex w-full justify-center text-w_text font-barlow font-regular text-2xl leading-7 tracking-[10px] m-3 ">
                        Create Template
                    </h2>
                </div>

                <div className=" bg-zinc-900 border border-gray-300 rounded px-4 py-4">
                    <div className="grid grid-cols-2 mt-4 px-6 gap-x-20">
                        <div className="flex flex-row items-center mb-6">
                            <label className="text-w_text text-lg" htmlFor="templateName">
                                Template Name :{" "}
                            </label>
                            <input
                                className="border mx-6 bg-zinc-800 p-2 h-8 w-[50%]"
                                onChange={(e) => setTemplateName(e.target.value)}
                                type="text"
                            />
                        </div>
                        <div className="flex flex-row items-center mb-6">
                            <label className="text-w_text text-lg" htmlFor="templateName">
                                Template ID :{" "}
                            </label>
                            <input
                                className="border mx-6 bg-zinc-800 p-2 h-8 w-[50%]"
                                onChange={(e) => setTemplateId(e.target.value)}
                                type="text"
                            />
                        </div>
                        <div className="flex flex-row items-center mb-6">
                            <label className="text-w_text text-lg" htmlFor="templateName">
                                Business Account ID :{" "}
                            </label>
                            <input
                                className="border mx-6 bg-zinc-800 p-2 h-8 w-[50%]"
                                onChange={(e) => setBusinessAccountId(e.target.value)}
                                type="text"
                            />
                        </div>

                        <br />
                        <div className="flex flex-col justify-center">
                            <p className=" text-lg">Header Type :</p>
                            <input
                                type="radio"
                                className="form-radio my-2 h-5 w-5 text-green-500 checked:active:bg-green-500"
                            />
                        </div>

                        <div className="flex flex-col max-h-full relative">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    checked={isMedia === true}
                                    onChange={() => setIsMedia(true)}
                                    className="form-radio mr-2 h-5 w-5 appearance-none rounded-full border-2 checked:border-primary checked:after:border-primary checked:after:bg-primary"
                                />
                                <p className=" text-lg">Media</p>
                            </div>

                            <div className="flex flex-row items-center">
                                <p className=" text-lg mr-4">Media Type :</p>
                                <div className="flex items-center mr-2 my-2">
                                    <input
                                        type="radio"
                                        disabled={!isMedia}
                                        checked={mediaOptions === "image"}
                                        onChange={() => setMediaOptions("image")}
                                        className="form-radio mr-2 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300  checked:bg-green-600"
                                    />
                                    <label htmlFor="none" className=" text-lg align-middle px-2">Image</label>
                                </div>
                                <div className="flex items-center mr-2">
                                    <input
                                        type="radio"
                                        disabled={!isMedia}
                                        checked={mediaOptions === "video"}
                                        onChange={() => setMediaOptions("video")}
                                        className="form-radio mr-2 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300  checked:bg-green-600"
                                    />
                                    <label htmlFor="none" className=" text-lg align-middle px-2">Video</label>
                                </div>
                                <div className="flex items-center mr-2">
                                    <input
                                        type="radio"
                                        disabled={!isMedia}
                                        checked={mediaOptions === "doc"}
                                        onChange={() => setMediaOptions("doc")}
                                        className="form-radio mr-2 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 checked:bg-green-600"
                                    />
                                    <label htmlFor="none" className=" text-lg align-middle px-2">Doc</label>
                                </div>
                            </div>

                            <div className="flex flex-row mt-2">
                                <p className=" text-lg mr-4">Upload FIles</p>
                                <input type="file"
                                    disabled={!isMedia}
                                    onChange={onUpload}
                                />
                            </div>
                        </div>

                        <div className="w-[90%]">
                            <div className="flex justify-between mb-2">
                                <p className=" text-lg">Text</p>
                                <div className="flex flex-row items-center gap-2">
                                    <button onClick={handleAddHeaderParams}>
                                        <svg
                                            className="h-6 w-6 text-green-500"
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
                                            <line x1="12" y1="5" x2="12" y2="19" />{" "}
                                            <line x1="5" y1="12" x2="19" y2="12" />
                                        </svg>
                                    </button>
                                    <p>Add Variable</p>
                                </div>
                            </div>
                            <div className="flex flex-col mb-6">
                                <textarea
                                    value={headers}
                                    onChange={(e) => setHeaders(e.target.value)}
                                    className="border text-base bg-zinc-800 py-2 h-26 px-2"
                                />
                            </div>
                        </div>
                        <br />
                        {/* /////////////////////// */}
                        <div className="w-[90%]">
                            <div className="flex justify-between mb-2">
                                <p className=" text-lg">Message Body:</p>
                                <div className="flex flex-row items-center gap-2">
                                    <button onClick={handleAddBodyParams}>
                                        <svg
                                            className="h-6 w-6 text-green-500"
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
                                            <line x1="12" y1="5" x2="12" y2="19" />{" "}
                                            <line x1="5" y1="12" x2="19" y2="12" />
                                        </svg>
                                    </button>
                                    <p>Add Variable</p>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <textarea
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                    className="border text-base bg-zinc-800 py-2 h-36 px-2"
                                />
                            </div>
                        </div>
                        {/* ////////////////////////////////////// */}
                        <br />
                        <div className="flex flex-col mt-2 w-[90%]">
                            <label className="text-w_text text-lg py-2" htmlFor="templateName">
                                Footer :{" "}
                            </label>
                            <textarea
                                id="footer"
                                onChange={(e) => setFooter(e.target.value)}
                                className="border text-base bg-zinc-800 py-2 h-18 px-2"
                            />
                        </div>
                        <br />
                        <div className="flex mt-4 flex-col">
                            <p className=" text-lg">Response :</p>
                            <div className="flex items-center mt-2">
                                <input
                                    type="radio"
                                    className="form-radio my-2 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 checked:bg-green-600"
                                    checked={responseOptions === "none"}
                                    onChange={() => setResponseOptions("none")}
                                />
                                <label htmlFor="none" className=" text-lg align-middle px-2">None</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio my-2 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 checked:bg-green-600"
                                    checked={responseOptions === "callToActions"}
                                    onChange={() => setResponseOptions("callToActions")}
                                />
                                <label htmlFor="none" className=" text-lg align-middle px-2">Call to Actions</label>
                            </div>
                            <div className={`${responseOptions === 'none' ? ' text-gray-500' : ''} flex flex-row mt-2`}>
                                <p className=" text-lg mr-4">Actions Type :</p>
                                <div className="flex items-center mr-4">
                                    <input
                                        type="radio"
                                        className="form-radio my-2 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 checked:bg-green-600"
                                        disabled={responseOptions === 'none'}
                                        checked={actionsOptions === 'visitLink'}
                                        onChange={() => setActionsOptions('visitLink')}
                                    />
                                    <label htmlFor="none" className=" text-lg align-middle px-2">Visit Link</label>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio my-2 h-5 w-5 appearance-none rounded-full border-2 checked:bg-green-600"
                                        disabled={responseOptions === 'none'}
                                        checked={actionsOptions === 'callOnNumber'}
                                        onChange={() => setActionsOptions('callOnNumber')}
                                    />
                                    <label htmlFor="none" className=" text-lg align-middle px-2">Call on Number</label>
                                </div>

                            </div>

                            <div className="mt-4 ">
                                <div className="flex flex-row items-center mb-6">
                                    <label className="text-w_text text-lg" htmlFor="templateName">
                                        {actionsOptions === 'visitLink' ? 'Link' : 'Mobile Number'} :{" "}
                                    </label>
                                    <input
                                        disabled={responseOptions === 'none'}
                                        onChange={(e) => setMobileOrLink(e.target.value)}
                                        className="border mx-6 bg-zinc-800 p-2 h-8 w-[60%]"
                                        type="text"
                                    />
                                </div>
                                <div className="flex flex-row items-center mb-6 ">
                                    <label className="text-w_text text-lg" htmlFor="templateName">
                                        Button Text :{" "}
                                    </label>
                                    <input
                                        disabled={responseOptions === 'none'}
                                        onChange={(e) => setButtonText(e.target.value)}
                                        className="border mx-6 bg-zinc-800 p-2 h-8  w-[60%]"
                                        type="text"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className=" flex flex-col justify-center">
                            <div className="flex flex-row justify-between w-[80%] mb-4">
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        onChange={() => setQckReplyButton(true)}
                                        className="form-radio h-5 w-5 appearance-none border-2 rounded-full checked:bg-green-600 "
                                    />

                                    <label htmlFor="none" className=" text-lg align-middle px-2">Quick Reply</label>
                                </div>

                                <div className="flex flex-row">
                                    <button onClick={addquickReplyCount}
                                        disabled={!quickReplyButton}
                                    >
                                        <svg
                                            className="h-6 w-6 text-green-500 mr-2"
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
                                            <line x1="12" y1="5" x2="12" y2="19" />{" "}
                                            <line x1="5" y1="12" x2="19" y2="12" />
                                        </svg>
                                    </button>
                                    <p className=" text-lg">Add Button</p>
                                </div>
                            </div>

                            {quickReplyCount.map((_, index) => (
                                <div
                                    key={index}
                                    className="flex flex-row items-center mb-4">
                                    <label className="text-w_text text-lg" htmlFor="templateName">
                                        Button Text :{" "}
                                    </label>
                                    <input
                                        disabled={!quickReplyButton}
                                        onChange={(e) => {
                                            const newBodyValues = [...quickReply];
                                            newBodyValues[index] = e.target.value;
                                            setQuickReply(newBodyValues);
                                        }}
                                        className="border mx-6 bg-zinc-800 p-2 h-8  w-[60%]"
                                        type="text"
                                    />
                                    <button
                                        onClick={() => removequickReplyCount(index)}
                                        className="flex justify-end mt-2"
                                        disabled={!quickReplyButton}
                                    >
                                        <svg
                                            className="h-6 w-6 text-red-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="flex">
                            <button className="p-2 bg-green-600 font-bold rounded-lg "
                                onClick={handleSubmit}
                            >Save Template</button>
                        </div>


                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateTemplate;
