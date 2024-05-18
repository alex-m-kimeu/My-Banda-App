import { LiaPaperPlaneSolid } from "react-icons/lia";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

export const Footer = () => {
    return (
        <footer className="bg-Text flex flex-col gap-[25px] w-full h-auto py-[30px]">
            <div className="flex flex-col md:flex-row justify-evenly gap-[30px] md:gap-0">
                <div className="flex flex-col space-y-3 items-center md:items-start p-3">
                    <h1 className="text-Secondary font-semibold text-xl">My Banda</h1>
                    <p className="text-white font-normal text-lg">Subscribe</p>
                    <p className="text-white font-normal text-sm">Get 10% of your first coupon</p>
                    <div className="flex justify-between items-center bg-Text rounded ring-2 ring-white p-2">
                        <input
                            type="email"
                            placeholder='Enter your email'
                            className='flex-grow outline-none bg-transparent text-white placeholder-white'
                        />
                        <LiaPaperPlaneSolid className="fill-white" />
                    </div>
                </div>
                <div className="flex flex-col space-y-3 items-center md:items-start p-3">
                    <h1 className="text-white font-semibold text-xl">Support</h1>
                    <h2 className="text-white font-medium text-base">mybanda@gmail.com</h2>
                    <h2 className="text-white font-medium text-base">+000-000-000</h2>
                    <div className="flex gap-[10px]">
                        <FaInstagram className="fill-white" />
                        <FaXTwitter className="fill-white" />
                        <FaFacebookF className="fill-white" />
                    </div>
                </div>
                <div className="flex flex-col space-y-3 items-center md:items-start p-3">
                    <h1 className="text-white font-semibold text-xl">Account</h1>
                    <ul className="text-white font-medium text-sm space-y-3 cursor-pointer">
                        <li>
                            <NavLink
                                to=""
                            >
                                My Account
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to=""
                            >
                                Cart
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to=""
                            >
                                Wishlist
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <p className="text-sm font-thin text-white text-center">© Copyright 2024 MyBanda™. All Rights Reserved.</p>
        </footer>
    )
}