import * as jspb from 'google-protobuf'



export class Url extends jspb.Message {
  getUrltype(): UrlType;
  setUrltype(value: UrlType): Url;

  getLink(): string;
  setLink(value: string): Url;

  getUrlparametersMap(): jspb.Map<string, string>;
  clearUrlparametersMap(): Url;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Url.AsObject;
  static toObject(includeInstance: boolean, msg: Url): Url.AsObject;
  static serializeBinaryToWriter(message: Url, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Url;
  static deserializeBinaryFromReader(message: Url, reader: jspb.BinaryReader): Url;
}

export namespace Url {
  export type AsObject = {
    urltype: UrlType,
    link: string,
    urlparametersMap: Array<[string, string]>,
  }
}

export class CallToActionButtons extends jspb.Message {
  getActiontype(): ActionType;
  setActiontype(value: ActionType): CallToActionButtons;

  getText(): string;
  setText(value: string): CallToActionButtons;

  getPhonenumber(): string;
  setPhonenumber(value: string): CallToActionButtons;

  getUrl(): Url | undefined;
  setUrl(value?: Url): CallToActionButtons;
  hasUrl(): boolean;
  clearUrl(): CallToActionButtons;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CallToActionButtons.AsObject;
  static toObject(includeInstance: boolean, msg: CallToActionButtons): CallToActionButtons.AsObject;
  static serializeBinaryToWriter(message: CallToActionButtons, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CallToActionButtons;
  static deserializeBinaryFromReader(message: CallToActionButtons, reader: jspb.BinaryReader): CallToActionButtons;
}

export namespace CallToActionButtons {
  export type AsObject = {
    actiontype: ActionType,
    text: string,
    phonenumber: string,
    url?: Url.AsObject,
  }
}

export class QuickReplyButtons extends jspb.Message {
  getText(): string;
  setText(value: string): QuickReplyButtons;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QuickReplyButtons.AsObject;
  static toObject(includeInstance: boolean, msg: QuickReplyButtons): QuickReplyButtons.AsObject;
  static serializeBinaryToWriter(message: QuickReplyButtons, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QuickReplyButtons;
  static deserializeBinaryFromReader(message: QuickReplyButtons, reader: jspb.BinaryReader): QuickReplyButtons;
}

export namespace QuickReplyButtons {
  export type AsObject = {
    text: string,
  }
}

export class Button extends jspb.Message {
  getCalltoactionbuttonsList(): Array<CallToActionButtons>;
  setCalltoactionbuttonsList(value: Array<CallToActionButtons>): Button;
  clearCalltoactionbuttonsList(): Button;
  addCalltoactionbuttons(value?: CallToActionButtons, index?: number): CallToActionButtons;

  getQuickreplybuttonsList(): Array<QuickReplyButtons>;
  setQuickreplybuttonsList(value: Array<QuickReplyButtons>): Button;
  clearQuickreplybuttonsList(): Button;
  addQuickreplybuttons(value?: QuickReplyButtons, index?: number): QuickReplyButtons;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Button.AsObject;
  static toObject(includeInstance: boolean, msg: Button): Button.AsObject;
  static serializeBinaryToWriter(message: Button, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Button;
  static deserializeBinaryFromReader(message: Button, reader: jspb.BinaryReader): Button;
}

export namespace Button {
  export type AsObject = {
    calltoactionbuttonsList: Array<CallToActionButtons.AsObject>,
    quickreplybuttonsList: Array<QuickReplyButtons.AsObject>,
  }
}

export class MediaParameters extends jspb.Message {
  getMediatype(): MediaType;
  setMediatype(value: MediaType): MediaParameters;

  getLink(): string;
  setLink(value: string): MediaParameters;

  getFilename(): string;
  setFilename(value: string): MediaParameters;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MediaParameters.AsObject;
  static toObject(includeInstance: boolean, msg: MediaParameters): MediaParameters.AsObject;
  static serializeBinaryToWriter(message: MediaParameters, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MediaParameters;
  static deserializeBinaryFromReader(message: MediaParameters, reader: jspb.BinaryReader): MediaParameters;
}

export namespace MediaParameters {
  export type AsObject = {
    mediatype: MediaType,
    link: string,
    filename: string,
  }
}

export class MessagingTemplate extends jspb.Message {
  getTemplateid(): string;
  setTemplateid(value: string): MessagingTemplate;

  getTemplatename(): string;
  setTemplatename(value: string): MessagingTemplate;

  getMediaparameters(): MediaParameters | undefined;
  setMediaparameters(value?: MediaParameters): MessagingTemplate;
  hasMediaparameters(): boolean;
  clearMediaparameters(): MessagingTemplate;

  getHeader(): string;
  setHeader(value: string): MessagingTemplate;

  getHeaderparametersMap(): jspb.Map<string, string>;
  clearHeaderparametersMap(): MessagingTemplate;

  getBody(): string;
  setBody(value: string): MessagingTemplate;

  getBodyparametersMap(): jspb.Map<string, string>;
  clearBodyparametersMap(): MessagingTemplate;

  getFooter(): string;
  setFooter(value: string): MessagingTemplate;

  getCategory(): Category;
  setCategory(value: Category): MessagingTemplate;

  getWabaid(): string;
  setWabaid(value: string): MessagingTemplate;

  getButtontype(): ButtonType;
  setButtontype(value: ButtonType): MessagingTemplate;

  getButtons(): Button | undefined;
  setButtons(value?: Button): MessagingTemplate;
  hasButtons(): boolean;
  clearButtons(): MessagingTemplate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessagingTemplate.AsObject;
  static toObject(includeInstance: boolean, msg: MessagingTemplate): MessagingTemplate.AsObject;
  static serializeBinaryToWriter(message: MessagingTemplate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessagingTemplate;
  static deserializeBinaryFromReader(message: MessagingTemplate, reader: jspb.BinaryReader): MessagingTemplate;
}

export namespace MessagingTemplate {
  export type AsObject = {
    templateid: string,
    templatename: string,
    mediaparameters?: MediaParameters.AsObject,
    header: string,
    headerparametersMap: Array<[string, string]>,
    body: string,
    bodyparametersMap: Array<[string, string]>,
    footer: string,
    category: Category,
    wabaid: string,
    buttontype: ButtonType,
    buttons?: Button.AsObject,
  }
}

export class UniqueMessageRequest extends jspb.Message {
  getMessagesList(): Array<MesssageRequest>;
  setMessagesList(value: Array<MesssageRequest>): UniqueMessageRequest;
  clearMessagesList(): UniqueMessageRequest;
  addMessages(value?: MesssageRequest, index?: number): MesssageRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UniqueMessageRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UniqueMessageRequest): UniqueMessageRequest.AsObject;
  static serializeBinaryToWriter(message: UniqueMessageRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UniqueMessageRequest;
  static deserializeBinaryFromReader(message: UniqueMessageRequest, reader: jspb.BinaryReader): UniqueMessageRequest;
}

export namespace UniqueMessageRequest {
  export type AsObject = {
    messagesList: Array<MesssageRequest.AsObject>,
  }
}

export class MesssageRequest extends jspb.Message {
  getTemplateid(): string;
  setTemplateid(value: string): MesssageRequest;

  getHeaderparametersMap(): jspb.Map<string, string>;
  clearHeaderparametersMap(): MesssageRequest;

  getBodyparametersMap(): jspb.Map<string, string>;
  clearBodyparametersMap(): MesssageRequest;

  getButtonparametersMap(): jspb.Map<string, string>;
  clearButtonparametersMap(): MesssageRequest;

  getMediaparameters(): MediaParameters | undefined;
  setMediaparameters(value?: MediaParameters): MesssageRequest;
  hasMediaparameters(): boolean;
  clearMediaparameters(): MesssageRequest;

  getRecipientphonenumberList(): Array<string>;
  setRecipientphonenumberList(value: Array<string>): MesssageRequest;
  clearRecipientphonenumberList(): MesssageRequest;
  addRecipientphonenumber(value: string, index?: number): MesssageRequest;

  getWabaid(): string;
  setWabaid(value: string): MesssageRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MesssageRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MesssageRequest): MesssageRequest.AsObject;
  static serializeBinaryToWriter(message: MesssageRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MesssageRequest;
  static deserializeBinaryFromReader(message: MesssageRequest, reader: jspb.BinaryReader): MesssageRequest;
}

export namespace MesssageRequest {
  export type AsObject = {
    templateid: string,
    headerparametersMap: Array<[string, string]>,
    bodyparametersMap: Array<[string, string]>,
    buttonparametersMap: Array<[string, string]>,
    mediaparameters?: MediaParameters.AsObject,
    recipientphonenumberList: Array<string>,
    wabaid: string,
  }
}

export class IdRequest extends jspb.Message {
  getId(): string;
  setId(value: string): IdRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: IdRequest): IdRequest.AsObject;
  static serializeBinaryToWriter(message: IdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IdRequest;
  static deserializeBinaryFromReader(message: IdRequest, reader: jspb.BinaryReader): IdRequest;
}

export namespace IdRequest {
  export type AsObject = {
    id: string,
  }
}

export class StatusResponse extends jspb.Message {
  getStatus(): string;
  setStatus(value: string): StatusResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StatusResponse.AsObject;
  static toObject(includeInstance: boolean, msg: StatusResponse): StatusResponse.AsObject;
  static serializeBinaryToWriter(message: StatusResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StatusResponse;
  static deserializeBinaryFromReader(message: StatusResponse, reader: jspb.BinaryReader): StatusResponse;
}

export namespace StatusResponse {
  export type AsObject = {
    status: string,
  }
}

export enum MediaType { 
  IMAGE = 0,
  VIDEO = 1,
  AUDIO = 2,
}
export enum Category { 
  AUTHENTICATION = 0,
  MARKETING = 1,
  UTILITY = 2,
}
export enum ButtonType { 
  NONE = 0,
  CALLTOACTION = 1,
  QUICKREPLY = 2,
}
export enum ActionType { 
  CALLPHONENUMBER = 0,
  VISITWEBSITE = 1,
}
export enum UrlType { 
  STATIC = 0,
  DYNAMIC = 1,
}
