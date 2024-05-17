import React, { useState } from 'react';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const AddProduct = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);

  const token = localStorage.getItem('token');

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('name', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('quantity', quantity);
    images.forEach((image) => {
      formData.append('images', image.file);
    });
    formData.append('categories', JSON.stringify(categories));

    try {
      const response = await fetch('http://127.0.0.1:5500/products', {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error saving product:', errorData);
        alert(`Error saving product: ${errorData.message}`);
        return;
      }

      alert('Product saved successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while saving the product.');
    }
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const imagesArray = files.map((file) => ({
      file,
      previewURL: URL.createObjectURL(file),
    }));
    setImages(imagesArray);
  };

  const handleCategoryChange = (category) => {
    setCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((cat) => cat !== category);
      } else {
        return [...prevCategories, category];
      }
    });
  };

  return (
    <div className="flex flex-col md:flex-row p-8 ">
      <div className="w-full md:w-3/4 lg:w-4/5 px-4 shadow-md  p-2 ">
        <div className="w-full md:w-1/4 lg:w-1/5 px-4 mb-4 md:mb-0">
        
          <div className="text-gray-600 cursor-pointer mb-5">
            <FontAwesomeIcon icon={faArrowLeft} />
            <button className='bg-Secondary p-2 ml-2 text-black rounded'>Back</button> 
          </div>
  

          <div className="font-extrabold mb-5">Add Products</div>
        </div>
        <div className="p-6">
          <h1 className="font-bold mb-4">Information</h1>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="title" className="text-gray-900">Product Name</label>
              <div className="border border-gray-300 p-1">
                <input
                  id="title"
                  placeholder="Product Name"
                  className="w-full outline-none"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="text-gray-900">Product Description</label>
              <div className="border border-gray-300 p-1">
                <textarea
                  id="description"
                  placeholder="Product description"
                  className="w-full h-40 outline-none resize-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="images" className="text-gray-900 font-bold">Images</label>
              <div className="border border-dashed border-gray-400 p-1 mt-6" style={{ minHeight: '170px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <input
                  id="images"
                  type="file"
                  multiple
                  className="w-full h-full opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                />
                <label htmlFor="images" className="border-2 border-gray-400 text-Secondary py-2 px-4 rounded-md cursor-pointer mt-2">Add File
                {images.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {images.map((image, index) => (
                      <div key={index} className="w-20 h-20 border border-gray-300 relative overflow-hidden">
                        <img src={image.previewURL} alt={`preview-${index}`} className="absolute inset-0 w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
                </label>
                <span className="text-gray-500 text-sm mt-2">Or drag and drop files</span>
                
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <div>
                <label htmlFor="price" className="text-gray-900 font-bold">Price</label>
                <div>
                  <label htmlFor="price" className="text-gray-700">Product Price</label>
                </div>
                <div className="border border-gray-300 p-1">
                  <input
                    id="price"
                    placeholder="Enter Price"
                    className="w-full outline-none"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 items-center">
                <div className="mt-6">
                  <div>
                    <label htmlFor="quantity" className="text-gray-900">Quantity</label>
                  </div>
                  <input
                    id="quantity"
                    placeholder="Quantity"
                    className="border border-gray-300 p-1 w-full outline-none"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
              </div>

            <div className="flex mt-3">
              <button className="border-2 border-gray-400 text-black py-2 px-4 rounded">Cancel</button>
              <button className="bg-Secondary text-black py-2 px-4 rounded ml-4" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-4">
        <div className="p-6">
          <h1 className="font-bold mb-2">Categories</h1>
          <div className="p-6 gap-2 h-auto">
            {['Clothes', 'Electronics', 'Shoes', 'Personal Care and Beauty','Food and Beverage'].map((category) => (
              <label key={category} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  className="mr-2 cursor-pointer"
                  checked={categories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                {category}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
