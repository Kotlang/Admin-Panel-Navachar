// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { useLocation, useNavigate } from 'react-router-dom';
import clients from 'src/clients';
import { getAuthResponse } from 'src/clients/utils';
import { useLoginStore } from 'src/store';

const Verify = () => {
	const navigate = useNavigate();
	const { state } = useLocation();
	const [otp, setOtp] = useState('');
	const [loading, setLoading] = useState(false);
	const [err, setErr] = useState('');

	const { authResponse, isAdmin, isLogin, setAuthResponse } = useLoginStore(({ authResponse, isAdmin, isLogin, setAuthResponse }) => ({
		authResponse,
		isAdmin,
		isLogin,
		setAuthResponse
	}));

	const emailOrPhone = authResponse?.profile?.phone || authResponse?.profile?.email || state?.emailOrPhone;

	const onVerify = () => {
		setLoading(true);
		setErr('');
		clients.auth.login.Verify(emailOrPhone || '', otp, {}, (err, response) => {
			if (err) {
				console.error(err);
				if (err.message) {
					setLoading(false);
					setErr('Invalid! OTP, please enter correct otp');
					setOtp('');
				}
			} else {
				setLoading(false);
				const userType = response.getUsertype();
				if (userType === 'admin') {
					setAuthResponse(getAuthResponse(response));
					navigate('/');
				} else {
					alert("you don't have admin Access");
					navigate('/login');
				}
			}
		});
	};

	useEffect(() => {
		if (isLogin() && isAdmin()) {
			navigate('/');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [navigate]);
	return (
		<div>
			<section className='flex flex-col gap-y-5 items-center justify-center min-h-screen'>
				<div className='flex flex-col gap-y-2 -mt-20'>
					<h2 className='text-lg md:text-2xl font-medium text-gray-600'>
						Enter OTP
					</h2>
					<OtpInput
						value={otp}
						onChange={(otp: any) => setOtp(otp)}
						numInputs={6}
						separator={<span style={{ width: '8px' }}></span>}
						isInputNum={true}
						shouldAutoFocus={true}
						containerStyle='bg-gray-200 p-5 rounded-md'
						inputStyle={{
							border: '1px solid transparent',
							borderRadius: '8px',
							caretColor: 'blue',
							color: '#000',
							fontSize: '16px',
							fontWeight: '400',
							height: '54px',
							width: '54px'
						}}
						focusStyle={{
							border: '1px solid #CFD3DB',
							color: '#000',
							outline: 'none'
						}}
					/>
					{err.length > 0 ? <p className='text-red-500'>{err}</p> : null}
				</div>
				<div className="flex justify-center items-center gap-x-5">
					<Button
						htmlType="button"
						size="large"
						className="w-36 rounded-md outline-none border-none bg-black text-white hover:text-white"
						onClick={() => {
							navigate(-1);
						}}
					>
						Back
					</Button>
					<Button
						disabled={otp.trim().length !== 6}
						loading={loading}
						htmlType="button"
						size="large"
						className="w-36 rounded-md outline-none border-none bg-black text-white hover:text-white"
						onClick={onVerify}
					>
						Verify
					</Button>
				</div>
			</section>
		</div>

	);
};

export default Verify;