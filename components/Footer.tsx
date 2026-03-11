import Link from 'next/link';
import PatronLogo from '@/assets/patronalogo.svg'
import Image from 'next/image';
import { motion } from 'framer-motion';

const Footer = () => {
  const primaryText = 'GRIPGRAB '
  const hoverText = "LET'S BEGIN"

  return (
    <footer className="container">
      <motion.div
        className="text-center font-black leading-none  tracking-tighter"
        style={{
          fontSize: 'clamp(5rem, 15vw, 16rem)',
          perspective: '1080px'
        }}
      >
        <motion.div
          className="relative inline-flex items-center justify-center select-none cursor-pointer overflow-hidden"
          style={{ height: '2em' }}
          initial="rest"
          animate="rest"
          whileHover="hover"
        >
          <motion.div
            className="absolute inset-0  flex items-center justify-center font-black  whitespace-nowrap"
            variants={{
              rest: { x: '0%', opacity: 1 },
              hover: { x: '110%', opacity: 0 },
            }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {primaryText}
          </motion.div>

          <motion.div
            className="absolute inset-0 flex items-center justify-center font-black  whitespace-nowrap"
            variants={{
              rest: { x: '-110%', opacity: 0 },
              hover: { x: '0%', opacity: 1 },
            }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {hoverText}
          </motion.div>

          <span className="opacity-0 whitespace-nowrap">{primaryText.length >= hoverText.length ? primaryText : hoverText}</span>
        </motion.div>
      </motion.div>

      {/* Bottom Section */}
      <div className="border-t border-neutral-200 dark:border-gray-900 pt-4 space-y-4">
        <div className='flex gap-2  w-full '>
          <Image className='dark:invert' src={PatronLogo} alt='Patrona AI' height={100} width={200} />
        </div>
        <section className='flex flex-col md:flex-row justify-between items-center mb-3'>
          <div></div>
          <h5 className=" mb-4 md:mb-0">
            Copyright © 2025 GripGrab AI, Inc. All rights reserved.
          </h5>
          <div className="flex space-x-6">
            <Link href="/terms-of-use">
              <h5 className=" text-smmb-3 cursor-pointer transition-colors">
                Terms of Use
              </h5>
            </Link>
            <span className="text-gray-500">&</span>
            <Link href="/privacy-policy">
              <h5 className=" text-smmb-3 cursor-pointer transition-colors">
                Privacy Policy
              </h5>
            </Link>
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;