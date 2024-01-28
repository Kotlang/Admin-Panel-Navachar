import * as jspb from 'google-protobuf'

import * as common_pb from './common_pb'; // proto import: "common.proto"


export class LoginRequest extends jspb.Message {
  getEmailorphone(): string;
  setEmailorphone(value: string): LoginRequest;

  getDomain(): string;
  setDomain(value: string): LoginRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoginRequest.AsObject;
  static toObject(includeInstance: boolean, msg: LoginRequest): LoginRequest.AsObject;
  static serializeBinaryToWriter(message: LoginRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoginRequest;
  static deserializeBinaryFromReader(message: LoginRequest, reader: jspb.BinaryReader): LoginRequest;
}

export namespace LoginRequest {
  export type AsObject = {
    emailorphone: string,
    domain: string,
  }
}

export class AuthResponse extends jspb.Message {
  getJwt(): string;
  setJwt(value: string): AuthResponse;

  getUsertype(): string;
  setUsertype(value: string): AuthResponse;

  getProfile(): common_pb.UserProfileProto | undefined;
  setProfile(value?: common_pb.UserProfileProto): AuthResponse;
  hasProfile(): boolean;
  clearProfile(): AuthResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AuthResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AuthResponse): AuthResponse.AsObject;
  static serializeBinaryToWriter(message: AuthResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AuthResponse;
  static deserializeBinaryFromReader(message: AuthResponse, reader: jspb.BinaryReader): AuthResponse;
}

export namespace AuthResponse {
  export type AsObject = {
    jwt: string,
    usertype: string,
    profile?: common_pb.UserProfileProto.AsObject,
  }
}

export class VerifyRequest extends jspb.Message {
  getEmailorphone(): string;
  setEmailorphone(value: string): VerifyRequest;

  getOtp(): string;
  setOtp(value: string): VerifyRequest;

  getDomain(): string;
  setDomain(value: string): VerifyRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VerifyRequest.AsObject;
  static toObject(includeInstance: boolean, msg: VerifyRequest): VerifyRequest.AsObject;
  static serializeBinaryToWriter(message: VerifyRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VerifyRequest;
  static deserializeBinaryFromReader(message: VerifyRequest, reader: jspb.BinaryReader): VerifyRequest;
}

export namespace VerifyRequest {
  export type AsObject = {
    emailorphone: string,
    otp: string,
    domain: string,
  }
}

