'use client'
import Link from 'next/link'
import MobileMenu from './mobile-menu'
import { Inter } from 'next/font/google';
// import styles from '../styles/component.module.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight:"700"

});

export default function Header() {
  return (
    <header className={`absolute w-full z-30`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Site branding */}
          <div className={`mr-4`}>
            <p>PROCTOR-AI</p>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
             <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <Link
                  href="/signin"
                  className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  About
                </Link>
              </li>
              <li>
                <Link href="/signup" className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out">
                  Contact Us
                </Link>
              </li>
            </ul>
            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <Link
                  href="/signin"
                  className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  Sign in
                </Link>
              </li>
              <li>
                <Link href="/signup" className="btn-sm text-white bg-purple-600 hover:bg-purple-700 ml-3">
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
