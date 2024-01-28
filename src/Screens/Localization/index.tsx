// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import Papa from 'papaparse';
import React, { useState } from 'react';
import clients from 'src/clients';

const allowedExtensions = ['csv'];

const Localization = () => {
	const [data, setData] = useState<string[]>([]);
	const [error, setError] = useState('');
	const [file, setFile] = useState<File>();
	const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setError('');

		if (e && e.target.files && e.target.files.length) {
			const inputFile = e.target.files[0];

			// Check the file extensions, if it not
			// included in the allowed extensions
			// we show the error
			const fileExtension = inputFile?.type.split('/')[1];
			if (!allowedExtensions.includes(fileExtension)) {
				setError('Please input a csv file');
				return;
			}

			// If input type is correct set the state
			setFile(inputFile);
		}
	};

	const handleParse = () => {

		// If user clicks the parse button without
		// a file we show a error
		if (!file) return setError('Enter a valid file');

		// Initialize a reader which allows user
		// to read any file or blob.
		const reader = new FileReader();

		// Event listener on reader when the file
		// loads, we parse it and set the data.
		reader.onload = async ({ target }) => {
			if (target && target.result && typeof target.result === 'string') {
				const csv = Papa.parse(target.result, { header: true });
				const parsedData = csv?.data as any[];
				// console.log(parsedData);
				parsedData.forEach((obj) => {
					if (obj.Key) {
						Object.keys(obj).forEach((key) => {
							if (key && key.includes('Label')) {
								let keyArr = key.split(' ');
								if (keyArr.length > 1) {
									keyArr = keyArr.slice(0, keyArr.length - 1);
									const language = keyArr.join(' ');
									if (language && obj[key]) {
										clients.localization.admin.AddLabel({
											key: obj.Key,
											language: language.toLowerCase(),
											value: obj[key]
										}, {}, (err, response) => {
											console.log(err, response);
										});
									}
								}
							}
						});
					}
				});
				const columns = Object.keys(parsedData[0]);
				setData(columns);
			}
		};
		reader.readAsText(file);
	};
	return (
		<div>
			<h2 className='text-2xl font-bold'>Upload Only CSV file.</h2>
			<div className='mt-5'>
				<input type="file" accept='.csv' onChange={onFileChange} />
			</div>
			<div className='mt-5'>
				<button className='px-8 py-1 bg-blue-500 rounded-md text-white text-lg font-semibold' onClick={handleParse}>Parse</button>
			</div>
			<div className='mt-5'>
				{error? <p className='text-red-500'>{error}</p>: data.map((col, idx) => <div key={idx}>{col}</div>)}
			</div>
		</div>
	);
};

export default Localization;