/* eslint-disable */

import React, { useState, useCallback, useEffect } from "react";
import { List } from "antd";
import { MessagingTemplate } from "src/generated/messaging-service_pb";
import { IFetchTemplateRequest, templateCardDetails } from "src/types";
import clients from "src/clients";
import CardDetails from "./templateCardDetails";
import { Link } from "react-router-dom";

interface props {
    templateSelection: boolean;
}

const TemplatesIndex: React.FC<props> = ({ templateSelection }) => {
    const [data, setData] = useState<templateCardDetails[]>();
    const [pageNumber, setPageNumber] = useState(0);
    const [total, setTotal] = useState(0);

    const fetchTemplates = useCallback(async (): Promise<MessagingTemplate[]> => {
        const templateRequest: IFetchTemplateRequest = {
            pageNumber: pageNumber,
            pageSize: 14
        };

        return new Promise((resolve, reject) => {
            try {
                clients.messaging.messaging.FetchTemplates(templateRequest, null, (err, res) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        const fetchedTemplates: MessagingTemplate[] = res.getTemplatesList();
                        setTotal(res.getTotalcount())
                        resolve(fetchedTemplates);
                    }
                });
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }, [pageNumber]);

    useEffect(() => {
        fetchTemplates().then((templates) => {
            const templateData: templateCardDetails[] = templates.map((template) => {
                return {
                    templateData: template,
                    TempalteName: template.getTemplatename() || "",
                    Id: template.getTemplateid(),
                    mediaUrl: template.getMediaparameters()?.getLink() || "",
                    Content: template.getBodyparametersMap(),
                    createdAt: "2023-03-01"
                };
            });
            setData(templateData);
        });
    }, [pageNumber])

    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: (page) => {
                    setPageNumber(page - 1);
                },
                pageSize: 14,
                showLessItems: true,
                total: total
            }}
            dataSource={data}
            renderItem={(item, index) => (
                <List.Item
                    key={index}
                    extra={item.mediaUrl && <img width={272} alt="logo" src={item.mediaUrl} />}
                    className={`mb-8 border-l-8 bg-black_text rounded-lg border-green-500`}
                >
                    {templateSelection ? (
                        <Link to={`/marketing/createmessage/${item.Id}`} >
                            <CardDetails {...item} />
                        </Link>
                    ) : (
                        <CardDetails {...item} />
                    )}
                </List.Item>
            )}
        />
    );
};

export default TemplatesIndex;