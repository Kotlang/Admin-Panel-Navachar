// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import React from 'react';
import { ActivityCardDetails } from 'src/types';

const CardDetails: React.FC<ActivityCardDetails> = (activityCardDetails) => {
	const getActivityIcon = (type: string) => {
		switch (type) {
		case 'commented':
			return (
				<div className="flex flex-row items-center text-yellow-500">
					<svg
						className="h-6 w-6 mx-2"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						strokeWidth="2"
						stroke="currentColor"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						{' '}
						<path stroke="none" d="M0 0h24v24H0z" />{' '}
						<path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" />{' '}
						<line x1="12" y1="12" x2="12" y2="12.01" />{' '}
						<line x1="8" y1="12" x2="8" y2="12.01" />{' '}
						<line x1="16" y1="12" x2="16" y2="12.01" />
					</svg>
					<p className="text-base">{`${type} on`}</p>
				</div>
			);
		case 'posted':
			return (
				<div className="flex flex-row items-center text-violet-500" >
					<svg
						className="h-6 w-6 mx-2"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M12 4v16m8-8H4"
						/>
					</svg>
					<p className="text-base">{`${type} on`}</p>
				</div>
			);
		case 'eventJoined':
			return (
				<svg
					className="h-8 w-8 mx-2 text-blue-500"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					strokeWidth="2"
					stroke="currentColor"
					fill="none"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					{' '}
					<path stroke="none" d="M0 0h24v24H0z" />{' '}
					<path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" />{' '}
					<line x1="12" y1="12" x2="12" y2="12.01" />{' '}
					<line x1="8" y1="12" x2="8" y2="12.01" />{' '}
					<line x1="16" y1="12" x2="16" y2="12.01" />
				</svg>
			);
		case 'liked':
			return (
				<svg
					className="h-8 w-8 mx-2 text-green-500"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					strokeWidth="2"
					stroke="currentColor"
					fill="none"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					{' '}
					<path stroke="none" d="M0 0h24v24H0z" />{' '}
					<path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" />{' '}
					<line x1="12" y1="12" x2="12" y2="12.01" />{' '}
					<line x1="8" y1="12" x2="8" y2="12.01" />{' '}
					<line x1="16" y1="12" x2="16" y2="12.01" />
				</svg>
			);
		default:
			return null;
		}
	};

	return (
		<div className="flex flex-col w-[90%] gap-2">
			<div className="flex gap-2">
				<div className="flex flex-row w-full ">
					<img
						src={activityCardDetails.avatar}
						alt=""
						className="w-16 h-16 rounded-full"
					/>
					<p className="px-2 py-6 font-bold">{activityCardDetails.name}</p>
				</div>
				<div className="flex justify-end w-[20%] ">
					<p className="">{activityCardDetails.dateCreated}</p>
				</div>
			</div>
			<div className="px-2 ">
				<p className=" font-sans text-base text-slate-50">
					{activityCardDetails.content}
				</p>
			</div>
			<div className="px-2 flex flex-row ">
				<p className=" font-sans text-base text-gray-400">123 Likes</p>
				<p className="px-6 text-base text-gray-400">123 Comments</p>
			</div>
			<div className="flex gap-2">
				<div className="flex flex-row w-full items-center ">
					{getActivityIcon(activityCardDetails.activityType)}
					<p className="px-1 text-base font-bold"></p>
					{activityCardDetails.dateReact}
				</div>
				<div className="flex justify-end items-center w-[20%]">
					<button className="">Show</button>
				</div>
			</div>
		</div>
	);
};

export default CardDetails;
