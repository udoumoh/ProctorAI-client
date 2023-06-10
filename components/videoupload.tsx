'use client'

import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios'
import { FiUpload } from '@react-icons/all-files/fi/FiUpload'
import { useDropzone } from 'react-dropzone';
import '../app/css/style.css'
import ImageGallery from "react-image-grid-gallery"

interface VideoloadProps {
    text: string;
}

interface VideoUrl {
    videoLink: string;
    imageLink: string;
}

const VideoUpload: React.FC<VideoloadProps> = () => {
    const [videoUrl, setVideoUrl] = useState<VideoUrl>({ videoLink: "", imageLink: "" })
    const [cheatingFrames, setCheatingFrames] = useState<string[]>([])
    const [galleryImages, setGalleryImages] = useState<{ alt: string; caption: string; src: string }[]>([])
    const [isLoading, setIsLoading] = useState<boolean>()

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
            const responseData = sentData?.data
            const newData: string[] = []
            for(let each of responseData){
                let temp = "data:image/jpg;base64," + each
                newData.push(temp)
            }
            setCheatingFrames(newData)
            console.log(cheatingFrames);
            
        }catch(err){
            console.log(err);
        }
    }

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsLoading(true);
        sendData(event)
    }

    useEffect(() => {
        const tempGalleryImages: {alt: string, caption: string, src: string}[] = []
        for(let i = 0; i <cheatingFrames.length; i++){
            let temp = {
                alt: `pose ${i+1}`,
                caption: `pose ${i+1}`,
                src: cheatingFrames[i]
            }
            tempGalleryImages.push(temp)
        }
        setGalleryImages(tempGalleryImages)

        if (cheatingFrames.length > 1) {
            setIsLoading(false);
        }
    }, [cheatingFrames])

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
                        {
                            isLoading ? (
                                <button type="button" className="btn text-white bg-purple-600 hover:bg-purple-700 w-full" disabled>
                                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                    </svg>
                                    Processing...
                                </button>

                            ) : (
                                    <button className='btn text-white bg-purple-600 hover:bg-purple-700 w-full' onClick={ handleSubmit }>Submit</button>
                            )
                        }
                </div>  
                </div>
            </div>
            <div className='max-w-4xl mx-auto'>
                <h1 className='text-center h3 text-slate-800 mb-3' style={{ fontFamily: "Noto Sans, sans-serif", fontWeight: "600" }}>DETECTED POSES</h1>
            </div>
            <div className='max-w-7xl text-center mx-auto'>
            {
                isLoading ? (
                        <div className="border border-violet-50 shadow rounded-md p-4 max-w-7xl h-96 max-h-screen mx-auto">
                            <div className="animate-pulse flex space-x-4 space-y-5">
                                <div className="rounded-full bg-slate-200 h-10 w-10 mt-5"></div>
                                <div className="flex-1 space-y-6 py-1">
                                    <div className="h-2 bg-slate-200 rounded"></div>
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                            <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                        </div>
                                        <div className="h-2 bg-slate-200 rounded"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="animate-pulse flex space-x-4 space-y-14">
                                <div className="rounded-full bg-slate-200 h-10 w-10 mt-14"></div>
                                <div className="flex-1 space-y-6 py-1">
                                    <div className="h-2 bg-slate-200 rounded"></div>
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                            <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                        </div>
                                        <div className="h-2 bg-slate-200 rounded"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="animate-pulse flex space-x-4 space-y-14">
                                <div className="rounded-full bg-slate-200 h-10 w-10 mt-14"></div>
                                <div className="flex-1 space-y-6 py-1">
                                    <div className="h-2 bg-slate-200 rounded"></div>
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                            <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                        </div>
                                        <div className="h-2 bg-slate-200 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>                                                                                                                                                                                                                                                                                                                                  
                ) : (
                <div className='text-center mx-auto bg-violet-50 pt-4 px-4 rounded-lg mb-5'>
                    <ImageGallery imgArray={galleryImages} columnWidth={400} gapSize={14}/>
                </div>  
                )        
            }
            </div>
        </section>
    )
}

export default VideoUpload