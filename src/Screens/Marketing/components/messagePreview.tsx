// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import { Button, Col, Flex, Row, Typography } from 'antd';
import React from 'react';
import { MediaType } from 'src/generated/messaging-service_pb';
import { IButton, IMessagePreview, MediaParameters } from 'src/types';

interface PreviewMessageComponentProps {
    message: IMessagePreview | undefined;
}

const MessageComponent: React.FC<PreviewMessageComponentProps> = ({ message }) => {

	let header = message?.header;
	message?.headerParameters?.forEach((headerParameter) => {
		header = header?.replace(`$(${headerParameter[0]})`, headerParameter[1]);
	});

	let body = message?.body;
	message?.bodyParameters?.forEach((bodyParameter) => {
		body = body?.replace(`$(${bodyParameter[0]})`, bodyParameter[1]);
	});

	const footer = message?.footer;
	return (
		<Row style={{ backgroundColor : 'rgb(39 39 42)', borderRadius : '1.2rem', justifyContent: 'center', paddingTop : '10px' }}>
			<Col span={20}>
				<Typography.Title level={3}>Message Preview</Typography.Title>
			</Col>

			<Col span={20} style={{ maxHeight: '50%' }}>
				<RenderMedia mediaParameteres={message?.mediaParameters} />
			</Col>

			<Col span={20}>
				<Flex>
					<Typography.Text style={{ fontSize: '1.2rem', whiteSpace: 'pre-line' }} strong>Message:</Typography.Text>
				</Flex>
			</Col>

			<Col span={20}>
				<Typography.Text style={{ fontSize: '1.1rem', whiteSpace: 'pre-line' }} >{header}</Typography.Text>
			</Col>

			<Col span={20}>
				<Typography.Text style={{ fontSize: '1.1rem', whiteSpace: 'pre-line' }}>{body}</Typography.Text>
			</Col>

			<Col span={20}>
				<Typography.Text style={{ fontSize: '1.1rem', whiteSpace: 'pre-line' }}>{footer}</Typography.Text>
			</Col>

			<Col span={20}>
				<RenderButton buttons={message?.Buttons} />
			</Col>

		</Row>
	);
};

const RenderMedia = ({ mediaParameteres }: { mediaParameteres: MediaParameters | undefined}) => {

	if (mediaParameteres?.mediaType === MediaType.IMAGE) {
		return <img src={mediaParameteres?.link} alt="media" />;
	} else if (mediaParameteres?.mediaType === MediaType.VIDEO) {
		return <video src={mediaParameteres.link} controls />;
	} else if (mediaParameteres?.mediaType == MediaType.DOCUMENT) {
		return  <a href={mediaParameteres.link} target="_blank" rel="noreferrer"></a>;
	}else {
		return null;
	}
};

const RenderButton = ({ buttons }: { buttons: IButton | undefined }) => {
	return (
		<Row style={{ alignContent : 'center', justifyContent : 'center' }}>

			{buttons?.callToActionButtons?.map((button) => {
				if (button.getActiontype() === 0) {
					return (
						button.getText() &&
							<Button type="primary" style={{ margin: '5px' }} size='large' href=''>
								<Row style={{ alignContent : 'center' }}>
									<CallIconFilled/>{button.getText()}
								</Row>
							</Button>
					);
				}else {
					return (
						button.getText() &&
							<Button type="primary" style={{ margin: '5px' }} size='large' href={button.getUrl()?.getLink()} target="_blank">
								<Row style={{ alignContent : 'center' }}>
									<OpenLinkIcon/> { button.getText()}
								</Row>
							</Button>
					);
				}
			})}
			{buttons?.quickReplyButtons?.map((button) => {
				return (
					button.getText() &&
						<Button type="primary" style={{ margin: '5px' }} size='large' href=''>{button.getText()}</Button>
				);
			})}
		</Row>
	);
};

const OpenLinkIcon = () => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30">
			<path fill="rgb(30 64 175)" d="M25.980469,2.9902344A1.0001,1.0001,0,0,0,25.869141,3L20,3A1.0001,1.0001,0,1,0,20,5L23.585938,5L13.292969,15.292969A1.0001,1.0001,0,1,0,14.707031,16.707031L25,6.4140625L25,10A1.0001,1.0001,0,1,0,27,10L27,4.1269531A1.0001,1.0001,0,0,0,25.980469,2.9902344z M6,7C4.9069372,7,4,7.9069372,4,9L4,24C4,25.093063,4.9069372,26,6,26L21,26C22.093063,26,23,25.093063,23,24L23,14L23,11.421875L21,13.421875L21,16L21,24L6,24L6,9L14,9L16,9L16.578125,9L18.578125,7L16,7L14,7L6,7z"></path>
		</svg>

	);
};

const CallIconFilled = () => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 30 30">
			<path fill="rgb(30 64 175)" d="M21.384,17.752a2.108,2.108,0,0,1-.522,3.359,7.543,7.543,0,0,1-5.476.642C10.5,20.523,3.477,13.5,2.247,8.614a7.543,7.543,0,0,1,.642-5.476,2.108,2.108,0,0,1,3.359-.522L8.333,4.7a2.094,2.094,0,0,1,.445,2.328A3.877,3.877,0,0,1,8,8.2c-2.384,2.384,5.417,10.185,7.8,7.8a3.877,3.877,0,0,1,1.173-.781,2.092,2.092,0,0,1,2.328.445Z"/>
		</svg>
	);
};

export default MessageComponent;