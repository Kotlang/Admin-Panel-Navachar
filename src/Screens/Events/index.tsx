/* eslint-disable */

import Create from "./create";
import { useState } from "react";
import EventsTable from "./show";

const Events = () => {
	const [activeComponent, setActiveComponent] = useState('show');
	const renderComponent = () => {
		switch (activeComponent) {
			case 'CRESATE':
				return <Create />;
			case 'ACTIVE':
				return <EventsTable eventStatus={activeComponent} />;
			case 'PAST':
				return <EventsTable eventStatus={activeComponent} />;
			default:
				return <Create />;
		}
	};

	return (
		<>
			<div className="mt-14">
				<h2 className=" text-w_text font-barlow font-regular text-3xl leading-7 tracking-[10px] mt-3 mb-8 ">EVENTS</h2>
				<nav className=" text-gray-500 items-center justify-between hidden w-full md:flex md:w-auto md:order-1 mb-4">
					<ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-10 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
						<p
							className={`cursor-pointer text-lg ${activeComponent === 'ACTIVE' ? 'underline underline-offset-8 text-green-500' : ''}`}
							onClick={() => setActiveComponent('ACTIVE')}
						>
							Active Events
						</p>
						<p
							className={`cursor-pointer text-lg ${activeComponent === 'CRESATE' ? 'underline underline-offset-8 text-green-500' : ''}`}
							onClick={() => setActiveComponent('CRESATE')}
						>
							Create Event
						</p>
						<p
							className={`cursor-pointer text-lg ${activeComponent === 'PAST' ? 'underline underline-offset-8 text-green-500' : ''}`}
							onClick={() => setActiveComponent('PAST')}
						>
							Past Events
						</p>
					</ul>
				</nav>
				<div>
					{renderComponent()}
				</div>
			</div>
		</>
	);

};

export default Events;