/* eslint-disable */

// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import { List } from "antd";
import React, { useEffect, useState, useCallback } from "react";
import { ActivityCardDetails, IGetFeedRequest, FeedFilters } from "src/types";
import { UserPostProto } from 'src/generated/social_pb';
import { CommentProto } from "src/generated/actions_pb";
import CardDetails from "./cardDetails";
import clients from "src/clients";
import { Icomments } from "src/types";

interface props {
    filter: string;
    creatorId: string;
}

const UserActivity: React.FC<props> = (props) => {
    const [pageNumber, setPageNumber] = useState(0);
    const [data, setData] = useState<ActivityCardDetails[]>();
    const [posts, setPosts] = useState<UserPostProto[]>([]);
    const [comments, setComments] = useState<CommentProto[]>([])

    const fetchComments = useCallback(async (): Promise<CommentProto[]> => {
        const commentRequest: Icomments = {
            parentID: "",
            userID: props.creatorId,
            pageNumber: pageNumber,
            pageSize: 11
        };

        return new Promise((resolve, reject) => {
            try {
                clients.social.actions.FetchComments(commentRequest, null, (err, res) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        const fetchedPosts: CommentProto[] = res.getCommentsList();
                        resolve(fetchedPosts);
                    }
                });
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }, [pageNumber]);

    const fetchPosts = useCallback(async (): Promise<UserPostProto[]> => {
        const feedFilters: FeedFilters = {
            createdBy: props.creatorId
        };
        const feedRequest: IGetFeedRequest = {
            filters: feedFilters,
            pageNumber: pageNumber,
            pageSize: 11
        };

        return new Promise((resolve, reject) => {
            try {
                clients.social.content.FeedContent(feedRequest, null, (err, res) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        const fetchedPosts: UserPostProto[] = res.getPostsList();
                        resolve(fetchedPosts);
                    }
                });
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }, [pageNumber]);

    function getColorClass(activityType: string): string {
        const colorMap: { [key: string]: string } = {
            'commented': 'border-yellow-500',
            'posted': 'border-violet-500',
            'eventJoined': 'border-blue-500',
            'liked': 'border-green-500'
        };

        return colorMap[activityType] || 'text-red-400';
    }

    function unixToLocalTime(unixTime: number) {
        const date = new Date(unixTime * 1000);
        const localTime = date.toLocaleString();
        return localTime;
    }

    useEffect(() => {
        if (props.filter === 'all' || props.filter === 'posts') {
            fetchPosts().then(fetchedPosts => {
                if (fetchedPosts) {
                    setPosts(prevPosts => {
                        const newPosts = [...prevPosts, ...fetchedPosts];
                        return newPosts.filter((post, index, self) =>
                            index === self.findIndex((p) => (
                                p.getPostid() === post.getPostid()
                            ))
                        );
                    });
                }
            }).catch(err => console.error(err));
        }
    }, [pageNumber]);


    useEffect(() => {
        if (props.filter === 'all' || props.filter === 'comments') {
            fetchComments().then(fetchedComments => {
                if (fetchedComments) {
                    setComments(prevComments => {
                        const newComments = [...prevComments, ...fetchedComments];
                        return newComments.filter((comment, index, self) =>
                            index === self.findIndex((p) => (
                                p.getCommentid() === comment.getCommentid()
                            ))
                        );
                    });
                }
            }).catch(err => console.error(err));
        }
    }, [pageNumber]);


    useEffect(() => {
        let activityData: ActivityCardDetails[] = [];

        if (comments.length > 0) {
            const commentData: ActivityCardDetails[] = comments.map(comment => {
                return {
                    activityType: "commented",
                    avatar: comment.getAuthorinfo()?.getPhotourl() || '',
                    content: comment.getContent() || '',
                    dateCreated: unixToLocalTime(comment.getCreatedon()),
                    dateReact: unixToLocalTime(comment.getCreatedon()),
                    description: "",
                    image: "",
                    name: comment.getAuthorinfo()?.getName() || '',
                    numcomments: 0,
                    numlikes: comment.getNumreactsMap()?.map_?.like?.value || 0,
                    postId: ""
                };
            });
            activityData = [...activityData, ...commentData];
        }

        if (posts.length > 0) {
            const postData: ActivityCardDetails[] = posts.map(post => {
                return {
                    activityType: "posted",
                    avatar: post.getAuthorinfo()?.getPhotourl() || '',
                    content: post.getPost(),
                    dateCreated: unixToLocalTime(post.getCreatedon()),
                    dateReact: unixToLocalTime(post.getCreatedon()),
                    description: post.getTitle(),
                    image: post.getMediaurlsList()[0]?.getUrl() || '',
                    name: post.getAuthorinfo()?.getName() || '',
                    numcomments: post.getNumreplies() || 0,
                    numlikes: post.getNumreactsMap()?.map_?.like?.value || 0,
                    postId: post.getPostid()
                };
            });
            activityData = [...activityData, ...postData];
        }
        activityData.sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
        setData(activityData);
    }, [comments, posts])

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
                    extra={item.image && <img width={272} alt="logo" src={item.image} />}
                    className={`mb-8 border-l-8  bg-black_text rounded-lg ${getColorClass(item.activityType)}`}
                >
                    <CardDetails {...item} />
                </List.Item>
            )}
        />
    );
};

export default UserActivity;
