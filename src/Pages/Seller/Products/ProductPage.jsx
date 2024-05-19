import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { LuPlus } from 'react-icons/lu';
import { CiSearch, CiEdit } from 'react-icons/ci';
import { BsTrash3Fill } from 'react-icons/bs';
import DataTable from 'react-data-table-component';
import { AddProductModal } from './AddProductModal';
import { UpdateProductModal } from './UpdateAuthmodal';

export const ProductsPage = () => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [filterInput, setFilterInput] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleModal1 = () => {
    setIsModalOpen1(!isModalOpen1);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.sub.id;

        const response = await fetch(`http://127.0.0.1:5500/products?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setRecords(data);

        const uniqueCategories = ['All', ...new Set(data.map(product => product.category_name))];
        setCategories(uniqueCategories);
        setFilteredRecords(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredRecords(records);
    } else {
      setFilteredRecords(records.filter(product => product.category_name === category));
    }
  };

  const handleFilter = (e) => {
    const { value } = e.target;
    setFilterInput(value);
  
    if (value === '') {
      filterByCategory(selectedCategory);
    } else {
      const filtered = records.filter(record =>
        record.title.toLowerCase().includes(value.toLowerCase()) &&
        (selectedCategory === 'All' || record.category_name === selectedCategory)
      );
      setFilteredRecords(filtered);
    }
  };
  

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchInput(value);
  
    if (value === '') {

      filterByCategory(selectedCategory);
    } else {
  
      const filtered = records.filter(record =>
        record.title.toLowerCase().includes(value.toLowerCase()) ||
        record.category_name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredRecords(filtered);
    }
  };
  
  const handleEdit = async (productId) => {
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch(`http://127.0.0.1:5500/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
  
      const productData = await response.json();
  
      // Open the update modal and pass the fetched product data
      setIsModalOpen1(true);
      setSelectedProduct(productData); // Save the fetched product data
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };
  
  const handleDelete = async (row) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://127.0.0.1:5500/products/${row.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      setRecords(records.filter(product => product.id !== row.id));
      setFilteredRecords(filteredRecords.filter(product => product.id !== row.id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const columns = [
    { 
      name: "Product", 
      selector: row => (
        <div className="flex items-center">
          <img src={row.images} alt="" className="w-10 h-10 object-cover" />

          <div class='row'>
              <span className="block text-black p-2 font-extrabold ml-auto">{row.category_name}</span>
              <span className="block text-Secondary font-bold ml-2">{row.title}</span>
          </div>

        </div>
      ), 
      sortable: true 
    },
    { name: "Quantity", selector: row => row.quantity, sortable: true },
    { name: "Price", selector: row => row.price, sortable: true },
    { 
      name: "Actions", 
      cell: row => (
        <div className='flex gap-1'>
        <button
          onClick={() => {
            handleEdit(row.id);
          }}
          type="button"
          className="p-2 border-2 border-gray-300 rounded-md"
        >
          <CiEdit />
        </button>
          <button type="button" className="p-2 border-2 border-gray-300 rounded-md" onClick={() => handleDelete(row)}>
            <BsTrash3Fill />
          </button>
        </div>
      ) 
    },
  ];
  

  return (
    <div className="product-list-container mx-4 py-4  relative">
      {isModalOpen && <AddProductModal closeModal={toggleModal} />}
      {isModalOpen1 && <UpdateProductModal closeModal1={toggleModal1} productData={selectedProduct} />}
      <h1 className="mb-4 mt-1 font-bold text-lg md:text-2xl text-center md:text-left">Product List</h1>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-4 py-2 shadow-sm">
        <div className="flex justify-between gap-4">
          <div className="flex-1 relative border-2 border-gray-300 p-1">
            <input 
              type="text" 
              placeholder="Filter" 
              className="w-full outline-none p-1" 
              value={filterInput}
              onChange={handleFilter}
            />
          </div>

          <div className="flex-1 flex items-center relative border-2 border-gray-300 p-1">
            <CiSearch className="mr-2"/>
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full outline-none p-1" 
              value={searchInput}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="flex justify-between w-full md:w-auto gap-4 py-2">
          <div className="flex"></div>
          <button 
            className="bg-Secondary py-2 px-4 rounded-md text-white flex items-center"
            onClick={toggleModal}
          >
            <LuPlus className="text-white mr-2" /> Add Product
          </button>
        </div>
      </div>

      <h3 className="mb-4 mt-1 font-bold text-lg md:text-2xl text-center md:text-left">Categories</h3>
      <div className="flex gap-6 flex-wrap ">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="py-2 px-4 bg-white cursor-pointer text-black border-none font-extrabold rounded-md md:rounded-none"
        >
          {categories.map(category => (
            <option key={category} value={category} >{category}
            </option>
          ))}
        </select>
      </div>

      <section className="container mt-5 overflow-x-auto">
        <DataTable
          columns={columns}
          data={filteredRecords}
          selectableRows
          fixedHeader
          pagination
          responsive
          noHeader 
          className="text-xl"
          customStyles={{ 
            headCells: {
              style: {
                fontWeight: 'bold',
              },
            },
          }}
        />
      </section>
    </div>
  );
};
