// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MarketingIndex from 'src/Screens/Marketing';
import CreateMessage from 'src/Screens/Marketing/createMessage';
import CreateTemplate from 'src/Screens/Marketing/createTemplate';
import LeadDetails from 'src/Screens/Marketing/leadDetails';
import TemplateDetailsPage from 'src/Screens/Marketing/templateDetails';

const MarketingMiddleware = () => {

	return (
		<Routes>
			<Route path='/:component' element={<MarketingIndex />} />
			<Route path='/messaging/:component' element={<MarketingIndex />} />
			<Route path='/' element={<MarketingIndex />} />
			<Route path='/createtemplate' element={<CreateTemplate />} />
			<Route path='leaddetails/:leadId' element={<LeadDetails />} />
			<Route path='templatedetails/:templateId' element={<TemplateDetailsPage />} />
			<Route path='createmessage/:templateId' element={<CreateMessage />} />
			<Route path='createmessage' element={<CreateMessage />} />
		</Routes>
	);
};

export default MarketingMiddleware;