'use client'

import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios'
import { FiUpload } from '@react-icons/all-files/fi/FiUpload'
import { useDropzone } from 'react-dropzone';
import '../app/css/style.css'

interface VideoloadProps {
    text: string;
    aProp: (url: string) => void;
}

interface VideoUrl {
    videoLink: string;
    imageLink: string;
}

const VideoUpload: React.FC<VideoloadProps> = () => {
    const [videoUrl, setVideoUrl] = useState<VideoUrl>({ videoLink: "", imageLink: "" })

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

    const sendData = async (event: any) => {
        event.preventDefault();
        try{
            const sentData = await axios.post('http://127.0.0.1:5000/upload', videoUrl)
            console.log(sendData);
        }catch(err){
            console.log(err);
        }
        console.log(videoUrl);
    }

    useEffect(() => {
        sendData(event);
    }, [videoUrl])

    return (
        <section>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative py-20">
                <div className="py-6 md:py-10 border-t border-purple-800"></div>

                <div className='max-w-3xl text-center mx-auto'>
                    <div className="inline-flex text-sm font-semibold text-blue-800 py-1 px-3 m-2 bg-purple-200 rounded-full mb-4" data-aos="fade-up" data-aos-delay="200">Try out our software</div>
                <div className='text-center'>
                        <h1 className='h2 text-gray-700' style={{ fontFamily: "Noto Sans, sans-serif", fontWeight: "500" }} data-aos="fade-up" data-aos-delay="300">Upload Video or Image below</h1>
                        <div data-aos="fade-up" data-aos-delay="400">
                    </div>
                </div>  
                <div>
                        <div className='max-w-3xl py-20 border-dashed border-2 border-purple-400 bg-purple-100 rounded-lg text-purple-900 mt-5 cursor-pointer' {...getRootProps()}>
                            <input {...getInputProps()} />
                            <span className='flex justify-center mb-2'>
                                <FiUpload size={"50px"} />
                            </span>
                            <p className='my-3'>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                        <div className='mt-5 p-3 drop-shadow-2xl bg-white' >
                        {videoUrl.videoLink ? (
                            <video src={videoUrl?.videoLink} controls width="800"></video>
                            ) : (
                            <img src={videoUrl?.imageLink} width="800" />
                             )}    
                        </div>
                        <button className='btn text-white bg-purple-600 hover:bg-purple-700 w-full' onClick={sendData}>Submit</button>
                </div>                                                                                                                                                                                                                                                                                                                                      
                </div>
            </div>
        </section>
    )
}

export default VideoUpload