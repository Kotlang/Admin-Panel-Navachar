// source: topics.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = (function() { return this || window || global || self || Function('return this')(); }).call(null);

goog.exportSymbol('proto.social.GetTopicsRequest', null, global);
goog.exportSymbol('proto.social.SubTopic', null, global);
goog.exportSymbol('proto.social.Topic', null, global);
goog.exportSymbol('proto.social.TopicsList', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.social.GetTopicsRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.social.GetTopicsRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.social.GetTopicsRequest.displayName = 'proto.social.GetTopicsRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.social.SubTopic = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.social.SubTopic, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.social.SubTopic.displayName = 'proto.social.SubTopic';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.social.Topic = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.social.Topic.repeatedFields_, null);
};
goog.inherits(proto.social.Topic, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.social.Topic.displayName = 'proto.social.Topic';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.social.TopicsList = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.social.TopicsList.repeatedFields_, null);
};
goog.inherits(proto.social.TopicsList, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.social.TopicsList.displayName = 'proto.social.TopicsList';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.social.GetTopicsRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.social.GetTopicsRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.social.GetTopicsRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.social.GetTopicsRequest.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.social.GetTopicsRequest}
 */
proto.social.GetTopicsRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.social.GetTopicsRequest;
  return proto.social.GetTopicsRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.social.GetTopicsRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.social.GetTopicsRequest}
 */
proto.social.GetTopicsRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.social.GetTopicsRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.social.GetTopicsRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.social.GetTopicsRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.social.GetTopicsRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.social.SubTopic.prototype.toObject = function(opt_includeInstance) {
  return proto.social.SubTopic.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.social.SubTopic} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.social.SubTopic.toObject = function(includeInstance, msg) {
  var f, obj = {
    subtopicname: jspb.Message.getFieldWithDefault(msg, 1, ""),
    imageurl: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.social.SubTopic}
 */
proto.social.SubTopic.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.social.SubTopic;
  return proto.social.SubTopic.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.social.SubTopic} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.social.SubTopic}
 */
proto.social.SubTopic.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setSubtopicname(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setImageurl(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.social.SubTopic.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.social.SubTopic.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.social.SubTopic} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.social.SubTopic.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSubtopicname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getImageurl();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string subTopicName = 1;
 * @return {string}
 */
proto.social.SubTopic.prototype.getSubtopicname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.social.SubTopic} returns this
 */
proto.social.SubTopic.prototype.setSubtopicname = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string imageUrl = 2;
 * @return {string}
 */
proto.social.SubTopic.prototype.getImageurl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.social.SubTopic} returns this
 */
proto.social.SubTopic.prototype.setImageurl = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.social.Topic.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.social.Topic.prototype.toObject = function(opt_includeInstance) {
  return proto.social.Topic.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.social.Topic} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.social.Topic.toObject = function(includeInstance, msg) {
  var f, obj = {
    topicname: jspb.Message.getFieldWithDefault(msg, 1, ""),
    subtopicsList: jspb.Message.toObjectList(msg.getSubtopicsList(),
    proto.social.SubTopic.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.social.Topic}
 */
proto.social.Topic.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.social.Topic;
  return proto.social.Topic.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.social.Topic} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.social.Topic}
 */
proto.social.Topic.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setTopicname(value);
      break;
    case 2:
      var value = new proto.social.SubTopic;
      reader.readMessage(value,proto.social.SubTopic.deserializeBinaryFromReader);
      msg.addSubtopics(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.social.Topic.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.social.Topic.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.social.Topic} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.social.Topic.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTopicname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getSubtopicsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.social.SubTopic.serializeBinaryToWriter
    );
  }
};


/**
 * optional string topicName = 1;
 * @return {string}
 */
proto.social.Topic.prototype.getTopicname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.social.Topic} returns this
 */
proto.social.Topic.prototype.setTopicname = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated SubTopic subTopics = 2;
 * @return {!Array<!proto.social.SubTopic>}
 */
proto.social.Topic.prototype.getSubtopicsList = function() {
  return /** @type{!Array<!proto.social.SubTopic>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.social.SubTopic, 2));
};


/**
 * @param {!Array<!proto.social.SubTopic>} value
 * @return {!proto.social.Topic} returns this
*/
proto.social.Topic.prototype.setSubtopicsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.social.SubTopic=} opt_value
 * @param {number=} opt_index
 * @return {!proto.social.SubTopic}
 */
proto.social.Topic.prototype.addSubtopics = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.social.SubTopic, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.social.Topic} returns this
 */
proto.social.Topic.prototype.clearSubtopicsList = function() {
  return this.setSubtopicsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.social.TopicsList.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.social.TopicsList.prototype.toObject = function(opt_includeInstance) {
  return proto.social.TopicsList.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.social.TopicsList} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.social.TopicsList.toObject = function(includeInstance, msg) {
  var f, obj = {
    topicList: jspb.Message.toObjectList(msg.getTopicList(),
    proto.social.Topic.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.social.TopicsList}
 */
proto.social.TopicsList.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.social.TopicsList;
  return proto.social.TopicsList.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.social.TopicsList} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.social.TopicsList}
 */
proto.social.TopicsList.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.social.Topic;
      reader.readMessage(value,proto.social.Topic.deserializeBinaryFromReader);
      msg.addTopic(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.social.TopicsList.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.social.TopicsList.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.social.TopicsList} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.social.TopicsList.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTopicList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.social.Topic.serializeBinaryToWriter
    );
  }
};


/**
 * repeated Topic topic = 1;
 * @return {!Array<!proto.social.Topic>}
 */
proto.social.TopicsList.prototype.getTopicList = function() {
  return /** @type{!Array<!proto.social.Topic>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.social.Topic, 1));
};


/**
 * @param {!Array<!proto.social.Topic>} value
 * @return {!proto.social.TopicsList} returns this
*/
proto.social.TopicsList.prototype.setTopicList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.social.Topic=} opt_value
 * @param {number=} opt_index
 * @return {!proto.social.Topic}
 */
proto.social.TopicsList.prototype.addTopic = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.social.Topic, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.social.TopicsList} returns this
 */
proto.social.TopicsList.prototype.clearTopicList = function() {
  return this.setTopicList([]);
};


goog.object.extend(exports, proto.social);
