import { Fragment, useContext } from 'react'
import { Disclosure, Menu, Transition, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import logo from "/src/assets/logo.png";
import favicon from "/favicon.png";
import { CiUser } from "react-icons/ci";
import { IoMdHeartEmpty } from "react-icons/io";
import { PiShoppingCartSimple } from "react-icons/pi"
import { CiLogout } from "react-icons/ci";
import { IoMdSearch } from "react-icons/io";
import { NavLink, useNavigate } from 'react-router-dom';
import { HiOutlineUser } from "react-icons/hi2"
import BuyerContext from '../../Pages/Buyer/BuyerContext/BuyerContext';
import { BsBoxSeam } from "react-icons/bs";

export const Navbar = () => {
  const { cartNum, wishlistNum, search, setSearch } = useContext(BuyerContext)
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    navigate("/signin");
  };

  return (
    <Disclosure as="nav" className="border-b">
      <>
        <div className="md:mx-10 px-2 sm:px-6 mx-3">
          <div className="relative flex h-16 items-center justify-between">
            <NavLink to='/buyer/home'>
              <div className="flex flex-shrink-0 items-center  h-20">
                <img
                  className="h-auto w-auto hidden sm:block justify-self-start lg:h-8"
                  src={logo}
                  alt="Your Company"
                />
              </div>
            </NavLink>
            <NavLink to='/buyer/home'>
              <div className="flex flex-shrink-0 items-center  h-20">
                <img
                  className="h-8 w-8 sm:hidden justify-self-start lg:h-10"
                  src={favicon}
                  alt="Your Company"
                />
              </div>
            </NavLink>
            <form className="flex flex-col md:flex-row gap-3 w-full  justify-center">
              <div className="flex  justify-center  mr-6 sm:ml-0">
                <input type="text" placeholder="Search for items ..."
                  className="w-36 h-7 md:w-72 px-3 md:h-9  rounded-l md:text-xs text-[9px] border border-Secondary focus:outline-none focus:border-gray-300"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit" className="bg-Secondary text-white rounded-r px-2 md:px-3 py-0 md:py-1"><IoMdSearch /></button>
              </div>
            </form>
            <div className="hidden sm:ml-6 sm:block  -mr-4  ">
              <div className="flex space-x-2 mt-3">
                <NavLink to="/buyer/wishlist" className='relative text-gray-700 rounded-md px-3 py-2 text-sm font-medium'>
                  <IoMdHeartEmpty className='w-6 h-6 -mr-3 hover:text-Secondary' />
                  {wishlistNum > 0 &&
                    <div className='bg-Secondary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center absolute top-0 right-0 transform translate-x-1/2 translate-y-1/8'>
                      {wishlistNum}
                    </div>
                  }
                </NavLink>
                <NavLink to="/buyer/cart" className='relative text-gray-700 rounded-md px-3 py-2 text-sm font-medium'>
                  <PiShoppingCartSimple className='w-6 h-6 -mr-3 hover:text-Secondary' />
                  {cartNum > 0 &&
                    <div className='bg-Secondary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center absolute top-0 right-0 transform translate-x-1/2 translate-y-1/8'>
                      {cartNum}
                    </div>
                  }
                </NavLink>
              </div>
            </div>
            <div className="absolute  inset-y-0 right-0 flex items-center  sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3 -mb-3">
                <div >
                  <MenuButton className="relative sm:mt-2 mb-2 rounded-full mr-3">
                    <span className="absolute -inset-1." />
                    <span className="sr-only">Open user menu</span>
                    <HiOutlineUser className='h-5 w-5 sm:h-6 sm:w-6' />
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
                        href="/buyer/account"
                        className=' block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                      >
                        <div className='flex space-x-2'>
                          <span className='mt-1'>
                            <CiUser />
                          </span>
                          <span>My Account</span>
                        </div>
                      </NavLink>
                    </MenuItem>
                    <MenuItem className='sm:hidden block'>
                      <NavLink
                        to="/buyer/cart"
                        className='md:hidden block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                      >
                        <div className='flex space-x-2'>
                          <span className='mt-1'>
                            <PiShoppingCartSimple />
                          </span>
                          <div className='flex'>
                            <span className='mr-2'>My Cart </span>{cartNum > 0 ? <div className='text-xs flex justify-center w-3 bg-Secondary rounded-full px-2 self-center'>{cartNum}</div> : <div></div>}
                          </div>
                        </div>
                      </NavLink>
                    </MenuItem>
                    <MenuItem className='sm:hidden block'>
                      <NavLink
                        to="/buyer/wishlist"
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                      >
                        <div className='flex space-x-2'>
                          <span className='mt-1'>
                            < IoMdHeartEmpty />
                          </span>
                          <div className='flex '>
                            <span className='mr-2'>My Wishlist </span> {wishlistNum > 0 ? <div className='text-xs flex justify-center bg-Secondary w-3 rounded-full px-2 bg- self-center'>{wishlistNum}</div> : <div></div>}
                          </div>
                        </div>
                      </NavLink>
                    </MenuItem>
                    <MenuItem>
                      <NavLink
                        href="/buyer/order"
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                      >
                        <div className='flex space-x-2'>
                          <span className='mt-1'>
                            <BsBoxSeam />
                          </span>
                          <span>My Orders</span>
                        </div>
                      </NavLink>
                    </MenuItem>
                    <MenuItem>
                      <NavLink
                        href="#"
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                      >
                        <div className='flex space-x-2' onClick={handleLogout}>
                          <span className='mt-1'>
                            <CiLogout />
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
      </>
    </Disclosure>
  )
}