import { useState } from 'react';

export const StoreForm = () => {
  const [formData, setFormData] = useState({
    store_name: '',
    description: '',
    location: '',
    image: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    fetch("http://127.0.0.1:5500/stores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(formData),
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
        console.error('There has been a problem with your fetch operation:', error);
      });

    setFormData({
      store_name: '',
      description: '',
      image: '',
      location: ''
    });
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
              name="loaction"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white rounded-md text-sm border border-gray-300 outline-none"
              required
            />
             <input
              id="image"
              type="text"
              name="image"
              placeholder="Logo URL"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white rounded-md text-sm border border-gray-300 outline-none"
              required
            />
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
                onClick={() => setFormData({
                  store_name: '',
                  description: '',
                  location: '',
                  image: ''
                })}
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
