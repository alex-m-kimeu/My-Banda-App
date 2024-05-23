/* eslint-disable no-undef */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export const DelivererCompany = () => {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        description: '',
        contact: '',
        logo: null,
    });
    const [companyId, setCompanyId] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.sub.id;
        
        fetchCompany(token, userId);
    }, []);
    
    const fetchCompany = (token, userId) => {
        fetch(`http://127.0.0.1:5500/user/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.delivery_company) {
                setCompanyId(data.delivery_company.id);
                setFormData({
                    name: data.delivery_company.name,
                    location: data.delivery_company.location,
                    description: data.delivery_company.description,
                    contact: data.delivery_company.contact,
                    logo: null
                });
            }
        })
        .catch(error => console.error('Error:', error));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            logo: e.target.files[0],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const form = new FormData();
        
        for (const key in formData) {
            form.append(key, formData[key]);
        }

        fetch(`http://127.0.0.1:5500/company/${companyId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: form
        })
        .then(response => response.json())
        .then(data => {
            console.log('Company updated:', data);
            navigate('/deliverer/dashboard');
        })
        .catch(error => console.error('Error:', error));
    };

    return (
        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4 p-8 shadow-md rounded-md bg-Primary font-body">
            <h1 className="text-2xl font-semibold text-Variant mb-6">Update Delivery Company</h1>
            <div className="flex flex-col gap-2">
                <label className="text-Text">Company ID:</label>
                <input 
                    type="text" 
                    name="companyId" 
                    value={companyId} 
                    readOnly 
                    className="p-2 border border-Variant2 rounded-md"
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-Text">Name:</label>
                <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    className="p-2 border border-Variant2 rounded-md"
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-Text">Location:</label>
                <input 
                    type="text" 
                    name="location" 
                    value={formData.location} 
                    onChange={handleChange} 
                    className="p-2 border border-Variant2 rounded-md"
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-Text">Description:</label>
                <textarea 
                    name="description" 
                    value={formData.description} 
                    onChange={handleChange} 
                    className="p-2 border border-Variant2 rounded-md"
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-Text">Contact:</label>
                <input 
                    type="text" 
                    name="contact" 
                    value={formData.contact} 
                    onChange={handleChange} 
                    className="p-2 border border-Variant2 rounded-md"
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-Text">Logo:</label>
                <input 
                    type="file" 
                    name="logo" 
                    onChange={handleFileChange} 
                    className="p-2 border border-Variant2 rounded-md"
                />
            </div>
            <button type="submit" className="mt-4 p-2 bg-Secondary text-Variant rounded-md hover:bg-Variant2">
                Save
            </button>
        </form>
    );
};

export default DelivererCompany;
