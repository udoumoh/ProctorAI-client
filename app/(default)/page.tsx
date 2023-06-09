export const metadata = {
  title: 'Home',
  description: '',
}

import Hero from '@/components/hero'
// import Newsletter from '@/components/newsletter'
// import Testimonials from '@/components/testimonials'
import VideoUpload from '@/components/videoupload'
// import Features from '@/components/features'

export default function Home() {
  return (
    <>
      <Hero />
      <VideoUpload text = ""/>
      {/* <Features /> */}
      {/* <Zigzag /> */}
      {/* <Testimonials /> */}
      {/* <Newsletter /> */}
    </>
  )
}
