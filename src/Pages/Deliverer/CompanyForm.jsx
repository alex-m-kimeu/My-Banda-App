/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export const CompanyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    contact: '',
    logo: ''
  });

  const [preview, setPreview] = useState(null);
  const imageInputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevFormData) => ({ ...prevFormData, logo: file }));

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.sub.id;

    const companyData = new FormData();
    companyData.append('name', formData.name);
    companyData.append('location', formData.location);
    companyData.append('description', formData.description);
    companyData.append('contact', formData.contact);
    companyData.append('deliverer_id', userId);
    companyData.append('logo', formData.logo);

    fetch("http://127.0.0.1:5500/companies", {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: companyData
    })
    .then(response => response.json())
    .then(data => {
      navigate('/deliverer/dashboard');
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-Variant3 p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-Primary shadow-md rounded-lg p-8 space-y-6 font-body">
        <h1 className="text-2xl font-bold text-center text-Text">Create Company</h1>

        <div className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-Variant2 font-medium">Company Name</label>
            <input
              type="text"
              id="name"
              className="p-2 mt-1 border border-Variant2 rounded-md focus:outline-none focus:ring-2 focus:ring-Secondary"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="location" className="text-Variant2 font-medium">Location</label>
            <input
              type="text"
              id="location"
              className="p-2 mt-1 border border-Variant2 rounded-md focus:outline-none focus:ring-2 focus:ring-Secondary"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="description" className="text-Variant2 font-medium">Description</label>
            <textarea
              id="description"
              className="p-2 mt-1 border border-Variant2 rounded-md focus:outline-none focus:ring-2 focus:ring-Secondary"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="contact" className="text-Variant2 font-medium">Contact Information</label>
            <input
              type="text"
              id="contact"
              className="p-2 mt-1 border border-Variant2 rounded-md focus:outline-none focus:ring-2 focus:ring-Secondary"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="logo" className="text-Variant2 font-medium">Company Logo</label>
            <input
              type="file"
              id="logo"
              className="p-2 mt-1 border border-Variant2 rounded-md focus:outline-none focus:ring-2 focus:ring-Secondary"
              ref={imageInputRef}
              onChange={handleImageChange}
              required
            />
          </div>

          {preview && (
            <div className="flex justify-center mt-4">
              <img src={preview} alt="Logo Preview" className="h-32 w-32 object-contain rounded-md shadow-md" />
            </div>
          )}

          <div className="flex justify-center mt-6">
            <button type="submit" className="bg-Secondary text-Primary py-2 px-6 rounded-md shadow-md hover:bg-Variant2 transition duration-200">
              Create Company
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
