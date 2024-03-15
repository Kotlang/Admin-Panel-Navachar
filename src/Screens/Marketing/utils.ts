// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import { OperatorType } from 'src/generated/lead_pb';

const operatorTypeMapping = (operatorType: OperatorType) => {
	switch (operatorType) {
	case OperatorType.FARMER:
		return 'Farmer';
	case OperatorType.INPUT_PROVIDER:
		return 'Input Provider';
	case OperatorType.AGRI_CONSULTANT:
		return 'Agri Consultant';
	case OperatorType.TRACENET_CONSULTANT:
		return 'Tracenet Consultant';
	default:
		return 'Unspecified Operator';
	}
};

export { operatorTypeMapping };