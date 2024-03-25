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

export class ScheduleInfo extends jspb.Message {
  getIsscheduled(): boolean;
  setIsscheduled(value: boolean): ScheduleInfo;

  getScheduledtime(): number;
  setScheduledtime(value: number): ScheduleInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ScheduleInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ScheduleInfo): ScheduleInfo.AsObject;
  static serializeBinaryToWriter(message: ScheduleInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ScheduleInfo;
  static deserializeBinaryFromReader(message: ScheduleInfo, reader: jspb.BinaryReader): ScheduleInfo;
}

export namespace ScheduleInfo {
  export type AsObject = {
    isscheduled: boolean,
    scheduledtime: number,
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

  getPreview(): string;
  setPreview(value: string): MesssageRequest;

  getScheduleinfo(): ScheduleInfo | undefined;
  setScheduleinfo(value?: ScheduleInfo): MesssageRequest;
  hasScheduleinfo(): boolean;
  clearScheduleinfo(): MesssageRequest;

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
    preview: string,
    scheduleinfo?: ScheduleInfo.AsObject,
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

export class MessagingTemplateList extends jspb.Message {
  getTemplatesList(): Array<MessagingTemplate>;
  setTemplatesList(value: Array<MessagingTemplate>): MessagingTemplateList;
  clearTemplatesList(): MessagingTemplateList;
  addTemplates(value?: MessagingTemplate, index?: number): MessagingTemplate;

  getTotalcount(): number;
  setTotalcount(value: number): MessagingTemplateList;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessagingTemplateList.AsObject;
  static toObject(includeInstance: boolean, msg: MessagingTemplateList): MessagingTemplateList.AsObject;
  static serializeBinaryToWriter(message: MessagingTemplateList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessagingTemplateList;
  static deserializeBinaryFromReader(message: MessagingTemplateList, reader: jspb.BinaryReader): MessagingTemplateList;
}

export namespace MessagingTemplateList {
  export type AsObject = {
    templatesList: Array<MessagingTemplate.AsObject>,
    totalcount: number,
  }
}

export class FetchTemplateRequest extends jspb.Message {
  getTemplateid(): string;
  setTemplateid(value: string): FetchTemplateRequest;

  getTemplatename(): string;
  setTemplatename(value: string): FetchTemplateRequest;

  getPagenumber(): number;
  setPagenumber(value: number): FetchTemplateRequest;

  getPagesize(): number;
  setPagesize(value: number): FetchTemplateRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FetchTemplateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: FetchTemplateRequest): FetchTemplateRequest.AsObject;
  static serializeBinaryToWriter(message: FetchTemplateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FetchTemplateRequest;
  static deserializeBinaryFromReader(message: FetchTemplateRequest, reader: jspb.BinaryReader): FetchTemplateRequest;
}

export namespace FetchTemplateRequest {
  export type AsObject = {
    templateid: string,
    templatename: string,
    pagenumber: number,
    pagesize: number,
  }
}

export class MessageProto extends jspb.Message {
  getMessageid(): string;
  setMessageid(value: string): MessageProto;

  getSender(): string;
  setSender(value: string): MessageProto;

  getRecipientsList(): Array<string>;
  setRecipientsList(value: Array<string>): MessageProto;
  clearRecipientsList(): MessageProto;
  addRecipients(value: string, index?: number): MessageProto;

  getMessage(): string;
  setMessage(value: string): MessageProto;

  getRecievedbyList(): Array<string>;
  setRecievedbyList(value: Array<string>): MessageProto;
  clearRecievedbyList(): MessageProto;
  addRecievedby(value: string, index?: number): MessageProto;

  getReadbyList(): Array<string>;
  setReadbyList(value: Array<string>): MessageProto;
  clearReadbyList(): MessageProto;
  addReadby(value: string, index?: number): MessageProto;

  getRespondedbyList(): Array<string>;
  setRespondedbyList(value: Array<string>): MessageProto;
  clearRespondedbyList(): MessageProto;
  addRespondedby(value: string, index?: number): MessageProto;

  getFailedrecipientsList(): Array<string>;
  setFailedrecipientsList(value: Array<string>): MessageProto;
  clearFailedrecipientsList(): MessageProto;
  addFailedrecipients(value: string, index?: number): MessageProto;

  getCreatedon(): number;
  setCreatedon(value: number): MessageProto;

  getScheduleinfo(): ScheduleInfo | undefined;
  setScheduleinfo(value?: ScheduleInfo): MessageProto;
  hasScheduleinfo(): boolean;
  clearScheduleinfo(): MessageProto;

  getMediaparameters(): MediaParameters | undefined;
  setMediaparameters(value?: MediaParameters): MessageProto;
  hasMediaparameters(): boolean;
  clearMediaparameters(): MessageProto;

  getButtonsMap(): jspb.Map<string, string>;
  clearButtonsMap(): MessageProto;

  getTransactionid(): string;
  setTransactionid(value: string): MessageProto;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageProto.AsObject;
  static toObject(includeInstance: boolean, msg: MessageProto): MessageProto.AsObject;
  static serializeBinaryToWriter(message: MessageProto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageProto;
  static deserializeBinaryFromReader(message: MessageProto, reader: jspb.BinaryReader): MessageProto;
}

export namespace MessageProto {
  export type AsObject = {
    messageid: string,
    sender: string,
    recipientsList: Array<string>,
    message: string,
    recievedbyList: Array<string>,
    readbyList: Array<string>,
    respondedbyList: Array<string>,
    failedrecipientsList: Array<string>,
    createdon: number,
    scheduleinfo?: ScheduleInfo.AsObject,
    mediaparameters?: MediaParameters.AsObject,
    buttonsMap: Array<[string, string]>,
    transactionid: string,
  }
}

export class MessageList extends jspb.Message {
  getMessagesList(): Array<MessageProto>;
  setMessagesList(value: Array<MessageProto>): MessageList;
  clearMessagesList(): MessageList;
  addMessages(value?: MessageProto, index?: number): MessageProto;

  getTotalcount(): number;
  setTotalcount(value: number): MessageList;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageList.AsObject;
  static toObject(includeInstance: boolean, msg: MessageList): MessageList.AsObject;
  static serializeBinaryToWriter(message: MessageList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageList;
  static deserializeBinaryFromReader(message: MessageList, reader: jspb.BinaryReader): MessageList;
}

export namespace MessageList {
  export type AsObject = {
    messagesList: Array<MessageProto.AsObject>,
    totalcount: number,
  }
}

export class MessageFilters extends jspb.Message {
  getMessageid(): string;
  setMessageid(value: string): MessageFilters;

  getSender(): string;
  setSender(value: string): MessageFilters;

  getTransactionid(): string;
  setTransactionid(value: string): MessageFilters;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageFilters.AsObject;
  static toObject(includeInstance: boolean, msg: MessageFilters): MessageFilters.AsObject;
  static serializeBinaryToWriter(message: MessageFilters, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageFilters;
  static deserializeBinaryFromReader(message: MessageFilters, reader: jspb.BinaryReader): MessageFilters;
}

export namespace MessageFilters {
  export type AsObject = {
    messageid: string,
    sender: string,
    transactionid: string,
  }
}

export class FetchMessageRequest extends jspb.Message {
  getFilters(): MessageFilters | undefined;
  setFilters(value?: MessageFilters): FetchMessageRequest;
  hasFilters(): boolean;
  clearFilters(): FetchMessageRequest;

  getPagenumber(): number;
  setPagenumber(value: number): FetchMessageRequest;

  getPagesize(): number;
  setPagesize(value: number): FetchMessageRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FetchMessageRequest.AsObject;
  static toObject(includeInstance: boolean, msg: FetchMessageRequest): FetchMessageRequest.AsObject;
  static serializeBinaryToWriter(message: FetchMessageRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FetchMessageRequest;
  static deserializeBinaryFromReader(message: FetchMessageRequest, reader: jspb.BinaryReader): FetchMessageRequest;
}

export namespace FetchMessageRequest {
  export type AsObject = {
    filters?: MessageFilters.AsObject,
    pagenumber: number,
    pagesize: number,
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
