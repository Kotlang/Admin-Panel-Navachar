import * as jspb from 'google-protobuf'

import * as commons_pb from './commons_pb'; // proto import: "commons.proto"


export class UserGpsLocation extends jspb.Message {
  getX(): number;
  setX(value: number): UserGpsLocation;

  getY(): number;
  setY(value: number): UserGpsLocation;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserGpsLocation.AsObject;
  static toObject(includeInstance: boolean, msg: UserGpsLocation): UserGpsLocation.AsObject;
  static serializeBinaryToWriter(message: UserGpsLocation, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserGpsLocation;
  static deserializeBinaryFromReader(message: UserGpsLocation, reader: jspb.BinaryReader): UserGpsLocation;
}

export namespace UserGpsLocation {
  export type AsObject = {
    x: number,
    y: number,
  }
}

export class GetNearbyRequest extends jspb.Message {
  getPagesize(): number;
  setPagesize(value: number): GetNearbyRequest;

  getPagenumber(): number;
  setPagenumber(value: number): GetNearbyRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetNearbyRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetNearbyRequest): GetNearbyRequest.AsObject;
  static serializeBinaryToWriter(message: GetNearbyRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetNearbyRequest;
  static deserializeBinaryFromReader(message: GetNearbyRequest, reader: jspb.BinaryReader): GetNearbyRequest;
}

export namespace GetNearbyRequest {
  export type AsObject = {
    pagesize: number,
    pagenumber: number,
  }
}

export class GetNearbyResponse extends jspb.Message {
  getUsersList(): Array<string>;
  setUsersList(value: Array<string>): GetNearbyResponse;
  clearUsersList(): GetNearbyResponse;
  addUsers(value: string, index?: number): GetNearbyResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetNearbyResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetNearbyResponse): GetNearbyResponse.AsObject;
  static serializeBinaryToWriter(message: GetNearbyResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetNearbyResponse;
  static deserializeBinaryFromReader(message: GetNearbyResponse, reader: jspb.BinaryReader): GetNearbyResponse;
}

export namespace GetNearbyResponse {
  export type AsObject = {
    usersList: Array<string>,
  }
}

