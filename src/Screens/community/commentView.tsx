/* eslint-disable */

// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import React from 'react';
import { UnixToLocalTime } from "./utils";
import avatar from "src/assets/avatar.png";
import { CommentItems } from 'src/types';
// interface props {
//     item: CommentProto
// }

const ListComments: React.FC<CommentItems> = (commentItems) => {
    return (
        <div className="flex flex-col gap-2" >
            <div className="flex gap-2">
                <div className="flex flex-row w-full ">
                    <img
                        src={commentItems.authorProfileImage}
                        alt={avatar}
                        className="w-16 h-16 rounded-full"
                    />
                    <p className="px-2 py-6 font-bold">{commentItems.authorName}</p>
                </div>
                <div className="flex justify-end w-[20%]">
                    <p className="">{UnixToLocalTime(commentItems.commentTime)}</p>
                </div>
            </div>
            <div className="px-2 ">
                <p className=" font-sans text-base text-slate-50">
                    {commentItems.commentContent}
                </p>
            </div>
        </div >
    );
}





export default ListComments;
