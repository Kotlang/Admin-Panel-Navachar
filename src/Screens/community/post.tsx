/* eslint-disable */

// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React, { useEffect, useState } from "react";
import ViewPost from "./postView";
import { UserPostProto } from 'src/generated/social_pb';
import { Metadata, RpcError } from 'grpc-web';
import clients from "src/clients";
import { useParams } from "react-router-dom";

const Post = () => {
    const [post, setPosts] = useState<UserPostProto>();
    const { postid } = useParams<{ postid: string }>();
    const fetchPostById = (postId: string, metaData: Metadata | null): Promise<UserPostProto> => {
        return new Promise((resolve, reject) => {
            clients.social.content.GetPostByID(postId, metaData, (err: RpcError, response: UserPostProto) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(response);
                }
            });
        });
    };

    useEffect(() => {
        if(!postid) return console.error('Post ID not found');
        fetchPostById(postid, null).then((fetchedPost) => {
            setPosts(fetchedPost);
        }).catch(err => console.error(err));
    }, [postid]);

    return (
        <ViewPost post={post}/>
    );
};

export default Post;
