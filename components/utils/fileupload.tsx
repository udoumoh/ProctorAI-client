import React, {useCallback, useEffect, useState, createContext, useContext} from 'react'
import { useDropzone } from 'react-dropzone';
import { FiUpload } from '@react-icons/all-files/fi/FiUpload'

interface FileuploadProps {
    text: string;
}

interface   VideoUrl {
    videoLink: string;
    imageLink: string;
}

const Fileupload: React.FC<FileuploadProps> = ({ text }) => {
    const [videoUrl, setVideoUrl] = useState<VideoUrl>({ videoLink: "", imageLink: "" });
    const ThemeContext = createContext({})

    useEffect(() =>{
        console.log(videoUrl.videoLink, videoUrl.imageLink);
    }, [videoUrl])

    function MyDropzone() {
        const onDrop = useCallback((acceptedFiles: File[]) => {
            acceptedFiles.forEach((file: File) => {
                const reader = new FileReader();

                reader.onabort = () => console.log('file reading was aborted');
                reader.onerror = () => console.log('file reading has failed');
                reader.readAsDataURL(file);
                reader.onload = () => {
                    const fileDataUrl = reader.result as string;

                    if (file?.type.startsWith('image/')) {
                        setVideoUrl({ ...videoUrl, imageLink: fileDataUrl });
                    } else if (file?.type.startsWith('video/')) {
                        setVideoUrl({ ...videoUrl, videoLink: fileDataUrl });
                    }
                    
                };
            });
        }, []);

        const { getRootProps, getInputProps } = useDropzone({ onDrop });

        return (
            <div className='max-w-3xl py-20 border-dashed border-2 border-purple-400 bg-purple-100 rounded-lg text-purple-900 mt-5 cursor-pointer' {...getRootProps()}>
                <input {...getInputProps()} />
                <span className='flex justify-center mb-2'>
                    <FiUpload size={"50px"} />
                </span>
                <p className='my-3'>{text}</p>
            </div>
        );
    }

    return (
        <>
            <ThemeContext.Provider value={videoUrl}>
            <MyDropzone />
            {videoUrl.videoLink ? (
                <div>
                    <video src={videoUrl?.videoLink} controls width="800"></video>
                </div>
            ) : (
                <div>
                    <img src={videoUrl?.imageLink} width="800"/>
                </div>
            )}
            </ThemeContext.Provider>
        </>
    );
};


export default Fileupload