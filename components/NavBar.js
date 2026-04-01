import React from 'react'
import Image from 'next/image'
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [

    { name: 'Projects', href: '#projects', current: false },
    { name: 'About Me', href: '#about-me', current: false },
    { name: 'Experience', href: '#experience', current: false },
    { name: 'Contact', href: '#contact', current: false },
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

const Navbar = () => {
  return (
    <Disclosure as="nav" className="z-40 fixed top-0 left-0 right-0" id='home' data-scroll data-scroll-sticky data-scroll-target="#scroll-container">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-3 pt-3 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-full border border-white/10 bg-black/40 p-2 text-gray-300 backdrop-blur-md hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <a href='#projects2' data-scroll-to>
                  <Image className='block h-8 w-auto lg:hidden' src='/cm-logo-01.svg' alt="The Colton Morrill Logo" width={104} height={32} />
                  <Image className='hidden h-8 w-auto lg:block' src='/cm-logo-01.svg' alt="The Colton Morrill Logo" width={104} height={32} />
                </a>
                <div className="hidden sm:block ml-auto">
                  <div className="flex items-center space-x-2 rounded-full border border-white/10 bg-black/35 px-2 py-2 backdrop-blur-md">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        data-scroll-to
                        className={classNames(
                          item.current ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white',
                          'px-4 py-2 rounded-full text-sm font-medium transition'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 rounded-[1.5rem] border border-white/10 bg-black/70 px-2 pt-2 pb-3 backdrop-blur-md">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Navbar
