/* eslint-disable */

// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import Preview from 'src/components/Events/preview';
import CreateEventForm from 'src/components/Events/createEvent';
import { useState } from 'react';
import { MediaUrl } from "src/types";
import { IEventData } from "src/types";

const Create = () => {
    const [uploadedImageLinks, setUploadedImageLinks] = useState<MediaUrl[]>([]);
    const [formData, setFormData] = useState<IEventData>({
        name: "",
        hostName: "",
        description: "",
        startDate: "",
        endDate: "",
        numAttendees: 0,
        tag: "",
        mode: "",
        slots: 0,
        posters: [] as unknown as FileList,
        address: {
            lat: 0,
            long: 0,
        }
        ,
        link: "",

    });

    return <>
        {/* <div></div> // for event navigation (create, active,history) */}
        <div className="flex flex-wrap">
            <div className="w-[50%] "> {/*create form section*/}
                <CreateEventForm
                    formData={formData}
                    setFormData={setFormData}
                    uploadedImageLinks={uploadedImageLinks}
                    setUploadedImageLinks={setUploadedImageLinks}
                />
            </div>
            <div className="w-[50%] p-5 relative flex flex-col items-center justify-center font-barlow ">{/*preview section*/}
                <Preview
                    formData={formData}
                    mediaUrls={uploadedImageLinks}
                    setMediaUrls={setUploadedImageLinks}
                />
            </div>
        </div >
    </>
}

export default Create;