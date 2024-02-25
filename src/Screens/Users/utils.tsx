// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import React from 'react';
import {
	AddressProto,
	FarmingType,
	LandSizeInAcres
} from 'src/generated/common_pb';

export function GetFarmingType (farmingType: FarmingType) {
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

export function GetFarmingTypeColor (farmingPractice: string) {
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

export function getLandSizeString (landsize: any) {
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

export function RenderAddress(addressesMap: Map<string, AddressProto>) {
	const addressesArray: Array<{
		key: string;
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