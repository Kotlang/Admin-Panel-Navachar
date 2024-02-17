
/* eslint-disable */
import { MediaUrl } from "src/types";
import clients from "src/clients";


const HandleImageUpload = async (files: FileList, callback: (urls: MediaUrl[]) => void) => {
    let updatedLinks: MediaUrl[] = [];
    for (let i = 0; i < files.length; i++) {
        const extension = files[i].name.split('.').pop();
        if (extension) {
            clients.auth.profile.GetProfileImageUploadURL(extension, {}, async (err, response) => {
                if (err) {
                    console.log(err);
                } else {
                    const preSignedUrl = response.getUploadurl();
                    await fetch(preSignedUrl, {
                        method: 'PUT',
                        body: files[i],
                        headers: {
                            'Content-Type': files[i].type,
                        },
                    })
                    .then((res) => {
                        let mediaUrl: MediaUrl = {
                            url: response.getMediaurl(),
                            mimeType: files[i].type,
                        };
                        updatedLinks.push(mediaUrl);
                        console.log('File uploaded successfully.');
                    })
                    .catch((error) => {
                        console.error('An error occurred while uploading the file:', error);
                    });
                }

            })
        }
    }
    // Set the new state with the response links
    callback(updatedLinks);
};

export default HandleImageUpload;
