/* eslint-disable */
import { Radio } from "@material-tailwind/react";
import React, { useState } from "react";
import navArrowIcon from "src/assets/icons/navArrowIcon.svg";

const CreateTemplate = () => {
    const [textAreas, setTextAreas] = useState([0]);
    const [textBodyAreas, setTextBodyAreas] = useState([0]);
    const [textButton, setTextButton] = useState([0]);
    const [selectedOption, setSelectedOption] = useState("none");
    const [selecteSubOption, setSelectedSubOption] = useState("visitLink");
    const [quickReplyButton, setQckReplyButton] = useState(true);


    const addTextArea = () => {
        setTextAreas((prevTextAreas) => [...prevTextAreas, prevTextAreas.length]);
    };

    const removeTextArea = (index: number) => {
        setTextAreas((prevTextAreas) =>
            prevTextAreas.filter((_, i) => i !== index)
        );
    };

    const addBodyTextArea = () => {
        setTextBodyAreas((prevTextAreas) => [...prevTextAreas, prevTextAreas.length]);
    };

    const removeBodyTextArea = (index: number) => {
        setTextBodyAreas((prevTextAreas) =>
            prevTextAreas.filter((_, i) => i !== index)
        );
    };

    const addTextButton = () => {
        setTextButton((prevTextButton) => [...prevTextButton, prevTextButton.length]);
    };

    const removeTextButton = (index: number) => {
        setTextButton((prevTextButton) =>
            prevTextButton.filter((_, i) => i !== index)
        );
    };

    return (
        <div className="mt-14">
            <div className="flex mb-6">
                <div className="flex">
                    <img src={navArrowIcon} alt="" />
                </div>
                <h2 className="flex w-full justify-center text-w_text font-barlow font-regular text-2xl leading-7 tracking-[10px] m-3 ">
                    Create Template
                </h2>
            </div>

            <div className=" bg-zinc-900 border border-gray-300 rounded px-4 py-4">
                <div className="grid grid-cols-2 mt-4 px-6 gap-x-20">
                    <div className="flex flex-row items-center mb-6">
                        <label className="text-w_text text-lg" htmlFor="templateName">
                            Template Name :{" "}
                        </label>
                        <input
                            className="border mx-6 bg-zinc-800 p-2 h-8 w-[50%]"
                            type="text"
                        />
                    </div>
                    <div className="flex flex-row items-center mb-6">
                        <label className="text-w_text text-lg" htmlFor="templateName">
                            Template ID :{" "}
                        </label>
                        <input
                            className="border mx-6 bg-zinc-800 p-2 h-8 w-[50%]"
                            type="text"
                        />
                    </div>
                    <div className="flex flex-row items-center mb-6">
                        <label className="text-w_text text-lg" htmlFor="templateName">
                            Business Account ID :{" "}
                        </label>
                        <input
                            className="border mx-6 bg-zinc-800 p-2 h-8 w-[50%]"
                            type="text"
                        />
                    </div>

                    <br />
                    <div className="flex flex-col justify-center">
                        <p className=" text-lg">Header Type :</p>
                        <input
                            type="radio"
                            className="form-radio my-2 h-5 w-5 text-green-500 checked:active:bg-green-500"
                        />
                    </div>

                    <div className="flex flex-col max-h-full relative">
                        <div className="flex items-center">
                            <input
                                type="radio"
                                className="form-radio mr-2 h-5 w-5 appearance-none rounded-full border-2 checked:border-primary checked:after:border-primary checked:after:bg-primary"
                            />
                            <p className=" text-lg">Media</p>
                        </div>

                        <div className="flex flex-row items-center">
                            <p className=" text-lg mr-4">Media Type :</p>
                            <div className="flex items-center mr-2 my-2">
                                <input
                                    type="radio"
                                    className="form-radio mr-2 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300  checked:border-primary checked:after:border-primary checked:after:bg-primary "
                                />
                                <label htmlFor="none" className=" text-lg align-middle px-2">Image</label>
                            </div>
                            <div className="flex items-center mr-2">
                                <input
                                    type="radio"
                                    className="form-radio mr-2 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300  checked:border-primary checked:after:border-primary checked:after:bg-primary "
                                />
                                <label htmlFor="none" className=" text-lg align-middle px-2">Video</label>
                            </div>
                            <div className="flex items-center mr-2">
                                <input
                                    type="radio"
                                    className="form-radio mr-2 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300  checked:border-primary checked:after:border-primary checked:after:bg-primary "
                                />
                                <label htmlFor="none" className=" text-lg align-middle px-2">Doc</label>
                            </div>
                        </div>

                        <div className="flex flex-row mt-2">
                            <p className=" text-lg mr-4">Upload FIles</p>
                            <input type="file" />
                        </div>


                    </div>


                    <div className="w-[90%]">
                        <div className="flex justify-between mb-2">
                            <p className=" text-lg">Text</p>
                            <div className="flex flex-row items-center gap-2">
                                <button onClick={addTextArea}>
                                    <svg
                                        className="h-6 w-6 text-green-500"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        stroke-width="2"
                                        stroke="currentColor"
                                        fill="none"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    >
                                        {" "}
                                        <path stroke="none" d="M0 0h24v24H0z" />{" "}
                                        <line x1="12" y1="5" x2="12" y2="19" />{" "}
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                    </svg>
                                </button>
                                <p>Add Variable</p>
                            </div>
                        </div>
                        {textAreas.map((_, index) => (
                            <div key={index} className="flex flex-col mb-6">
                                <textarea
                                    id={`templateName${index}`}
                                    className="border bg-zinc-800 py-2 h-26 px-4"
                                />
                                <button
                                    onClick={() => removeTextArea(index)}
                                    className="flex justify-end mt-2"
                                >
                                    <svg
                                        className="h-6 w-6 text-red-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                    <br />
                    {/* /////////////////////// */}
                    <div className="w-[90%]">
                        <div className="flex justify-between mb-2">
                            <p className=" text-lg">Message Body:</p>
                            <div className="flex flex-row items-center gap-2">
                                <button onClick={addBodyTextArea}>
                                    <svg
                                        className="h-6 w-6 text-green-500"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        stroke-width="2"
                                        stroke="currentColor"
                                        fill="none"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    >
                                        {" "}
                                        <path stroke="none" d="M0 0h24v24H0z" />{" "}
                                        <line x1="12" y1="5" x2="12" y2="19" />{" "}
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                    </svg>
                                </button>
                                <p>Add Variable</p>
                            </div>
                        </div>
                        {textBodyAreas.map((_, index) => (
                            <div key={index} className="flex flex-col">
                                <textarea
                                    id={`templateName${index}`}
                                    className="border bg-zinc-800 py-2 h-36  px-4"
                                />
                                <button
                                    onClick={() => removeBodyTextArea(index)}
                                    className="flex justify-end mt-2"
                                >
                                    <svg
                                        className="h-6 w-6 text-red-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                    {/* ////////////////////////////////////// */}
                    <br />
                    <div className="flex flex-col mb-6 w-[90%]">
                        <label className="text-w_text text-lg py-2" htmlFor="templateName">
                            Footer :{" "}
                        </label>
                        <textarea
                            id="footer"
                            className="border bg-zinc-800 py-2 h-18"
                        />
                    </div>
                    <br />
                    <div className="flex flex-col">
                        <p className=" text-lg">Response :</p>
                        <div className="flex items-center mt-2">
                            <input
                                type="radio"
                                className="form-radio my-2 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300  checked:border-primary checked:after:border-primary checked:after:bg-primary "
                                checked={selectedOption === "none"}
                                onChange={() => setSelectedOption("none")}
                            />
                            <label htmlFor="none" className=" text-lg align-middle px-2">None</label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                className="form-radio my-2 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300  checked:border-primary checked:after:border-primary checked:after:bg-primary "
                                checked={selectedOption === "callToActions"}
                                onChange={() => setSelectedOption("callToActions")}
                            />
                            <label htmlFor="none" className=" text-lg align-middle px-2">Call to Actions</label>
                        </div>
                        <div className={`${selectedOption === 'none' ? ' text-gray-500' : ''} flex flex-row mt-2`}>
                            <p className=" text-lg mr-4">Actions Type :</p>
                            <div className="flex items-center mr-4">
                                <input
                                    type="radio"
                                    className="form-radio my-2 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300  checked:border-primary checked:after:border-primary checked:after:bg-primary "
                                    disabled={selectedOption === 'none'}
                                    checked={selecteSubOption === 'visitLink'}
                                    onChange={() => setSelectedSubOption('visitLink')}
                                />
                                <label htmlFor="none" className=" text-lg align-middle px-2">Visit Link</label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio my-2 h-5 w-5 appearance-none rounded-full border-2 checked:border-primary checked:after:border-primary checked:after:bg-primary"
                                    disabled={selectedOption === 'none'}
                                    checked={selecteSubOption === 'callOnNumber'}
                                    onChange={() => setSelectedSubOption('callOnNumber')}
                                />
                                <label htmlFor="none" className=" text-lg align-middle px-2">Call on Number</label>
                            </div>

                        </div>

                        <div className="mt-4 ">
                            <div className="flex flex-row items-center mb-6">
                                <label className="text-w_text text-lg" htmlFor="templateName">
                                    {selecteSubOption === 'visitLink' ? 'Link' : 'Mobile Number'} :{" "}
                                </label>
                                <input
                                    disabled={selectedOption === 'none'}
                                    className="border mx-6 bg-zinc-800 p-2 h-8 w-[60%]"
                                    type="text"
                                />
                            </div>
                            <div className="flex flex-row items-center mb-6 ">
                                <label className="text-w_text text-lg" htmlFor="templateName">
                                    Button Text :{" "}
                                </label>
                                <input
                                    disabled={selectedOption === 'none'}
                                    className="border mx-6 bg-zinc-800 p-2 h-8  w-[60%]"
                                    type="text"
                                />
                            </div>
                        </div>
                    </div>

                    <div className=" flex flex-col justify-center">
                        <div className="flex flex-row justify-between w-[80%] mb-4">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    onChange={() => setQckReplyButton(false)}
                                    className="form-radio h-5 w-5 appearance-none border-2 rounded-full checked:border-primary checked:after:border-primary checked:after:bg-primary "
                                />

                                <label htmlFor="none" className=" text-lg align-middle px-2">Quick Reply</label>
                            </div>

                            <div className="flex flex-row">
                                <button onClick={addTextButton}
                                    disabled={quickReplyButton}
                                >
                                    <svg
                                        className="h-6 w-6 text-green-500 mr-2"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        stroke-width="2"
                                        stroke="currentColor"
                                        fill="none"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    >
                                        {" "}
                                        <path stroke="none" d="M0 0h24v24H0z" />{" "}
                                        <line x1="12" y1="5" x2="12" y2="19" />{" "}
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                    </svg>
                                </button>
                                <p className=" text-lg">Add Button</p>
                            </div>
                        </div>

                        {textButton.map((_, index) => (
                            <div
                                key={index}
                                className="flex flex-row items-center mb-4">
                                <label className="text-w_text text-lg" htmlFor="templateName">
                                    Button Text :{" "}
                                </label>
                                <input
                                    disabled={quickReplyButton}
                                    className="border mx-6 bg-zinc-800 p-2 h-8  w-[60%]"
                                    type="text"
                                />
                                <button
                                    onClick={() => removeTextButton(index)}
                                    className="flex justify-end mt-2"
                                    disabled={quickReplyButton}
                                >
                                    <svg
                                        className="h-6 w-6 text-red-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="flex">
                        <button className="p-2 bg-green-600 font-bold rounded-lg ">Save Template</button>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default CreateTemplate;
