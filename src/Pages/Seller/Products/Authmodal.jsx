import React from 'react';
import { AddProduct } from './Products/AddProduct';

const Authmodal = ({ closeModal }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className='bg-white p-8 rounded-lg relative z-10'>
        <button 
          className='absolute top-2 right-2 text-black bg-slate-300 rounded-full p-2' 
          onClick={closeModal}
        >
          Close
        </button>
        <AddProduct />
      </div>
    </div>
  );
}

export default Authmodal;
