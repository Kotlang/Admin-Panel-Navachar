import * as jspb from 'google-protobuf'



export class AddressProto extends jspb.Message {
  getType(): string;
  setType(value: string): AddressProto;

  getCity(): string;
  setCity(value: string): AddressProto;

  getState(): string;
  setState(value: string): AddressProto;

  getCountry(): string;
  setCountry(value: string): AddressProto;

  getAddress(): string;
  setAddress(value: string): AddressProto;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddressProto.AsObject;
  static toObject(includeInstance: boolean, msg: AddressProto): AddressProto.AsObject;
  static serializeBinaryToWriter(message: AddressProto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddressProto;
  static deserializeBinaryFromReader(message: AddressProto, reader: jspb.BinaryReader): AddressProto;
}

export namespace AddressProto {
  export type AsObject = {
    type: string,
    city: string,
    state: string,
    country: string,
    address: string,
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

export class CertificationDetails extends jspb.Message {
  getIscertified(): boolean;
  setIscertified(value: boolean): CertificationDetails;

  getCertificationname(): string;
  setCertificationname(value: string): CertificationDetails;

  getCertificationid(): string;
  setCertificationid(value: string): CertificationDetails;

  getCertificationagency(): string;
  setCertificationagency(value: string): CertificationDetails;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CertificationDetails.AsObject;
  static toObject(includeInstance: boolean, msg: CertificationDetails): CertificationDetails.AsObject;
  static serializeBinaryToWriter(message: CertificationDetails, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CertificationDetails;
  static deserializeBinaryFromReader(message: CertificationDetails, reader: jspb.BinaryReader): CertificationDetails;
}

export namespace CertificationDetails {
  export type AsObject = {
    iscertified: boolean,
    certificationname: string,
    certificationid: string,
    certificationagency: string,
  }
}

export class DeletionInfo extends jspb.Message {
  getDeletiontime(): number;
  setDeletiontime(value: number): DeletionInfo;

  getReason(): string;
  setReason(value: string): DeletionInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeletionInfo.AsObject;
  static toObject(includeInstance: boolean, msg: DeletionInfo): DeletionInfo.AsObject;
  static serializeBinaryToWriter(message: DeletionInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeletionInfo;
  static deserializeBinaryFromReader(message: DeletionInfo, reader: jspb.BinaryReader): DeletionInfo;
}

export namespace DeletionInfo {
  export type AsObject = {
    deletiontime: number,
    reason: string,
  }
}

export class UserProfileProto extends jspb.Message {
  getUserid(): string;
  setUserid(value: string): UserProfileProto;

  getName(): string;
  setName(value: string): UserProfileProto;

  getPhotourl(): string;
  setPhotourl(value: string): UserProfileProto;

  getBio(): string;
  setBio(value: string): UserProfileProto;

  getGender(): Gender;
  setGender(value: Gender): UserProfileProto;

  getIsverified(): boolean;
  setIsverified(value: boolean): UserProfileProto;

  getFarmingtype(): FarmingType;
  setFarmingtype(value: FarmingType): UserProfileProto;

  getCropsList(): Array<string>;
  setCropsList(value: Array<string>): UserProfileProto;
  clearCropsList(): UserProfileProto;
  addCrops(value: string, index?: number): UserProfileProto;

  getCertificationdetails(): CertificationDetails | undefined;
  setCertificationdetails(value?: CertificationDetails): UserProfileProto;
  hasCertificationdetails(): boolean;
  clearCertificationdetails(): UserProfileProto;

  getYearssinceorganicfarming(): number;
  setYearssinceorganicfarming(value: number): UserProfileProto;

  getPreferredlanguage(): string;
  setPreferredlanguage(value: string): UserProfileProto;

  getCreatedon(): number;
  setCreatedon(value: number): UserProfileProto;

  getAddressesList(): Array<AddressProto>;
  setAddressesList(value: Array<AddressProto>): UserProfileProto;
  clearAddressesList(): UserProfileProto;
  addAddresses(value?: AddressProto, index?: number): AddressProto;

  getAttributesList(): Array<string>;
  setAttributesList(value: Array<string>): UserProfileProto;
  clearAttributesList(): UserProfileProto;
  addAttributes(value: string, index?: number): UserProfileProto;

  getLandsizeinacres(): LandSizeInAcres;
  setLandsizeinacres(value: LandSizeInAcres): UserProfileProto;

  getLocation(): Location | undefined;
  setLocation(value?: Location): UserProfileProto;
  hasLocation(): boolean;
  clearLocation(): UserProfileProto;

  getDeletioninfo(): DeletionInfo | undefined;
  setDeletioninfo(value?: DeletionInfo): UserProfileProto;
  hasDeletioninfo(): boolean;
  clearDeletioninfo(): UserProfileProto;

  getPhonenumber(): string;
  setPhonenumber(value: string): UserProfileProto;

  getLastactive(): number;
  setLastactive(value: number): UserProfileProto;

  getIsblocked(): boolean;
  setIsblocked(value: boolean): UserProfileProto;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserProfileProto.AsObject;
  static toObject(includeInstance: boolean, msg: UserProfileProto): UserProfileProto.AsObject;
  static serializeBinaryToWriter(message: UserProfileProto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserProfileProto;
  static deserializeBinaryFromReader(message: UserProfileProto, reader: jspb.BinaryReader): UserProfileProto;
}

export namespace UserProfileProto {
  export type AsObject = {
    userid: string,
    name: string,
    photourl: string,
    bio: string,
    gender: Gender,
    isverified: boolean,
    farmingtype: FarmingType,
    cropsList: Array<string>,
    certificationdetails?: CertificationDetails.AsObject,
    yearssinceorganicfarming: number,
    preferredlanguage: string,
    createdon: number,
    addressesList: Array<AddressProto.AsObject>,
    attributesList: Array<string>,
    landsizeinacres: LandSizeInAcres,
    location?: Location.AsObject,
    deletioninfo?: DeletionInfo.AsObject,
    phonenumber: string,
    lastactive: number,
    isblocked: boolean,
  }
}

export class ProfileListResponse extends jspb.Message {
  getProfilesList(): Array<UserProfileProto>;
  setProfilesList(value: Array<UserProfileProto>): ProfileListResponse;
  clearProfilesList(): ProfileListResponse;
  addProfiles(value?: UserProfileProto, index?: number): UserProfileProto;

  getTotalusers(): number;
  setTotalusers(value: number): ProfileListResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProfileListResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ProfileListResponse): ProfileListResponse.AsObject;
  static serializeBinaryToWriter(message: ProfileListResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProfileListResponse;
  static deserializeBinaryFromReader(message: ProfileListResponse, reader: jspb.BinaryReader): ProfileListResponse;
}

export namespace ProfileListResponse {
  export type AsObject = {
    profilesList: Array<UserProfileProto.AsObject>,
    totalusers: number,
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

export class IdRequest extends jspb.Message {
  getUserid(): string;
  setUserid(value: string): IdRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: IdRequest): IdRequest.AsObject;
  static serializeBinaryToWriter(message: IdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IdRequest;
  static deserializeBinaryFromReader(message: IdRequest, reader: jspb.BinaryReader): IdRequest;
}

export namespace IdRequest {
  export type AsObject = {
    userid: string,
  }
}

export enum Gender { 
  UNSPECIFIED = 0,
  MALE = 1,
  FEMALE = 2,
}
export enum FarmingType { 
  UNSPECIFIEDFARMING = 0,
  ORGANIC = 1,
  CHEMICAL = 2,
  MIX = 3,
}
export enum LandSizeInAcres { 
  UNSPECIFIEDLANDSIZE = 0,
  LESSTHAN2 = 1,
  BETWEEN2AND10 = 2,
  GREATERTHAN10 = 3,
}
