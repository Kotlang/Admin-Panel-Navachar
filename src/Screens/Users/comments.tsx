// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import { Metadata, RpcError } from 'grpc-web';
import React, { useEffect, useState } from 'react';
import clients from 'src/clients';
import { CommentProto, CommentsFetchResponse } from 'src/generated/actions_pb';

interface commentTableProps {
    CreatorID: string;
}

const CommentsTable: React.FC<commentTableProps> = ({ CreatorID }) => {
	const [comments, setComments] = useState<CommentProto[]>([]);

	const fetchCommetsByID = (userID: string, metaData: Metadata | null): Promise<CommentsFetchResponse> => {
		return new Promise((resolve, reject) => {
			clients.social.actions.FetchComments({
				callback: (err: RpcError, response: CommentsFetchResponse) => {
					if (err) {
						reject(err);
					} else {
						console.log(response);
						resolve(response);
					}
				},
				metaData: metaData,
				userID: userID
			});
		});
	};

	useEffect(() => {
		fetchCommetsByID(CreatorID, null)
			.then(response => {
				setComments(response.getCommentsList());
			})
			.catch(err => {
				console.log(err);
			});
	}, [CreatorID]);

	return (
		<div className="overflow-x-auto relative shadow-md sm:rounded-lg">
			<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" className="py-3 px-6">Comment ID</th>
						<th scope="col" className="py-3 px-6">Content</th>
						<th scope="col" className="py-3 px-6">User ID</th>
						<th scope="col" className="py-3 px-6">Created On</th>
						{/* Add more headers if needed */}
					</tr>
				</thead>
				<tbody>
					{comments.map(comment => (
						<tr key={comment.getCommentid()} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
							<td className="py-4 px-6">{comment.getCommentid()}</td>
							<td className="py-4 px-6">{comment.getContent()}</td>
							<td className="py-4 px-6">{comment.getUserid()}</td>
							<td className="py-4 px-6">{new Date(comment.getCreatedon()).toLocaleString()}</td>
							{/* Add more columns if needed */}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default CommentsTable;
