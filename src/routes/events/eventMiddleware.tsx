// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Events from 'src/Screens/Events';
import MonitorDashboard from 'src/Screens/Events/monitor';
import EventsTable from 'src/Screens/Events/show';

const EventMiddleware = () => {
	return (
		<Routes>
			<Route path='create' element={<Events />} />
			<Route path='show' element={<EventsTable />} />
			<Route path=':eventId' element={<Events />} />
			<Route path='monitor/:eventId' element={<MonitorDashboard />} />
		</Routes>
	);
};

export default EventMiddleware;