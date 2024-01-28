// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Metadata, RpcError } from 'grpc-web';
import { addJwtToken } from 'src/clients/utils';
import { AddLabelRequest } from 'src/generated/admin_pb';
import { LocalizationAdminClient } from 'src/generated/AdminServiceClientPb';
import { StatusResponse } from 'src/generated/common_pb';
import { ILabel } from 'src/types';

const getAdminClient = (() => {
	const localizationURL = process.env.REACT_APP_LOCALIZATION_URL;
	let client: LocalizationAdminClient;
	if (localizationURL) {
		client = new LocalizationAdminClient(localizationURL);
	}
	return () => {
		return client;
	};
})();

const addLabelRequest = (label: ILabel) => {
	const { key, value, language } = label;
	const addLabelRequest = new AddLabelRequest();
	addLabelRequest.setKey(key);
	addLabelRequest.setValue(value);
	addLabelRequest.setLanguage(language);
	return addLabelRequest;
};

const adminClient = {
	AddLabel: (label: ILabel, metadata: Metadata | null, callback: (err: RpcError, response: StatusResponse) => void) => {
		getAdminClient().addLabel(addLabelRequest(label), addJwtToken(metadata), callback);
	}
};

export default adminClient;