// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Metadata, RpcError } from 'grpc-web';
import { EventFeedFilters, EventFeedResponse, GetEventFeedRequest } from 'src/generated/events_pb';

import { addJwtToken } from '../utils';
import { getEventsClient } from './event';

// Function to create GetEventFeedRequest
const getEventFeedRequest = (pageSize: number, pageNumber: number, filters: EventFeedFilters) => {
	const request = new GetEventFeedRequest();
	request.setFilters(filters);
	request.setPagesize(pageSize);
	request.setPagenumber(pageNumber);

	return request;
};

// Main function to get event feed
const EventClient = {
	GetEventFeed: (
		pageSize: number,
		pageNumber: number,
		filters: EventFeedFilters,
		metaData: Metadata | null,
		callback: (err: RpcError, response: EventFeedResponse) => void
	) => {
		getEventsClient().getEventFeed(getEventFeedRequest(pageSize, pageNumber, filters), addJwtToken(metaData), callback);
	}
};

export default EventClient;
