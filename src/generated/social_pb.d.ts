import * as jspb from 'google-protobuf'

import * as commons_pb from './commons_pb'; // proto import: "commons.proto"


export class UserPostRequest extends jspb.Message {
  getPost(): string;
  setPost(value: string): UserPostRequest;

  getTagsList(): Array<string>;
  setTagsList(value: Array<string>): UserPostRequest;
  clearTagsList(): UserPostRequest;
  addTags(value: string, index?: number): UserPostRequest;

  getTitle(): string;
  setTitle(value: string): UserPostRequest;

  getMediaurlsList(): Array<commons_pb.MediaUrl>;
  setMediaurlsList(value: Array<commons_pb.MediaUrl>): UserPostRequest;
  clearMediaurlsList(): UserPostRequest;
  addMediaurls(value?: commons_pb.MediaUrl, index?: number): commons_pb.MediaUrl;

  getWebpreviewsList(): Array<commons_pb.WebPreview>;
  setWebpreviewsList(value: Array<commons_pb.WebPreview>): UserPostRequest;
  clearWebpreviewsList(): UserPostRequest;
  addWebpreviews(value?: commons_pb.WebPreview, index?: number): commons_pb.WebPreview;

  getPosttype(): PostType;
  setPosttype(value: PostType): UserPostRequest;

  getContenttypeList(): Array<string>;
  setContenttypeList(value: Array<string>): UserPostRequest;
  clearContenttypeList(): UserPostRequest;
  addContenttype(value: string, index?: number): UserPostRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserPostRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserPostRequest): UserPostRequest.AsObject;
  static serializeBinaryToWriter(message: UserPostRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserPostRequest;
  static deserializeBinaryFromReader(message: UserPostRequest, reader: jspb.BinaryReader): UserPostRequest;
}

export namespace UserPostRequest {
  export type AsObject = {
    post: string,
    tagsList: Array<string>,
    title: string,
    mediaurlsList: Array<commons_pb.MediaUrl.AsObject>,
    webpreviewsList: Array<commons_pb.WebPreview.AsObject>,
    posttype: PostType,
    contenttypeList: Array<string>,
  }
}

export class UserPostProto extends jspb.Message {
  getPost(): string;
  setPost(value: string): UserPostProto;

  getTagsList(): Array<string>;
  setTagsList(value: Array<string>): UserPostProto;
  clearTagsList(): UserPostProto;
  addTags(value: string, index?: number): UserPostProto;

  getPostid(): string;
  setPostid(value: string): UserPostProto;

  getMediaurlsList(): Array<commons_pb.MediaUrl>;
  setMediaurlsList(value: Array<commons_pb.MediaUrl>): UserPostProto;
  clearMediaurlsList(): UserPostProto;
  addMediaurls(value?: commons_pb.MediaUrl, index?: number): commons_pb.MediaUrl;

  getWebpreviewsList(): Array<commons_pb.WebPreview>;
  setWebpreviewsList(value: Array<commons_pb.WebPreview>): UserPostProto;
  clearWebpreviewsList(): UserPostProto;
  addWebpreviews(value?: commons_pb.WebPreview, index?: number): commons_pb.WebPreview;

  getCreatedon(): number;
  setCreatedon(value: number): UserPostProto;

  getUserid(): string;
  setUserid(value: string): UserPostProto;

  getAuthorinfo(): commons_pb.SocialProfile | undefined;
  setAuthorinfo(value?: commons_pb.SocialProfile): UserPostProto;
  hasAuthorinfo(): boolean;
  clearAuthorinfo(): UserPostProto;

  getNumreactsMap(): jspb.Map<string, number>;
  clearNumreactsMap(): UserPostProto;

  getNumreplies(): number;
  setNumreplies(value: number): UserPostProto;

  getNumshares(): number;
  setNumshares(value: number): UserPostProto;

  getTitle(): string;
  setTitle(value: string): UserPostProto;

  getFeeduserreactionsList(): Array<string>;
  setFeeduserreactionsList(value: Array<string>): UserPostProto;
  clearFeeduserreactionsList(): UserPostProto;
  addFeeduserreactions(value: string, index?: number): UserPostProto;

  getContenttypeList(): Array<string>;
  setContenttypeList(value: Array<string>): UserPostProto;
  clearContenttypeList(): UserPostProto;
  addContenttype(value: string, index?: number): UserPostProto;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserPostProto.AsObject;
  static toObject(includeInstance: boolean, msg: UserPostProto): UserPostProto.AsObject;
  static serializeBinaryToWriter(message: UserPostProto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserPostProto;
  static deserializeBinaryFromReader(message: UserPostProto, reader: jspb.BinaryReader): UserPostProto;
}

export namespace UserPostProto {
  export type AsObject = {
    post: string,
    tagsList: Array<string>,
    postid: string,
    mediaurlsList: Array<commons_pb.MediaUrl.AsObject>,
    webpreviewsList: Array<commons_pb.WebPreview.AsObject>,
    createdon: number,
    userid: string,
    authorinfo?: commons_pb.SocialProfile.AsObject,
    numreactsMap: Array<[string, number]>,
    numreplies: number,
    numshares: number,
    title: string,
    feeduserreactionsList: Array<string>,
    contenttypeList: Array<string>,
  }
}

export class DeletePostRequest extends jspb.Message {
  getId(): string;
  setId(value: string): DeletePostRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeletePostRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeletePostRequest): DeletePostRequest.AsObject;
  static serializeBinaryToWriter(message: DeletePostRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeletePostRequest;
  static deserializeBinaryFromReader(message: DeletePostRequest, reader: jspb.BinaryReader): DeletePostRequest;
}

export namespace DeletePostRequest {
  export type AsObject = {
    id: string,
  }
}

export class FeedFilters extends jspb.Message {
  getTag(): string;
  setTag(value: string): FeedFilters;

  getUserid(): string;
  setUserid(value: string): FeedFilters;

  getCreatedby(): string;
  setCreatedby(value: string): FeedFilters;

  getPosttype(): PostType;
  setPosttype(value: PostType): FeedFilters;

  getContenttypeList(): Array<string>;
  setContenttypeList(value: Array<string>): FeedFilters;
  clearContenttypeList(): FeedFilters;
  addContenttype(value: string, index?: number): FeedFilters;

  getTypeList(): Array<string>;
  setTypeList(value: Array<string>): FeedFilters;
  clearTypeList(): FeedFilters;
  addType(value: string, index?: number): FeedFilters;

  getFetchusercommentedposts(): boolean;
  setFetchusercommentedposts(value: boolean): FeedFilters;

  getFetchuserreactedposts(): boolean;
  setFetchuserreactedposts(value: boolean): FeedFilters;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FeedFilters.AsObject;
  static toObject(includeInstance: boolean, msg: FeedFilters): FeedFilters.AsObject;
  static serializeBinaryToWriter(message: FeedFilters, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FeedFilters;
  static deserializeBinaryFromReader(message: FeedFilters, reader: jspb.BinaryReader): FeedFilters;
}

export namespace FeedFilters {
  export type AsObject = {
    tag: string,
    userid: string,
    createdby: string,
    posttype: PostType,
    contenttypeList: Array<string>,
    typeList: Array<string>,
    fetchusercommentedposts: boolean,
    fetchuserreactedposts: boolean,
  }
}

export class GetFeedRequest extends jspb.Message {
  getFilters(): FeedFilters | undefined;
  setFilters(value?: FeedFilters): GetFeedRequest;
  hasFilters(): boolean;
  clearFilters(): GetFeedRequest;

  getReferencepost(): string;
  setReferencepost(value: string): GetFeedRequest;

  getPagesize(): number;
  setPagesize(value: number): GetFeedRequest;

  getPagenumber(): number;
  setPagenumber(value: number): GetFeedRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetFeedRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetFeedRequest): GetFeedRequest.AsObject;
  static serializeBinaryToWriter(message: GetFeedRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetFeedRequest;
  static deserializeBinaryFromReader(message: GetFeedRequest, reader: jspb.BinaryReader): GetFeedRequest;
}

export namespace GetFeedRequest {
  export type AsObject = {
    filters?: FeedFilters.AsObject,
    referencepost: string,
    pagesize: number,
    pagenumber: number,
  }
}

export class FeedResponse extends jspb.Message {
  getPostsList(): Array<UserPostProto>;
  setPostsList(value: Array<UserPostProto>): FeedResponse;
  clearPostsList(): FeedResponse;
  addPosts(value?: UserPostProto, index?: number): UserPostProto;

  getPagenumber(): number;
  setPagenumber(value: number): FeedResponse;

  getPagesize(): number;
  setPagesize(value: number): FeedResponse;

  getTotalpages(): number;
  setTotalpages(value: number): FeedResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FeedResponse.AsObject;
  static toObject(includeInstance: boolean, msg: FeedResponse): FeedResponse.AsObject;
  static serializeBinaryToWriter(message: FeedResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FeedResponse;
  static deserializeBinaryFromReader(message: FeedResponse, reader: jspb.BinaryReader): FeedResponse;
}

export namespace FeedResponse {
  export type AsObject = {
    postsList: Array<UserPostProto.AsObject>,
    pagenumber: number,
    pagesize: number,
    totalpages: number,
  }
}

export class MediaUploadRequest extends jspb.Message {
  getMediaextension(): string;
  setMediaextension(value: string): MediaUploadRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MediaUploadRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MediaUploadRequest): MediaUploadRequest.AsObject;
  static serializeBinaryToWriter(message: MediaUploadRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MediaUploadRequest;
  static deserializeBinaryFromReader(message: MediaUploadRequest, reader: jspb.BinaryReader): MediaUploadRequest;
}

export namespace MediaUploadRequest {
  export type AsObject = {
    mediaextension: string,
  }
}

export class GetPostRequest extends jspb.Message {
  getPostid(): string;
  setPostid(value: string): GetPostRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetPostRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetPostRequest): GetPostRequest.AsObject;
  static serializeBinaryToWriter(message: GetPostRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetPostRequest;
  static deserializeBinaryFromReader(message: GetPostRequest, reader: jspb.BinaryReader): GetPostRequest;
}

export namespace GetPostRequest {
  export type AsObject = {
    postid: string,
  }
}

export class GetBookmarksRequest extends jspb.Message {
  getPagesize(): number;
  setPagesize(value: number): GetBookmarksRequest;

  getPagenumber(): number;
  setPagenumber(value: number): GetBookmarksRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetBookmarksRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetBookmarksRequest): GetBookmarksRequest.AsObject;
  static serializeBinaryToWriter(message: GetBookmarksRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetBookmarksRequest;
  static deserializeBinaryFromReader(message: GetBookmarksRequest, reader: jspb.BinaryReader): GetBookmarksRequest;
}

export namespace GetBookmarksRequest {
  export type AsObject = {
    pagesize: number,
    pagenumber: number,
  }
}

export class GetTagsRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTagsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetTagsRequest): GetTagsRequest.AsObject;
  static serializeBinaryToWriter(message: GetTagsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTagsRequest;
  static deserializeBinaryFromReader(message: GetTagsRequest, reader: jspb.BinaryReader): GetTagsRequest;
}

export namespace GetTagsRequest {
  export type AsObject = {
  }
}

export class Tag extends jspb.Message {
  getTag(): string;
  setTag(value: string): Tag;

  getTagdescription(): string;
  setTagdescription(value: string): Tag;

  getNumposts(): number;
  setNumposts(value: number): Tag;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Tag.AsObject;
  static toObject(includeInstance: boolean, msg: Tag): Tag.AsObject;
  static serializeBinaryToWriter(message: Tag, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Tag;
  static deserializeBinaryFromReader(message: Tag, reader: jspb.BinaryReader): Tag;
}

export namespace Tag {
  export type AsObject = {
    tag: string,
    tagdescription: string,
    numposts: number,
  }
}

export class TagListResponse extends jspb.Message {
  getTagsList(): Array<Tag>;
  setTagsList(value: Array<Tag>): TagListResponse;
  clearTagsList(): TagListResponse;
  addTags(value?: Tag, index?: number): Tag;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TagListResponse.AsObject;
  static toObject(includeInstance: boolean, msg: TagListResponse): TagListResponse.AsObject;
  static serializeBinaryToWriter(message: TagListResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TagListResponse;
  static deserializeBinaryFromReader(message: TagListResponse, reader: jspb.BinaryReader): TagListResponse;
}

export namespace TagListResponse {
  export type AsObject = {
    tagsList: Array<Tag.AsObject>,
  }
}

export class MediaUploadURL extends jspb.Message {
  getUploadurl(): string;
  setUploadurl(value: string): MediaUploadURL;

  getMediaurl(): string;
  setMediaurl(value: string): MediaUploadURL;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MediaUploadURL.AsObject;
  static toObject(includeInstance: boolean, msg: MediaUploadURL): MediaUploadURL.AsObject;
  static serializeBinaryToWriter(message: MediaUploadURL, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MediaUploadURL;
  static deserializeBinaryFromReader(message: MediaUploadURL, reader: jspb.BinaryReader): MediaUploadURL;
}

export namespace MediaUploadURL {
  export type AsObject = {
    uploadurl: string,
    mediaurl: string,
  }
}

export class UploadPostMediaRequest extends jspb.Message {
  getChunkdata(): Uint8Array | string;
  getChunkdata_asU8(): Uint8Array;
  getChunkdata_asB64(): string;
  setChunkdata(value: Uint8Array | string): UploadPostMediaRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UploadPostMediaRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UploadPostMediaRequest): UploadPostMediaRequest.AsObject;
  static serializeBinaryToWriter(message: UploadPostMediaRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UploadPostMediaRequest;
  static deserializeBinaryFromReader(message: UploadPostMediaRequest, reader: jspb.BinaryReader): UploadPostMediaRequest;
}

export namespace UploadPostMediaRequest {
  export type AsObject = {
    chunkdata: Uint8Array | string,
  }
}

export class UploadPostMediaResponse extends jspb.Message {
  getUploadpath(): string;
  setUploadpath(value: string): UploadPostMediaResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UploadPostMediaResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UploadPostMediaResponse): UploadPostMediaResponse.AsObject;
  static serializeBinaryToWriter(message: UploadPostMediaResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UploadPostMediaResponse;
  static deserializeBinaryFromReader(message: UploadPostMediaResponse, reader: jspb.BinaryReader): UploadPostMediaResponse;
}

export namespace UploadPostMediaResponse {
  export type AsObject = {
    uploadpath: string,
  }
}

export enum PostType { 
  FEED_POST = 0,
  QNA_QUESTION = 1,
  QNA_ANSWER = 2,
}
