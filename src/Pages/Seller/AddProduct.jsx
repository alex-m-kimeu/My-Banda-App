import { useState, useRef, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { FaLongArrowAltLeft } from "react-icons/fa";

export const AddProduct = () => {
  const [storeID, setStoreID] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.sub.id;

    fetchUser(token, userId);
  }, []);

  const fetchUser = (token, userId) => {
    fetch(`http://127.0.0.1:5500/user/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setStoreID(data.store.id);
      })
      .catch(error => console.error('Error:', error));
  };

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    quantity: '',
    images: [],
    category_name: ''
  });

  const [preview, setPreview] = useState([]);
  const imageInputRef = useRef();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevFormData) => ({ ...prevFormData, images: files }));
    const filePreviews = files.map(file => URL.createObjectURL(file));
    setPreview(filePreviews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    const storeData = new FormData();
    storeData.append('title', formData.title);
    storeData.append('description', formData.description);
    formData.images.forEach((image, index) => {
      storeData.append(`images[${index}]`, image);
    });
    storeData.append('price', formData.price);
    storeData.append('quantity', formData.quantity);
    storeData.append('seller_id', storeID);
    storeData.append('category_name', formData.category_name);

    fetch("http://127.0.0.1:5500/products", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: storeData,
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Network response was not ok');
        }
        return resp.json();
      })
      .then((data) => {
        alert("Product created successfully")
        console.log("Product created successfully:", data);
      })
      .catch((error) => {
        console.error('There has been a problem with your post operation:', error);
      });

    setFormData({
      title: '',
      description: '',
      price: '',
      quantity: '',
      category_name: '',
      images: []
    });
    imageInputRef.current.value = '';
    setPreview([]);
  };

  return (
    <div className="flex flex-col md:flex-row p-8 ">
      <div className="w-full md:w-3/4 lg:w-4/5 px-4 shadow-md border-2 border-gray-300 p-2 ">
        <div className="w-full md:w-1/4 lg:w-1/5 px-4 mb-4 md:mb-0">
          <div className="text-gray-600 cursor-pointer mb-5">
            <button className='flex bg-Secondary hover:bg-yellow-500 p-2 rounded'>
            <FaLongArrowAltLeft className='mr-1 pt-1' />
              Back
            </button>
          </div>
          <div className="font-extrabold mb-5 text-xl">Add Products</div>
          <h1 className="font-bold mb-4">Information</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded ">
          <div className="flex flex-col space-y-4">
            <input
              id="title"
              type="text"
              name="title"
              placeholder="Product Name"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white rounded-md text-sm border border-gray-300 outline-none"
              required
            />
            <textarea
              id="description"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white rounded-md text-sm border border-gray-300 outline-none"
              required
            />
            <input
              id="price"
              type="text"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white rounded-md text-sm border border-gray-300 outline-none"
              required
            />
            <input
              id="quantity"
              type="text"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white rounded-md text-sm border border-gray-300 outline-none"
              required
            />
            <input
              id="category_name"
              type="text"
              name="category_name"
              placeholder="Category"
              value={formData.category_name}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white rounded-md text-sm border border-gray-300 outline-none"
              required
            />
            <input
              ref={imageInputRef}
              id="image"
              type="file"
              name="image"
              multiple
              onChange={handleImageChange}
              className="w-full px-3 py-2 bg-white rounded-md text-sm border border-gray-300 outline-none"
              required
            />
            {preview.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {preview.map((src, index) => (
                  <img key={index} src={src} alt="Preview" className="w-full h-64 object-cover" />
                ))}
              </div>
            )}
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-Secondary hover:bg-yellow-500 text-black hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Add
              </button>
              <button
                type="button"
                className="bg-Secondary hover:bg-yellow-500 text-black hover:text-Primary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => {
                  setFormData({
                    title: '',
                    description: '',
                    price: '',
                    quantity: '',
                    category_name: '',
                    images: []
                  });
                  imageInputRef.current.value = '';
                  setPreview([]);
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
