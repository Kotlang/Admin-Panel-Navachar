/* eslint-disable */
import React, { useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import clients from "src/clients";
import dayjs from "dayjs";
import { IEvent } from "src/types";
import HandleImageUpload from "src/components/Events/mediaUpload";


export default function CreateEventForm({ formData, setFormData }: any) {
    const [uploadedImageLinks, setUploadedImageLinks] = useState<string[]>([]);

    const handleChange = (e: { target: any; }) => {
        const { id, value, type, files } = e.target;
        setFormData((prevData: any) => ({
            ...prevData,
            [id]: type === "file" ? files : value,
        }));
    };

    const onUpload = (e: any) => {
        handleChange(e);
        HandleImageUpload(formData.posters, setUploadedImageLinks);
    }


    const handleSubmit = (e: any) => {
        // const event: IEvent = {
        //     startAt: dayjs(dayjs().add(5, "hour").toDate()),
        //     endAt: dayjs(dayjs().add(2, "hour").toDate()),
        //     description: formData.description,
        //     location: {
        //         lat: 12341,
        //         long: 1234,
        //     },
        //     numAttendees: 1234,
        //     numSlots: Number(formData.slots),
        //     onlineLink: formData.link,
        //     title: formData.name,
        //     type: 1,
        // };
        // clients.social.event.CreateEvent(event, {}, (err, response) => {
        //     if (err) {
        //         console.log("Before:-", err);
        //     } else {
        //         console.log(response);
        //     }
        // });

        e.preventDefault();
        console.log("Form Data:", formData);
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="text-w_text">
                <div className="flex flex-col items-start gap-1 mt-3">
                    <label htmlFor="name" className="text-w_text text-[16px]">
                        Title :
                    </label>
                    <input
                        required
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="p-1 rounded w-full bg-main_black shadow-inputShadow"
                    />
                </div>
                <div className="flex flex-col items-start gap-1 mt-3">
                    <label
                        htmlFor="hostName"
                        className="text-w_text text-[16px]"
                    >
                        Name Of Host :
                    </label>
                    <input
                        required
                        type="text"
                        id="hostName"
                        value={formData.hostName}
                        onChange={handleChange}
                        className="p-1 rounded w-full bg-main_black shadow-inputShadow"
                    />
                </div>
                <div className="flex flex-col items-start gap-1 mt-3">
                    <label
                        htmlFor="description"
                        className="text-w_text text-[16px]"
                    >
                        Description :
                    </label>
                    <textarea
                        required
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="p-1 rounded w-full bg-main_black shadow-inputShadow"
                    ></textarea>
                </div>

                <div className="flex item-center justify-between gap-5 w-[100%]">
                    <div className="flex flex-col items-start gap-1 mt-3 w-[33%]">
                        <label
                            htmlFor="startDate"
                            className="text-w_text text-[16px]"
                        >
                            Start Date:{" "}
                        </label>
                        <input
                            type="datetime-local"
                            id="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            className="p-1 rounded w-[100%] bg-main_black shadow-inputShadow"
                            required
                        />

                    </div>

                    <div className="flex flex-col items-start gap-1 mt-3 w-[33%]">
                        <label
                            htmlFor="endDate"
                            className="text-w_text text-[16px] "
                        >
                            End Date :{" "}
                        </label>

                        <input
                            type="datetime-local"
                            id="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            className="p-1 rounded w-[100%] bg-main_black shadow-inputShadow"
                            required
                        />

                    </div>

                    <div className="flex flex-col items-start gap-1 mt-3 w-[33%]">
                        <label
                            htmlFor="tag"
                            className="text-w_text text-[16px] "
                        >
                            {" "}
                            Tag :{" "}
                        </label>
                        <select

                            required
                            id="tag"
                            value={formData.tag}
                            onChange={handleChange}
                            className="p-1 rounded w-[100%] text-f_text bg-main_black shadow-inputShadow"
                        >
                            <option
                                value=""
                                className="bg-main_black text-white"
                            ></option>
                            <option
                                value="Chemical"
                                className="bg-main_black text-f_text"
                            >
                                Chemical
                            </option>
                            <option
                                value="Organic"
                                className="bg-main_black text-f_text"
                            >
                                Organic
                            </option>
                        </select>
                    </div>
                </div>

                <div className="flex item-center justify-between gap-5 w-[100%]">
                    <div className="flex flex-col items-start gap-1 mt-3 w-[33%]">
                        <label
                            htmlFor="mode"
                            className="text-w_text text-[16px] "
                        >
                            {" "}
                            Event Channel :{" "}
                        </label>
                        <select
                            required
                            id="mode"
                            value={formData.mode}
                            onChange={handleChange}
                            className="p-1 rounded w-[100%] text-f_text bg-main_black shadow-inputShadow"
                        >
                            <option
                                value=""
                                className="bg-main_black text-white"
                            ></option>
                            <option
                                value="Online"
                                className="bg-main_black text-f_text "
                            >
                                Online
                            </option>
                            <option
                                value="Offline"
                                className="bg-main_black text-f_text"
                            >
                                Offline
                            </option>
                        </select>
                    </div>

                    <div className="flex flex-col items-start gap-1 mt-3 w-[33%]">
                        <label
                            htmlFor="slots"
                            className="text-w_text text-[16px]"
                        >
                            Available Slots :{" "}
                        </label>
                        <input
                            required
                            type="text"
                            id="slots"
                            value={formData.slots}
                            onChange={handleChange}
                            className="p-1 rounded w-[100%] bg-main_black shadow-inputShadow"
                        />
                    </div>

                    {/* Field 6 */}
                    <div className="flex flex-col items-start gap-1 mt-3 w-[33%]">
                        <label
                            htmlFor="posters"
                            className="text-w_text text-[16px] "
                        >
                            Event Posters :{" "}
                        </label>
                        <input
                            required
                            multiple
                            type="file"
                            id="posters"
                            onChange={onUpload}
                            className="p-1 rounded w-[100%] text-w_text text-[12px] bg-main_black shadow-inputShadow file file:text-sm file:bg-main_black file:text-w_text file:hidden "
                        />
                    </div>
                </div>

                <div className="flex flex-col items-start gap-1 mt-3">
                    <label
                        htmlFor="address"
                        className="text-w_text text-[16px]"
                    >
                        Address :{" "}
                    </label>
                    <input
                        type="text"
                        id="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="p-1 rounded w-full bg-main_black shadow-inputShadow"
                        required={formData.mode === "Offline"}
                    />
                </div>

                <div className="flex flex-col items-start gap-1 mt-3">
                    <label htmlFor="link" className="text-w_text text-[16px]">
                        Link :{" "}
                    </label>
                    <input
                        type="text"
                        id="link"
                        value={formData.link}
                        onChange={handleChange}
                        className="p-1 rounded w-full bg-main_black shadow-inputShadow"
                        required={formData.mode === "Online"}
                    />
                </div>

                <button className="bg-primary text-w_text text-lg w-full py-2 mt-3 rounded border-2 border-solid border-green-300 opacity-90 backdrop-blur-sm tracking-[2px]">
                    CREATE EVENT
                </button>
            </form>
        </div>
    );
}
