'use client'

import { useEffect, useState } from 'react'
import { ThemeToggleButton } from './ui/theme-toggle-button';
import LogoImage from "@/assets/logo.svg";
import WrittenLogoImage from '@/assets/writtenlogo.svg'
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp, ArrowUpRight } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="container fixed z-50 inset-0 h-[70px] backdrop-blur-sm ">
      <div className="flex items-center mt-2 justify-between ">
        {/* Logo */}
        <div className="flex items-center w-[150px] h-[50px]">
          <Link href={'/'} className="flex items-center space-x-2 w-[150px]">
            <div className="relative w-[150px] h-[50px] overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                {isScrolled ? (
                  <motion.div
                    key="logo-scrolled"
                    className="absolute inset-0 flex items-center"
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image className="dark:invert" src={WrittenLogoImage} alt="logo" width={150} height={40} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="logo-default"
                    className="absolute inset-0 flex items-center"
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image className='dark:invert' src={LogoImage} alt='GripGrab AI' height={60} width={60} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-2"></div>

        <div className="flex items-center space-x-5">
          <ThemeToggleButton />
          <Link href="/login" className="button-primary">
            Get Started <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </header>
  );
}