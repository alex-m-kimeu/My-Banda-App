import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { FaPlus } from "react-icons/fa";
import { ProductSearch } from "./ProductSearch";
import { ProductFilter } from "./ProductFilter";
import { ProductTable } from "./ProductTable";

export const Products = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.sub.id;

                const userResponse = await fetch(`https://my-banda.onrender.com/user/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const userData = await userResponse.json();
                const storeId = userData.store.id;

                const response = await fetch(`https://my-banda.onrender.com/products`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                let data = await response.json();
                data = data.filter(product => product.store_id === storeId);
                setProducts(data);

            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter(product => {
        const matchesSearchTerm = searchTerm ? product.title.toLowerCase().includes(searchTerm.toLowerCase()) : true;
        const matchesSelectedCategory = selectedCategory !== 'All' ? product.category_name === selectedCategory : true;
        return matchesSearchTerm && matchesSelectedCategory;
    });

    const handleAddProductClick = () => {
        navigate('/seller/Add/Products', { state: { editingProduct: null } });
    };

    const handleEditProduct = async (productId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://my-banda.onrender.com/products/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch product');
            }
            const product = await response.json();
            setEditingProduct(product);
            navigate('/seller/Add/Products', { state: { editingProduct: product } });
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://my-banda.onrender.com/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete product');
            }
            setProducts(products.filter(product => product.id !== productId));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="py-[20px] space-y-4">
            <div className="flex justify-between">
                <h1 className="text-Text font-bold text-xl text-center lg:text-left">Products</h1>
                <button
                    onClick={handleAddProductClick}
                    className="bg-Secondary text-white py-[5px] px-[10px] flex gap-1 items-center">
                    <span>
                        <FaPlus />
                    </span>
                    Add Product
                </button>
            </div>
            <div className="flex gap-2">
                <div className="w-1/2 md:w-1/4 bg-Variant3 px-2">
                    <ProductFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                </div>
                <div className="w-1/2 md:w-1/4">
                    <ProductSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </div>
            </div>
            <ProductTable products={filteredProducts} onDeleteProduct={handleDeleteProduct} onEditProduct={handleEditProduct} />
        </div>
    );
};