/* eslint-disable */
// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import React, { useEffect, useState } from "react";
import { Flex, List, Pagination, Typography } from "antd";
import clients from "src/clients";
import { FetchMessageRequest, MessageFilters } from "src/generated/messaging-service_pb";
import { IMessage } from "src/types";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUnixTimestamp, getDateAndTimeFromUnixTimestamp } from "./utils";

function getColorClass(status: string): string {
    const colorMap: { [key: string]: string } = {
        'Completed' : 'border-green-400',
        'Scheduled': 'border-orange-400'
    };
    return colorMap[status] || 'text-red-400';
}


const Campaigns = () => { 
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalCount, setTotalCount] = useState<number>(0); 
    const [data, setData] = useState<IMessage[]>();

    const navigate = useNavigate();

    async function fetchMessageData() {
        // Fetch data from API

        const fetchMessageReq = new FetchMessageRequest();
        fetchMessageReq.setPagenumber(pageNumber - 1);
        fetchMessageReq.setPagesize(pageSize);

        const filter = new MessageFilters();
        // TODO: Add filters
        
        fetchMessageReq.setFilters(filter);

        clients.messaging.messaging.FetchMessages(fetchMessageReq, {} , (err, res) => {
            if (err) {
                console.error(err);
            } else {
                const messages: IMessage[] = res.getMessagesList().map((message) => {
                    return {
                        messageId: message.getMessageid(),
                        templateId : message.getTemplateid(),
                        sender: message.getSender(),
                        recipients: message.getRecipientsList(),
                        recievedBy: message.getRecievedbyList(),
                        readBy: message.getReadbyList(),
                        responses: message.getResponsesMap(),
                        failedRecipients: message.getFailedrecipientsList(),
                        createdOn: message.getCreatedon(),
                        scheduleInfo: message.getScheduleinfo(),
                        headerParameters: message.getHeaderparametersMap(),
                        bodyParameters: message.getBodyparametersMap(),
                        buttons: message.getButtonsMap(),
                        transactionId: message.getTransactionid(),
                        status: getCurrentUnixTimestamp() < (message.getScheduleinfo()?.getScheduledtime() || 0) ? "Scheduled" : "Completed"
                    };
                }
                );
                setData(messages)
                setTotalCount(res.getTotalcount())
            }
        });
    }

    useEffect(() => {
        fetchMessageData();
    }, [pageNumber, pageSize]);

    return (
        <>
            <List
                itemLayout="vertical"
                size="large"
                dataSource={data}
                renderItem={(item, index) => (
                    <List.Item
                        key={index}
                        className={`mb-8 border-l-8 bg-black_text rounded-lg ${getColorClass(item.status)}`}
                        style={{ display : "flex", justifyContent : "space-between"}}
                    >
                        <Flex style={{ flexDirection : "column" }}>
                            <Typography.Text  style={{ fontSize : '1.2rem'}} >
                                Campaign name
                            </Typography.Text>
                            <Typography.Text>
                                Status: {item.status}
                            </Typography.Text>
                            <Typography.Text>
                                Scheduled Date: {item.scheduleInfo?.getScheduledtime() ? getDateAndTimeFromUnixTimestamp(item.scheduleInfo.getScheduledtime()) : getDateAndTimeFromUnixTimestamp(item.createdOn)}
                            </Typography.Text>
                            <Typography.Link style={{fontSize : "1rem", color : "#34C06E"}} href= {`/marketing/campaigns/message/${item.messageId}`}>
                                View Details
                            </Typography.Link>
                        </Flex>
                        <Flex style={{ flexDirection : "column" }}>
                            <Typography.Text>
                                Sent To: {item.recipients.length}
                            </Typography.Text>
                            <Typography.Text>
                                Recieved By: {item.recievedBy.length}
                            </Typography.Text>
                            <Typography.Text>
                                Read By: {item.readBy.length}
                            </Typography.Text>
                        </Flex>
                    </List.Item>
                )}
                
            />
            <Pagination
                total={totalCount}
                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                pageSize={pageSize}
                current={pageNumber}
                showSizeChanger
                onChange={(page, pageSize) => {
                    setPageNumber(page);
                    setPageSize(pageSize);
                }} 
            ></Pagination>
        </>
    )
}

export default Campaigns;