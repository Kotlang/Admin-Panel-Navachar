
/* eslint-disable */
import { MediaUrl } from "src/types";
import clients from "src/clients";
import { ProfileImageUploadURL } from "src/generated/profile_pb";

async function getPresignedUrl(extension: string): Promise<ProfileImageUploadURL> {
    return new Promise((resolve, reject) => {
        clients.auth.profile.GetProfileImageUploadURL(extension, {}, (err, response) => {
            if (err) {
                reject(err);
            } else {
                resolve(response);
            }
        });
    });
}

async function HandleImageUpload(files: FileList, setUploadedImageLinks: any, setIsUploading: any) {
    for (const file of files) {
        const extension = file.name.split('.').pop();

        if (extension) {
            setIsUploading(true);

            try {
                const preSignedUrl = await getPresignedUrl(extension);
                const response = await fetch(preSignedUrl.getUploadurl(), {
                    method: 'PUT',
                    body: file,
                    headers: {
                        'Content-Type': file.type,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to upload file');
                }
                const mediaUrl: MediaUrl = {
                    url: preSignedUrl.getMediaurl(),
                    mimeType: file.type,
                };

                setUploadedImageLinks((prevState: any) => [...prevState, mediaUrl]);
                console.log('File uploaded successfully.');
            } catch (error) {
                console.error('An error occurred while uploading the file:', error);
            } finally {
                setIsUploading(false);
            }
        }
    }
}

export default HandleImageUpload;
