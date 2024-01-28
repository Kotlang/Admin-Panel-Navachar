import * as jspb from 'google-protobuf'



export class AddressProto extends jspb.Message {
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

export class UserProfileProto extends jspb.Message {
  getLoginid(): string;
  setLoginid(value: string): UserProfileProto;

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

  getAddressesMap(): jspb.Map<string, AddressProto>;
  clearAddressesMap(): UserProfileProto;

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

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserProfileProto.AsObject;
  static toObject(includeInstance: boolean, msg: UserProfileProto): UserProfileProto.AsObject;
  static serializeBinaryToWriter(message: UserProfileProto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserProfileProto;
  static deserializeBinaryFromReader(message: UserProfileProto, reader: jspb.BinaryReader): UserProfileProto;
}

export namespace UserProfileProto {
  export type AsObject = {
    loginid: string,
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
    addressesMap: Array<[string, AddressProto.AsObject]>,
    attributesList: Array<string>,
    landsizeinacres: LandSizeInAcres,
    location?: Location.AsObject,
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
