export const metadata = {
  title: 'Home',
  description: 'Page description',
}

import Hero from '@/components/hero'
import Features from '@/components/features'
import Newsletter from '@/components/newsletter'
import Zigzag from '@/components/zigzag'
import Testimonials from '@/components/testimonials'
import VideoUpload from '@/components/videoupload'

export default function Home() {
  return (
    <>
      <Hero />
      <VideoUpload />
      {/* <Features /> */}
      {/* <Zigzag /> */}
      <Testimonials />
      <Newsletter />
    </>
  )
}
