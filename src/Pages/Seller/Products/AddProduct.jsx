import { useState, useEffect, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate, useLocation } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";

export const AddProduct = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [editingProduct, setEditingProduct] = useState(location.state?.editingProduct);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        quantity: '',
        images: [],
        newImages: [],
        category_name: ''
    });

    const [preview, setPreview] = useState([]);
    const imageInputRef = useRef();

    useEffect(() => {
        if (editingProduct) {
            setFormData({
                ...editingProduct,
                images: editingProduct.images,
                newImages: []
            });

            const oldImagePreviews = editingProduct.images.map((image, index) => ({
                id: index,
                src: image,
                file: image
            }));

            setPreview(oldImagePreviews);
        }
    }, [editingProduct]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
    };

    const handleImageChange = (e) => {
        const newFiles = Array.from(e.target.files);
        if (formData.newImages.length + newFiles.length > 4) {
            alert('You can only upload up to 4 images.');
            return;
        }
        const newFilePreviews = newFiles.map((file, index) => ({
            id: index + Date.now(),
            src: URL.createObjectURL(file),
            file: file
        }));

        setFormData((prevFormData) => ({
            ...prevFormData,
            newImages: [...prevFormData.newImages, ...newFiles]
        }));

        setPreview((prevPreview) => [...prevPreview, ...newFilePreviews]);
    };

    const handleImageRemove = (id) => {
        const imageToRemove = preview.find((image) => image.id === id);

        setPreview((prevPreview) => prevPreview.filter((image) => image.id !== id));

        if (typeof imageToRemove.file === 'string') {
            setFormData((prevFormData) => ({
                ...prevFormData,
                images: prevFormData.images.filter((image) => image !== imageToRemove.file)
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                newImages: prevFormData.newImages.filter((image) => image !== imageToRemove.file)
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.sub.id;

        const userResponse = await fetch(`http://127.0.0.1:5500/user/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const userData = await userResponse.json();
        const storeID = userData.store.id;

        const storeData = new FormData();
        storeData.append('title', formData.title);
        storeData.append('description', formData.description);
        if (formData.newImages.length > 0) {
            formData.newImages.forEach((image) => {
                storeData.append('images', image);
            });
        } else if (formData.images.length > 0) {
            storeData.append('oldImages', JSON.stringify(formData.images));
        }
        storeData.append('price', formData.price);
        storeData.append('quantity', formData.quantity);
        storeData.append('store_id', storeID);
        storeData.append('category_name', formData.category_name);

        if (editingProduct) {
            fetch(`http://127.0.0.1:5500/products/${editingProduct.id}`, {
                method: "PATCH",
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
                .then(() => {
                    navigate('/seller/products');
                })
                .catch((error) => {
                    console.error('There has been a problem with your patch operation:', error);
                });
        } else {
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
                .then(() => {
                    navigate('/seller/products');
                })
                .catch((error) => {
                    console.error('There has been a problem with your post operation:', error);
                });
        }

        setFormData({
            title: '',
            description: '',
            price: '',
            quantity: '',
            category_name: '',
            images: [],
            newImages: []
        });
        imageInputRef.current.value = '';
        setPreview([]);
        setEditingProduct(null);
    };

    return (
        <div className="py-[20px] space-y-4 justify-between flex flex-col items-center">
            <h1 className="text-Text font-bold text-xl text-center lg:text-left">
                {editingProduct ? 'Edit Product' : 'Add Product'}
            </h1>
            <form onSubmit={handleSubmit} className='w-full max-w-md'>
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
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-auto h-[80px] px-3 py-2 bg-white rounded-md text-sm border border-gray-300 outline-none"
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
                    <select
                        id="category_name"
                        name="category_name"
                        value={formData.category_name}
                        onChange={handleChange}
                        className="w-auto px-3 py-2 bg-white rounded-md text-sm border border-gray-300 outline-none"
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Shoes">Shoes</option>
                        <option value="Personal Care and Beauty">Personal Care and Beauty</option>
                        <option value="Food and Beverage">Food and Beverage</option>
                    </select>
                    <input
                        ref={imageInputRef}
                        id="image"
                        type="file"
                        name="image"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="w-auto px-3 py-2 bg-white rounded-md text-sm border border-gray-300 outline-none"
                        required
                    />
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2  gap-2 mt-4">
                        {preview.map((image) => (
                            <div key={image.id} className="relative">
                                <img src={image.src} alt="Preview" className="w-[200px] h-[200px] object-cover" />
                                <button
                                    onClick={() => handleImageRemove(image.id)}
                                    className="absolute top-1 right-5 bg-Secondary p-1 rounded-full"
                                >
                                    <RxCross2 className='fill-Primary' />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className="bg-Secondary text-black hover:text-white font-normal py-2 px-4 "
                        >
                            Add
                        </button>
                        <button
                            type="button"
                            className="bg-Secondary text-black hover:text-white font-normal py-2 px-4"
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
                                navigate('/seller/products');
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};