// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import React from 'react';

const Home: React.FC = () => {
	return (
		<div className="container">
			<aside className="sidebar">
				{/* Sidebar content */}
				{/* ... */}
			</aside>
			<main className="main-content">
				<form className="form">
					<div className="form-group with-icon">
						<label htmlFor="name">Grouped with icons</label>
						<input type="text" id="name" placeholder="John Doe" />
						<span className="icon">👤</span>
					</div>
					<div className="form-group with-help">
						<label htmlFor="email">With help line and labelFor</label>
						<input type="email" id="email" placeholder="john.doe@example.com" />
						<small>Help line comes here</small>
					</div>
					{/* More form inputs... */}
					<div className="form-group">
						<button type="submit">Submit</button>
						<button type="reset">Reset</button>
					</div>
				</form>
			</main>
		</div>
	);
};

export default Home;
