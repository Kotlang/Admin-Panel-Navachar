// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import { Metadata, RpcError } from 'grpc-web';
import React from 'react';
import clients from 'src/clients';
import {
	AddressProto,
	FarmingType,
	LandSizeInAcres,
	StatusResponse
} from 'src/generated/common_pb';

function getFarmingType (farmingType: FarmingType) {
	switch (farmingType) {
	case FarmingType.CHEMICAL:
		return 'Chemical';
	case FarmingType.ORGANIC:
		return 'Organic';
	case FarmingType.MIX:
		return 'MIX';
	default:
		return 'Unknown';
	}
}

function getFarmingTypeColor (farmingPractice: string) {
	switch (farmingPractice) {
	case 'Chemical':
		return 'text-purple-500';
	case 'Organic':
		return 'text-green-500';
	case 'MIX':
		return 'text-yellow-500';
	default:
		return 'text-white';
	}
}

function getLandSizeString (landsize: any) {
	switch (landsize) {
	case LandSizeInAcres.LESSTHAN2:
		return 'Less than 2';
	case LandSizeInAcres.BETWEEN2AND10:
		return 'Between 2 and 10';
	case LandSizeInAcres.GREATERTHAN10:
		return 'Greater than 10';
	default:
		return 'Unknown';
	}
}

function renderAddress(addressesMap: AddressProto[]) {
	const addressesArray: Array<{
		key: number;
		city: string;
		state: string;
		country: string;
		address: string;
	}> = [];

	addressesMap.forEach((value, key) => {
		addressesArray.push({
			address: value.getAddress(),
			city: value.getCity(),
			country: value.getCountry(),
			key: key,
			state: value.getState()
		});
	});

	return addressesArray.map((address, index) => (
		<div key={index} className="flex flex-col">
			<p className="pr-2">{address.key} Address:</p>
			<p>{`${address.address}, ${address.city}, ${address.state}, ${address.country}`}</p>
		</div>
	));
}

function blockUser(userId: string) {
	const metaData: Metadata | null = null;
	clients.auth.loginVerified.BlockUser(userId, metaData, (err: RpcError, response: StatusResponse) => {
		if (err) {
			console.error('Error blocking user:', err);
		} else {
			console.debug('response', response);
		}
	});
}

function unBlockUser(userId: string) {
	const metaData: Metadata | null = null;

	clients.auth.loginVerified.UnBlockUser(userId, metaData, (err: RpcError, response: StatusResponse) => {
		if (err) {
			console.error('Error unblocking user:', err);
		} else {
			console.debug('response', response);
		}
	});
}

function formatUnixTimestamp(unixTimestamp: number) {

	if (!unixTimestamp) {
		return '';
	}
	const timestampInMilliseconds = unixTimestamp * 1000;
	const date = new Date(timestampInMilliseconds);

	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');

	return `${day}/${month}/${year}`;
}

export { blockUser, unBlockUser, renderAddress, getFarmingType, getLandSizeString, getFarmingTypeColor, formatUnixTimestamp };