import * as jspb from 'google-protobuf'

import * as common_pb from './common_pb'; // proto import: "common.proto"


export class CreateOrUpdateLeadRequest extends jspb.Message {
  getName(): string;
  setName(value: string): CreateOrUpdateLeadRequest;

  getPhonenumber(): string;
  setPhonenumber(value: string): CreateOrUpdateLeadRequest;

  getOperatortype(): OperatorType;
  setOperatortype(value: OperatorType): CreateOrUpdateLeadRequest;

  getChannel(): LeadChannel;
  setChannel(value: LeadChannel): CreateOrUpdateLeadRequest;

  getSource(): string;
  setSource(value: string): CreateOrUpdateLeadRequest;

  getAddressesList(): Array<common_pb.AddressProto>;
  setAddressesList(value: Array<common_pb.AddressProto>): CreateOrUpdateLeadRequest;
  clearAddressesList(): CreateOrUpdateLeadRequest;
  addAddresses(value?: common_pb.AddressProto, index?: number): common_pb.AddressProto;

  getLandsizeinacres(): common_pb.LandSizeInAcres;
  setLandsizeinacres(value: common_pb.LandSizeInAcres): CreateOrUpdateLeadRequest;

  getFarmingtype(): common_pb.FarmingType;
  setFarmingtype(value: common_pb.FarmingType): CreateOrUpdateLeadRequest;

  getCertificationdetails(): common_pb.CertificationDetails | undefined;
  setCertificationdetails(value?: common_pb.CertificationDetails): CreateOrUpdateLeadRequest;
  hasCertificationdetails(): boolean;
  clearCertificationdetails(): CreateOrUpdateLeadRequest;

  getCropsList(): Array<string>;
  setCropsList(value: Array<string>): CreateOrUpdateLeadRequest;
  clearCropsList(): CreateOrUpdateLeadRequest;
  addCrops(value: string, index?: number): CreateOrUpdateLeadRequest;

  getMainprofession(): string;
  setMainprofession(value: string): CreateOrUpdateLeadRequest;

  getOrganizationname(): string;
  setOrganizationname(value: string): CreateOrUpdateLeadRequest;

  getSideprofession(): string;
  setSideprofession(value: string): CreateOrUpdateLeadRequest;

  getUserinterviewnotes(): string;
  setUserinterviewnotes(value: string): CreateOrUpdateLeadRequest;

  getEducation(): string;
  setEducation(value: string): CreateOrUpdateLeadRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateOrUpdateLeadRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateOrUpdateLeadRequest): CreateOrUpdateLeadRequest.AsObject;
  static serializeBinaryToWriter(message: CreateOrUpdateLeadRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateOrUpdateLeadRequest;
  static deserializeBinaryFromReader(message: CreateOrUpdateLeadRequest, reader: jspb.BinaryReader): CreateOrUpdateLeadRequest;
}

export namespace CreateOrUpdateLeadRequest {
  export type AsObject = {
    name: string,
    phonenumber: string,
    operatortype: OperatorType,
    channel: LeadChannel,
    source: string,
    addressesList: Array<common_pb.AddressProto.AsObject>,
    landsizeinacres: common_pb.LandSizeInAcres,
    farmingtype: common_pb.FarmingType,
    certificationdetails?: common_pb.CertificationDetails.AsObject,
    cropsList: Array<string>,
    mainprofession: string,
    organizationname: string,
    sideprofession: string,
    userinterviewnotes: string,
    education: string,
  }
}

export class LeadProto extends jspb.Message {
  getLeadId(): string;
  setLeadId(value: string): LeadProto;

  getName(): string;
  setName(value: string): LeadProto;

  getPhonenumber(): string;
  setPhonenumber(value: string): LeadProto;

  getOperatortype(): OperatorType;
  setOperatortype(value: OperatorType): LeadProto;

  getChannel(): LeadChannel;
  setChannel(value: LeadChannel): LeadProto;

  getSource(): string;
  setSource(value: string): LeadProto;

  getAddressesList(): Array<common_pb.AddressProto>;
  setAddressesList(value: Array<common_pb.AddressProto>): LeadProto;
  clearAddressesList(): LeadProto;
  addAddresses(value?: common_pb.AddressProto, index?: number): common_pb.AddressProto;

  getLandsizeinacres(): common_pb.LandSizeInAcres;
  setLandsizeinacres(value: common_pb.LandSizeInAcres): LeadProto;

  getFarmingtype(): common_pb.FarmingType;
  setFarmingtype(value: common_pb.FarmingType): LeadProto;

  getCertificationdetails(): common_pb.CertificationDetails | undefined;
  setCertificationdetails(value?: common_pb.CertificationDetails): LeadProto;
  hasCertificationdetails(): boolean;
  clearCertificationdetails(): LeadProto;

  getCropsList(): Array<string>;
  setCropsList(value: Array<string>): LeadProto;
  clearCropsList(): LeadProto;
  addCrops(value: string, index?: number): LeadProto;

  getMainprofession(): string;
  setMainprofession(value: string): LeadProto;

  getOrganizationname(): string;
  setOrganizationname(value: string): LeadProto;

  getSideprofession(): string;
  setSideprofession(value: string): LeadProto;

  getUserinterviewnotes(): string;
  setUserinterviewnotes(value: string): LeadProto;

  getEducation(): string;
  setEducation(value: string): LeadProto;

  getStatus(): Status;
  setStatus(value: Status): LeadProto;

  getCreatedon(): number;
  setCreatedon(value: number): LeadProto;

  getUpdatedon(): number;
  setUpdatedon(value: number): LeadProto;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LeadProto.AsObject;
  static toObject(includeInstance: boolean, msg: LeadProto): LeadProto.AsObject;
  static serializeBinaryToWriter(message: LeadProto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LeadProto;
  static deserializeBinaryFromReader(message: LeadProto, reader: jspb.BinaryReader): LeadProto;
}

export namespace LeadProto {
  export type AsObject = {
    leadId: string,
    name: string,
    phonenumber: string,
    operatortype: OperatorType,
    channel: LeadChannel,
    source: string,
    addressesList: Array<common_pb.AddressProto.AsObject>,
    landsizeinacres: common_pb.LandSizeInAcres,
    farmingtype: common_pb.FarmingType,
    certificationdetails?: common_pb.CertificationDetails.AsObject,
    cropsList: Array<string>,
    mainprofession: string,
    organizationname: string,
    sideprofession: string,
    userinterviewnotes: string,
    education: string,
    status: Status,
    createdon: number,
    updatedon: number,
  }
}

export class FetchLeadsRequest extends jspb.Message {
  getLeadfilters(): LeadFilters | undefined;
  setLeadfilters(value?: LeadFilters): FetchLeadsRequest;
  hasLeadfilters(): boolean;
  clearLeadfilters(): FetchLeadsRequest;

  getPagenumber(): number;
  setPagenumber(value: number): FetchLeadsRequest;

  getPagesize(): number;
  setPagesize(value: number): FetchLeadsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FetchLeadsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: FetchLeadsRequest): FetchLeadsRequest.AsObject;
  static serializeBinaryToWriter(message: FetchLeadsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FetchLeadsRequest;
  static deserializeBinaryFromReader(message: FetchLeadsRequest, reader: jspb.BinaryReader): FetchLeadsRequest;
}

export namespace FetchLeadsRequest {
  export type AsObject = {
    leadfilters?: LeadFilters.AsObject,
    pagenumber: number,
    pagesize: number,
  }
}

export class LeadFilters extends jspb.Message {
  getOperatortype(): OperatorType;
  setOperatortype(value: OperatorType): LeadFilters;

  getChannel(): LeadChannel;
  setChannel(value: LeadChannel): LeadFilters;

  getSource(): string;
  setSource(value: string): LeadFilters;

  getLandsizeinacres(): common_pb.LandSizeInAcres;
  setLandsizeinacres(value: common_pb.LandSizeInAcres): LeadFilters;

  getFarmingtype(): common_pb.FarmingType;
  setFarmingtype(value: common_pb.FarmingType): LeadFilters;

  getCertificationdetails(): common_pb.CertificationDetails | undefined;
  setCertificationdetails(value?: common_pb.CertificationDetails): LeadFilters;
  hasCertificationdetails(): boolean;
  clearCertificationdetails(): LeadFilters;

  getMainprofession(): string;
  setMainprofession(value: string): LeadFilters;

  getOrganizationname(): string;
  setOrganizationname(value: string): LeadFilters;

  getSideprofession(): string;
  setSideprofession(value: string): LeadFilters;

  getEducation(): string;
  setEducation(value: string): LeadFilters;

  getStatus(): Status;
  setStatus(value: Status): LeadFilters;

  getAddressfilters(): AddressFilters | undefined;
  setAddressfilters(value?: AddressFilters): LeadFilters;
  hasAddressfilters(): boolean;
  clearAddressfilters(): LeadFilters;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LeadFilters.AsObject;
  static toObject(includeInstance: boolean, msg: LeadFilters): LeadFilters.AsObject;
  static serializeBinaryToWriter(message: LeadFilters, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LeadFilters;
  static deserializeBinaryFromReader(message: LeadFilters, reader: jspb.BinaryReader): LeadFilters;
}

export namespace LeadFilters {
  export type AsObject = {
    operatortype: OperatorType,
    channel: LeadChannel,
    source: string,
    landsizeinacres: common_pb.LandSizeInAcres,
    farmingtype: common_pb.FarmingType,
    certificationdetails?: common_pb.CertificationDetails.AsObject,
    mainprofession: string,
    organizationname: string,
    sideprofession: string,
    education: string,
    status: Status,
    addressfilters?: AddressFilters.AsObject,
  }
}

export class AddressFilters extends jspb.Message {
  getType(): string;
  setType(value: string): AddressFilters;

  getCity(): string;
  setCity(value: string): AddressFilters;

  getState(): string;
  setState(value: string): AddressFilters;

  getCountry(): string;
  setCountry(value: string): AddressFilters;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddressFilters.AsObject;
  static toObject(includeInstance: boolean, msg: AddressFilters): AddressFilters.AsObject;
  static serializeBinaryToWriter(message: AddressFilters, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddressFilters;
  static deserializeBinaryFromReader(message: AddressFilters, reader: jspb.BinaryReader): AddressFilters;
}

export namespace AddressFilters {
  export type AsObject = {
    type: string,
    city: string,
    state: string,
    country: string,
  }
}

export class LeadListResponse extends jspb.Message {
  getLeadsList(): Array<LeadProto>;
  setLeadsList(value: Array<LeadProto>): LeadListResponse;
  clearLeadsList(): LeadListResponse;
  addLeads(value?: LeadProto, index?: number): LeadProto;

  getTotalleads(): number;
  setTotalleads(value: number): LeadListResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LeadListResponse.AsObject;
  static toObject(includeInstance: boolean, msg: LeadListResponse): LeadListResponse.AsObject;
  static serializeBinaryToWriter(message: LeadListResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LeadListResponse;
  static deserializeBinaryFromReader(message: LeadListResponse, reader: jspb.BinaryReader): LeadListResponse;
}

export namespace LeadListResponse {
  export type AsObject = {
    leadsList: Array<LeadProto.AsObject>,
    totalleads: number,
  }
}

export class BulkIdRequest extends jspb.Message {
  getLeadidsList(): Array<string>;
  setLeadidsList(value: Array<string>): BulkIdRequest;
  clearLeadidsList(): BulkIdRequest;
  addLeadids(value: string, index?: number): BulkIdRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BulkIdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: BulkIdRequest): BulkIdRequest.AsObject;
  static serializeBinaryToWriter(message: BulkIdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BulkIdRequest;
  static deserializeBinaryFromReader(message: BulkIdRequest, reader: jspb.BinaryReader): BulkIdRequest;
}

export namespace BulkIdRequest {
  export type AsObject = {
    leadidsList: Array<string>,
  }
}

export class LeadIdRequest extends jspb.Message {
  getLeadid(): string;
  setLeadid(value: string): LeadIdRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LeadIdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: LeadIdRequest): LeadIdRequest.AsObject;
  static serializeBinaryToWriter(message: LeadIdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LeadIdRequest;
  static deserializeBinaryFromReader(message: LeadIdRequest, reader: jspb.BinaryReader): LeadIdRequest;
}

export namespace LeadIdRequest {
  export type AsObject = {
    leadid: string,
  }
}

export enum OperatorType { 
  UNSPECIFIED_OPERATOR = 0,
  FARMER = 1,
  INPUT_PROVIDER = 2,
  AGRI_CONSULTANT = 3,
  TRACENET_CONSULTANT = 4,
}
export enum LeadChannel { 
  UNSPECIFIED_CHANNEL = 0,
  WHATSAPP_GROUP = 1,
  FACEBOOK_GROUP = 2,
  FACEBOOK_AD = 3,
}
export enum Status { 
  UNSPECIFIED_STATUS = 0,
  RELEVANT = 1,
  NOT_RELEVANT = 2,
  NOW_VERIFIED = 3,
}
