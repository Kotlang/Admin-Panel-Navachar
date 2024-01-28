import * as jspb from 'google-protobuf'



export class AddLabelRequest extends jspb.Message {
  getKey(): string;
  setKey(value: string): AddLabelRequest;

  getValue(): string;
  setValue(value: string): AddLabelRequest;

  getLanguage(): string;
  setLanguage(value: string): AddLabelRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddLabelRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AddLabelRequest): AddLabelRequest.AsObject;
  static serializeBinaryToWriter(message: AddLabelRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddLabelRequest;
  static deserializeBinaryFromReader(message: AddLabelRequest, reader: jspb.BinaryReader): AddLabelRequest;
}

export namespace AddLabelRequest {
  export type AsObject = {
    key: string,
    value: string,
    language: string,
  }
}

export class AddLabelResponse extends jspb.Message {
  getStatus(): string;
  setStatus(value: string): AddLabelResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddLabelResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AddLabelResponse): AddLabelResponse.AsObject;
  static serializeBinaryToWriter(message: AddLabelResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddLabelResponse;
  static deserializeBinaryFromReader(message: AddLabelResponse, reader: jspb.BinaryReader): AddLabelResponse;
}

export namespace AddLabelResponse {
  export type AsObject = {
    status: string,
  }
}

export class AddLanguageRequest extends jspb.Message {
  getLanguage(): string;
  setLanguage(value: string): AddLanguageRequest;

  getIsocode(): string;
  setIsocode(value: string): AddLanguageRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddLanguageRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AddLanguageRequest): AddLanguageRequest.AsObject;
  static serializeBinaryToWriter(message: AddLanguageRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddLanguageRequest;
  static deserializeBinaryFromReader(message: AddLanguageRequest, reader: jspb.BinaryReader): AddLanguageRequest;
}

export namespace AddLanguageRequest {
  export type AsObject = {
    language: string,
    isocode: string,
  }
}

export class AddLanguageResponse extends jspb.Message {
  getStatus(): string;
  setStatus(value: string): AddLanguageResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddLanguageResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AddLanguageResponse): AddLanguageResponse.AsObject;
  static serializeBinaryToWriter(message: AddLanguageResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddLanguageResponse;
  static deserializeBinaryFromReader(message: AddLanguageResponse, reader: jspb.BinaryReader): AddLanguageResponse;
}

export namespace AddLanguageResponse {
  export type AsObject = {
    status: string,
  }
}

