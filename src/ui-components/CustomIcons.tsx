// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import React from 'react';
import { ReactComponent as NavaCharSVG } from 'src/assets/icons/logo.svg';

export const NavaCharIcon = (props: Partial<CustomIconComponentProps>) => (
	<Icon component={NavaCharSVG} {...props} />
);