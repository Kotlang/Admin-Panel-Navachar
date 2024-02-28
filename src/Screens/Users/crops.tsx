/* eslint-disable */
// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React from "react";

interface CropListProps {
    crops: string[];
}

const CropList: React.FC<CropListProps> = ({ crops }) => {
    return (
        <div className="p-2 w-full grid grid-cols-10">
            {crops.map((crop, index) => (
                <div key={index} className="flex flex-col py-2 gap-1 items-center mt-2">
                    <img
                        src={`/crops/${crop}.png`}
                        alt={crop}
                        style={{ width: '50px', height: '50px' }}
                    />
                    <span>{crop}</span>
                </div>
            ))}
        </div>
    );
};

export default CropList;
