import React, { useState } from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";


export const Cartcard = ({ product, onDelete , setButtonClicked, setClicked}) => {
  const [quantity, setQuantity]= useState(product.quantity);
  const [subtotal, setSubtotal]= useState(product.subtotal);

  function handleDelete() {
    const token = localStorage.getItem('token')
    
    fetch(`http://127.0.0.1:5500/productdec/${product.products.id}`, {
    method: "DELETE",
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        onDelete(product.id);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation: ', error);
    });
  }


  const handleIncreaseQuantity=()=>{
    const token = localStorage.getItem('token')

    console.log(product.products.id)

    fetch(`http://127.0.0.1:5500/productinc/${product.products.id}`, {
      method: "POST",
      headers: {
          'Authorization': `Bearer ${token}`
      }
  })
  .then(response => response.json())
  .then(products => { 
    setQuantity(products.quantity)
    setSubtotal(products.subtotal)
  setButtonClicked(subtotal)
  setClicked(quantity)


  })
  .catch(error => console.error('Error:', error));
};




const handleDecreaseQuantity =()=>{
  const token = localStorage.getItem('token')

  console.log(product.products.id)

  fetch(`http://127.0.0.1:5500/productdec/${product.products.id}`, {
    method: "POST",
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
.then(response => response.json())
.then(products => { 
  setQuantity(products.quantity)
  setSubtotal(products.subtotal)
  setButtonClicked(subtotal)
  setClicked(quantity)
  
})
.catch(error => console.error('Error:', error));
};

  return (
    <div className="bg-white   mb-4 flex flex-col  w-64 h-92">
       <img src={product.products.images} alt={product.title} className="w-full h-32 rounded-t  object-cover " />
       <button   onClick={handleDelete}  className='bg-black flex  rounded-b justify-center w-full text-sm text-white py-2 text-body'>
       <MdDeleteOutline className='w-5 h-5 mr-2' /> Remove from Cart
       </button>
       <div className='flex  justify-between ml-2'>
       <div>
       <h2 className="text-Text font-medium text-lg mb-2">
        {product.products.title}
      </h2>
      <p className="text-sm mb-2  text-Secondary">$ {subtotal}</p>
       </div>
       <div className='flex border h-10 self-center mr-2 rounded'>
       <button className=''  >
             <MdOutlineKeyboardArrowLeft  className='h-10 hover:text-Secondary ' onClick={handleDecreaseQuantity} />
             </button>
             <div className='w-9 flex justify-center items-center'>
              <p>{quantity}</p>
             </div>
             <button >
             <MdOutlineKeyboardArrowRight className='h-10 hover:text-Secondary ' onClick={handleIncreaseQuantity}/>
             </button>
       </div>
       </div>
    </div>
  )
}

