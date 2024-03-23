// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MarketingIndex from 'src/Screens/Marketing';
import CreateTemplate from 'src/Screens/Marketing/createTemplate';
import LeadDetails from 'src/Screens/Marketing/leadDetails';
import TemplateDetailsPage from 'src/Screens/Marketing/templateDetails';
const MarketingMiddleware = () => {

	return (
		<Routes>
			<Route path='/:component' element={<MarketingIndex />} />
			<Route path='/' element={<MarketingIndex />} />
			<Route path='/createtemplate' element={<CreateTemplate />} />
			<Route path='leaddetails/:leadId' element={<LeadDetails />} />
			<Route path='templatedetails/:templateId' element={<TemplateDetailsPage />} />

		</Routes>
	);
};

export default MarketingMiddleware;