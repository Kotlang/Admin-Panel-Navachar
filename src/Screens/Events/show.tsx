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
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import clients from "src/clients";

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
		timeZone: "UTC",
	}).format(dateObject);

	return formattedDateTime;
}

const EventsTable: React.FC = () => {
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
			for (let i = 0; i < 3; i++) {
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
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="pt-20 p-5 h-screen">
			<h2 className="text-2xl font-semibold text-white font-mainfont tracking-[10px] mb-4 uppercase">
				Events
			</h2>
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
						<tr className="bg-inherit  text-w_text h-full text-base font-mainfont">
							<td className="px-3 py-4">
								Discussion of organic framing
							</td>
							<td className="px-3 py-4">
								12/02/2024
								<br />
								12:30pm
							</td>
							<td className="px-3 py-4">Online</td>
							<td className="px-3 py-4">2 Hr</td>
							<td className="px-3 py-4">2000</td>
							<td className="px-3 py-2 ">
								<div className="flex flex-row items-center justify-start gap-2">
									<button className="bg-[#F75260] hover:opacity-90 text-white  py-1 px-4 rounded uppercase">
										Delete
									</button>
									<button className="bg-[#34C06E] hover:opacity-90 text-white py-1 px-4 rounded uppercase ">
										Update
									</button>
								</div>
							</td>
						</tr>
						<tr className="bg-inherit  text-w_text h-full text-base font-mainfont">
							<td className="px-3 py-4">
								Discussion of organic framing
							</td>
							<td className="px-3 py-4">
								12/02/2024
								<br />
								12:30pm
							</td>
							<td className="px-3 py-4">Online</td>
							<td className="px-3 py-4">2 Hr</td>
							<td className="px-3 py-4">2000</td>
							<td className="px-3 py-2 ">
								<div className="flex flex-row items-center justify-start gap-2">
									<button className="bg-[#F75260] hover:opacity-90 text-white  py-1 px-4 rounded uppercase">
										Delete
									</button>
									<button className="bg-[#34C06E] hover:opacity-90 text-white py-1 px-4 rounded uppercase ">
										Update
									</button>
								</div>
							</td>
						</tr>
						<tr className="bg-inherit  text-w_text h-full text-base font-mainfont">
							<td className="px-3 py-4">
								Discussion of organic framing
							</td>
							<td className="px-3 py-4">
								12/02/2024
								<br />
								12:30pm
							</td>
							<td className="px-3 py-4">Online</td>
							<td className="px-3 py-4">2 Hr</td>
							<td className="px-3 py-4">2000</td>
							<td className="px-3 py-2 ">
								<div className="flex flex-row items-center justify-start gap-2">
									<button className="bg-[#F75260] hover:opacity-90 text-white  py-1 px-4 rounded uppercase">
										Delete
									</button>
									<button className="bg-[#34C06E] hover:opacity-90 text-white py-1 px-4 rounded uppercase ">
										Update
									</button>
									<button onClick={() => {
										navigate('/eventDetail')
									}}>
										➡️
									</button>
								</div>
							</td>
						</tr>


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
