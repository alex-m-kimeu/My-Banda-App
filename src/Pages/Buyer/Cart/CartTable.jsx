import { useState } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

export const CartTable = ({ product, onDelete}) => {
  const [quantity, setQuantity] = useState(product.quantity);
  const [subtotal, setSubtotal] = useState(product.subtotal);

  function handleDelete() {
    const token = localStorage.getItem('token')

    fetch(`https://my-banda.onrender.com/productdec/${product.products.id}`, {
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

  const handleIncreaseQuantity = () => {
    const token = localStorage.getItem('token')

    console.log(product.products.id)

    fetch(`https://my-banda.onrender.com/productinc/${product.products.id}`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(products => {
        setQuantity(products.quantity)
        setSubtotal(products.subtotal)
        // setButtonClicked(subtotal)
        // setClicked(quantity)


      })
      .catch(error => console.error('Error:', error));
  };

  const handleDecreaseQuantity = () => {
    const token = localStorage.getItem('token')

    console.log(product.products.id)

    fetch(`https://my-banda.onrender.com/productdec/${product.products.id}`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(products => {
        setQuantity(products.quantity)
        setSubtotal(products.subtotal)
        // setButtonClicked(subtotal)
        // setClicked(quantity)
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <tr key={product.products.id} className="border-b space-y-4">
      <td className="p-[10px]">
        <img src={
          product.products.images && product.products.images.length > 0
            ? product.products.images[0]
            : ""
        }
          alt={product.products.title}
          className="inline-block h-6 w-6 rounded-full object-cover mr-1" />
        {product.products.title}
      </td>
      <td className="p-[10px]">{product.products.price}</td>
      <td className='p-[10px]'>
        <div className=' flex border h-10 w-16'>
          <button className=''  >
            <MdOutlineKeyboardArrowLeft className='h-10 hover:text-Secondary ' onClick={handleDecreaseQuantity} />
          </button>
          <div className='w-9 flex justify-center items-center'>
            <p>{quantity}</p>
          </div>
          <button >
            <MdOutlineKeyboardArrowRight className='h-10 hover:text-Secondary ' onClick={handleIncreaseQuantity} />
          </button>
        </div>
      </td>
      <td className='p-[10px]'>{subtotal}</td>
      <td className='p-[10px] pl-9'>
        <button onClick={handleDelete} >
          <MdDeleteOutline className="hover:fill-Secondary" />
        </button>
      </td>
    </tr>
  )
}


