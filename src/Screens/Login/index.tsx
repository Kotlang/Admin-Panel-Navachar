// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import { Button, Form, Input, Radio } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clients from 'src/clients';
import { useLoginStore } from 'src/store';

const Login = () => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const { authResponse } = useLoginStore(({ authResponse }) => ({
		authResponse
	}));
	const getOTP = async (values: any) => {
		await form.validateFields();
		console.log(values);
		if (values.emailOrPhone && values.domainType) {
			localStorage.setItem('DOMAIN_TYPE', values.domainType);
			setLoading(true);
			clients.auth.login.Login(values.emailOrPhone, {}, (err) => {
				if (err) {
					console.error(err);
				} else {
					setLoading(false);
					navigate('/verify', {
						state: {
							emailOrPhone: values.emailOrPhone
						}
					});
				}
			});
		}
	};
	useEffect(() => {
		if (authResponse?.jwt && authResponse?.jwt.trim().length > 0) {
			navigate('/');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authResponse?.jwt]);

	return (
		<div className='flex min-h-screen'>
			<div className='w-1/2'>
				<img
					src='https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwxMnx8ZmFybWluZ3xlbnwxfHx8fDE3MDEwMjExMzd8MA&ixlib=rb-4.0.3&q=80&w=1080'
					alt='Farming'
					className='w-1/2 h-screen object-cover fixed left-0 top-0'
				/>
			</div>
			<div className='w-1/2 flex flex-col justify-center items-center relative'>
				<h1 className='text-4xl pb-8 pr-4 font-bold font-poppins text-center mb-8'>Navachar Admin Panel</h1>
				<section className='w-full flex justify-center items-center'>
					<Form
						form={form}
						className='-mt-10'
						onFinish={getOTP}
						initialValues={{
							domainType: 'DEV'
						}}
					>
						<div
							className='flex flex-col gap-y-2'
						>
							<label htmlFor="emailOrPhone" className='block'>
								<p className='text-xl font-medium'>
									Select domain type
								</p>
							</label>
							<Form.Item
								name='domainType'
								rules={
									[
										{
											message: 'Domain type is required.',
											required: true
										}
									]
								}
							>
								<Radio.Group buttonStyle="solid">
									<Radio.Button value='DEV'>Development</Radio.Button>
									<Radio.Button value='PROD'>Production</Radio.Button>
								</Radio.Group>
							</Form.Item>
						</div>
						<div
							className='flex flex-col gap-y-2'
						>
							<label htmlFor="emailOrPhone" className='block'>
								<p className='text-xl font-medium'>
									Please enter a phone number
								</p>
							</label>
							<Form.Item
								name='emailOrPhone'
								rules={
									[
										{
											message: 'Phone number is required.',
											required: true
										},
										{
											message: 'Please enter valid phone number.',
											pattern: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
										}
									]
								}
							>
								<Input className='rounded-md py-2 px-3 md:min-w-[400px] text-lg' id='emailOrPhone' placeholder='Enter a phone number' />
							</Form.Item>
						</div>
						<div className="flex justify-center items-center">
							<Button
								loading={loading}
								htmlType="submit"
								size="large"
								className="w-36 rounded-md outline-none border-none bg-black text-white hover:text-white"
							>
								Get OTP
							</Button>
						</div>
					</Form>
				</section>
			</div>
		</div>
	);
};

export default Login;