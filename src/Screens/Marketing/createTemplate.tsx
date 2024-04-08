/* eslint-disable */
import React, { useState, useEffect } from "react";
import clients from "src/clients";
import { IMessagePreview, IMessagingTemplate } from "src/types";
import { CallToActionButtons, Category, MediaUploadRequest, MediaUploadUrl, QuickReplyButtons, Url } from "src/generated/messaging-service_pb";
import { readAndCompressImage } from 'browser-image-resizer';
import { DownOutlined, LeftOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Dropdown, Flex, Radio, Row, Typography } from "antd";
import type { MenuProps } from 'antd';
import MessageComponent from "./components/messagePreview";
import { useNavigate } from "react-router-dom";
import { set } from "date-fns";

const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Typography.Text style={{fontSize: "1.20rem"}}>Text</Typography.Text>
      )
    },
    {
      key: '2',
      label: (
        <Typography.Text style={{fontSize: "1.20rem"}}>Media</Typography.Text>
      )
    }
]

const buttonItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Typography.Text style={{fontSize: "1.20rem"}}>None</Typography.Text>
      )
    },
    {
      key: '2',
      label: (
        <Typography.Text style={{fontSize: "1.20rem"}}>CallToAction</Typography.Text>
      )
    },
    {
        key: '3',
        label: (
            <Typography.Text style={{fontSize: "1.20rem"}}>QuickReply</Typography.Text>
          )
    }
]

const categoryItems: MenuProps['items'] = [
    {
      key: 'AUTHENTICATION',
      label: (
        <Typography.Text style={{fontSize: "1.20rem"}}>Authentication</Typography.Text>
      )
    },
    {
      key: 'MARKETING',
      label: (
        <Typography.Text style={{fontSize: "1.20rem"}}>Marketing</Typography.Text>
      )
    },
    {
        key: 'UTILITY',
        label: (
            <Typography.Text style={{fontSize: "1.20rem"}}>Utility</Typography.Text>
          )
    }
]

const CreateTemplate = () => {
    
    // States
    const [templateName, setTemplateName] = useState("");
    const [templateId, setTemplateId] = useState("");
    const [category, setCategory] = useState("");
    const [businessAccountId, setBusinessAccountId] = useState("");

    // Header states
    const [headerType, setHeaderType] = useState("Text");
    const [headerText, setHeaderText] = useState("");
    const [headerParamsCount, setHeaderParamsCount] = useState(1);
    const [mediaOptions, setMediaOptions] = useState("image");
    const [mediaUrl, setMediaUrl] = useState("");
    const [fileName, setFileName] = useState("");
    
    // body and footer states
    const [body, setBody] = useState("");
    const [bodyParamsCount, setBodyParamsCount] = useState(1);
    const [footer, setFooter] = useState("");

    // buttons
    const [buttonType, setButtonType] = useState("None");
    const [quickReply, setQuickReply] = useState([""]);
    const [actionButtonType, setActionButtonType] = useState(0)
    const [callPhoneButtonContent, setCallPhoneButtonContent] = useState<[string, string][]>([["", ""]])
    const [visitWebsiteButtonContent, setVisitWebsiteButtonContent] = useState<[string, string][]>([["", ""]])

    const [uploading, setUploading] = useState(false);
    const [messagePreview, setMessagePreview] = useState<IMessagePreview>({} as IMessagePreview);

    const navigate = useNavigate()

    const getMediaType = (mediaType: string) => {
        switch (mediaType) {
            case "image":
                return 0;
            case "document":
                return 1;
            case "video":
                return 2;
            default:
                return 0;
        }
    }

    const getCategoryType = (categoryType: string) => {
        switch (categoryType) {
            case "AUTHENTICATION":
                return 0;
            case "MARKETING":
                return 1;
            case "UTILITY":
                return 2;
            default:
                return 0;
        }
    }

    const getButtonType = (buttonType: string) => {
        switch (buttonType) {
            case "None":
                return 0;
            case "CallToAction":
                return 1;
            case "QuickReply":
                return 2;
            default:
                return 0;
        }
    }

    // Media Upload function
    async function getPresignedUrl(extension: string): Promise<MediaUploadUrl> { 

        const mediaUploadRequest = new MediaUploadRequest();
        mediaUploadRequest.setMediaextension(extension);

        return new Promise((resolve, reject) => {

            clients.messaging.messaging.GetMessageMediaUploadurl(mediaUploadRequest, {}, (err, response) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(response);
                }
            });
        });
    }

    const handleMedia = async (file: any, type: string, filename: string) => {
        setUploading(true)
        const preSignedUrl = await getPresignedUrl(type.split('/')[1]);
        
        const response = await fetch(preSignedUrl.getUploadurl(), {
            method: 'PUT',
            body: file,
            headers: {
                'Content-Type': type,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to upload file');
        }
        setMediaUrl(preSignedUrl.getMediaurl());
        setFileName(filename);
        
        // Set media parameters in message preview
        setMessagePreview(messagePreview => ({
            ...messagePreview,
            mediaParameters: {
                mediaType: getMediaType(mediaOptions),
                link: preSignedUrl.getMediaurl(),
                filename: filename
            }
        }));
    }

    const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { type, files } = e.target;
        if (type === "file") {
            if (files) {
                const isJpeg = files[0].type === 'image/jpeg';
                if (isJpeg) {
                    try {
                        const compressedFile = await readAndCompressImage(files[0], {
                            mimeType: 'image/png',
                        });
                        await handleMedia(compressedFile, 'image/png', files[0].name)
                    } catch (error) {
                        console.error('Error compressing image:', error);
                    } finally {
                        setUploading(false);
                    }
                } else {
                    const fileName = files[0].name.split('.').pop();
                    if (fileName) {
                        try {
                            await handleMedia(files[0], files[0].type, files[0].name)
                        } catch (error) {
                            console.error('An error occurred while uploading the file:', error);
                        } finally {
                            setUploading(false);
                        }
                    }
                }
            }
        }
    }

    // Template Registration function
    const registerMessagingTemplate = async () => {

        const template: IMessagingTemplate = {} as IMessagingTemplate

        template.templateName = templateName;
        template.templateId = templateId;
        template.category = getCategoryType(category)
        template.wabaId = businessAccountId

        // Set the header info
        if (headerType == "Text"){
            template.header = headerText;
        }else if (headerType === "Media") {
            template.mediaParameters = {
                mediaType: getMediaType(mediaOptions),
                link: mediaUrl,
                filename: fileName
            }
        }

        // body and footer
        template.body = body;
        template.footer = footer;

        // Body parameters
        const bodyParams = new Map<string, string>();
        if (bodyParamsCount > 1) {
            const regex = /\$\((.*?)\)/g;
            let match;
            while ((match = regex.exec(body)) !== null) {
                bodyParams.set(match[1], match[1] + "_value")
            }
        }
        template.bodyParameters = bodyParams;
        
        // Header parameters
        const headerParams = new Map<string, string>();
        if (headerParamsCount > 1) {
            const regex = /\$\((.*?)\)/g;
            let match;
            while ((match = regex.exec(headerText)) !== null) {
                headerParams.set(match[1], match[1] + "_value")
            }
        }
        template.headerParameters = headerParams;

        // Buttons
        template.buttonType = getButtonType(buttonType);

        let calltoActions: CallToActionButtons[] = [];
        let quickReplies: QuickReplyButtons[] = [];
        if (buttonType == "CallToAction") {
            if (actionButtonType == 0) {
                callPhoneButtonContent.forEach((value) => {
                    const callToAction = new CallToActionButtons;
                    callToAction.setPhonenumber(value[1]);
                    callToAction.setText(value[0])
                    calltoActions.push(callToAction)
                })
            } else if (actionButtonType == 1) { // actionType 1 means visitWebsite
                visitWebsiteButtonContent.forEach((value) => {
                    const visitWebsite = new CallToActionButtons;
                    const url = new Url
                    url.setUrltype(0) // 0 means static
                    url.setLink(value[1])
                    visitWebsite.setText(value[0])
                    visitWebsite.setUrl(url)


                    calltoActions.push(visitWebsite)
                })
            }
            
        } else if (buttonType == "QuickReply") {
            quickReply.forEach((value) => {
                const quickReply = new QuickReplyButtons();
                quickReply.setText(value);
                quickReplies.push(quickReply);
            });
            
        }
        template.buttons = {
            callToActionButtons: calltoActions,
            quickReplyButtons: quickReplies
        }

        clients.messaging.messaging.RegisterMessagingTemplate(template, {}, (err, _) => {
            if (err) {
                console.error(err);
            } else {
                navigate('/marketing/templates');
            }
        })

    }

    const handleSubmit = async () => {
        setUploading(true)
        await registerMessagingTemplate();
        setUploading(false)
    }

    // Change handling functions
    const changeHeaderType: MenuProps['onClick'] = (e) => {
        switch(e.key) {
            case '1':
                setHeaderType("Text");
                setMediaOptions("image");
                setMediaUrl("");
                break;
            case '2':
                setHeaderType("Media");
                setHeaderText("");
                break;
            default:
                setHeaderType("Text");
        } 
    }

    const changeButtonType: MenuProps['onClick'] = (e) => {
        switch (e.key) {
            case '1':
                setButtonType("None");
                setCallPhoneButtonContent([["", ""]]);
                setVisitWebsiteButtonContent([["", ""]]);
                setActionButtonType(0);
                setQuickReply([""]);
                break;
            case '2':
                setButtonType("CallToAction");
                setCallPhoneButtonContent([["", ""]]);
                setVisitWebsiteButtonContent([["", ""]]);
                setActionButtonType(0);
                setQuickReply([""]);
                break;
            case '3':
                setButtonType("QuickReply");
                setCallPhoneButtonContent([["", ""]]);
                setVisitWebsiteButtonContent([["", ""]]);
                setActionButtonType(0);
                setQuickReply([""]);
                break;
            default:
                break;
        }
    }

    const handleAddHeaderParams = () => {
        setHeaderParamsCount(headerParamsCount + 1);
        setHeaderText((prevHeaders) => prevHeaders + `$(variable${headerParamsCount})`);
    }

    const handleAddBodyParams = () => {
        setBodyParamsCount(bodyParamsCount + 1);
        setBody((prevBody) => prevBody + `$(variable${bodyParamsCount})`);
    }

    const handleFooterChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFooter(e.target.value);
        setMessagePreview(messagePreview => ({
            ...messagePreview,
            footer: e.target.value
        
        }));
    }

    // hooks to update message preview and count of parameters
    useEffect(() => {
        const regex = /\$\([^)]+\)/g;
        const match = body.match(regex);
        const count = match ? match.length + 1 : 1;
        setBodyParamsCount(count);

        setMessagePreview(messagePreview => ({
            ...messagePreview,
            body: body
        
        }));
        
    }, [body]);

    useEffect(() => {
        const regex = /\$\([^)]+\)/g;
        const match = headerText.match(regex);
        const count = match ? match.length + 1 : 1;
        setHeaderParamsCount(count);

        setMessagePreview(messagePreview => ({
            ...messagePreview,
            header: headerText
        
        }));
    }, [headerText]);

    useEffect(() => {
        const callPhoneButtons: CallToActionButtons[] = [];

        callPhoneButtonContent.forEach((value) => {
            const callToAction = new CallToActionButtons;
            callToAction.setActiontype(0) // 0 means call phone
            callToAction.setPhonenumber(value[1]);
            callToAction.setText(value[0])
            callPhoneButtons.push(callToAction)
        })

        setMessagePreview(messagePreview => ({
            ...messagePreview,
            Buttons: {
                callToActionButtons: callPhoneButtons,
                quickReplyButtons: []
            }
        }));
        
    }, [callPhoneButtonContent]);

    useEffect(() => {
        const visitWebsiteButtons: CallToActionButtons[] = [];

        visitWebsiteButtonContent.forEach((value) => {
            const visitWebsite = new CallToActionButtons;
            const url = new Url
            url.setUrltype(0) // 0 means static
            url.setLink(value[1])
            visitWebsite.setActiontype(1) // 1 means visit website
            visitWebsite.setText(value[0])
            visitWebsite.setUrl(url)

            visitWebsiteButtons.push(visitWebsite)
        })

        setMessagePreview(messagePreview => ({
            ...messagePreview,
            Buttons: {
                callToActionButtons: visitWebsiteButtons,
                quickReplyButtons: []
            }
        }));
        
    }, [visitWebsiteButtonContent]);

    useEffect(() => {
        const quickReplies: QuickReplyButtons[] = [];

        quickReply.forEach((value) => {
            const quickReply = new QuickReplyButtons();
            quickReply.setText(value);
            quickReplies.push(quickReply);
        });

        setMessagePreview(messagePreview => ({
            ...messagePreview,
            Buttons: {
                callToActionButtons: [],
                quickReplyButtons: quickReplies
            }
        }));
        
    }, [quickReply]);

    return (
        <div className="mt-10">
            {/* Uploading animation */}
            {uploading && (
                <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
                </div>
            )}

            {/* Heading */}
            <div className="flex mb-6 items-center">
                <a href="/marketing/templates">
                <LeftOutlined style={{ fontSize: '30px', color: '#34C06E' }} />
                </a>
                <h2 className="flex w-full justify-center text-w_text font-barlow font-regular text-2xl leading-7 tracking-[10px] m-3 ">
                    Create Template
                </h2>
            </div>

            {/* Main Form for template Registration */}

            <Row style={{ backgroundColor: 'rgb(24 24 27)', border: '1px solid #CBD5E0', borderRadius: '0.25rem', padding: '2.5rem' }}>
                {/* Column for form */}
                <Col span={13}>
                    <Row gutter = { [16, 16] }>

                        {/* Template Name */}
                        <Col span={24}>
                            <label className="text-w_text text-lg" htmlFor="templateName">
                                Template Name :{" "}
                            </label>
                            <input
                                className="border mx-6 bg-zinc-800 p-2 h-8 w-[50%]"
                                onChange={(e) => setTemplateName(e.target.value)}
                                type="text"
                            />
                        </Col>

                        {/* Template Id */}
                        <Col span={24} >
                            <Flex align="center">
                                <label className="text-w_text text-lg" htmlFor="templateName">
                                    Template ID :{" "}
                                </label>
                                <input
                                    className="border mx-6 bg-zinc-800 p-2 h-8 w-[50%]"
                                    onChange={(e) => setTemplateId(e.target.value)}
                                    type="text"
                                />
                            </Flex>
                        </Col>

                        {/* TemplateType */}
                        <Col span={24}>
                            <Flex align="center">
                                <label className="text-w_text text-lg mr-4" htmlFor="templateName">
                                    Template Category :{"  "}
                                </label>
                                <Dropdown menu={{ items: categoryItems,onClick: (e) => {setCategory(e.key)} }} placement="bottomLeft" arrow>
                                    <Button style={{width: "200px", height: "35px"}}>
                                        <Flex align="center" justify="space-between">
                                            <Typography.Text style={{ fontSize: '1.15rem' }}>{category}</Typography.Text>
                                            <DownOutlined />
                                        </Flex>
                                    </Button>
                                </Dropdown>
                            </Flex>
                        </Col>

                        {/* Whatsapp Business account ID */}
                        <Col span={24}>
                            <label className="text-w_text text-lg" htmlFor="templateName">
                                Business Account ID :{" "}
                            </label>
                            <input
                                className="border mx-6 bg-zinc-800 p-2 h-8 w-[50%]"
                                onChange={(e) => setBusinessAccountId(e.target.value)}
                                type="text"
                            />
                        </Col>

                        {/* Header  */}
                        <Col span={24}>
                            <Flex align="center">
                                <label className="text-w_text text-lg mr-4" htmlFor="templateName">
                                    Header Type :{"  "}
                                </label>
                                <Dropdown menu={{ items,onClick: changeHeaderType }} placement="bottomLeft" arrow>
                                    <Button style={{width: "120px", height: "35px"}}>
                                        <Flex align="center" justify="space-between">
                                            <Typography.Text style={{ fontSize: '1.15rem' }}>{headerType}</Typography.Text>
                                            <DownOutlined />
                                        </Flex>
                                    </Button>
                                </Dropdown>
                            </Flex>
                        </Col>

                        {/* Text Header, display if headerType equals Text */}
                        {
                            headerType == "Text" &&
                            <Col span={24}>
                                <div className="flex justify-between mb-2">
                                    <p className=" text-lg">Header Text</p>
                                    <div className="flex flex-row items-center gap-2">
                                        <button onClick={handleAddHeaderParams}>
                                            <PlusOutlined style={{ fontSize: '20px', color: '#34C06E' }}/>
                                        </button>
                                        <p>Add Variable</p>
                                    </div>
                                </div>
                                <div className="flex flex-col mb-6">
                                    <textarea
                                        value={headerText}
                                        onChange={(e) => setHeaderText(e.target.value)}
                                        className="border text-base bg-zinc-800 py-2 h-26 px-2"
                                    />
                                </div>
                            </Col>
                        }

                        {/* Media header, display if headerType equals Media. Handles media upload */}
                        {
                            headerType == "Media" &&
                            <Col span={24}>
                                <div className="flex flex-row items-center">
                                    <p className=" text-lg mr-4">Media Type :</p>
                                    <div className="flex items-center mr-2 my-2">
                                        <input
                                            type="radio"
                                            checked={mediaOptions === "image"}
                                            onChange={() => setMediaOptions("image")}
                                            className="form-radio mr-2 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300  checked:bg-green-600"
                                        />
                                        <label htmlFor="none" className=" text-lg align-middle px-2">Image</label>
                                    </div>
                                    <div className="flex items-center mr-2">
                                        <input
                                            type="radio"
                                            checked={mediaOptions === "video"}
                                            onChange={() => setMediaOptions("video")}
                                            className="form-radio mr-2 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300  checked:bg-green-600"
                                        />
                                        <label htmlFor="none" className=" text-lg align-middle px-2">Video</label>
                                    </div>
                                    <div className="flex items-center mr-2">
                                        <input
                                            type="radio"
                                            checked={mediaOptions === "document"}
                                            onChange={() => setMediaOptions("document")}
                                            className="form-radio mr-2 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 checked:bg-green-600"
                                        />
                                        <label htmlFor="none" className=" text-lg align-middle px-2">Doc</label>
                                    </div>
                                </div>

                                <div className="flex flex-row mt-2">
                                    <p className=" text-lg mr-4">Upload FIles</p>
                                    <input type="file"
                                        onChange={onUpload}
                                    />
                                </div>
                            </Col>
                        }

                        {/* Message Body */}
                        <Col span={24}>
                            <div className="flex justify-between mb-2">
                                <p className=" text-lg">Message Body:</p>
                                <div className="flex flex-row items-center gap-2">
                                    <button onClick={handleAddBodyParams}>
                                    <PlusOutlined style={{ fontSize: '20px', color: '#34C06E' }}/>
                                    </button>
                                    <p>Add Variable</p>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <textarea
                                    value={body}
                                    onChange={(e) => {setBody(e.target.value)}}
                                    className="border text-base bg-zinc-800 py-2 h-36 px-2"
                                />
                            </div>
                        </Col>

                        {/* Message Footer */}
                        <Col span={24}>
                            <label className="text-w_text text-lg py-2" htmlFor="templateName">
                                Footer :{" "}
                            </label>
                        </Col>
                        <Col span={24}>
                            <textarea
                                id="footer"
                                onChange={(e) => {handleFooterChange(e)}}
                                className="border text-base bg-zinc-800 py-2 h-18 px-2 w-full"
                            />
                        </Col>

                        {/* Button section */}
                        <Col span={24}>
                            <Flex align="center">
                            <label className=" text-lg mr-4">Buttons (Optional) :</label>
                            <Dropdown menu={{ items: buttonItems,onClick: changeButtonType }} placement="bottomLeft" arrow>
                                <Button 
                                style={{width: "170px", height: "35px"}}
                                >
                                    <Flex align="center" justify="space-between">
                                        <Typography.Text style={{ fontSize: '1.15rem' }}>{buttonType}</Typography.Text>
                                        <DownOutlined />
                                    </Flex>
                                </Button>
                            </Dropdown>
                            </Flex>
                        </Col>

                        {/* CallToAction buttons */}
                        {
                            buttonType == "CallToAction" &&
                            <Col span={24}>
                                <Flex justify="space-between" align="flex-end">
                                    <Typography.Text style={{fontSize: "1.20rem"}}>
                                        CallToAction Button
                                    </Typography.Text>
                                    <Button size="large" type="text"
                                        onClick={(e) => {
                                        const newBodyValues = actionButtonType === 0 ? [...callPhoneButtonContent] : [...visitWebsiteButtonContent];
                                        newBodyValues.push(["",""]);
                                        actionButtonType === 0 ? setCallPhoneButtonContent(newBodyValues): setVisitWebsiteButtonContent(newBodyValues);
                                    }}
                                    >
                                        <Flex align="center" justify="space-between">
                                            <PlusOutlined style={{ fontSize: '1.20rem', color: '#34C06E' }}/>
                                            Add Button
                                        </Flex>
                                    </Button>
                                </Flex>
                                <Divider/>
                                <Radio.Group  onChange={(e) => {setActionButtonType(e.target.value)}} value={actionButtonType}>
                                    <Radio style={{fontSize: "1.20rem"}} value={0}>Call Phone Number</Radio>
                                    <Radio style={{fontSize: "1.20rem"}} value={1}>Visit Website</Radio>
                                </Radio.Group>

                                {
                                    actionButtonType == 0 &&
                                    <Col span={24} style={{marginTop: "20px"}}>
                                        {
                                            
                                            callPhoneButtonContent.map( (value,  index) => (
                                                <Row gutter={[0, 0]}  key = {index} style={{marginTop: "15px"}}>
                                                    <Col span={12}>
                                                        <label className="text-w_text text-lg">
                                                            Button Text :{" "}
                                                        </label>
                                                        <input
                                                            className="border bg-zinc-800 p-2 h-8 w-[50%]"
                                                            onChange={(e) => {
                                                                const newBodyValues = [...callPhoneButtonContent];
                                                                const temp = newBodyValues[index]
                                                                newBodyValues[index] = [e.target.value, temp[1]];
                                                                setCallPhoneButtonContent(newBodyValues);
                                                            }}
                                                            type="text"
                                                            value={value[0]}
                                                        />
                                                    </Col>
                                                    <Col span={11}>
                                                        <label className="text-w_text text-lg" >
                                                            Phone Number :{" "}
                                                        </label>
                                                        <input
                                                            className="border bg-zinc-800 p-2 h-8 w-[50%]"
                                                            onChange={(e) => {
                                                                const newBodyValues = [...callPhoneButtonContent];
                                                                const temp = newBodyValues[index]
                                                                newBodyValues[index] = [temp[0], e.target.value];
                                                                
                                                                setCallPhoneButtonContent(newBodyValues);
                                                            }}
                                                            type="text"
                                                            value={value[1]}
                                                        />
                                                        
                                                    </Col>
                                                    <Col span={1}>
                                                        <button
                                                            className="flex justify-end mt-2"
                                                        >
                                                            <MinusCircleOutlined style={{color: "red"}}
                                                            onClick={() => {
                                                                const l = callPhoneButtonContent.filter((_, i) => i !== index)
                                                                setCallPhoneButtonContent(l);
                                                            }}/>
                                                        </button>
                                                    </Col>
                                                    
                                                </Row>
                                                )
                                            )
                                        }
                                    </Col>
                                }
                                {
                                    actionButtonType == 1 &&
                                    <Col span={24} style={{marginTop: "20px"}}>
                                        {
                                            
                                            visitWebsiteButtonContent.map( (value,  index) => (
                                                <Row gutter={[0, 0]}  key = {index} style={{marginTop: "15px"}}>
                                                    <Col span={12}>
                                                        <label className="text-w_text text-lg">
                                                            Button Text :{" "}
                                                        </label>
                                                        <input
                                                            className="border bg-zinc-800 p-2 h-8 w-[50%]"
                                                            onChange={(e) => {
                                                                const newBodyValues = [...visitWebsiteButtonContent];
                                                                const temp = newBodyValues[index]
                                                                newBodyValues[index] = [e.target.value, temp[1]];
                                                                setVisitWebsiteButtonContent(newBodyValues);
                                                            }}
                                                            type="text"
                                                            value={value[0]}
                                                        />
                                                    </Col>
                                                    <Col span={11}>
                                                        <label className="text-w_text text-lg" >
                                                            Url:{" "}
                                                        </label>
                                                        <input
                                                            className="border bg-zinc-800 p-2 h-8 w-[50%]"
                                                            onChange={(e) => {
                                                                const newBodyValues = [...visitWebsiteButtonContent];
                                                                const temp = newBodyValues[index]
                                                                newBodyValues[index] = [temp[0], e.target.value];
                                                                
                                                                setVisitWebsiteButtonContent(newBodyValues);
                                                            }}
                                                            type="text"
                                                            value={value[1]}
                                                        />
                                                        
                                                    </Col>
                                                    <Col span={1}>
                                                        <button
                                                            className="flex justify-end mt-2"
                                                        >
                                                            <MinusCircleOutlined style={{color: "red"}}
                                                            onClick={() => {
                                                                const l = visitWebsiteButtonContent.filter((_, i) => i !== index)
                                                                setVisitWebsiteButtonContent(l);
                                                            }}/>
                                                        </button>
                                                    </Col>
                                                    
                                                </Row>
                                                )
                                            )
                                        }
                                    </Col>
                                }
                                    
                            </Col>
                        }

                        {/* QuickReply Buttons */}
                        {
                            buttonType == "QuickReply" &&
                            <Col span={24}>

                                <Flex justify="space-between">
                                    <Typography.Text style={{fontSize: "1.20rem"}}>
                                        QuickReplyButtons
                                    </Typography.Text>
                                    <Button onClick={() => {
                                        const newQuickReply = [...quickReply];
                                        newQuickReply.push("");
                                        
                                        setQuickReply(newQuickReply);
                                    }}
                                    >
                                    <PlusOutlined style={{ fontSize: '20px', color: '#34C06E' }}/>
                                    Add Button
                                    </Button>
                                </Flex>
                                <Divider/>

                                {
                                quickReply.map((val, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-row items-center mb-4">
                                        <label className="text-w_text text-lg" htmlFor="templateName">
                                            Button Text :{" "}
                                        </label>
                                        <input
                                            onChange={(e) => {
                                                const newBodyValues = [...quickReply];
                                                newBodyValues[index] = e.target.value;
                                                setQuickReply(newBodyValues);
                                                
                                            }}
                                            className="border mx-6 bg-zinc-800 p-2 h-8  w-[60%]"
                                            type="text"
                                            value={val}
                                        />
                                        <button
                                            onClick={() => {
                                                const newQuickReply = quickReply.filter((_, i) => i !== index)
                                                setQuickReply( newQuickReply)
                                            }}
                                            className="flex justify-end mt-2"
                                        >
                                            <MinusCircleOutlined style={{color: "red"}}/>
                                        </button>
                                    </div>
                                ))}
                            </Col>
                        }

                        {/* Submit */}
                        <Col span={24}>
                            <button className="p-2 bg-green-600 font-bold rounded-lg "
                                onClick={handleSubmit}
                            >Save Template</button>
                        </Col>
                        </Row>
                </Col>
                <Col span={1}></Col>
                <Col span={10}>
                    <MessageComponent message={messagePreview} />
                </Col>
            </Row>   
        </div>
    );
};

export default CreateTemplate;
