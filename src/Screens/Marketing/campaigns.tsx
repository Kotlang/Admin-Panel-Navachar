/* eslint-disable */
// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import React, { useEffect, useState } from "react";
import { List } from "antd";
import CardDetails from "./campaignCardDetails";


 enum CampStatus {
    SCHEDULED = 0,
    COMPLETED = 1
}

interface CampaignDetails {
    status : CampStatus;
    scheduledDate: string;
    sendTo: number;
    receivedBy: number;
    readBy: number;
}

function getColorClass(campaignType: CampStatus): string {
    const colorMap: { [key: number]: string } = {
        0 : 'border-green-400',
        1: 'border-orange-400'
    };

    return colorMap[campaignType] || 'text-red-400';
}


const Campaigns = () => { 
    const [pageNumber, setPageNumber] = useState(0);
    const [data, setData] = useState<CampaignDetails[]>();

    const sampleData: CampaignDetails[] = [
        {
            status: CampStatus.SCHEDULED,
            scheduledDate: '2023-03-01',
            sendTo: 100,
            receivedBy: 50,
            readBy: 20
        },
        {
            status: CampStatus.COMPLETED,
            scheduledDate: '2023-03-01',
            sendTo: 100,
            receivedBy: 50,
            readBy: 20
        }
    ];

    useEffect(() => {
        setData(sampleData);
    }, []);

    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: (page) => {
                    setPageNumber(page - 1);
                },
                pageSize: 10,
                showLessItems: true,
            }}
            dataSource={data}
            renderItem={(item, index) => (
                <List.Item
                    key={index}
                    className={`mb-8 border-l-8 bg-black_text rounded-lg ${getColorClass(item.status)}`}
                >
                    <CardDetails {...item} />
                </List.Item>
            )}
        />
    )
}

export default Campaigns;