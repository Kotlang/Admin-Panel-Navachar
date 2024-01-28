import * as jspb from 'google-protobuf'



export class GetTopicsRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTopicsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetTopicsRequest): GetTopicsRequest.AsObject;
  static serializeBinaryToWriter(message: GetTopicsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTopicsRequest;
  static deserializeBinaryFromReader(message: GetTopicsRequest, reader: jspb.BinaryReader): GetTopicsRequest;
}

export namespace GetTopicsRequest {
  export type AsObject = {
  }
}

export class SubTopic extends jspb.Message {
  getSubtopicname(): string;
  setSubtopicname(value: string): SubTopic;

  getImageurl(): string;
  setImageurl(value: string): SubTopic;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SubTopic.AsObject;
  static toObject(includeInstance: boolean, msg: SubTopic): SubTopic.AsObject;
  static serializeBinaryToWriter(message: SubTopic, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SubTopic;
  static deserializeBinaryFromReader(message: SubTopic, reader: jspb.BinaryReader): SubTopic;
}

export namespace SubTopic {
  export type AsObject = {
    subtopicname: string,
    imageurl: string,
  }
}

export class Topic extends jspb.Message {
  getTopicname(): string;
  setTopicname(value: string): Topic;

  getSubtopicsList(): Array<SubTopic>;
  setSubtopicsList(value: Array<SubTopic>): Topic;
  clearSubtopicsList(): Topic;
  addSubtopics(value?: SubTopic, index?: number): SubTopic;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Topic.AsObject;
  static toObject(includeInstance: boolean, msg: Topic): Topic.AsObject;
  static serializeBinaryToWriter(message: Topic, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Topic;
  static deserializeBinaryFromReader(message: Topic, reader: jspb.BinaryReader): Topic;
}

export namespace Topic {
  export type AsObject = {
    topicname: string,
    subtopicsList: Array<SubTopic.AsObject>,
  }
}

export class TopicsList extends jspb.Message {
  getTopicList(): Array<Topic>;
  setTopicList(value: Array<Topic>): TopicsList;
  clearTopicList(): TopicsList;
  addTopic(value?: Topic, index?: number): Topic;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TopicsList.AsObject;
  static toObject(includeInstance: boolean, msg: TopicsList): TopicsList.AsObject;
  static serializeBinaryToWriter(message: TopicsList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TopicsList;
  static deserializeBinaryFromReader(message: TopicsList, reader: jspb.BinaryReader): TopicsList;
}

export namespace TopicsList {
  export type AsObject = {
    topicList: Array<Topic.AsObject>,
  }
}

