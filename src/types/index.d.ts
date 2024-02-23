// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { FarmingType, Gender, LandSizeInAcres } from 'src/generated/common_pb';
import { EventType } from 'src/generated/events_pb';

export interface IUserProfile {
    attributesList?: string[];
    createdOn?: number;
    domain?: string;
    email?: string;
    gender?: Gender;
    loginId?: string;
    metaData?: string;
    name?: string;
    phone?: string;
    photoUrl?: string;
    preferredLanguage?: string;
    isVerified?: boolean;
    gender?: Gender;
    farmintType?: FarmingType;
    yearsSinceOrganicFarming?: number;
    landSizeInAcres?: LandSizeInAcres;
}

export interface UserFilters {
    name?: string;
    gender?: Gender;
    farmintType?: FarmingType;
    yearsSinceOrganicFarming?: number;
    landSizeInAcres?: LandSizeInAcres;
}

export interface IFetchProfiles {
    filters?: UserFilters;
    pageSize?: number;
    pageNumber?: number;
}

export interface IAuthResponse {
    jwt: string;
    profile: IUserProfile;
    userType: string;
}

export interface ILogin {
    authResponse: IAuthResponse;
    isLogin: () => boolean;
    isAdmin: () => boolean;
    logout: () => void;
    setAuthResponse: (authResponse: IAuthResponse) => void;
}

export interface IProfileMaster {
    language?: string;
    options?: string[];
    field?: string;
    type?: string;
}

export interface ILabel {
    key: string;
    value: string;
    language: string;
}

export interface IEvent {
    id?: string;
    title?: string;
    type?: EventType;
    startAt: number;
    endAt: number;
    mediaUrls?: MediaUrl[];
    webPreviews?: {
        title?: string;
        previewImage?: string;
        url?: string;
        description?: string;
    }[];
    description?: string;
    numAttendees?: number;
    numSlots?: number;
    location?: {
        lat?: number;
        long?: number;
    };
    authorName?: string;
    authorUserId?: string;
    onlineLink?: string;
    tags?: string[];
}

export interface Location {
    lat: number;
    long: number;
}

export interface MediaUrl {
    url: string;
    mimeType: string;
}

export interface WebPreview {
    url: string;
    previewImage: string;
}

export interface EventProto {
    eventId: string;
    title: string;
    createdOn: number;
    numReacts: { [key: string]: number };
    numComments: number;
    type: EventType;
    onlineLink?: string;
    startAt: number;
    description: string;
    numAttendees: number;
    numSlots: number;
    location: Location;
    endAt: number;
    tags: string[];
    mediaUrls: MediaUrl[];
    webPreviews: WebPreview[];
    FeedUserReactions: string[];
}

export interface IUserPost {
    postId: string;
    post: string;
    mediaUrls: MediaUrl[];
    userId: string;
    authorInfo: {
        photoUrl: string;
        name: string;
    };
}

export interface IGetFeedRequest {
    filters: FeedFilters;
}

export interface FeedFilters {
    tag?: string;
    userId?: string;
    createdBy?: string;
    postType?: PostType;
    contentType?: string[];
    type?: string[];
    fetchUserCommentedPosts?: boolean;
    fetchUserReactedPosts?: boolean;
}

export enum PostType {
    FEED_POST = 0,
    QNA_QUESTION = 1,
    QNA_ANSWER = 2,
}

export interface IFetchDeletionRequests {
    pageSize: number;
    pageNumber: number;
}
