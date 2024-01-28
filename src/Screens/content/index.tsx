/* eslint-disable */

// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import React, { useState, useEffect, useCallback } from 'react';
import { UserPostProto } from 'src/generated/social_pb';
import PostContainer from './postcontainer';
import userPostClient from 'src/clients/social/content';
import { IGetFeedRequest, FeedFilters } from 'src/types';

const PostsPage: React.FC = () => {
    const [posts, setPosts] = useState<UserPostProto[]>([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const fetchPosts = useCallback(async (): Promise<UserPostProto[]> => {
        setHasMore(true);
        const feedFilters: FeedFilters = {};
        const feedRequest: IGetFeedRequest = {
            filters: feedFilters,
        };

        return new Promise((resolve, reject) => {
            try {
                userPostClient.FeedContent(feedRequest, null, (err, res) => {
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


    useEffect(() => {
        fetchPosts().then(fetchedPosts => {
            if (fetchedPosts) {
                setPosts(fetchedPosts);
            }
        }).catch(err => console.error(err));
    }, [fetchPosts]);

    const handleScroll = useCallback(() => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || !hasMore) return;
        setPageNumber(prevPageNumber => prevPageNumber + 1);
    }, [hasMore]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (
        <div className="overflow-auto p-4" style={{ maxHeight: '100vh', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
            {posts.map((userPosts, index) => (
                <PostContainer
                    key={index}
                    postId={userPosts.getPostid()}
                    userId={userPosts.getUserid()}
                    post={userPosts.getPost()}
                    mediaUrls={userPosts.getMediaurlsList().map(mediaUrl => ({
                        url: mediaUrl.getUrl(),
                        mimeType: mediaUrl.getMimetype()
                    }))}
                    authorInfo={{
                        photoUrl: userPosts.getAuthorinfo()?.getPhotourl() || '',
                        name: userPosts.getAuthorinfo()?.getName() || ''
                    }}
                />
            ))}
        </div>
    );
};

export default PostsPage;
