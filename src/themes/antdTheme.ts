// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { theme } from 'antd';
import { ThemeConfig } from 'antd/es/config-provider/context';

export const lightTheme: ThemeConfig = {
	algorithm : theme.defaultAlgorithm,
	hashed: false
};

export const darkTheme: ThemeConfig = {
	algorithm : theme.darkAlgorithm,
	components: {
		Tabs: {
			inkBarColor: '#34C06E',
			itemHoverColor: '#34C06E',
			itemSelectedColor: '#34C06E'
		},
		Typography : {
			fontFamily : 'Barlow '
		}
	},
	token: {
		colorPrimary: '#34C06E'
	}
};
