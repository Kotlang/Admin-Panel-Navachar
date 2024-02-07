
/* eslint-disable */
import axios from "axios";
import useLoginStore from "src/store/login";
import clients from "src/clients";


const HandleImageUpload = async (files: FileList, setUploadedImageLinks: (arg0: string[]) => void) => {
    let updatedLinks: string[] = [];

    for (let i = 0; i < files.length; i++) {
        const extension = files[i].name.split('.').pop();
        if (extension) {
            clients.auth.profile.GetProfileImageUploadURL(extension, {}, (err, response) => {
                if (err) {
                    console.log(err);
                } else {
                    const preSignedUrl = response?.getMediaurl;
                    fetch(preSignedUrl(), {
                        method: 'PUT',
                        body: files[i],
                        headers: {
                            'Content-Type': files[i].type,
                        },
                    })
                        .then((res) => {
                            console.log(res);
                            console.log('File uploaded successfully.');
                        })
                        .catch((error) => {
                            console.error('An error occurred while uploading the file:', error);
                        });
                }

            })
            // const formData = new FormData();
            // formData.append('myFile', files[i]);

            // const response = await axios.post(mediaUploadApiKey, formData, {
            //     headers: {
            //         'Authorization': `Bearer ${jwt}`,
            //         'Content-Type': 'multipart/form-data'
            //     }
            // });

            // if (response.data && response.data.url) {
            //     updatedLinks.push(response.data.url);
            // }
        }
    }
    // Set the new state with the response links
    setUploadedImageLinks(updatedLinks);

};

export default HandleImageUpload;