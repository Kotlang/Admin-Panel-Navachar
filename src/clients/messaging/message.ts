// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Metadata, RpcError } from 'grpc-web';
import { addJwtToken } from 'src/clients/utils';
import {
	Button,
	FetchTemplateRequest,
	MediaParameters,
	MessagingTemplate,
	MessagingTemplateList,
	MesssageRequest,
	StatusResponse
} from 'src/generated/messaging-service_pb';
import { MessagingServiceClient } from 'src/generated/Messaging-serviceServiceClientPb';
import { IFetchTemplateRequest, IMessagingTemplate } from 'src/types';

export const getMessagingClient = (() => {
	const notifyUrl = process.env.REACT_APP_NOTIFY_URL;
	let client: MessagingServiceClient;
	if (notifyUrl) {
		client = new MessagingServiceClient(notifyUrl);
	}
	return () => {
		return client;
	};
})();

const getRegisterMessagingTemplateRequst = (template: IMessagingTemplate) => {
	const registerMessagingTemplateRequest = new MessagingTemplate();
	registerMessagingTemplateRequest.setTemplateid(template.templateId);
	registerMessagingTemplateRequest.setTemplatename(template.templateName);
	registerMessagingTemplateRequest.setWabaid(template.wabaId);

	if (template.mediaParameters) {
		const mediaParamters = new MediaParameters();
		mediaParamters.setMediatype(template.mediaParameters.mediaType);
		mediaParamters.setLink(template.mediaParameters.link);
		mediaParamters.setFilename(template.mediaParameters.filename);
		registerMessagingTemplateRequest.setMediaparameters(mediaParamters);
	}

	if (template.header) {
		registerMessagingTemplateRequest.setHeader(template.header);
	}

	if (template.body) {
		registerMessagingTemplateRequest.setBody(template.body);
	}

	if (template.footer) {
		registerMessagingTemplateRequest.setFooter(template.footer);
	}

	if (template.category) {
		registerMessagingTemplateRequest.setCategory(template.category || 0);
	}

	if (template.buttonType) {
		registerMessagingTemplateRequest.setButtontype(template.buttonType);
	}

	if (template.headerParameters) {
		template.headerParameters.forEach((value, key) => {
			registerMessagingTemplateRequest.getHeaderparametersMap().set(key, value);
		});
	}

	if (template.bodyParameters) {
		template.bodyParameters.forEach((value, key) => {
			registerMessagingTemplateRequest.getBodyparametersMap().set(key, value);
		});
	}

	if (template.buttons) {
		const buttons = new Button();
		buttons.setCalltoactionbuttonsList(template.buttons.callToActionButtons);
		buttons.setQuickreplybuttonsList(template.buttons.quickReplyButtons);
		registerMessagingTemplateRequest.setButtons(buttons);
	}

	return registerMessagingTemplateRequest;
};

const getFetchTemplatesRequest = (fetchTeemplate: IFetchTemplateRequest) => {
	const fetchTemplateRequest = new FetchTemplateRequest();
	if (fetchTeemplate.templateId) {
		fetchTemplateRequest.setTemplateid(fetchTeemplate.templateId);
	}
	if (fetchTeemplate.templateName) {
		fetchTemplateRequest.setTemplatename(fetchTeemplate.templateName);
	}
	if (fetchTeemplate.pageNumber) {
		fetchTemplateRequest.setPagenumber(fetchTeemplate.pageNumber);
	}
	if (fetchTeemplate.pageSize) {
		fetchTemplateRequest.setPagesize(fetchTeemplate.pageSize);
	}
	return fetchTemplateRequest;
};

const messagingClient = {
	BroadCastMessage: (
		messageReq: MesssageRequest,
		metaData: Metadata | null,
		callback: (err: RpcError, response: StatusResponse) => void
	) => {
		getMessagingClient().broadcastMessage(
			messageReq,
			addJwtToken(metaData),
			callback
		);
	},
	FetchTemplates: (
		fetchTemplate: IFetchTemplateRequest,
		metaData: Metadata | null,
		callback: (err: RpcError, response: MessagingTemplateList) => void
	) => {
		getMessagingClient().fetchMessagingTemplates(
			getFetchTemplatesRequest(fetchTemplate),
			addJwtToken(metaData),
			callback
		);
	},
	RegisterMessagingTemplate: (
		template: IMessagingTemplate,
		metaData: Metadata | null,
		callback: (err: RpcError, response: StatusResponse) => void
	) => {
		getMessagingClient().registerMessagingTemplate(
			getRegisterMessagingTemplateRequst(template),
			addJwtToken(metaData),
			callback
		);
	}
};

export default messagingClient;
