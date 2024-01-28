/* eslint-disable */
// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import React, { useEffect, useState } from 'react';
import { EventProto, EventFeedFilters, EventFeedResponse } from 'src/generated/events_pb';
import EventClient from 'src/clients/social/listevents';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import clients from 'src/clients';

function convertUnixTimeToDateTime(unixTimeInSeconds: number): string {
	const milliseconds = unixTimeInSeconds * 1000;
	const dateObject = new Date(milliseconds);

	const formattedDateTime = new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
		timeZone: 'UTC',
	}).format(dateObject);

	return formattedDateTime;
}

const EventsTable: React.FC = () => {
	const navigate = useNavigate();
	const [isDialogOpen, setDialogOpen] = useState(false);
	const [selectedEventId, setSelectedEventId] = useState('');

	const handleDelete = (event: EventProto) => {
		setSelectedEventId(event.getEventid());
		setDialogOpen(true);
	};

	const handleConfirmDelete = async (eventId: string) => {
		try {
			// Delete the event
			clients.social.event.DeleteEvent(eventId, {}, (err, res) => {
				if (err) {
					console.log(err);
				} else {
					console.log(res.getStatus());

					// Refetch events after deletion
					fetchEvents();
				}
			});
		} catch (error) {
			console.error('Error confirming delete:', error);
		} finally {
			setDialogOpen(false);
		}
	};

	// Handler for the Edit button
	const handleEdit = (event: any) => {
		navigate(`/events/${event}`);
	};

	// Handler for the Monitor button
	const handleMonitor = (event: any) => {
		navigate(`/events/monitor/${event}`);
	};
	const [events, setEvents] = useState<EventProto[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const fetchEventsAsync = (
		pageSize: number,
		pageNumber: number,
		filters: EventFeedFilters,
		metaData: {} | null
	): Promise<EventFeedResponse> => {
		return new Promise((resolve, reject) => {
			EventClient.GetEventFeed(pageSize, pageNumber, filters, metaData, (err, response) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					resolve(response);
				}
			});
		});
	};

	const fetchEvents = async () => {
		try {
			let allEvents: any[] = [];
			for (let i = 0; i < 3; i++) {
				const filters = new EventFeedFilters();
				filters.setEventstatus(i);
				const response = await fetchEventsAsync(0, 0, filters, {});
				allEvents = allEvents.concat(response.getEventsList());
			}
			setEvents(allEvents);
		} catch (err) {
			console.error('Error fetching events:', err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchEvents();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h2 className="text-2xl font-semibold text-gray-800 mb-4">Events</h2>
			<div className="overflow-x-auto shadow-md sm:rounded-lg">
				<table className="table-auto w-full text-gray-500 dark:text-gray-400 ">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
						<tr>
							<th scope="col" className="px-3 py-3">
								Title
							</th>
							<th scope="col" className="px-3 py-3">
								Type
							</th>
							<th scope="col" className="px-3 py-3">
								Start At
							</th>
							<th scope="col" className="px-3 py-3">
								End At
							</th>
							<th scope="col" className="px-3 py-3">
								Attendees
							</th>
							<th scope="col" className="px-3 py-3">
								Description
							</th>
							<th scope="col" className="px-3 py-3">
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{events.map((event, index) => (
							<tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 h-full">
								<td className="px-6 py-4">{event.getTitle()}</td>
								<td className="px-6 py-4">{event.getType() === 0 ? 'Online' : 'Offline'}</td>
								<td className="px-6 py-4">{convertUnixTimeToDateTime(event.getStartat())}</td>
								<td className="px-6 py-4">{convertUnixTimeToDateTime(event.getEndat())}</td>
								<td className="px-6 py-4">{event.getNumattendees()}</td>
								<td className="px-6 py-4">{event.getDescription()}</td>
								<td className="px-4 py-2 ">
									<div className='flex flex-row items-center justify-center px-0 py-0'>
										<button
											onClick={() => handleEdit(event.getEventid())}
											className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mr-2"
										>
											Edit
										</button>
										<button
											onClick={() => handleMonitor(event.getEventid())}
											className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2 "
										>
											Monitor
										</button>
										<button
											onClick={() => handleDelete(event)}
											className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
										>
											Delete
										</button>
									</div>

								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<Modal
				isOpen={isDialogOpen}
				onRequestClose={() => setDialogOpen(false)}
				contentLabel="Delete Event"
				className="modal"
				style={{
					overlay: {
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					},
					content: {
						position: 'relative',
						top: 'auto',
						left: 'auto',
						right: 'auto',
						bottom: 'auto',
						margin: 'auto',
						maxWidth: '400px', // Adjust the maximum width as needed
						width: '100%',
						padding: '0',
						borderRadius: '8px',
						boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
					},
				}}
			>
				<div className="p-6 bg-white rounded-lg shadow-lg">
					<p className="text-lg font-semibold mb-4">Are you sure you want to delete this event?</p>
					<div className="flex justify-end">
						<button
							onClick={() => handleConfirmDelete(selectedEventId)}
							className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
						>
							Yes, delete
						</button>
						<button
							onClick={() => setDialogOpen(false)}
							className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
						>
							Cancel
						</button>
					</div>
				</div>
			</Modal>


		</div>
	);
};

export default EventsTable;
