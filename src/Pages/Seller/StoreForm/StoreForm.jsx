import { useState, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';

export const StoreForm = () => {
  const [formData, setFormData] = useState({
    store_name: '',
    description: '',
    location: '',
    image: ''
  });

  const [preview, setPreview] = useState(null);
  const imageInputRef = useRef();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevFormData) => ({ ...prevFormData, image: file }));

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.sub.id;

    const storeData = new FormData();
    storeData.append('store_name', formData.store_name);
    storeData.append('description', formData.description);
    storeData.append('location', formData.location);
    storeData.append('seller_id', userId);
    storeData.append('image', formData.image);

    fetch("http://127.0.0.1:5500/stores", {
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
        console.log("Store created successfully:", data);
      })
      .catch((error) => {
        console.error('There has been a problem with your post operation:', error);
      });

    setFormData({
      store_name: '',
      description: '',
      image: '',
      location: ''
    });
    imageInputRef.current.value = '';
    setPreview(null);
  };

  return (
    <div className="flex justify-center items-center">
      <div className=" max-w-md">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-5 w-[350px]">
          <h3 className="text-lg text-center font-bold mb-2">Edit Store</h3>
          <div className="flex flex-col space-y-4">
            <input
              id="store_name"
              type="text"
              name="store_name"
              placeholder="Store Name"
              value={formData.store_name}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white rounded-md text-sm border border-gray-300 outline-none"
              required
            />
            <textarea
              id="description"
              name="description"
              placeholder="Store Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white rounded-md text-sm border border-gray-300 outline-none"
              required
            />
            <input
              id="location"
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white rounded-md text-sm border border-gray-300 outline-none"
              required
            />
            <input
              ref={imageInputRef}
              id="image"
              type="file"
              name="image"
              onChange={handleImageChange}
              className="w-full px-3 py-2 bg-white rounded-md text-sm border border-gray-300 outline-none"
              required
            />

            {preview && (
              <img src={preview} alt="Preview" className="w-full h-64 object-cover mt-4" />
            )}

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-Primary hover:bg-Secondary text-black hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save
              </button>
              <button
                type="button"
                className="bg-Primary hover:bg-Secondary text-black hover:text-Primary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => {
                  setFormData({
                    store_name: '',
                    description: '',
                    location: '',
                    image: ''
                  });
                  imageInputRef.current.value = '';
                  setPreview(null);
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