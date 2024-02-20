
/* eslint-disable */
import { MediaUrl } from "src/types";
import clients from "src/clients";

const HandleImageUpload = async (files: FileList, setUploadedImageLinks: any, setIsUploading: any ) => {
    for (let i = 0; i < files.length; i++) {
        const extension = files[i].name.split('.').pop();
        if (extension) {
            clients.auth.profile.GetProfileImageUploadURL(extension, {}, async (err, response) => {
                if (err) {
                    console.log(err);
                } else {
                    const preSignedUrl = response.getUploadurl();
                    setIsUploading(true);
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
                        setUploadedImageLinks((prevState: any) => [...prevState, mediaUrl]);
                        console.log('File uploaded successfully.');
                        setIsUploading(false);
                    })
                    .catch((error) => {
                        setIsUploading(false);
                        console.error('An error occurred while uploading the file:', error);
                    });
                }

            })
        }
    }
};

export default HandleImageUpload;
