import * as jspb from 'google-protobuf'



export class GetAllLabelsByISOCodeRequest extends jspb.Message {
  getIsocode(): string;
  setIsocode(value: string): GetAllLabelsByISOCodeRequest;

  getDomain(): string;
  setDomain(value: string): GetAllLabelsByISOCodeRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAllLabelsByISOCodeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetAllLabelsByISOCodeRequest): GetAllLabelsByISOCodeRequest.AsObject;
  static serializeBinaryToWriter(message: GetAllLabelsByISOCodeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAllLabelsByISOCodeRequest;
  static deserializeBinaryFromReader(message: GetAllLabelsByISOCodeRequest, reader: jspb.BinaryReader): GetAllLabelsByISOCodeRequest;
}

export namespace GetAllLabelsByISOCodeRequest {
  export type AsObject = {
    isocode: string,
    domain: string,
  }
}

export class GetLabelRequest extends jspb.Message {
  getIsocode(): string;
  setIsocode(value: string): GetLabelRequest;

  getKey(): string;
  setKey(value: string): GetLabelRequest;

  getDomain(): string;
  setDomain(value: string): GetLabelRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetLabelRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetLabelRequest): GetLabelRequest.AsObject;
  static serializeBinaryToWriter(message: GetLabelRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetLabelRequest;
  static deserializeBinaryFromReader(message: GetLabelRequest, reader: jspb.BinaryReader): GetLabelRequest;
}

export namespace GetLabelRequest {
  export type AsObject = {
    isocode: string,
    key: string,
    domain: string,
  }
}

export class LocalizedLabelsResponse extends jspb.Message {
  getLocalizedlabellistList(): Array<LocalizedLabel>;
  setLocalizedlabellistList(value: Array<LocalizedLabel>): LocalizedLabelsResponse;
  clearLocalizedlabellistList(): LocalizedLabelsResponse;
  addLocalizedlabellist(value?: LocalizedLabel, index?: number): LocalizedLabel;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LocalizedLabelsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: LocalizedLabelsResponse): LocalizedLabelsResponse.AsObject;
  static serializeBinaryToWriter(message: LocalizedLabelsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LocalizedLabelsResponse;
  static deserializeBinaryFromReader(message: LocalizedLabelsResponse, reader: jspb.BinaryReader): LocalizedLabelsResponse;
}

export namespace LocalizedLabelsResponse {
  export type AsObject = {
    localizedlabellistList: Array<LocalizedLabel.AsObject>,
  }
}

export class LocalizedLabel extends jspb.Message {
  getKey(): string;
  setKey(value: string): LocalizedLabel;

  getValue(): string;
  setValue(value: string): LocalizedLabel;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LocalizedLabel.AsObject;
  static toObject(includeInstance: boolean, msg: LocalizedLabel): LocalizedLabel.AsObject;
  static serializeBinaryToWriter(message: LocalizedLabel, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LocalizedLabel;
  static deserializeBinaryFromReader(message: LocalizedLabel, reader: jspb.BinaryReader): LocalizedLabel;
}

export namespace LocalizedLabel {
  export type AsObject = {
    key: string,
    value: string,
  }
}

export class GetCurrentVersionRequest extends jspb.Message {
  getDomain(): string;
  setDomain(value: string): GetCurrentVersionRequest;

  getIsocode(): string;
  setIsocode(value: string): GetCurrentVersionRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetCurrentVersionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetCurrentVersionRequest): GetCurrentVersionRequest.AsObject;
  static serializeBinaryToWriter(message: GetCurrentVersionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetCurrentVersionRequest;
  static deserializeBinaryFromReader(message: GetCurrentVersionRequest, reader: jspb.BinaryReader): GetCurrentVersionRequest;
}

export namespace GetCurrentVersionRequest {
  export type AsObject = {
    domain: string,
    isocode: string,
  }
}

export class GetCurrentVersionResponse extends jspb.Message {
  getVersion(): string;
  setVersion(value: string): GetCurrentVersionResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetCurrentVersionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetCurrentVersionResponse): GetCurrentVersionResponse.AsObject;
  static serializeBinaryToWriter(message: GetCurrentVersionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetCurrentVersionResponse;
  static deserializeBinaryFromReader(message: GetCurrentVersionResponse, reader: jspb.BinaryReader): GetCurrentVersionResponse;
}

export namespace GetCurrentVersionResponse {
  export type AsObject = {
    version: string,
  }
}

export class GetAllLanguagesRequest extends jspb.Message {
  getDomain(): string;
  setDomain(value: string): GetAllLanguagesRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAllLanguagesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetAllLanguagesRequest): GetAllLanguagesRequest.AsObject;
  static serializeBinaryToWriter(message: GetAllLanguagesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAllLanguagesRequest;
  static deserializeBinaryFromReader(message: GetAllLanguagesRequest, reader: jspb.BinaryReader): GetAllLanguagesRequest;
}

export namespace GetAllLanguagesRequest {
  export type AsObject = {
    domain: string,
  }
}

export class GetAllLanguagesResponse extends jspb.Message {
  getLanguagelistList(): Array<LanguageDetail>;
  setLanguagelistList(value: Array<LanguageDetail>): GetAllLanguagesResponse;
  clearLanguagelistList(): GetAllLanguagesResponse;
  addLanguagelist(value?: LanguageDetail, index?: number): LanguageDetail;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAllLanguagesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetAllLanguagesResponse): GetAllLanguagesResponse.AsObject;
  static serializeBinaryToWriter(message: GetAllLanguagesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAllLanguagesResponse;
  static deserializeBinaryFromReader(message: GetAllLanguagesResponse, reader: jspb.BinaryReader): GetAllLanguagesResponse;
}

export namespace GetAllLanguagesResponse {
  export type AsObject = {
    languagelistList: Array<LanguageDetail.AsObject>,
  }
}

export class LanguageDetail extends jspb.Message {
  getLanguage(): string;
  setLanguage(value: string): LanguageDetail;

  getIsocode(): string;
  setIsocode(value: string): LanguageDetail;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LanguageDetail.AsObject;
  static toObject(includeInstance: boolean, msg: LanguageDetail): LanguageDetail.AsObject;
  static serializeBinaryToWriter(message: LanguageDetail, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LanguageDetail;
  static deserializeBinaryFromReader(message: LanguageDetail, reader: jspb.BinaryReader): LanguageDetail;
}

export namespace LanguageDetail {
  export type AsObject = {
    language: string,
    isocode: string,
  }
}

