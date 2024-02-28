// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
/* eslint-disable */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Events from 'src/Screens/Events';
import DetailView from 'src/Screens/Events/detailView';
import Create from 'src/Screens/Events/create';
const EventMiddleware = () => {
	return (
		<Routes>
			<Route path='/' element={<Events />} />
			<Route path='editevent/:eventId' element={<Create />} />
			<Route path='eventdetail/:eventId' element={<DetailView />} />
		</Routes>
	);
};

export default EventMiddleware;