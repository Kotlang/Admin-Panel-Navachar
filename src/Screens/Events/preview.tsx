
/* eslint-disable */
// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import React from 'react';
import { IEvent, MediaUrl } from 'src/types';

const EventPreview: React.FC<IEvent> = ({
	title,
	type,
	startAt,
	endAt,
	mediaUrls,
	description,
	numAttendees,
	numSlots,
	location,
	onlineLink,
	tags
}) => {
	const renderMedia = (media: MediaUrl) => {
		if (media.mimeType?.startsWith('image')) {
			return <img src={media.url} alt="Event" className="w-32 h-32 rounded-lg mb-4 object-cover" />;
		} else if (media.mimeType?.startsWith('video')) {
			return (
				<video className="rounded-lg mb-4 w-32 h-32" controls>
					<source src={media.url} type={media.mimeType} />
					Your browser does not support the video tag.
				</video>
			);
		} else {
			return null;
		}
	};

	return (
		<div className="container mx-auto p-4 bg-white rounded-lg shadow-md">
			{/* Title and Type */}
			<div className="mb-4">
				<h1 className="text-xl font-bold">{title}</h1>
				<p className="text-sm"><strong>Type:</strong>{type==1?' Offline':' Online'}</p>
			</div>

			{/* Date and Time */}
			<div className="mb-4">
				<p><strong>Start:</strong> {startAt?.format('MMMM D, YYYY h:mm A')}</p>
				<p><strong>End:</strong> {endAt?.format('MMMM D, YYYY h:mm A')}</p>
			</div>

			{/* Description */}
			{description && (
				<div className="mb-4">
					<h2 className="text-lg font-semibold">Description</h2>
					<p className="text-sm">{description}</p>
				</div>
			)}

			{/* Additional Details */}
			<div className="mb-4">
				<p><strong>Attendees:</strong> {numAttendees}</p>
				<p><strong>Slots Available:</strong> {numSlots}</p>
				<p><strong>Location:</strong> Lat: {location?.lat}, Long: {location?.long}</p>
				<p><strong>Online Link:</strong> <a href={onlineLink} className="text-blue-500 hover:underline">{onlineLink}</a></p>
			</div>

            {/* Media Section */}
            {mediaUrls && mediaUrls.length > 0 && (
                <div className="mb-4 grid grid-cols-4">
                    {mediaUrls.map((media, index) => (
                        <div key={index}>{renderMedia(media)}</div>
                    ))}
                </div>
            )}

			{/* Tags */}
			{tags && (
				<div className="mb-4 flex flex-wrap">
					{tags.map((tag, index) => (
						<span key={index} className="m-1 bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
							{tag}
						</span>
					))}
				</div>
			)}
		</div>
	);
};

export default EventPreview;
