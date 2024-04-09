import * as jspb from 'google-protobuf'

import * as common_pb from './common_pb';


export class IsUserAdminResponse extends jspb.Message {
  getIsadmin(): boolean;
  setIsadmin(value: boolean): IsUserAdminResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IsUserAdminResponse.AsObject;
  static toObject(includeInstance: boolean, msg: IsUserAdminResponse): IsUserAdminResponse.AsObject;
  static serializeBinaryToWriter(message: IsUserAdminResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IsUserAdminResponse;
  static deserializeBinaryFromReader(message: IsUserAdminResponse, reader: jspb.BinaryReader): IsUserAdminResponse;
}

export namespace IsUserAdminResponse {
  export type AsObject = {
    isadmin: boolean,
  }
}

export class GetProfileDeletionRequest extends jspb.Message {
  getPagesize(): number;
  setPagesize(value: number): GetProfileDeletionRequest;

  getPagenumber(): number;
  setPagenumber(value: number): GetProfileDeletionRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetProfileDeletionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetProfileDeletionRequest): GetProfileDeletionRequest.AsObject;
  static serializeBinaryToWriter(message: GetProfileDeletionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetProfileDeletionRequest;
  static deserializeBinaryFromReader(message: GetProfileDeletionRequest, reader: jspb.BinaryReader): GetProfileDeletionRequest;
}

export namespace GetProfileDeletionRequest {
  export type AsObject = {
    pagesize: number,
    pagenumber: number,
  }
}

export class ProfileDeletionRequest extends jspb.Message {
  getReason(): string;
  setReason(value: string): ProfileDeletionRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProfileDeletionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ProfileDeletionRequest): ProfileDeletionRequest.AsObject;
  static serializeBinaryToWriter(message: ProfileDeletionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProfileDeletionRequest;
  static deserializeBinaryFromReader(message: ProfileDeletionRequest, reader: jspb.BinaryReader): ProfileDeletionRequest;
}

export namespace ProfileDeletionRequest {
  export type AsObject = {
    reason: string,
  }
}

export class ChangeUserTypeRequest extends jspb.Message {
  getEmail(): string;
  setEmail(value: string): ChangeUserTypeRequest;

  getPhone(): string;
  setPhone(value: string): ChangeUserTypeRequest;

  getUsertype(): UserType;
  setUsertype(value: UserType): ChangeUserTypeRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChangeUserTypeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ChangeUserTypeRequest): ChangeUserTypeRequest.AsObject;
  static serializeBinaryToWriter(message: ChangeUserTypeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChangeUserTypeRequest;
  static deserializeBinaryFromReader(message: ChangeUserTypeRequest, reader: jspb.BinaryReader): ChangeUserTypeRequest;
}

export namespace ChangeUserTypeRequest {
  export type AsObject = {
    email: string,
    phone: string,
    usertype: UserType,
  }
}

export enum UserType { 
  MEMBER = 0,
  ADMIN = 1,
}
