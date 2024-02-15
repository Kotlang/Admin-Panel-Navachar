/* eslint-disable */
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import clients from "src/clients";
import { IEvent, MediaUrl } from "src/types";
import HandleImageUpload from "src/components/Events/mediaUpload";
import { useLoadScript, StandaloneSearchBox } from '@react-google-maps/api';
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
// import './App.css';

export default function CreateEventForm({ formData, setFormData }: any) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY || "",
        libraries: ['places'],
    });
    const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox | null>(null);
    const [uploadedImageLinks, setUploadedImageLinks] = useState<MediaUrl[]>([]);
    const [suggestions, setSuggestions] = useState<google.maps.places.PlaceResult[]>([]);

    const handleChange = (e: { target: any; }) => {
        const { id, value, type, files } = e.target;
        setFormData((prevData: any) => ({
            ...prevData,
            [id]: type === "file" ? files : value,
        }));
    };

    if (loadError) {
        console.log(`Maps loading error: ${loadError}`)
    }

    const onLoad = (ref: google.maps.places.SearchBox) => {
        setSearchBox(ref);
    };

    const onPlacesChanged = () => {
        if (searchBox) {
            const places = searchBox.getPlaces();
            setSuggestions(places || []);
        }
    };

    const onUpload = (e: any) => {
        handleChange(e);
        HandleImageUpload(formData.posters, setUploadedImageLinks);
    }

    function handleDateChange(dates: any, dateStrings: any[]) {
        if (dates) {
            setFormData((prevState: any) => ({
                ...prevState,
                startDate: dateStrings[0],
                endDate: dateStrings[1]
            }));


        }
    }

    const toUnix = (date: string) => {
        const dateObj = new Date(formData.startDate);
        const unixTime = dateObj.getTime() / 1000;
        return unixTime;
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const event: IEvent = {
            authorName: formData.hostName,
            startAt: toUnix(formData.startDate),
            endAt: toUnix(formData.endDate),
            mediaUrls: uploadedImageLinks,
            description: formData.description,
            numAttendees: Number(formData.numAttendees),
            numSlots: Number(formData.slots),
            onlineLink: formData.link,
            title: formData.name,
            type: formData.mode === 'Online' ? 1 : 0,
        };
        clients.social.event.CreateEvent(event, {}, (err, response) => {
            if (err) {
                console.log("Before:-", err);
            } else {
                console.log(response);
            }
        });
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
                    <div className="flex flex-col items-start gap-1 mt-3 w-[66%]">
                        <label
                            htmlFor="Eventdate"
                            className="text-w_text text-[16px] "
                        >
                            Event Date :{" "}
                        </label>
                        <RangePicker
                            showTime
                            id=""
                            className="p-1 rounded w-[100%] bg-main_black shadow-inputShadow text-white border-none white-placeholder ant-picker-input"
                            onChange={handleDateChange}
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
                            multiple
                            type="file"
                            id="posters"
                            onChange={onUpload}
                            className="p-1 rounded w-[100%] text-w_text text-[12px] bg-main_black shadow-inputShadow file file:text-sm file:bg-main_black file:text-w_text file:hidden "
                        />
                    </div>
                </div>
                <div className="flex flex-col items-start gap-1 mt-3 w-[33%]">
                    <label
                        htmlFor="slots"
                        className="text-w_text text-[16px]"
                    >
                        numAttendees :{" "}
                    </label>
                    <input
                        required
                        type="text"
                        id="numAttendees"
                        value={formData.numAttendees}
                        onChange={handleChange}
                        className="p-1 rounded w-[100%] bg-main_black shadow-inputShadow"
                    />
                </div>
                <div className="flex flex-col items-start gap-1 mt-3">
                    <label
                        htmlFor="address"
                        className="text-w_text text-[16px]"
                    >
                        Address :{" "}
                    </label>
                    {isLoaded && (
                        <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
                            <input
                                type="text"
                                placeholder="Search for places..."
                                className="p-1 rounded w-full bg-main_black shadow-inputShadow"
                            />
                        </StandaloneSearchBox>
                    )}
                    {suggestions.map((suggestion, index) => (
                        <div key={index}>
                            {suggestion.address_components?.map((component, index) => (
                                <div key={index}>{component.long_name}</div>
                            ))}
                        </div>
                    ))}
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
