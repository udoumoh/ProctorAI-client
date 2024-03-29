'use client'
import Link from 'next/link'
import MobileMenu from './mobile-menu'
import '../../app/css/style.css'

export default function Header() {
  return (
    <header className={`absolute w-full z-30`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6" style={{fontFamily:"Noto Sans"}}>
        <div className="flex items-center justify-between h-20">
          {/* Site branding */}
          <div className={`mr-4 bg-purple-800 px-2 br-3 rounded`}>
            <p className="" style={{ fontFamily: "Arvo", fontWeight: '700', fontSize: '20px', color:'#fff'}}><a href='/'>PROCTOR-AI</a></p>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
             <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <Link
                  href="/pages/about"
                  className="font-medium hover:text-purple-800 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  About
                </Link>
              </li>
              <li>
                <Link href="/signup" className="font-medium hover:text-purple-800 px-4 py-3 flex items-center transition duration-150 ease-in-out">
                  Contact Us
                </Link>
              </li>
            </ul>
            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <Link
                  href="/signin"
                  className="btn-sm outline outline-1 font-medium text-purple-800 px-4 flex items-center transition duration-150 ease-in-out"
                >
                  Sign in
                </Link>
              </li>
              <li>
                <Link href="/signup" className="btn-sm text-white bg-purple-800 hover:bg-purple-700 ml-3">
                  Sign up
                </Link>
              </li>
            </ul>
          </nav>

          <MobileMenu />

        </div>
      </div>
    </header>
  )
}
