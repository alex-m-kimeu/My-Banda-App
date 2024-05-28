import { useState, useRef, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

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
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.sub.id;

    fetchCompany(token, userId);
  }, []);

  const fetchCompany = (token, userId) => {
    fetch(`https://my-banda.onrender.com/user/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.delivery_company) {
          setFormData({
            name: data.delivery_company.name,
            location: data.delivery_company.location,
            description: data.delivery_company.description,
            contact: data.delivery_company.contact,
            logo: ''
          });
        }
      })
      .catch(error => console.error('Error:', error));
  };

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

    fetch("https://my-banda.onrender.com/companies", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: companyData,
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Network response was not ok');
        }
        return resp.json();
      })
      .then((data) => {
        navigate('/deliverer/dashboard');
      })
      .catch((error) => {
      });

    setFormData({
      name: '',
      location: '',
      description: '',
      contact: '',
      logo: ''
    });
    imageInputRef.current.value = '';
    setPreview(null);
  };

  return (
    <div className="flex justify-center lg:justify-start p-[10px]">
      <div className=" max-w-md w-full">
        <form onSubmit={handleSubmit} className="bg-primary">
        <h3 className="text-Text font-bold text-xl text-center lg:text-left mb-5">Company Information</h3>
          <div className="flex flex-col space-y-6">
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Company Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-Primary rounded-md text-sm border text-Variant2 outline-none"
              required
            />
            <textarea
              id="description"
              name="description"
              placeholder="Company Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-Primary rounded-md text-sm border text-Variant2 outline-none"
              required
            />
            <input
              id="location"
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-Primary rounded-md text-sm border text-Variant2 outline-none"
              required
            />
            <input
              id="contact"
              type="text"
              name="contact"
              placeholder="Contact"
              value={formData.contact}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-Primary rounded-md text-sm border text-Variant2 outline-none"
              required
            />
            <input
              ref={imageInputRef}
              id="logo"
              type="file"
              name="logo"
              onChange={handleImageChange}
              className="w-full px-4 py-2 bg-Primary rounded-md text-sm border text-Variant2 outline-none"
              required
            />

            {preview && (
              <img src={preview} alt="Preview" className="w-full h-64 object-cover mt-4" />
            )}

            <div className="flex justify-center lg:justify-start space-x-6">
              <button
                type="submit"
                className="bg-Secondary text-sm text-white font-normal py-2 px-4 rounded-md"
              >
                Save
              </button>
              <button
                type="button"
                className="bg-Secondary text-sm text-white font-normal py-2 px-4 rounded-md"
                onClick={() => {
                  setFormData({
                    name: '',
                    location: '',
                    description: '',
                    contact: '',
                    logo: ''
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
