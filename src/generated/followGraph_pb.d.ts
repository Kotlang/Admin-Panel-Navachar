import * as jspb from 'google-protobuf'

import * as commons_pb from './commons_pb'; // proto import: "commons.proto"


export class FollowUserRequest extends jspb.Message {
  getUserid(): string;
  setUserid(value: string): FollowUserRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FollowUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: FollowUserRequest): FollowUserRequest.AsObject;
  static serializeBinaryToWriter(message: FollowUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FollowUserRequest;
  static deserializeBinaryFromReader(message: FollowUserRequest, reader: jspb.BinaryReader): FollowUserRequest;
}

export namespace FollowUserRequest {
  export type AsObject = {
    userid: string,
  }
}

export class UnFollowUserRequest extends jspb.Message {
  getUserid(): string;
  setUserid(value: string): UnFollowUserRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UnFollowUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UnFollowUserRequest): UnFollowUserRequest.AsObject;
  static serializeBinaryToWriter(message: UnFollowUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UnFollowUserRequest;
  static deserializeBinaryFromReader(message: UnFollowUserRequest, reader: jspb.BinaryReader): UnFollowUserRequest;
}

export namespace UnFollowUserRequest {
  export type AsObject = {
    userid: string,
  }
}

export class GetFollowersRequest extends jspb.Message {
  getUserid(): string;
  setUserid(value: string): GetFollowersRequest;

  getPagesize(): number;
  setPagesize(value: number): GetFollowersRequest;

  getPagenumber(): number;
  setPagenumber(value: number): GetFollowersRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetFollowersRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetFollowersRequest): GetFollowersRequest.AsObject;
  static serializeBinaryToWriter(message: GetFollowersRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetFollowersRequest;
  static deserializeBinaryFromReader(message: GetFollowersRequest, reader: jspb.BinaryReader): GetFollowersRequest;
}

export namespace GetFollowersRequest {
  export type AsObject = {
    userid: string,
    pagesize: number,
    pagenumber: number,
  }
}

export class GetFollowersResponse extends jspb.Message {
  getFollowersList(): Array<commons_pb.SocialProfile>;
  setFollowersList(value: Array<commons_pb.SocialProfile>): GetFollowersResponse;
  clearFollowersList(): GetFollowersResponse;
  addFollowers(value?: commons_pb.SocialProfile, index?: number): commons_pb.SocialProfile;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetFollowersResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetFollowersResponse): GetFollowersResponse.AsObject;
  static serializeBinaryToWriter(message: GetFollowersResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetFollowersResponse;
  static deserializeBinaryFromReader(message: GetFollowersResponse, reader: jspb.BinaryReader): GetFollowersResponse;
}

export namespace GetFollowersResponse {
  export type AsObject = {
    followersList: Array<commons_pb.SocialProfile.AsObject>,
  }
}

export class GetFollowingRequest extends jspb.Message {
  getUserid(): string;
  setUserid(value: string): GetFollowingRequest;

  getPagesize(): number;
  setPagesize(value: number): GetFollowingRequest;

  getPagenumber(): number;
  setPagenumber(value: number): GetFollowingRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetFollowingRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetFollowingRequest): GetFollowingRequest.AsObject;
  static serializeBinaryToWriter(message: GetFollowingRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetFollowingRequest;
  static deserializeBinaryFromReader(message: GetFollowingRequest, reader: jspb.BinaryReader): GetFollowingRequest;
}

export namespace GetFollowingRequest {
  export type AsObject = {
    userid: string,
    pagesize: number,
    pagenumber: number,
  }
}

export class GetFollowingResponse extends jspb.Message {
  getFollowingList(): Array<commons_pb.SocialProfile>;
  setFollowingList(value: Array<commons_pb.SocialProfile>): GetFollowingResponse;
  clearFollowingList(): GetFollowingResponse;
  addFollowing(value?: commons_pb.SocialProfile, index?: number): commons_pb.SocialProfile;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetFollowingResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetFollowingResponse): GetFollowingResponse.AsObject;
  static serializeBinaryToWriter(message: GetFollowingResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetFollowingResponse;
  static deserializeBinaryFromReader(message: GetFollowingResponse, reader: jspb.BinaryReader): GetFollowingResponse;
}

export namespace GetFollowingResponse {
  export type AsObject = {
    followingList: Array<commons_pb.SocialProfile.AsObject>,
  }
}

export class IsFollowingRequest extends jspb.Message {
  getFollower(): string;
  setFollower(value: string): IsFollowingRequest;

  getFollowee(): string;
  setFollowee(value: string): IsFollowingRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IsFollowingRequest.AsObject;
  static toObject(includeInstance: boolean, msg: IsFollowingRequest): IsFollowingRequest.AsObject;
  static serializeBinaryToWriter(message: IsFollowingRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IsFollowingRequest;
  static deserializeBinaryFromReader(message: IsFollowingRequest, reader: jspb.BinaryReader): IsFollowingRequest;
}

export namespace IsFollowingRequest {
  export type AsObject = {
    follower: string,
    followee: string,
  }
}

export class IsFollowingResponse extends jspb.Message {
  getIsfollowing(): boolean;
  setIsfollowing(value: boolean): IsFollowingResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IsFollowingResponse.AsObject;
  static toObject(includeInstance: boolean, msg: IsFollowingResponse): IsFollowingResponse.AsObject;
  static serializeBinaryToWriter(message: IsFollowingResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IsFollowingResponse;
  static deserializeBinaryFromReader(message: IsFollowingResponse, reader: jspb.BinaryReader): IsFollowingResponse;
}

export namespace IsFollowingResponse {
  export type AsObject = {
    isfollowing: boolean,
  }
}

