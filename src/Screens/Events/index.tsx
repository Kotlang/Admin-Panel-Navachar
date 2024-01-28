
// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

/* eslint-disable */
import Preview from 'src/components/Events/preview';
import CreateEventForm from 'src/components/Events/createEvent';
import { useState } from 'react';

export interface ILocation {
	lat: number;
	long: number;
}

export interface IEventData {
	name: string;
	hostName: string;
	description: string;
	startDate: string;
	endDate: string;
	tag: string;
	mode: string;
	slots: number;
	posters: FileList;
	address: ILocation;
	link: string;
}



const Events = () => {

	const [formData, setFormData] = useState<IEventData>({
		name: "",
		hostName: "",
		description: "",
		startDate: "2018-06-12T19:30",
		endDate: "",
		tag: "",
		mode: "",
		slots: 0,
		posters: [] as unknown as FileList,
		address: {
			lat: 0,
			long: 0,
		}
		,
		link: "",

	});


	return <>
		<div className="mt-14">
			<h2 className=" text-w_text font-barlow font-regular text-3xl leading-7 tracking-[10px] mt-3 mb-8 ">EVENTS</h2>
			{/* <div></div> // for event navigation (create, active,history) */}
			<div className="flex flex-wrap">
				<div className="w-[50%] "> {/*create form section*/}
					<CreateEventForm
						formData={formData}
						setFormData={setFormData}
					/>
				</div>
				<div className="w-[50%] p-5 relative flex flex-col items-center justify-center font-barlow ">{/*preview section*/}
					<Preview formData={formData} />
				</div>
			</div >
		</div>
	</>

};

export default Events;
function dayjs(arg0: any) {
	throw new Error('Function not implemented.');
}

