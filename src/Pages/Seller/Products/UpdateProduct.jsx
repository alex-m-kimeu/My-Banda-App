import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { FaLongArrowAltLeft } from 'react-icons/fa';

export const UpdatePage = ({ productData }) => {
  const [storeID, setStoreID] = useState('');
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    quantity: '',
    price: '',
  });

  useEffect(() => {
    if (productData) {
      setFormData({
        id: productData.id,
        title: productData.title,
        quantity: productData.quantity,
        price: productData.price,
      });
    }
  }, [productData]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.sub.id;

    fetchUser(token, userId);
  }, []);

  const fetchUser = (token, userId) => {
    fetch(`http://127.0.0.1:5500/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setStoreID(data.store.id);
      })
      .catch(error => console.error('Error:', error));
  };

  const handleChange = e => {
    const { id, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [id]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    const updateData = {
      title: formData.title,
      price: formData.price,
      quantity: formData.quantity,
    };

    fetch(`http://127.0.0.1:5500/products/${formData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        alert('Product updated successfully');
        console.log('Product data:', data);
      })
      .catch(error => {
        console.error('There has been a problem with your post operation:', error);
      });

    // Reset form data after submission
    setFormData({
      id: '',
      title: '',
      quantity: '',
      price: '',
    });
  };

  return (
    <div className="flex flex-col md:flex-row p-8">
      <div className="w-full md:w-3/4 lg:w-4/5 p-2">
        <div className="w-full md:w-1/4 lg:w-1/5 px-4 mb-4 md:mb-0">
          {/* <div className="text-gray-600 cursor-pointer mb-5">
            <button className='flex bg-Secondary hover:bg-yellow-500 p-2 rounded'>
            <FaLongArrowAltLeft className='mr-1 pt-1' />
              Back
            </button>
          </div> */}
        </div>

        <form onSubmit={handleSubmit} className="">
          <div className="flex flex-col space-y-4">
            <input
              id="title"
              type="text"
              name="title"
              placeholder="Product Name"
              value={formData.title}
              onChange={handleChange}
              className="w-auto px-3 py-2 bg-white rounded-md text-sm border border-gray-300 outline-none"
              required
            />
            <input
              id="price"
              type="text"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="w-auto px-3 py-2 bg-white rounded-md text-sm border border-gray-300 outline-none"
              required
            />
            <input
              id="quantity"
              type="text"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-auto px-3 py-2 bg-white rounded-md text-sm border border-gray-300 outline-none"
              required
            />
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-secondary hover:bg-yellow-500 text-black hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Update
              </button>
              <button
                type="button"
                className="bg-secondary hover:bg-yellow-500 text-black hover:text-primary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => {
                  setFormData({
                    id: '',
                    title: '',
                    quantity: '',
                    price: '',
                  });
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
