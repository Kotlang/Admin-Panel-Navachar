
/* eslint-disable */
import axios from "axios";
import useLoginStore from "src/store/login";



const HandleImageUpload = async (files: FileList, setUploadedImageLinks: (arg0: string[]) => void) => {
    try {

        const jwt = useLoginStore.getState().authResponse.jwt;
        const mediaUploadApiKey = process.env.REACT_APP_MEDIA_UPLOAD_URL;

        if (!mediaUploadApiKey) {
            throw new Error("MEDIA_UPLOAD_URL is not defined");
        }

        let updatedLinks: string[] = [];

        for (let i = 0; i < files.length; i++) {
            const formData = new FormData();
            formData.append('myFile', files[i]);

            const response = await axios.post(mediaUploadApiKey, formData, {
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data && response.data.url) {
                updatedLinks.push(response.data.url);
            }
        }

        // Set the new state with the response links
        setUploadedImageLinks(updatedLinks);
    } catch (error) {
        console.error('Upload error:', error);
    }
};

export default HandleImageUpload;