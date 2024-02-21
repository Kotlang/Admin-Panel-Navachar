/* eslint-disable */

import React from "react";
import likeIcon from "../../assets/icons/likeIcon.svg";
import groupIcon from "../../assets/icons/groupIcon.svg";
import navArrowIcon from "../../assets/icons/navArrowIcon.svg";

function DetailView() {
    return (
        <div className="w-full p-5 border-2 border-f_text rounded-lg mt-2 flex flex-col gap-3 font-mainfont text-w_text bg-main_black">
            <div className="flex gap-5 cursor-pointer">
                {" "}
                {/* back to event list */}
                <img src={navArrowIcon} alt="" />
                <p className=" uppercase tracking-widest  text-base">
                    Back To Events
                </p>
            </div>
            <div className="flex justify-between flex-wrap">
                <div className="flex flex-col gap-3 w-[50%]">
                    <div className="mt-5 flex flex-col gap-3 ">
                        <h1 className=" font-semibold text-2xl">
                            Discussion On Organic Farming
                        </h1>
                        {/* title */}
                        <p className="text-base">
                            Organic farming is increasing the production of
                            pollutant-free crops. It involves the use of
                            biofertilizers and biopesticides which increases the
                            nutrient quality of the crop and controls any kind
                            of pest and pathogen.Biofertilizers are the perfect
                            alternative to chemical fertilizers. The chemicals
                            not only harm the soil and its productivity but also
                            harm the living organisms consuming the crops grown
                            on that soil. Therefore, the scientists had
                            discovered the use of microorganisms as fertilizers.
                        </p>
                        {/* desc */}
                    </div>
                    <div className="flex justify-between text-base">
                        <div className="flex ">
                            <p className=" text-f_text">Start Date : </p>
                            <p> 12/03/2024</p>
                        </div>
                        <div className="flex">
                            <p className="text-f_text">End Date : </p>
                            <p>12/03/2024</p>
                        </div>
                    </div>
                    <div className="flex justify-between text-base">
                        <div className="flex ">
                            <p className=" text-f_text">Duration : </p>
                            <p>5</p>
                            <p>Hr</p>
                        </div>
                        <div className="flex font-mainfont ">
                            <p className="text-f_text">Available Slots : </p>
                            <p>5000</p>
                        </div>
                    </div>
                    <div className="flex justify-between text-base">
                        <div className="flex ">
                            <p className=" text-f_text">Mode : </p>
                            <p> Online</p>
                        </div>
                        <div className="flex font-mainfont ">
                            <p className="text-f_text">Tag : </p>
                            <p>Organic</p>
                        </div>
                    </div>
                    <div className="flex flex-col  gap-3 text-base">
                        <div className="flex ">
                            <p className=" text-f_text">Link : </p>
                            <p>
                                https://byjus.com/biology/microbes-as-biofertilizers/{" "}
                            </p>
                        </div>
                        <div className="flex font-mainfont ">
                            <p className="text-f_text">Address : </p>
                            <p>
                                https://byjus.com/biology/microbes-as-biofertilizers/
                            </p>
                        </div>
                    </div>
                </div>
                <div className=" mt-8 w-[40%] h-80 border-2 overflow-x-scroll overflow-y-hidden">
                    <img src={""} alt="" />
                </div>
            </div>
            <div className="flex gap-4 mt-5">
                <button className=" uppercase tracking-wider font-semibold px-4 py-1 bg-green_primary rounded border">
                    Update Event
                </button>
                <button className=" uppercase tracking-wider font-semibold px-4 py-1 bg-green_primary rounded border">
                    Launch Event
                </button>
                <button className=" uppercase tracking-wider font-semibold px-4 py-1 bg-red_primary rounded border">
                    Delete Event
                </button>
            </div>
            <div className="flex gap-2 items-center ">
                <img src={groupIcon} className="w-8" alt="" />
                <p className="text-base">Subscribers : </p>
                <p className="text-base  text-green_primary">3005</p>
            </div>
            <div className="w-full">
                <div className="flex gap-3 my-5">
                    <p className="text-xl">300</p>
                    <p className=" uppercase text-xl tracking-widest">
                        Comments :
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="w-full flex gap-5  justify-between text-base">
                        <div className="flex gap-2  max-w-[80%]">
                            <img src={""} alt="" className="border  w-10 h-10 rounded-full" />
                            <div className="flex flex-col ">
                                <p className="font-semibold">Ayush</p>
                                <p>Organic farming is increasing the production of pollutant-free crops. It involves the use of biofertilizers and biopesticides which increases the nutrient quality </p>
                            </div>
                        </div>
                        <div className="flex gap-3 items-center">
                            <img src={likeIcon} alt="" />
                            <p className="text-base">300</p>
                            <button className=" uppercase tracking-wide  px-3 py-1 text-sm bg-red_primary rounded border">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailView;
