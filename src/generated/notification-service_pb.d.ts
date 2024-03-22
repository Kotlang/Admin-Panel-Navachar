import * as jspb from 'google-protobuf'



export class GetFCMTopicsRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetFCMTopicsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetFCMTopicsRequest): GetFCMTopicsRequest.AsObject;
  static serializeBinaryToWriter(message: GetFCMTopicsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetFCMTopicsRequest;
  static deserializeBinaryFromReader(message: GetFCMTopicsRequest, reader: jspb.BinaryReader): GetFCMTopicsRequest;
}

export namespace GetFCMTopicsRequest {
  export type AsObject = {
  }
}

export class FCMTopicsResponse extends jspb.Message {
  getTopicsList(): Array<string>;
  setTopicsList(value: Array<string>): FCMTopicsResponse;
  clearTopicsList(): FCMTopicsResponse;
  addTopics(value: string, index?: number): FCMTopicsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FCMTopicsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: FCMTopicsResponse): FCMTopicsResponse.AsObject;
  static serializeBinaryToWriter(message: FCMTopicsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FCMTopicsResponse;
  static deserializeBinaryFromReader(message: FCMTopicsResponse, reader: jspb.BinaryReader): FCMTopicsResponse;
}

export namespace FCMTopicsResponse {
  export type AsObject = {
    topicsList: Array<string>,
  }
}

export class RegisterDeviceInstanceRequest extends jspb.Message {
  getToken(): string;
  setToken(value: string): RegisterDeviceInstanceRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RegisterDeviceInstanceRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RegisterDeviceInstanceRequest): RegisterDeviceInstanceRequest.AsObject;
  static serializeBinaryToWriter(message: RegisterDeviceInstanceRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RegisterDeviceInstanceRequest;
  static deserializeBinaryFromReader(message: RegisterDeviceInstanceRequest, reader: jspb.BinaryReader): RegisterDeviceInstanceRequest;
}

export namespace RegisterDeviceInstanceRequest {
  export type AsObject = {
    token: string,
  }
}

export class RegisterEventRequest extends jspb.Message {
  getEventtype(): string;
  setEventtype(value: string): RegisterEventRequest;

  getTitle(): string;
  setTitle(value: string): RegisterEventRequest;

  getBody(): string;
  setBody(value: string): RegisterEventRequest;

  getImageurl(): string;
  setImageurl(value: string): RegisterEventRequest;

  getTemplateparametersMap(): jspb.Map<string, string>;
  clearTemplateparametersMap(): RegisterEventRequest;

  getTopic(): string;
  setTopic(value: string): RegisterEventRequest;

  getTargetusersList(): Array<string>;
  setTargetusersList(value: Array<string>): RegisterEventRequest;
  clearTargetusersList(): RegisterEventRequest;
  addTargetusers(value: string, index?: number): RegisterEventRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RegisterEventRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RegisterEventRequest): RegisterEventRequest.AsObject;
  static serializeBinaryToWriter(message: RegisterEventRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RegisterEventRequest;
  static deserializeBinaryFromReader(message: RegisterEventRequest, reader: jspb.BinaryReader): RegisterEventRequest;
}

export namespace RegisterEventRequest {
  export type AsObject = {
    eventtype: string,
    title: string,
    body: string,
    imageurl: string,
    templateparametersMap: Array<[string, string]>,
    topic: string,
    targetusersList: Array<string>,
  }
}

export class NotificationStatusResponse extends jspb.Message {
  getStatus(): string;
  setStatus(value: string): NotificationStatusResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NotificationStatusResponse.AsObject;
  static toObject(includeInstance: boolean, msg: NotificationStatusResponse): NotificationStatusResponse.AsObject;
  static serializeBinaryToWriter(message: NotificationStatusResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NotificationStatusResponse;
  static deserializeBinaryFromReader(message: NotificationStatusResponse, reader: jspb.BinaryReader): NotificationStatusResponse;
}

export namespace NotificationStatusResponse {
  export type AsObject = {
    status: string,
  }
}

