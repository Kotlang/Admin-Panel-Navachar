/* eslint-disable */
// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import React, { useEffect, useState } from "react";
import {
	EventProto,
	EventFeedFilters,
	EventFeedResponse,
} from "src/generated/events_pb";
import EventClient from "src/clients/social/listevents";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import clients from "src/clients";

interface EventsTableProps {
	eventStatus: string;
  }

function convertUnixTimeToDateTime(unixTimeInSeconds: number): string {
	const milliseconds = unixTimeInSeconds * 1000;
	const dateObject = new Date(milliseconds);

	const formattedDateTime = new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
	}).format(dateObject);

	return formattedDateTime;
}

function calculateTimeDifference(startUnixTime: number, endUnixTime: number): string {
	// Calculate the difference in milliseconds
	const differenceInMilliseconds = endUnixTime - startUnixTime;
	const minutes = Math.floor(differenceInMilliseconds / 60);
	const hours = Math.floor(minutes / 60);
	const remainingMinutes = minutes % 60;
	const formattedHours = hours.toString().padStart(2, '0');
	const formattedMinutes = remainingMinutes.toString().padStart(2, '0');

	return `${formattedHours}:${formattedMinutes}`;
}

const EventsTable: React.FC<EventsTableProps> = ({eventStatus}) => {
	const navigate = useNavigate();

	const [isDialogOpen, setDialogOpen] = useState(false);
	const [selectedEventId, setSelectedEventId] = useState("");

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
			console.error("Error confirming delete:", error);
		} finally {
			setDialogOpen(false);
		}
	};

	// Handler for the Edit button
	const handleEdit = (event: any) => {
		navigate(`/events/editevent/${event}`);
	};

	// // Handler for the Monitor button
	// const handleMonitor = (event: any) => {
	// 	navigate(`/events/monitor/${event}`);
	// };
	const [events, setEvents] = useState<EventProto[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const fetchEventsAsync = (
		pageSize: number,
		pageNumber: number,
		filters: EventFeedFilters,
		metaData: {} | null
	): Promise<EventFeedResponse> => {
		return new Promise((resolve, reject) => {
			EventClient.GetEventFeed(
				pageSize,
				pageNumber,
				filters,
				metaData,
				(err, response) => {
					if (err) {
						console.log(err);
						reject(err);
					} else {
						resolve(response);
					}
				}
			);
		});
	};

	const fetchEvents = async () => {
		try {
			let allEvents: any[] = [];
			for (let i = ( eventStatus === "ACTIVE" ? 1:0 ); i < ( eventStatus === "ACTIVE" ? 3:1 ); i++) {
				const filters = new EventFeedFilters();
				filters.setEventstatus(i);
				const response = await fetchEventsAsync(0, 0, filters, {});
				allEvents = allEvents.concat(response.getEventsList());
			}
			setEvents(allEvents);
		} catch (err) {
			console.error("Error fetching events:", err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchEvents();
	}, [eventStatus]);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="mt-8 h-screen">
			<div className="rounded-lg border  bg-[#525252] bg-opacity-40  backdrop-blur-[3.9px] h-[90%]  overflow-y-scroll">
				<table className="table-auto w-full ">
					<thead className=" uppercase text-f_text ">
						<tr>
							<th scope="col" className="px-3 py-3 text-start font-mainfont font-normal text-base">
								Name
							</th>
							<th scope="col" className="px-3 py-3 text-start font-mainfont font-normal text-base">
								Date
							</th>
							<th scope="col" className="px-3 py-3 text-start font-mainfont font-normal text-base">
								Mode
							</th>

							<th scope="col" className="px-3 py-3 text-start font-mainfont font-normal text-base">
								Duration
							</th>
							<th scope="col" className="px-3 py-3 text-start font-mainfont font-normal text-base">
								Subscribers
							</th>
							<th scope="col" className="px-3 py-3 text-start font-mainfont font-normal text-base">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className=" ">
						{events.map((event, index) => (
							<React.Fragment key={index}>
								<tr className="bg-inherit  text-w_text h-full text-base font-mainfont">
									<td className="px-3 py-4">
										<Link to={`/events/eventdetail/${event.getEventid()}`}>
											{event.getTitle()}
										</Link>
									</td>
									<td className="px-3 py-4">
										{convertUnixTimeToDateTime(event.getStartat())}
									</td>
									<td className="px-3 py-4">{event.getType() === 0 ? 'Online' : 'Offline'}</td>
									<td className="px-3 py-4">{calculateTimeDifference(event.getStartat(), event.getEndat())}</td>
									<td className="px-3 py-4">{event.getNumattendees()}</td>
									<td className="px-3 py-2 ">
										<div className="flex flex-row items-center justify-start gap-2">
											<button className="bg-[#F75260] hover:opacity-90 text-white  py-1 px-4 rounded uppercase"
												onClick={() => handleDelete(event)}>
												Delete
											</button>
											<button className="bg-[#34C06E] hover:opacity-90 text-white py-1 px-4 rounded uppercase"
												onClick={() => handleEdit(event.getEventid())}>
												Update
											</button>
										</div>
									</td>
								</tr>
							</React.Fragment>
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
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					},
					content: {
						position: "relative",
						top: "auto",
						left: "auto",
						right: "auto",
						bottom: "auto",
						margin: "auto",
						maxWidth: "400px", // Adjust the maximum width as needed
						width: "100%",
						padding: "0",
						borderRadius: "8px",
						boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
					},
				}}
			>
				<div className="p-6 bg-white rounded-lg shadow-lg">
					<p className="text-lg font-semibold mb-4">
						Are you sure you want to delete this event?
					</p>
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
		</div >
	);
};

export default EventsTable;
