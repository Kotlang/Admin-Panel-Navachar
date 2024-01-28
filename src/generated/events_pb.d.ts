import * as jspb from 'google-protobuf'

import * as commons_pb from './commons_pb'; // proto import: "commons.proto"


export class CreateEventRequest extends jspb.Message {
  getTitle(): string;
  setTitle(value: string): CreateEventRequest;

  getType(): EventType;
  setType(value: EventType): CreateEventRequest;

  getStartat(): number;
  setStartat(value: number): CreateEventRequest;

  getEndat(): number;
  setEndat(value: number): CreateEventRequest;

  getMediaurlsList(): Array<commons_pb.MediaUrl>;
  setMediaurlsList(value: Array<commons_pb.MediaUrl>): CreateEventRequest;
  clearMediaurlsList(): CreateEventRequest;
  addMediaurls(value?: commons_pb.MediaUrl, index?: number): commons_pb.MediaUrl;

  getWebpreviewsList(): Array<commons_pb.WebPreview>;
  setWebpreviewsList(value: Array<commons_pb.WebPreview>): CreateEventRequest;
  clearWebpreviewsList(): CreateEventRequest;
  addWebpreviews(value?: commons_pb.WebPreview, index?: number): commons_pb.WebPreview;

  getDescription(): string;
  setDescription(value: string): CreateEventRequest;

  getNumattendees(): number;
  setNumattendees(value: number): CreateEventRequest;

  getNumslots(): number;
  setNumslots(value: number): CreateEventRequest;

  getLocation(): commons_pb.Location | undefined;
  setLocation(value?: commons_pb.Location): CreateEventRequest;
  hasLocation(): boolean;
  clearLocation(): CreateEventRequest;

  getOnlinelink(): string;
  setOnlinelink(value: string): CreateEventRequest;

  getTagsList(): Array<string>;
  setTagsList(value: Array<string>): CreateEventRequest;
  clearTagsList(): CreateEventRequest;
  addTags(value: string, index?: number): CreateEventRequest;

  getAuthorname(): string;
  setAuthorname(value: string): CreateEventRequest;

  getAuthorid(): string;
  setAuthorid(value: string): CreateEventRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateEventRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateEventRequest): CreateEventRequest.AsObject;
  static serializeBinaryToWriter(message: CreateEventRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateEventRequest;
  static deserializeBinaryFromReader(message: CreateEventRequest, reader: jspb.BinaryReader): CreateEventRequest;
}

export namespace CreateEventRequest {
  export type AsObject = {
    title: string,
    type: EventType,
    startat: number,
    endat: number,
    mediaurlsList: Array<commons_pb.MediaUrl.AsObject>,
    webpreviewsList: Array<commons_pb.WebPreview.AsObject>,
    description: string,
    numattendees: number,
    numslots: number,
    location?: commons_pb.Location.AsObject,
    onlinelink: string,
    tagsList: Array<string>,
    authorname: string,
    authorid: string,
  }
}

export class EventProto extends jspb.Message {
  getEventid(): string;
  setEventid(value: string): EventProto;

  getTitle(): string;
  setTitle(value: string): EventProto;

  getCreatedon(): number;
  setCreatedon(value: number): EventProto;

  getNumreactsMap(): jspb.Map<string, number>;
  clearNumreactsMap(): EventProto;

  getNumcomments(): number;
  setNumcomments(value: number): EventProto;

  getType(): EventType;
  setType(value: EventType): EventProto;

  getOnlinelink(): string;
  setOnlinelink(value: string): EventProto;

  getStartat(): number;
  setStartat(value: number): EventProto;

  getDescription(): string;
  setDescription(value: string): EventProto;

  getNumattendees(): number;
  setNumattendees(value: number): EventProto;

  getNumslots(): number;
  setNumslots(value: number): EventProto;

  getLocation(): commons_pb.Location | undefined;
  setLocation(value?: commons_pb.Location): EventProto;
  hasLocation(): boolean;
  clearLocation(): EventProto;

  getEndat(): number;
  setEndat(value: number): EventProto;

  getTagsList(): Array<string>;
  setTagsList(value: Array<string>): EventProto;
  clearTagsList(): EventProto;
  addTags(value: string, index?: number): EventProto;

  getMediaurlsList(): Array<commons_pb.MediaUrl>;
  setMediaurlsList(value: Array<commons_pb.MediaUrl>): EventProto;
  clearMediaurlsList(): EventProto;
  addMediaurls(value?: commons_pb.MediaUrl, index?: number): commons_pb.MediaUrl;

  getWebpreviewsList(): Array<commons_pb.WebPreview>;
  setWebpreviewsList(value: Array<commons_pb.WebPreview>): EventProto;
  clearWebpreviewsList(): EventProto;
  addWebpreviews(value?: commons_pb.WebPreview, index?: number): commons_pb.WebPreview;

  getFeeduserreactionsList(): Array<string>;
  setFeeduserreactionsList(value: Array<string>): EventProto;
  clearFeeduserreactionsList(): EventProto;
  addFeeduserreactions(value: string, index?: number): EventProto;

  getHasfeedusersubscribed(): boolean;
  setHasfeedusersubscribed(value: boolean): EventProto;

  getAuthorinfo(): commons_pb.SocialProfile | undefined;
  setAuthorinfo(value?: commons_pb.SocialProfile): EventProto;
  hasAuthorinfo(): boolean;
  clearAuthorinfo(): EventProto;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EventProto.AsObject;
  static toObject(includeInstance: boolean, msg: EventProto): EventProto.AsObject;
  static serializeBinaryToWriter(message: EventProto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EventProto;
  static deserializeBinaryFromReader(message: EventProto, reader: jspb.BinaryReader): EventProto;
}

export namespace EventProto {
  export type AsObject = {
    eventid: string,
    title: string,
    createdon: number,
    numreactsMap: Array<[string, number]>,
    numcomments: number,
    type: EventType,
    onlinelink: string,
    startat: number,
    description: string,
    numattendees: number,
    numslots: number,
    location?: commons_pb.Location.AsObject,
    endat: number,
    tagsList: Array<string>,
    mediaurlsList: Array<commons_pb.MediaUrl.AsObject>,
    webpreviewsList: Array<commons_pb.WebPreview.AsObject>,
    feeduserreactionsList: Array<string>,
    hasfeedusersubscribed: boolean,
    authorinfo?: commons_pb.SocialProfile.AsObject,
  }
}

export class EditEventRequest extends jspb.Message {
  getEventid(): string;
  setEventid(value: string): EditEventRequest;

  getTitle(): string;
  setTitle(value: string): EditEventRequest;

  getType(): EventType;
  setType(value: EventType): EditEventRequest;

  getStartat(): number;
  setStartat(value: number): EditEventRequest;

  getEndat(): number;
  setEndat(value: number): EditEventRequest;

  getMediaurlsList(): Array<commons_pb.MediaUrl>;
  setMediaurlsList(value: Array<commons_pb.MediaUrl>): EditEventRequest;
  clearMediaurlsList(): EditEventRequest;
  addMediaurls(value?: commons_pb.MediaUrl, index?: number): commons_pb.MediaUrl;

  getWebpreviewsList(): Array<commons_pb.WebPreview>;
  setWebpreviewsList(value: Array<commons_pb.WebPreview>): EditEventRequest;
  clearWebpreviewsList(): EditEventRequest;
  addWebpreviews(value?: commons_pb.WebPreview, index?: number): commons_pb.WebPreview;

  getDescription(): string;
  setDescription(value: string): EditEventRequest;

  getNumattendees(): number;
  setNumattendees(value: number): EditEventRequest;

  getNumslots(): number;
  setNumslots(value: number): EditEventRequest;

  getLocation(): commons_pb.Location | undefined;
  setLocation(value?: commons_pb.Location): EditEventRequest;
  hasLocation(): boolean;
  clearLocation(): EditEventRequest;

  getOnlinelink(): string;
  setOnlinelink(value: string): EditEventRequest;

  getTagsList(): Array<string>;
  setTagsList(value: Array<string>): EditEventRequest;
  clearTagsList(): EditEventRequest;
  addTags(value: string, index?: number): EditEventRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EditEventRequest.AsObject;
  static toObject(includeInstance: boolean, msg: EditEventRequest): EditEventRequest.AsObject;
  static serializeBinaryToWriter(message: EditEventRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EditEventRequest;
  static deserializeBinaryFromReader(message: EditEventRequest, reader: jspb.BinaryReader): EditEventRequest;
}

export namespace EditEventRequest {
  export type AsObject = {
    eventid: string,
    title: string,
    type: EventType,
    startat: number,
    endat: number,
    mediaurlsList: Array<commons_pb.MediaUrl.AsObject>,
    webpreviewsList: Array<commons_pb.WebPreview.AsObject>,
    description: string,
    numattendees: number,
    numslots: number,
    location?: commons_pb.Location.AsObject,
    onlinelink: string,
    tagsList: Array<string>,
  }
}

export class EventIdRequest extends jspb.Message {
  getEventid(): string;
  setEventid(value: string): EventIdRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EventIdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: EventIdRequest): EventIdRequest.AsObject;
  static serializeBinaryToWriter(message: EventIdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EventIdRequest;
  static deserializeBinaryFromReader(message: EventIdRequest, reader: jspb.BinaryReader): EventIdRequest;
}

export namespace EventIdRequest {
  export type AsObject = {
    eventid: string,
  }
}

export class EventFeedFilters extends jspb.Message {
  getEventstatus(): EventStatus;
  setEventstatus(value: EventStatus): EventFeedFilters;

  getGetsubscribedevents(): boolean;
  setGetsubscribedevents(value: boolean): EventFeedFilters;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EventFeedFilters.AsObject;
  static toObject(includeInstance: boolean, msg: EventFeedFilters): EventFeedFilters.AsObject;
  static serializeBinaryToWriter(message: EventFeedFilters, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EventFeedFilters;
  static deserializeBinaryFromReader(message: EventFeedFilters, reader: jspb.BinaryReader): EventFeedFilters;
}

export namespace EventFeedFilters {
  export type AsObject = {
    eventstatus: EventStatus,
    getsubscribedevents: boolean,
  }
}

export class GetEventFeedRequest extends jspb.Message {
  getFilters(): EventFeedFilters | undefined;
  setFilters(value?: EventFeedFilters): GetEventFeedRequest;
  hasFilters(): boolean;
  clearFilters(): GetEventFeedRequest;

  getPagesize(): number;
  setPagesize(value: number): GetEventFeedRequest;

  getPagenumber(): number;
  setPagenumber(value: number): GetEventFeedRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetEventFeedRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetEventFeedRequest): GetEventFeedRequest.AsObject;
  static serializeBinaryToWriter(message: GetEventFeedRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetEventFeedRequest;
  static deserializeBinaryFromReader(message: GetEventFeedRequest, reader: jspb.BinaryReader): GetEventFeedRequest;
}

export namespace GetEventFeedRequest {
  export type AsObject = {
    filters?: EventFeedFilters.AsObject,
    pagesize: number,
    pagenumber: number,
  }
}

export class EventFeedResponse extends jspb.Message {
  getEventsList(): Array<EventProto>;
  setEventsList(value: Array<EventProto>): EventFeedResponse;
  clearEventsList(): EventFeedResponse;
  addEvents(value?: EventProto, index?: number): EventProto;

  getPagenumber(): number;
  setPagenumber(value: number): EventFeedResponse;

  getPagesize(): number;
  setPagesize(value: number): EventFeedResponse;

  getTotalpages(): number;
  setTotalpages(value: number): EventFeedResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EventFeedResponse.AsObject;
  static toObject(includeInstance: boolean, msg: EventFeedResponse): EventFeedResponse.AsObject;
  static serializeBinaryToWriter(message: EventFeedResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EventFeedResponse;
  static deserializeBinaryFromReader(message: EventFeedResponse, reader: jspb.BinaryReader): EventFeedResponse;
}

export namespace EventFeedResponse {
  export type AsObject = {
    eventsList: Array<EventProto.AsObject>,
    pagenumber: number,
    pagesize: number,
    totalpages: number,
  }
}

export class UserIdList extends jspb.Message {
  getUseridList(): Array<string>;
  setUseridList(value: Array<string>): UserIdList;
  clearUseridList(): UserIdList;
  addUserid(value: string, index?: number): UserIdList;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserIdList.AsObject;
  static toObject(includeInstance: boolean, msg: UserIdList): UserIdList.AsObject;
  static serializeBinaryToWriter(message: UserIdList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserIdList;
  static deserializeBinaryFromReader(message: UserIdList, reader: jspb.BinaryReader): UserIdList;
}

export namespace UserIdList {
  export type AsObject = {
    useridList: Array<string>,
  }
}

export enum EventType { 
  ONLINE = 0,
  OFFLINE = 1,
}
export enum EventStatus { 
  PAST = 0,
  ONGOING = 1,
  FUTURE = 2,
}
