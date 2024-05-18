import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; 
import { LuPlus } from 'react-icons/lu';
import { CiSearch, CiEdit } from 'react-icons/ci';
import { BsTrash3Fill } from 'react-icons/bs';
import DataTable from 'react-data-table-component';
import Authmodal from './Authmodal';


export const ProductsPage = () => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredRecords(records);
    } else {
      setFilteredRecords(records.filter(product => product.category_name === category));
    }
  };

  const columns = [
    { 
      name: "Product", 
      selector: row => (
        <div className="flex items-center">
          <img src={row.images} alt="" className="w-10 h-10 object-cover" />
          <span className="ml-2">{row.title}</span>
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
          <button type="button" className="p-2 border-2 border-gray-300 rounded-md">
            <CiEdit />
          </button>
          <button type="button" className="p-2 border-2 border-gray-300 rounded-md" onClick={() => handleDelete(row)}>
            <BsTrash3Fill />
          </button>
        </div>
      ) 
    },
  ];

  const handleDelete = (row) => {
    const updatedRecords = records.filter(record => record.id !== row.id);
    setRecords(updatedRecords);
    setFilteredRecords(updatedRecords);

    fetch(`http://127.0.0.1:5500/products/${row.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      console.log('Product deleted successfully');
    })
    .catch(error => {
      console.error('Error deleting product:', error);
    });
  };

  return (
    <div className="product-list-container mx-4 py-4  relative">
      {isModalOpen && <Authmodal closeModal={toggleModal} />}
      <h1 className="mb-4 mt-1 font-bold text-lg md:text-2xl text-center md:text-left">Product List</h1>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-4 py-2 shadow-sm">
        <div className="flex justify-between gap-4">
          <div className="flex-1 relative border-2 border-gray-300 p-1">
            <input type="text" placeholder="Filter" className="w-full outline-none p-1" />
          </div>

          <div className="flex-1 flex items-center relative border-2 border-gray-300 p-1">
            <CiSearch className="mr-2"/>
            <input type="text" placeholder="Search..." className="w-full outline-none p-1" />
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
      <div className="flex gap-6 overflow-x-auto py-2 border-2 md:rounded-full min-w-full flex-wrap">
        {categories.map(category => (
          <button 
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`py-2 px-4 ${
              selectedCategory === category
                ? 'bg-black rounded-full text-white font-bold'
                : category === 'All'
                ? 'text-black font-extrabold'
                : 'bg-white text-black font-extrabold'
            } cursor-pointer rounded-md md:rounded-none`}
          >
            {category}
          </button>
        ))}
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
