import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import logo from "/src/assets/logo.png";
import { FiUser } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import { RiUserVoiceLine } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { IoMdSearch } from "react-icons/io";

const navigation = [
  { name: < MdFavoriteBorder className='w-7 h-7 -mr-3' />, title: "Wishlist", href: '#', current: false },
  { name: <IoCartOutline className='w-7 h-7 -mr-3' />, title: "My Cart", href: '#', current: false },
  // { name: <FiUser />  , href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const Navbar = () => {
  return (
    <Disclosure as="nav" className="border-b">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 ">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-Secondary hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-5 w-5" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>


              <div className="flex flex-shrink-0 items-center  h-20">
                <img
                  className="h-10 w-auto hidden sm:block justify-self-start"
                  src={logo}
                  alt="Your Company"
                />
              </div>
              <form className="flex flex-col md:flex-row gap-3 w-full  justify-center">
                <div className="flex  justify-center">
                  <input type="text" placeholder="Search for items ..."
                    className="w-52 md:72 -mr-1 md:w-72 px-3 h-9 rounded-l border-2 border-Secondary focus:outline-none focus:border-gray-300"
                  />
                  <select id="pricingType" name="pricingType"
                    className="w-32 h-19 hidden sm:block border-2 border-Secondary focus:border-gray-300 text-gray-400  px-2 md:px-3 py-0 md:py-1 bg-white">
                    <option value="All" selected="">Categories</option>

                  </select>
                  <button type="submit" className="bg-Secondary text-white rounded-r px-2 md:px-3 py-0 md:py-1"><IoMdSearch /></button>
                </div>

              </form>

              <div className="hidden sm:ml-6 sm:block  -mr-4 ">
                <div className="flex space-x-2 mt-3">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current ? ' text-Secondary ' : 'text-gray-700 hover:text-Secondary ',
                        'rounded-md px-3 py-2 text-sm font-medium '
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="absolute  inset-y-0 right-0 flex items-center  sm:static sm:inset-auto sm:ml-6 sm:pr-0">


                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3 -mb-3">
                  <div >
                    <Menu.Button className="relative flex rounded-full ">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <FiUser className='hover:text-Secondary h-7 w-7' />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            <div className='flex space-x-2'>
                              <span className='mt-1'>
                                <FiUser />
                              </span>
                              <span>My Account</span>
                            </div>
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            <div className='flex space-x-2'>
                              <span className='mt-1'>
                                <RiUserVoiceLine />
                              </span>
                              <span>File Comlaint</span>
                            </div>
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            <div className='flex space-x-2'>
                              <span className='mt-1'>
                                <BiLogOut />
                              </span>
                              <span>Sign Out</span>
                            </div>
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? ' text-black' : 'text-black hover:bg-gray-100 hover:black',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  <div className='flex '>{item.name}  <span className='ml-5'>{item.title}</span> </div>
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

