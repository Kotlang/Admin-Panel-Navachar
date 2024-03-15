import * as jspb from 'google-protobuf'

import * as commons_pb from './commons_pb'; // proto import: "commons.proto"


export class ReactRequest extends jspb.Message {
  getEntityid(): string;
  setEntityid(value: string): ReactRequest;

  getReaction(): string;
  setReaction(value: string): ReactRequest;

  getReactionon(): EntityTypes;
  setReactionon(value: EntityTypes): ReactRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ReactRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ReactRequest): ReactRequest.AsObject;
  static serializeBinaryToWriter(message: ReactRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ReactRequest;
  static deserializeBinaryFromReader(message: ReactRequest, reader: jspb.BinaryReader): ReactRequest;
}

export namespace ReactRequest {
  export type AsObject = {
    entityid: string,
    reaction: string,
    reactionon: EntityTypes,
  }
}

export class IdRequest extends jspb.Message {
  getId(): string;
  setId(value: string): IdRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: IdRequest): IdRequest.AsObject;
  static serializeBinaryToWriter(message: IdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IdRequest;
  static deserializeBinaryFromReader(message: IdRequest, reader: jspb.BinaryReader): IdRequest;
}

export namespace IdRequest {
  export type AsObject = {
    id: string,
  }
}

export class CommentRequest extends jspb.Message {
  getParentid(): string;
  setParentid(value: string): CommentRequest;

  getContent(): string;
  setContent(value: string): CommentRequest;

  getCommenton(): EntityTypes;
  setCommenton(value: EntityTypes): CommentRequest;

  getMediaurlsList(): Array<commons_pb.MediaUrl>;
  setMediaurlsList(value: Array<commons_pb.MediaUrl>): CommentRequest;
  clearMediaurlsList(): CommentRequest;
  addMediaurls(value?: commons_pb.MediaUrl, index?: number): commons_pb.MediaUrl;

  getWebpreviewsList(): Array<commons_pb.WebPreview>;
  setWebpreviewsList(value: Array<commons_pb.WebPreview>): CommentRequest;
  clearWebpreviewsList(): CommentRequest;
  addWebpreviews(value?: commons_pb.WebPreview, index?: number): commons_pb.WebPreview;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CommentRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CommentRequest): CommentRequest.AsObject;
  static serializeBinaryToWriter(message: CommentRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CommentRequest;
  static deserializeBinaryFromReader(message: CommentRequest, reader: jspb.BinaryReader): CommentRequest;
}

export namespace CommentRequest {
  export type AsObject = {
    parentid: string,
    content: string,
    commenton: EntityTypes,
    mediaurlsList: Array<commons_pb.MediaUrl.AsObject>,
    webpreviewsList: Array<commons_pb.WebPreview.AsObject>,
  }
}

export class CommentProto extends jspb.Message {
  getCommentid(): string;
  setCommentid(value: string): CommentProto;

  getContent(): string;
  setContent(value: string): CommentProto;

  getUserid(): string;
  setUserid(value: string): CommentProto;

  getCreatedon(): number;
  setCreatedon(value: number): CommentProto;

  getNumreactsMap(): jspb.Map<string, number>;
  clearNumreactsMap(): CommentProto;

  getNumcomments(): number;
  setNumcomments(value: number): CommentProto;

  getUserreactionsList(): Array<string>;
  setUserreactionsList(value: Array<string>): CommentProto;
  clearUserreactionsList(): CommentProto;
  addUserreactions(value: string, index?: number): CommentProto;

  getMediaurlsList(): Array<commons_pb.MediaUrl>;
  setMediaurlsList(value: Array<commons_pb.MediaUrl>): CommentProto;
  clearMediaurlsList(): CommentProto;
  addMediaurls(value?: commons_pb.MediaUrl, index?: number): commons_pb.MediaUrl;

  getWebpreviewsList(): Array<commons_pb.WebPreview>;
  setWebpreviewsList(value: Array<commons_pb.WebPreview>): CommentProto;
  clearWebpreviewsList(): CommentProto;
  addWebpreviews(value?: commons_pb.WebPreview, index?: number): commons_pb.WebPreview;

  getParentid(): string;
  setParentid(value: string): CommentProto;

  getAuthorinfo(): commons_pb.SocialProfile | undefined;
  setAuthorinfo(value?: commons_pb.SocialProfile): CommentProto;
  hasAuthorinfo(): boolean;
  clearAuthorinfo(): CommentProto;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CommentProto.AsObject;
  static toObject(includeInstance: boolean, msg: CommentProto): CommentProto.AsObject;
  static serializeBinaryToWriter(message: CommentProto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CommentProto;
  static deserializeBinaryFromReader(message: CommentProto, reader: jspb.BinaryReader): CommentProto;
}

export namespace CommentProto {
  export type AsObject = {
    commentid: string,
    content: string,
    userid: string,
    createdon: number,
    numreactsMap: Array<[string, number]>,
    numcomments: number,
    userreactionsList: Array<string>,
    mediaurlsList: Array<commons_pb.MediaUrl.AsObject>,
    webpreviewsList: Array<commons_pb.WebPreview.AsObject>,
    parentid: string,
    authorinfo?: commons_pb.SocialProfile.AsObject,
  }
}

export class CommentFetchRequest extends jspb.Message {
  getParentid(): string;
  setParentid(value: string): CommentFetchRequest;

  getUserid(): string;
  setUserid(value: string): CommentFetchRequest;

  getPagenumber(): number;
  setPagenumber(value: number): CommentFetchRequest;

  getPagesize(): number;
  setPagesize(value: number): CommentFetchRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CommentFetchRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CommentFetchRequest): CommentFetchRequest.AsObject;
  static serializeBinaryToWriter(message: CommentFetchRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CommentFetchRequest;
  static deserializeBinaryFromReader(message: CommentFetchRequest, reader: jspb.BinaryReader): CommentFetchRequest;
}

export namespace CommentFetchRequest {
  export type AsObject = {
    parentid: string,
    userid: string,
    pagenumber: number,
    pagesize: number,
  }
}

export class CommentsFetchResponse extends jspb.Message {
  getCommentsList(): Array<CommentProto>;
  setCommentsList(value: Array<CommentProto>): CommentsFetchResponse;
  clearCommentsList(): CommentsFetchResponse;
  addComments(value?: CommentProto, index?: number): CommentProto;

  getPagenumber(): number;
  setPagenumber(value: number): CommentsFetchResponse;

  getPagesize(): number;
  setPagesize(value: number): CommentsFetchResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CommentsFetchResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CommentsFetchResponse): CommentsFetchResponse.AsObject;
  static serializeBinaryToWriter(message: CommentsFetchResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CommentsFetchResponse;
  static deserializeBinaryFromReader(message: CommentsFetchResponse, reader: jspb.BinaryReader): CommentsFetchResponse;
}

export namespace CommentsFetchResponse {
  export type AsObject = {
    commentsList: Array<CommentProto.AsObject>,
    pagenumber: number,
    pagesize: number,
  }
}

export enum EntityTypes { 
  POST = 0,
  EVENT = 1,
  COMMENT = 2,
}
