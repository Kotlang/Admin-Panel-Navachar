// source: login.proto
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
var global =
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof window !== 'undefined' && window) ||
    (typeof global !== 'undefined' && global) ||
    (typeof self !== 'undefined' && self) ||
    (function () { return this; }).call(null) ||
    Function('return this')();

var common_pb = require('./common_pb.js');
goog.object.extend(proto, common_pb);
goog.exportSymbol('proto.login.AuthResponse', null, global);
goog.exportSymbol('proto.login.LoginRequest', null, global);
goog.exportSymbol('proto.login.VerifyRequest', null, global);
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
proto.login.LoginRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.login.LoginRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.login.LoginRequest.displayName = 'proto.login.LoginRequest';
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
proto.login.AuthResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.login.AuthResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.login.AuthResponse.displayName = 'proto.login.AuthResponse';
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
proto.login.VerifyRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.login.VerifyRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.login.VerifyRequest.displayName = 'proto.login.VerifyRequest';
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
proto.login.LoginRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.login.LoginRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.login.LoginRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.login.LoginRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    emailorphone: jspb.Message.getFieldWithDefault(msg, 1, ""),
    domain: jspb.Message.getFieldWithDefault(msg, 2, ""),
    restoreaccountrequest: jspb.Message.getBooleanFieldWithDefault(msg, 3, false)
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
 * @return {!proto.login.LoginRequest}
 */
proto.login.LoginRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.login.LoginRequest;
  return proto.login.LoginRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.login.LoginRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.login.LoginRequest}
 */
proto.login.LoginRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setEmailorphone(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setDomain(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setRestoreaccountrequest(value);
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
proto.login.LoginRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.login.LoginRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.login.LoginRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.login.LoginRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getEmailorphone();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getDomain();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getRestoreaccountrequest();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
};


/**
 * optional string emailOrPhone = 1;
 * @return {string}
 */
proto.login.LoginRequest.prototype.getEmailorphone = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.login.LoginRequest} returns this
 */
proto.login.LoginRequest.prototype.setEmailorphone = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string domain = 2;
 * @return {string}
 */
proto.login.LoginRequest.prototype.getDomain = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.login.LoginRequest} returns this
 */
proto.login.LoginRequest.prototype.setDomain = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional bool restoreAccountRequest = 3;
 * @return {boolean}
 */
proto.login.LoginRequest.prototype.getRestoreaccountrequest = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.login.LoginRequest} returns this
 */
proto.login.LoginRequest.prototype.setRestoreaccountrequest = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
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
proto.login.AuthResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.login.AuthResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.login.AuthResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.login.AuthResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    jwt: jspb.Message.getFieldWithDefault(msg, 1, ""),
    usertype: jspb.Message.getFieldWithDefault(msg, 2, ""),
    profile: (f = msg.getProfile()) && common_pb.UserProfileProto.toObject(includeInstance, f)
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
 * @return {!proto.login.AuthResponse}
 */
proto.login.AuthResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.login.AuthResponse;
  return proto.login.AuthResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.login.AuthResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.login.AuthResponse}
 */
proto.login.AuthResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setJwt(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setUsertype(value);
      break;
    case 3:
      var value = new common_pb.UserProfileProto;
      reader.readMessage(value,common_pb.UserProfileProto.deserializeBinaryFromReader);
      msg.setProfile(value);
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
proto.login.AuthResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.login.AuthResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.login.AuthResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.login.AuthResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getJwt();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getUsertype();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getProfile();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      common_pb.UserProfileProto.serializeBinaryToWriter
    );
  }
};


/**
 * optional string jwt = 1;
 * @return {string}
 */
proto.login.AuthResponse.prototype.getJwt = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.login.AuthResponse} returns this
 */
proto.login.AuthResponse.prototype.setJwt = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string userType = 2;
 * @return {string}
 */
proto.login.AuthResponse.prototype.getUsertype = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.login.AuthResponse} returns this
 */
proto.login.AuthResponse.prototype.setUsertype = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional UserProfileProto profile = 3;
 * @return {?proto.login.UserProfileProto}
 */
proto.login.AuthResponse.prototype.getProfile = function() {
  return /** @type{?proto.login.UserProfileProto} */ (
    jspb.Message.getWrapperField(this, common_pb.UserProfileProto, 3));
};


/**
 * @param {?proto.login.UserProfileProto|undefined} value
 * @return {!proto.login.AuthResponse} returns this
*/
proto.login.AuthResponse.prototype.setProfile = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.login.AuthResponse} returns this
 */
proto.login.AuthResponse.prototype.clearProfile = function() {
  return this.setProfile(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.login.AuthResponse.prototype.hasProfile = function() {
  return jspb.Message.getField(this, 3) != null;
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
proto.login.VerifyRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.login.VerifyRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.login.VerifyRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.login.VerifyRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    emailorphone: jspb.Message.getFieldWithDefault(msg, 1, ""),
    otp: jspb.Message.getFieldWithDefault(msg, 2, ""),
    domain: jspb.Message.getFieldWithDefault(msg, 3, "")
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
 * @return {!proto.login.VerifyRequest}
 */
proto.login.VerifyRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.login.VerifyRequest;
  return proto.login.VerifyRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.login.VerifyRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.login.VerifyRequest}
 */
proto.login.VerifyRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setEmailorphone(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setOtp(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setDomain(value);
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
proto.login.VerifyRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.login.VerifyRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.login.VerifyRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.login.VerifyRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getEmailorphone();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getOtp();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getDomain();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional string emailOrPhone = 1;
 * @return {string}
 */
proto.login.VerifyRequest.prototype.getEmailorphone = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.login.VerifyRequest} returns this
 */
proto.login.VerifyRequest.prototype.setEmailorphone = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string otp = 2;
 * @return {string}
 */
proto.login.VerifyRequest.prototype.getOtp = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.login.VerifyRequest} returns this
 */
proto.login.VerifyRequest.prototype.setOtp = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string domain = 3;
 * @return {string}
 */
proto.login.VerifyRequest.prototype.getDomain = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.login.VerifyRequest} returns this
 */
proto.login.VerifyRequest.prototype.setDomain = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


goog.object.extend(exports, proto.login);
