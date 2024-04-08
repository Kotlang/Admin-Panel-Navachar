// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { AddressProto, CertificationDetails,FarmingType, Gender, LandSizeInAcres } from 'src/generated/common_pb';
import { EventType } from 'src/generated/events_pb';
import { LeadChannel, LeadFilters,OperatorType } from 'src/generated/lead_pb';
import {  ButtonType, CallToActionButtons, Category, MediaType, MessagingTemplate,QuickReplyButtons, Reply, ScheduleInfo } from 'src/generated/messaging-service_pb';

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
    pageNumber?: number;
    pageSize?: number
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

export interface ILocation {
    lat: number;
    long: number;
}

export interface IEventData {
    id: string;
    name: string;
    hostName: string;
    description: string;
    startDate: number;
    endDate: number;
    tag: string;
    mode: string;
    slots: number;
    posters: FileList;
    address: ILocation;
    link: string;
    numAttendees: number;
}

export interface IFetchDeletionRequests {
    pageSize: number;
    pageNumber: number;
}

export interface ActivityCardDetails {
    activityType: string;
    avatar: string;
    content: string;
    dateCreated: string;
    dateReact: string;
    description: string;
    image: string;
    name: string;
    postId: string;
    numlikes: number;
    numcomments: number;
}

export interface Icomments {
    parentID: string;
    userID?: string;
    pageNumber?: number;
    pageSize?: number;
}

export interface CommentItems {
    authorProfileImage: string;
    authorName: string;
    commentContent: string;
    commentTime: number;
}

export interface ICreateLeads {
	name: string;
	phoneNumber?: string;
	operatorType?: OperatorType;
	channel?: LeadChannel;
	source?: string ;
	addresses?: AddressProto[];
	landSizeInAcres?: LandSizeInAcres;
	farmingType?: FarmingType ;
	certificationDetails?: CertificationDetails;
	crops?: string[];
	mainProfession?: string;
	organizationName?: string;
	sideProfession?: string
	userInterviewNotes?: string;
	education?: string;
}

export interface IFetchLeads {
    leadfilters?: LeadFilters;
    pageSize?: number;
    PageNumber?: number;
}

export enum CampStatus {
    SCHEDULED = 0,
    COMPLETED = 1
}

export interface CampaignDetails {
    status : CampStatus;
    scheduledDate: string;
    sendTo: number;
    receivedBy: number;
    readBy: number;
}

export interface IButton {
    callToActionButtons: CallToActionButtons[];
    quickReplyButtons: QuickReplyButtons[];

}

export interface MediaParameters {
    mediaType: MediaType;
    link: string;
    filename: string;
}

export interface IMessagingTemplate {
    templateId: string;
    templateName: string;
    mediaParameters?: MediaParameters;
    header?: string;
    headerParameters?: Map<string, string>;
    body?: string;
    bodyParameters?: Map<string, string>;
    footer?: string;
    category?: Category;
    wabaId: string;
    buttonType?: ButtonType;
    buttons?: IButton;
}

export interface IFetchTemplateRequest {
    templateId?: string;
    templateName?: string;
    pageNumber?: number;
    pageSize?: number;
}

export interface templateCardDetails {
    templateData: MessagingTemplate;
    TempalteName: string;
    Id: string;
    mediaUrl: string;
    Content: string;
    createdAt: string;
}

export interface IMessagePreview {
    mediaParameters: MediaParameters;
    headerParameters: [string, string][];
    bodyParameters: [string, string][];
    header: string,
    body: string,
    footer: string
    Buttons?: IButton;
}

export interface IMessage {
    messageId: string;
    templateId: string;
    sender: string;
    recipients: string[];
    recievedBy: string[];
    readBy: string[];
    responses: Map<string, Reply>;
    failedRecipients: s1711880071tring[];
    createdOn: number;
    scheduleInfo?: ScheduleInfo;
    mediaParameters?: MediaParameters;
    headerParameters: Map<string, string>;
    bodyParameters: Map<string, string>;
    buttons: Map<string, string>;
    transactionId: string;
    status: string;
}

export interface TableParams {
	pagination?: TablePaginationConfig;
	sortField?: string;
	sortOrder?: string;
	filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}