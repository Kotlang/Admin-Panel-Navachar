// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { ILogin } from 'src/types';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const useLoginStore = create<ILogin>()(
	devtools(
		persist(
			(set, get) => ({
				authResponse: {
					jwt: '',
					profile: {},
					userType: ''
				},
				isAdmin: () => {
					return get().authResponse.userType === 'admin';
				},
				isLogin: () => {
					return get().authResponse.jwt.trim().length > 0;
				},
				logout: () => {
					set((state) => {
						return {
							...state,
							authResponse: {
								jwt: '',
								profile: {},
								userType: ''
							}
						};
					});
				},
				setAuthResponse: (authResponse) => {
					set((state) => {
						return { ...state, authResponse };
					});
				}
			}),
			{
				name: 'login'
			}
		)
	)
);

export default useLoginStore;