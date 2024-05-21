import { Fragment, useContext, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition , DisclosureButton, MenuButton, DisclosurePanel,MenuItems, MenuItem} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import logo from "/src/assets/logo.png";
import { CiUser } from "react-icons/ci";
import { IoMdHeartEmpty } from "react-icons/io";
import { PiShoppingCartSimple } from "react-icons/pi"
import { PiUserSoundLight } from "react-icons/pi";
import { CiLogout } from "react-icons/ci";
import { IoMdSearch } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import { HiOutlineUser } from "react-icons/hi2"
import BuyerContext from '../../Pages/Buyer/BuyerContext/BuyerContext';



const navigation = [
  { name: < IoMdHeartEmpty className='w-6 h-6 -mr-3' />, title: "Wishlist", to: '/buyer/wishlist' },
  { name: <PiShoppingCartSimple  className='w-6 h-6 -mr-3' />, title: "My Cart", to: '/buyer/cart' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const Navbar = () => {
  const {cartNum, setCartNum}= useContext(BuyerContext)
  // const [cartNum, setCartNum] = useState(0)

   // fetch length of cart
   useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://127.0.0.1:5500//carts", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
           setCartNum(data.length)

        // setItemsCost(data[0].items_cost)
        // setTotal(data[0].total_cost)
      })
      .catch((error) => console.error(error));
  }, []);

  


  return (
    <Disclosure as="nav" className="border-b">
      {({ open }) => (
        <>
          <div className="mx-10 px-2 sm:px-6 ">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-Secondary hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-5 w-5" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>


             <NavLink to='/buyer/home'>
             <div className="flex flex-shrink-0 items-center  h-20">
                <img
                  className="h-auto w-auto hidden sm:block justify-self-start lg:h-10"
                  src={logo}
                  alt="Your Company"
                />
              </div>
             </NavLink>
              <form className="flex flex-col md:flex-row gap-3 w-full  justify-center">
                <div className="flex  justify-center ml-5">
                  <input type="text" placeholder="Search for items ..."
                    className="w-52 md:72  -mr-1 md:w-72 px-3 h-9 rounded-l text-xs border border-Secondary focus:outline-none focus:border-gray-300"
                  />
                 
                   <button type="submit" className="bg-Secondary text-white rounded-r px-2 md:px-3 py-0 md:py-1"><IoMdSearch /></button>
                </div>

              </form>

              <div className="hidden sm:ml-6 sm:block  -mr-4  ">
                <div className="flex space-x-2 mt-3">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.title}
                      to={item.to}
                      className={classNames(
                        item.current ? ' text-Secondary ' : 'text-gray-700 hover:text-Secondary ',
                        'rounded-md px-3 py-2 text-sm font-medium '
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </div>

              <div className="absolute  inset-y-0 right-0 flex items-center  sm:static sm:inset-auto sm:ml-6 sm:pr-0">


                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3 -mb-3">
                  <div >
                    <MenuButton className="relative flex rounded-full ">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <HiOutlineUser   className='  h-6 w-6' />
                    </MenuButton>
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
                    <MenuItems className="absolute right-0 z-10 mt-2 w-40 font-light origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <MenuItem>
                       
                          <NavLink
                            href="#"
                            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                          >
                            <div className='flex space-x-2'>
                              <span className='mt-1'>
                                <CiUser  />
                              </span>
                              <span>My Account</span>
                            </div>
                          </NavLink>
                        
                      </MenuItem>
                      <MenuItem>
                       
                          <NavLink
                            href="#"
                            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                          >
                            <div className='flex space-x-2'>
                              <span className='mt-1'>
                                <PiUserSoundLight />
                              </span>
                              <span>File Comlaint</span>
                            </div>
                          </NavLink>
                        
                      </MenuItem>
                      <MenuItem>
                       
                          <NavLink
                            href="#"
                            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                          >
                            <div className='flex space-x-2'>
                              <span className='mt-1'>
                                <CiLogout/>
                              </span>
                              <span>Sign Out</span>
                            </div>
                          </NavLink>
                      </MenuItem>
                    </MenuItems>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.title}
                  as="NavLink"
                  href={item.href}
                  className={classNames(
                    item.current ? ' text-black' : 'text-black hover:bg-gray-100 hover:black',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  <div className='flex '>{item.name}  <span className='ml-5'>{item.title}</span> </div>
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}

