'use client'

// import { useState } from 'react'
// import Image from 'next/image'
// import Modal from '@/components/utils/modal'
// import HeroImage from '@/public/images/hero-image.jpg'
import '../app/css/style.css'
import Fileupload from './utils/fileupload'

export default function VideoUpload() {

    

    return (
        <section>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative py-20">
                <div className="py-6 md:py-10 border-t border-purple-800"></div>

                <div className='max-w-3xl text-center mx-auto'>
                    <div className="inline-flex text-sm font-semibold text-blue-800 py-1 px-3 m-2 bg-purple-200 rounded-full mb-4" data-aos="fade-up" data-aos-delay="200">Try out our software</div>
                <div className='text-center'>
                        <h1 className='h2 text-gray-700' style={{ fontFamily: "Noto Sans, sans-serif", fontWeight: "500" }} data-aos="fade-up" data-aos-delay="300">Upload Video or Image below</h1>
                        <div data-aos="fade-up" data-aos-delay="400">
                            <Fileupload text= "Drag 'n' drop some files here, or click to select files"/>
                    </div>
                </div>                                                                                                                                                                                                                                                                                                                                        
                </div>
            </div>
        </section>
    )
}
