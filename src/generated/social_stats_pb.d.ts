import * as jspb from 'google-protobuf'



export class GetStatsRequest extends jspb.Message {
  getUserid(): string;
  setUserid(value: string): GetStatsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetStatsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetStatsRequest): GetStatsRequest.AsObject;
  static serializeBinaryToWriter(message: GetStatsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetStatsRequest;
  static deserializeBinaryFromReader(message: GetStatsRequest, reader: jspb.BinaryReader): GetStatsRequest;
}

export namespace GetStatsRequest {
  export type AsObject = {
    userid: string,
  }
}

export class GetStatsResponse extends jspb.Message {
  getFollowerscount(): number;
  setFollowerscount(value: number): GetStatsResponse;

  getFollowingcount(): number;
  setFollowingcount(value: number): GetStatsResponse;

  getPostscount(): number;
  setPostscount(value: number): GetStatsResponse;

  getReactcount(): number;
  setReactcount(value: number): GetStatsResponse;

  getCommentscount(): number;
  setCommentscount(value: number): GetStatsResponse;

  getEventscount(): number;
  setEventscount(value: number): GetStatsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetStatsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetStatsResponse): GetStatsResponse.AsObject;
  static serializeBinaryToWriter(message: GetStatsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetStatsResponse;
  static deserializeBinaryFromReader(message: GetStatsResponse, reader: jspb.BinaryReader): GetStatsResponse;
}

export namespace GetStatsResponse {
  export type AsObject = {
    followerscount: number,
    followingcount: number,
    postscount: number,
    reactcount: number,
    commentscount: number,
    eventscount: number,
  }
}

