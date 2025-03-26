import React from 'react'
import { useRouter } from 'next/router'

interface LogoProps {
  className?: string
  variant?: 'full' | 'minimal'
  onClick?: () => void
}

export default function Logo({ className = '', variant = 'full', onClick }: LogoProps) {
  const router = useRouter()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      router.push('/')
    }
  }

  return (
    <div
      className={`inline-flex items-center ${className} cursor-pointer`}
      onClick={handleClick}
    >
      <div className="relative flex items-center">
        {/* SVG Barbell */}
        <svg width="400" height="100" viewBox="0 0 400 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-0">
          {/* Left Weight */}
          <rect x="20" y="20" width="20" height="60" rx="2" fill="black" />
          <rect x="45" y="15" width="30" height="70" rx="2" fill="black" />
          
          {/* Right Weight */}
          <rect x="325" y="15" width="30" height="70" rx="2" fill="black" />
          <rect x="360" y="20" width="20" height="60" rx="2" fill="black" />
        </svg>

        {/* Main Logo Content */}
        <div className="flex flex-col items-center mx-32">
          <div className="flex items-center">
            {/* 4WORD text with gradient */}
            <div className="relative">
              <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-blue-400 to-purple-500">
                4W
              </span>
              <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-blue-500">
                RD
              </span>
              {/* Play Button */}
              <div className="inline-flex items-center ml-1">
                <div className="w-2 h-8 bg-black" />
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[12px] border-l-black border-b-[10px] border-b-transparent" />
              </div>
            </div>
          </div>
          {variant === 'full' && (
            <div className="text-base font-medium text-black mt-2">
              Performance & Wellness
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 