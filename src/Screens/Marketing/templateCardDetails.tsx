/* eslint-disable */

// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import React from "react";
import { templateCardDetails } from "src/types";
import { useNavigate } from "react-router-dom";

// const {
// 	name,
// 	templateId,
// 	baid,
// 	bodyParams,
// 	headerParams,
// 	footer,
// 	mediaUrl,
// 	mediaType,
// 	actionsType,
// 	actionsResponseLinkOrNumber,
// 	quickReplies,
// } = state;

const CardDetails: React.FC<templateCardDetails> = ({
	templateData,
	TempalteName,
	Id,
	createdAt,
	Content,
}) => {
	const contentArray = Content && Array.from(Content.values());
	const actionsType = templateData.getButtons()?.getCalltoactionbuttonsList()
	const navigate = useNavigate();
	const handleClick = () => {
		navigate(`/marketing/templatedetails/${Id}`, {
			state: {
				name: TempalteName,
				templateId: Id,
				baid: templateData.getWabaid(),
				bodyParams: templateData.getBodyparametersMap() && Array.from(templateData.getBodyparametersMap().values()),
				headerParams: templateData.getHeaderparametersMap() && Array.from(templateData.getHeaderparametersMap().values()),
				footer: templateData.getFooter &&  templateData.getFooter(),
				mediaUrl: templateData.getMediaparameters()?.getLink(),
				mediaType: templateData.getMediaparameters()?.getMediatype(),
				actionsType: actionsType && actionsType[0].getActiontype() === 1 ? 1 : 0,
				actionsResponseLinkOrNumber: actionsType && actionsType[0] && (actionsType[0].getActiontype() === 1 ? actionsType[0].getUrl()?.getLink(): actionsType[0].getPhonenumber() || "no number found"),
				quickReplies: templateData.getButtons()?.getQuickreplybuttonsList && templateData.getButtons()?.getQuickreplybuttonsList(),
			},
		});
	};

	return (
		<div className="p-2 flex flex-row justify-between">
			<div>
				<h1 className=" text-green-500 font-bold text-lg mb-1">
					{TempalteName}
				</h1>
				<div className="flex flex-row text-base mb-1">
					<div className="mr-4">Id : </div>
					<div className="text-base mb-1">{Id}</div>
				</div>
				{contentArray.map((item, index) => (
					<div className="flex flex-row text-base mb-1" key={index}>
						<div className="mr-4">Content : </div>
						<div className="">{item}</div>
					</div>
				))}

				<div className="flex flex-row text-base mb-1">
					<div className="mr-4">CreatedAt : </div>
					<div className="text-base mb-1">{createdAt}</div>
				</div>
			</div>
			<div className="content-end">
				<button onClick={handleClick}>Show Details</button>
			</div>
		</div>
	);
};

export default CardDetails;
