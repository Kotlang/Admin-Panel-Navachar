import * as jspb from 'google-protobuf'



export class SocialStatusResponse extends jspb.Message {
  getStatus(): string;
  setStatus(value: string): SocialStatusResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SocialStatusResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SocialStatusResponse): SocialStatusResponse.AsObject;
  static serializeBinaryToWriter(message: SocialStatusResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SocialStatusResponse;
  static deserializeBinaryFromReader(message: SocialStatusResponse, reader: jspb.BinaryReader): SocialStatusResponse;
}

export namespace SocialStatusResponse {
  export type AsObject = {
    status: string,
  }
}

export class SocialProfile extends jspb.Message {
  getPhotourl(): string;
  setPhotourl(value: string): SocialProfile;

  getName(): string;
  setName(value: string): SocialProfile;

  getOccupation(): string;
  setOccupation(value: string): SocialProfile;

  getUserid(): string;
  setUserid(value: string): SocialProfile;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SocialProfile.AsObject;
  static toObject(includeInstance: boolean, msg: SocialProfile): SocialProfile.AsObject;
  static serializeBinaryToWriter(message: SocialProfile, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SocialProfile;
  static deserializeBinaryFromReader(message: SocialProfile, reader: jspb.BinaryReader): SocialProfile;
}

export namespace SocialProfile {
  export type AsObject = {
    photourl: string,
    name: string,
    occupation: string,
    userid: string,
  }
}

export class MediaUrl extends jspb.Message {
  getUrl(): string;
  setUrl(value: string): MediaUrl;

  getMimetype(): string;
  setMimetype(value: string): MediaUrl;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MediaUrl.AsObject;
  static toObject(includeInstance: boolean, msg: MediaUrl): MediaUrl.AsObject;
  static serializeBinaryToWriter(message: MediaUrl, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MediaUrl;
  static deserializeBinaryFromReader(message: MediaUrl, reader: jspb.BinaryReader): MediaUrl;
}

export namespace MediaUrl {
  export type AsObject = {
    url: string,
    mimetype: string,
  }
}

export class WebPreview extends jspb.Message {
  getTitle(): string;
  setTitle(value: string): WebPreview;

  getPreviewimage(): string;
  setPreviewimage(value: string): WebPreview;

  getUrl(): string;
  setUrl(value: string): WebPreview;

  getDescription(): string;
  setDescription(value: string): WebPreview;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WebPreview.AsObject;
  static toObject(includeInstance: boolean, msg: WebPreview): WebPreview.AsObject;
  static serializeBinaryToWriter(message: WebPreview, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WebPreview;
  static deserializeBinaryFromReader(message: WebPreview, reader: jspb.BinaryReader): WebPreview;
}

export namespace WebPreview {
  export type AsObject = {
    title: string,
    previewimage: string,
    url: string,
    description: string,
  }
}

export class Location extends jspb.Message {
  getLat(): number;
  setLat(value: number): Location;

  getLong(): number;
  setLong(value: number): Location;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Location.AsObject;
  static toObject(includeInstance: boolean, msg: Location): Location.AsObject;
  static serializeBinaryToWriter(message: Location, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Location;
  static deserializeBinaryFromReader(message: Location, reader: jspb.BinaryReader): Location;
}

export namespace Location {
  export type AsObject = {
    lat: number,
    pb_long: number,
  }
}

