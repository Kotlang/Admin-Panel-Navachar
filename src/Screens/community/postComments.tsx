/* eslint-disable */

// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React, { useState, useEffect, useCallback } from "react";
import { CommentProto } from 'src/generated/actions_pb'
import { List } from "antd";
import clients from "src/clients";
import { Icomments, CommentItems } from "src/types";
import ListComments from "./commentView";

interface props {
    postId: string
}

const Comments: React.FC<props> = ({ postId }) => {
    const [pageNumber, setPageNumber] = useState(0);
    const [data, setData] = useState<CommentItems[]>();
    const [comments, setComments] = useState<CommentProto[]>([])
    ;
    const fetchComments = useCallback(async (): Promise<CommentProto[]> => {
        const commentRequest: Icomments = {
            parentID: postId,
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

    useEffect(() => {
        fetchComments().then(fetchedComments => {
            if (fetchedComments) {
                setComments(prevComments => {
                    const newPosts = [...prevComments, ...fetchedComments];
                    return newPosts.filter((post, index, self) =>
                        index === self.findIndex((p) => (
                            p.getCommentid() === post.getCommentid()
                        ))
                    );
                });
            }
        }).catch(err => console.error(err));
    }, [pageNumber]);

    useEffect(() => {
        if (comments.length > 0) {
            const commentData: CommentItems[] = comments.map(comment => {
                return {
                    authorName: comment.getAuthorinfo()?.getName() || "",
                    authorProfileImage: comment.getAuthorinfo()?.getPhotourl() || "",
                    commentContent: comment.getContent() || "",
                    commentTime: comment.getCreatedon()
                };
            });
            setData(commentData);
        }
    }, [comments]);

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
            renderItem={(item: CommentItems, index) => (
                <List.Item
                    key={index}
                    className={`mb-8 border-l-8 bg-black_text rounded-lg border-yellow-500`}
                >
                    <ListComments {...item} />
                </List.Item>
            )}
        />
    );
}


export default Comments;