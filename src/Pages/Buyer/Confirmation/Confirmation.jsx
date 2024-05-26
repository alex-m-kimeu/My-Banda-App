import React from 'react'
import { NavLink } from 'react-router-dom'

export const Confirmation = () => {
  return (
    <div className='flex justify-center flex-col'>
           
            <div className="flex justify-center">
              <img
                src='https://img.freepik.com/free-vector/messenger-concept-illustration_114360-6564.jpg?size=626&ext=jpg&ga=GA1.1.221048609.1715169387&semt=ais_user'
                alt="cart"
                className="  h-80 w-80 mt-5 "
              />
            </div >
            <div className='text-center'>
               <h1 className="font-bold ">Order has successfully been</h1>
            </div>
            <div className='flex justify-center'>
                <div className='w-72 mb-5 mt-3 flex justify-between '>
                  <NavLink to='/buyer/home'>
                  <button className='text-xs py-1 px-3 bg-Secondary bg-opacity-20 rounded hover:bg-opacity-40 cursor-pointer'>Back to home</button>
                  </NavLink>
<NavLink to='/buyer/myOrders'>
<button className='text-xs py-1 px-3 bg-Secondary bg-opacity-20 rounded hover:bg-opacity-40 cursor-pointer'>My Orders</button>
</NavLink>
                </div>

            </div>
          </div>

  )
}

