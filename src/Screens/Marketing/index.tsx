/* eslint-disable */
// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import React, { useState } from "react";
import Leads from "./leads";
import Campaigns from "./campaigns";
import {
	Menu,
	MenuHandler,
	MenuList,
	MenuItem,
	Button,
} from "@material-tailwind/react";
import HandleImportedData from "./writeData";
import TemplatesIndex from "./templatesIndex";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const MarketingIndex = () => {
	const { component } = useParams();
	const [activeComponent, setActiveComponent] = useState(component || "leads");
	const [search, setSearch] = useState("");
	const [filter, setfilter] = useState("");
	const [isImporting, setIsImporting] = useState(false);
	const navigate = useNavigate();
	const renderComponent = () => {
		switch (activeComponent) {
			case "leads":
				return <Leads search={search} filter={filter} />;
			case "templates":
				return <TemplatesIndex />;
			case "campaigns":
				return <Campaigns />;
			default:
				return <div>DEFAULT </div>;
		}
	};

	const handleSelect = (item: string) => {
		setfilter(item);
	};

	const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const { type, files } = e.target;
		if (type === "file") {
			if (files) {
				setIsImporting(true);
				await HandleImportedData(files[0]);
				setIsImporting(false);
			}
		}
	};

	return (
		<>
			{isImporting && (
				<div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-50 z-50">
					<div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
				</div>
			)}
			<div className="mt-14">
				<h2 className=" text-w_text font-barlow font-regular text-3xl leading-7 tracking-[10px] mt-3 mb-8 ">
					MARKETING
				</h2>
				<nav className="text-slate-100 items-center justify-between hidden w-full md:flex md:w-auto md:order-1 mb-6">
					<ul className="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:space-x-10 rtl:space-x-reverse md:flex-row md:mt-0">
						<p
							className={`cursor-pointer text-base font-sans ${activeComponent === "leads"
									? "underline underline-offset-8 text-green-500"
									: ""
								}`}
							onClick={() => setActiveComponent("leads")}
						>
							Leads
						</p>
						<p
							className={`cursor-pointer text-base font-sans ${activeComponent === "templates"
									? "underline underline-offset-8 text-green-500"
									: ""
								}`}
							onClick={() => setActiveComponent("templates")}
						>
							Templates
						</p>
						<p
							className={`cursor-pointer text-base font-sans ${activeComponent === "campaigns"
									? "underline underline-offset-8 text-green-500"
									: ""
								}`}
							onClick={() => setActiveComponent("campaigns")}
						>
							Campaigns
						</p>
						<div className="relative">
							<input
								className="p-1 rounded w-full bg-main_black shadow-inputShadow px-4 py-2"
								type="text"
								placeholder="Search"
								onChange={(e) => setSearch(e.target.value)}
							/>
							<button className="absolute top-0 right-0 mt-2 mr-2">
								<svg
									className=" h-5 w-5 text-gray-500"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									{" "}
									<circle cx="11" cy="11" r="8" />{" "}
									<line x1="21" y1="21" x2="16.65" y2="16.65" />
								</svg>
							</button>
						</div>
					</ul>
					{activeComponent === "leads" && (
						<div className="w-[50%] flex px-4 justify-end">
							<div className="flex items-center">
								<label htmlFor="file-upload">
									<svg
										className="h-6 w-6 text-gray-500"
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
										<path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />{" "}
										<polyline points="7 9 12 4 17 9" />{" "}
										<line x1="12" y1="4" x2="12" y2="16" />
									</svg>
								</label>
								<input
									type="file"
									id="file-upload"
									style={{ display: "none" }}
									onChange={handleImport}
									accept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
								/>
							</div>

							<div className="flex items-center">
								<button className="mx-2">
									<svg
										className="h-6 w-6 text-gray-500"
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
										<path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />{" "}
										<polyline points="7 11 12 16 17 11" />{" "}
										<line x1="12" y1="4" x2="12" y2="16" />
									</svg>
								</button>
								<p className="text-lg mx-1">Files</p>
							</div>
							<div className="flex items-center">
								<Menu>
									<MenuHandler>
										<Button placeholder="" className="-mx-3 border-rose-400">
											<svg
												className="h-5 w-5 text-gray-500"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="2"
												stroke-linecap="round"
												stroke-linejoin="round"
											>
												{" "}
												<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
											</svg>
										</Button>
									</MenuHandler>
									<MenuList
										placeholder=""
										className=" bg-main_black text-slate-300"
									>
										<MenuItem
											placeholder=""
											onClick={() => handleSelect("A")}
											className={`mb-1 ${filter === "A" ? " text-green-500" : ""
												}`}
										>
											All
										</MenuItem>
										<MenuItem
											placeholder=""
											onClick={() => handleSelect("I")}
											className={`mb-1 ${filter === "I" ? " text-green-500" : ""
												}`}
										>
											Installed
										</MenuItem>
										<MenuItem
											placeholder=""
											onClick={() => handleSelect("N")}
											className={`mb-1 ${filter === "N" ? " text-green-500" : ""
												}`}
										>
											Not Installed
										</MenuItem>
										<MenuItem
											placeholder=""
											onClick={() => handleSelect("NA")}
											className={`mb-1 ${filter === "NA" ? " text-green-500" : ""
												}`}
										>
											Newly Added
										</MenuItem>
									</MenuList>
								</Menu>
								<p className="text-lg">Filter</p>
							</div>
						</div>
					)}
					{activeComponent === "templates" && (
						<div className="flex items-center">
							<button className="mx-2"
							onClick={ () => navigate('/marketing/createtemplate')}
							>
								<svg
									className="h-8 w-8 text-green-500"
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
									<rect x="4" y="4" width="16" height="16" rx="2" />{" "}
									<line x1="9" y1="12" x2="15" y2="12" />{" "}
									<line x1="12" y1="9" x2="12" y2="15" />
								</svg>
							</button>
							<p className="text-lg mx-1">New Template</p>
						</div>
					)}
				</nav>
				<div>{renderComponent()}</div>
			</div>
		</>
	);
};

export default MarketingIndex;
