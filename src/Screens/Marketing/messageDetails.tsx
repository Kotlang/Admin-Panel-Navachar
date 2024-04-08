/* eslint-disable */

import React, { useEffect, useState } from "react";
import {
    IdRequest,
    MediaType,
    MessagingTemplate,
    Reply,
} from "src/generated/messaging-service_pb";
import clients from "src/clients";
import { IFetchTemplateRequest, IMessage, IMessagePreview, TableParams } from "src/types";
import { Button, Col, Divider, Flex, Row, Table, TableProps, Typography, } from "antd";
import { LeftOutlined} from "@ant-design/icons";
import MessageComponent from "./components/messagePreview";
import { useParams } from "react-router-dom";
import { getCurrentUnixTimestamp, getDateAndTimeFromUnixTimestamp } from "./utils";


interface tableData {
	userName: string;
	phoneNo: string;
    recieved: boolean;
    read: boolean;
    response: Reply | undefined;
}

const MessageDetails = () => {

    const [template, setTemplate] = useState<MessagingTemplate>();
    const [messagePreview, setMessagePreview] = useState<IMessagePreview>();
    const [message, setMessage] = useState<IMessage>();
    const [loading, setLoading] = useState<boolean>(true);
    const [tableParams, setTableParams] = useState<TableParams>({
		pagination: {
			current: 1,
			pageSize: 5
		}
	});
    const [messageTableData, setMessageTableData] = useState<tableData[]>([]);

    const { messageId } = useParams();

    async function fetchMessageData(id: string) {
        // Fetch data from API

        const idRequest = new IdRequest();
        idRequest.setId(id);

        clients.messaging.messaging.FetchMessageById(idRequest, {} , (err, res) => {
            if (err) {
                console.log(err);
            } else {
                const message: IMessage = {
                    messageId: res.getMessageid(),
                    templateId : res.getTemplateid(),
                    sender: res.getSender(),
                    recipients: res.getRecipientsList(),
                    recievedBy: res.getRecievedbyList(),
                    readBy: res.getReadbyList(),
                    responses: res.getResponsesMap(),
                    failedRecipients: res.getFailedrecipientsList(),
                    createdOn: res.getCreatedon(),
                    scheduleInfo: res.getScheduleinfo(),
                    headerParameters: res.getHeaderparametersMap(),
                    bodyParameters: res.getBodyparametersMap(),
                    buttons: res.getButtonsMap(),
                    transactionId: res.getTransactionid(),
                    status: getCurrentUnixTimestamp() < (res.getScheduleinfo()?.getScheduledtime() || 0) ? "Scheduled" : "Completed"
                };
                setMessage(message);
            }
        });
    }

    // Table columns for leads
	const allColumns: TableProps<tableData>['columns'] = [
		{
			dataIndex: 'userName',
			key: 'userName',
			title: 'NAME'
		},
		{
			dataIndex: 'phoneNo',
			key: 'phoneNo',
			title: 'PHONE NO.'
		},
        {
            dataIndex: 'recieved',
            key: 'recieved',
            title: 'RECIEVED',
            render: (text, record) => {
                return (
                    <Typography.Text style={{ color: record.recieved ? 'green' : 'red', fontSize : '1.15rem' }}>
                        {record.recieved ? 'Yes' : 'No'}
                    </Typography.Text>
                );
            }
        },
        {
            dataIndex: 'read',
            key: 'read',
            title: 'READ',
            render: (text, record) => {
                return (
                    <Typography.Text style={{ color: record.read ? 'green' : 'red', fontSize : '1.15rem' }}>
                        {record.read ? 'Yes' : 'No'}
                    </Typography.Text>
                );
            }
        },
        {
            dataIndex: 'response',
            key: 'response',
            title: 'RESPONSE',
            render: (text, record) => {
                return (
                    <Flex style={{ flexDirection : 'column'}}>
                        {
                            record.response?.getRepliesList().map((reply, index) => {
                                return (
                                    <Typography.Text key={index} style={{ fontSize : '1.15rem' }}>
                                        {reply}
                                    </Typography.Text>
                                );
                            })
                        }
                    </Flex>
                );
            }
        }
	];

    useEffect(() => {

        if (messageId){
            fetchMessageData(messageId);
        }else {
            setLoading(false);
            console.error("Message Id not found");
        }
    }, [messageId]);

    // Fetch template 
    async function fetchTemlateDetails(
        templateId: string
    ): Promise<MessagingTemplate> {
        return new Promise((resolve, reject) => {
            const fetchTemplateRequest: IFetchTemplateRequest = {
                templateId: templateId,
            };
            clients.messaging.messaging.FetchTemplates(
                fetchTemplateRequest,
                {},
                (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res.getTemplatesList()[0]);
                    }
                }
            );
        });
    }

	useEffect(() => {
		if (message?.templateId) {
            
			fetchTemlateDetails(message.templateId).then((res) => {
				setTemplate(res);
			});
		}
        if (message?.recipients) {
            const data: tableData[] = message.recipients.map((item) => {
                return {
                        userName: "userName",
                        phoneNo: item,
                        recieved: message.recievedBy.includes(item),
                        read: message.readBy.includes(item),
                        response: message.responses.get(item)
                    }
                });
            setMessageTableData(data);
        }

	}, [message]);

    useEffect(() => {
        if (template) {
            const messagePreview: IMessagePreview = {
                mediaParameters: {
                    mediaType: template.getMediaparameters()?.getMediatype() || MediaType.IMAGE,
                    link: template.getMediaparameters()?.getLink() || "",
                    filename: template.getMediaparameters()?.getFilename() || "",
                
                },
                headerParameters: template.getHeaderparametersMap().arr_,
                bodyParameters: template.getBodyparametersMap().arr_,
                header: template.getHeader(),
                body: template.getBody(),
                footer: template.getFooter(),
                Buttons: {
                    callToActionButtons: template.getButtons()?.getCalltoactionbuttonsList() || [],
                    quickReplyButtons: template.getButtons()?.getQuickreplybuttonsList() || [],
                },
            };
            setMessagePreview(messagePreview);
        }
    }, [template])

    return (
        <>
            <Row style={{ marginTop : "80px", marginBottom : "20px"}}>
                <Col span={24}>
                    <Flex>
                        <a href="/marketing/campaigns">
                            <LeftOutlined style={{ fontSize: '30px', color: '#34C06E' }} />
                        </a>
                        <h2 className="flex w-full justify-center font-barlow font-regular text-2xl leading-7 tracking-[10px]">
                            Message Details
                        </h2>
                    </Flex>
                </Col>
            </Row>

            <Row style={{   
                backgroundColor: 'rgb(24 24 27)',
                border: '1px solid #d9d9d9',
                borderRadius: '4px',
                padding: '16px' }}>
                <Col md = {12} >
                    <Flex style={{ flexDirection : 'column', gap : '15px'}}>
                        <Typography.Text  style={{ fontSize : '1.2rem'}} >
                            Campaign Name : 
                        </Typography.Text>
                        <Typography.Text style={{ fontSize : '1.2rem'}}>
                            Status : {message?.status}
                        </Typography.Text>
                        <Typography.Text style={{ fontSize : '1.2rem'}}>
                            Sent To : {message?.recipients.length}
                        </Typography.Text>
                        <Typography.Text style={{ fontSize : '1.2rem'}}>
                            Recieved By : {message?.recievedBy.length}
                        </Typography.Text>
                        <Typography.Text style={{ fontSize : '1.2rem'}}>
                            Read By : {message?.readBy.length}
                        </Typography.Text>
                        <Flex style={{ flexDirection : 'row', gap : '10px' }} >
                            <Button type = 'primary' href="">
                                LAUNCH MESSAGE
                            </Button>
                            <Button type = 'primary' href="">
                                RESHEDULE MESSAGE
                            </Button>
                        </Flex>
                        <Typography.Text style={{ fontSize : '1.2rem'}}>
                            Scheduled Date: {message?.scheduleInfo?.getScheduledtime() ? getDateAndTimeFromUnixTimestamp(message?.scheduleInfo.getScheduledtime()) : getDateAndTimeFromUnixTimestamp(message?.createdOn || 0)}
                        </Typography.Text>
                    </Flex>
                </Col>
                
                <Col md = {12}>
                    < MessageComponent message={messagePreview}/>
                </Col>
                <Divider />

                <Col span={24}>
						<Table
							columns={allColumns}
							rowKey={(record) => record.phoneNo}
							dataSource={messageTableData}
							pagination={tableParams.pagination}
							onChange={(Pagination) => {
								setTableParams({ pagination: Pagination });
							}
							}
						/>
					</Col>
            </Row>
        </>
    );
};



export default MessageDetails;
