import * as jspb from 'google-protobuf'



export class GetProfileMasterRequest extends jspb.Message {
  getLanguage(): string;
  setLanguage(value: string): GetProfileMasterRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetProfileMasterRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetProfileMasterRequest): GetProfileMasterRequest.AsObject;
  static serializeBinaryToWriter(message: GetProfileMasterRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetProfileMasterRequest;
  static deserializeBinaryFromReader(message: GetProfileMasterRequest, reader: jspb.BinaryReader): GetProfileMasterRequest;
}

export namespace GetProfileMasterRequest {
  export type AsObject = {
    language: string,
  }
}

export class ProfileMasterResponse extends jspb.Message {
  getProfilemasterlistList(): Array<ProfileMasterProto>;
  setProfilemasterlistList(value: Array<ProfileMasterProto>): ProfileMasterResponse;
  clearProfilemasterlistList(): ProfileMasterResponse;
  addProfilemasterlist(value?: ProfileMasterProto, index?: number): ProfileMasterProto;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProfileMasterResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ProfileMasterResponse): ProfileMasterResponse.AsObject;
  static serializeBinaryToWriter(message: ProfileMasterResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProfileMasterResponse;
  static deserializeBinaryFromReader(message: ProfileMasterResponse, reader: jspb.BinaryReader): ProfileMasterResponse;
}

export namespace ProfileMasterResponse {
  export type AsObject = {
    profilemasterlistList: Array<ProfileMasterProto.AsObject>,
  }
}

export class GetLanguagesRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetLanguagesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetLanguagesRequest): GetLanguagesRequest.AsObject;
  static serializeBinaryToWriter(message: GetLanguagesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetLanguagesRequest;
  static deserializeBinaryFromReader(message: GetLanguagesRequest, reader: jspb.BinaryReader): GetLanguagesRequest;
}

export namespace GetLanguagesRequest {
  export type AsObject = {
  }
}

export class LanguagesResponse extends jspb.Message {
  getLanguagesList(): Array<string>;
  setLanguagesList(value: Array<string>): LanguagesResponse;
  clearLanguagesList(): LanguagesResponse;
  addLanguages(value: string, index?: number): LanguagesResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LanguagesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: LanguagesResponse): LanguagesResponse.AsObject;
  static serializeBinaryToWriter(message: LanguagesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LanguagesResponse;
  static deserializeBinaryFromReader(message: LanguagesResponse, reader: jspb.BinaryReader): LanguagesResponse;
}

export namespace LanguagesResponse {
  export type AsObject = {
    languagesList: Array<string>,
  }
}

export class ProfileMasterProto extends jspb.Message {
  getId(): string;
  setId(value: string): ProfileMasterProto;

  getField(): string;
  setField(value: string): ProfileMasterProto;

  getType(): string;
  setType(value: string): ProfileMasterProto;

  getLanguage(): string;
  setLanguage(value: string): ProfileMasterProto;

  getOptionsList(): Array<string>;
  setOptionsList(value: Array<string>): ProfileMasterProto;
  clearOptionsList(): ProfileMasterProto;
  addOptions(value: string, index?: number): ProfileMasterProto;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProfileMasterProto.AsObject;
  static toObject(includeInstance: boolean, msg: ProfileMasterProto): ProfileMasterProto.AsObject;
  static serializeBinaryToWriter(message: ProfileMasterProto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProfileMasterProto;
  static deserializeBinaryFromReader(message: ProfileMasterProto, reader: jspb.BinaryReader): ProfileMasterProto;
}

export namespace ProfileMasterProto {
  export type AsObject = {
    id: string,
    field: string,
    type: string,
    language: string,
    optionsList: Array<string>,
  }
}

export class BulkGetProfileMasterRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BulkGetProfileMasterRequest.AsObject;
  static toObject(includeInstance: boolean, msg: BulkGetProfileMasterRequest): BulkGetProfileMasterRequest.AsObject;
  static serializeBinaryToWriter(message: BulkGetProfileMasterRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BulkGetProfileMasterRequest;
  static deserializeBinaryFromReader(message: BulkGetProfileMasterRequest, reader: jspb.BinaryReader): BulkGetProfileMasterRequest;
}

export namespace BulkGetProfileMasterRequest {
  export type AsObject = {
  }
}

export class DeleteProfileMasterRequest extends jspb.Message {
  getId(): string;
  setId(value: string): DeleteProfileMasterRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteProfileMasterRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteProfileMasterRequest): DeleteProfileMasterRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteProfileMasterRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteProfileMasterRequest;
  static deserializeBinaryFromReader(message: DeleteProfileMasterRequest, reader: jspb.BinaryReader): DeleteProfileMasterRequest;
}

export namespace DeleteProfileMasterRequest {
  export type AsObject = {
    id: string,
  }
}

export class DeleteProfileMasterResponse extends jspb.Message {
  getStatus(): string;
  setStatus(value: string): DeleteProfileMasterResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteProfileMasterResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteProfileMasterResponse): DeleteProfileMasterResponse.AsObject;
  static serializeBinaryToWriter(message: DeleteProfileMasterResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteProfileMasterResponse;
  static deserializeBinaryFromReader(message: DeleteProfileMasterResponse, reader: jspb.BinaryReader): DeleteProfileMasterResponse;
}

export namespace DeleteProfileMasterResponse {
  export type AsObject = {
    status: string,
  }
}

export class AddProfileMasterRequest extends jspb.Message {
  getField(): string;
  setField(value: string): AddProfileMasterRequest;

  getType(): string;
  setType(value: string): AddProfileMasterRequest;

  getLanguage(): string;
  setLanguage(value: string): AddProfileMasterRequest;

  getOptionsList(): Array<string>;
  setOptionsList(value: Array<string>): AddProfileMasterRequest;
  clearOptionsList(): AddProfileMasterRequest;
  addOptions(value: string, index?: number): AddProfileMasterRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddProfileMasterRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AddProfileMasterRequest): AddProfileMasterRequest.AsObject;
  static serializeBinaryToWriter(message: AddProfileMasterRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddProfileMasterRequest;
  static deserializeBinaryFromReader(message: AddProfileMasterRequest, reader: jspb.BinaryReader): AddProfileMasterRequest;
}

export namespace AddProfileMasterRequest {
  export type AsObject = {
    field: string,
    type: string,
    language: string,
    optionsList: Array<string>,
  }
}

