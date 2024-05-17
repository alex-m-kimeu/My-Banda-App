import React, { useState } from 'react';
import { faPlus, faPenToSquare, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DataTable from 'react-data-table-component';

export const ProductsPage = () => {
  const columns = [
    { name: "Product", selector: row => <img src={row.image} alt={row.title} className="w-10 h-10 object-cover"/>, sortable: true },
    { name: "Title", selector: row => row.title, sortable: true },
    { name: "Inventory", selector: row => row.inventory, sortable: true },
    { name: "Category", selector: row => row.category, sortable: true },
    { name: "Price", selector: row => row.price, sortable: true },
  ];

  const data = [
    {
      id: 1,
      title: 'Men Grey Hoodie',
      inventory: 96,
      category: 'Clothes',
      price: 49.90,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx-lm8aG541b13qOp00Jksp8g0rEQ8MA5E-FWpoUCEjSQbTma_asTofn6nW5_qEm_aCbw&usqp=CAU',
    },
    {
      id: 2,
      title: 'Women Striped T-Shirt',
      inventory: 56,
      category: 'Clothes',
      price: 34.90,
      image: 'https://media-cdn.tripadvisor.com/media/photo-s/14/1f/58/8b/sunset-in-kenya.jpg',
    },
  ];

  const [records, setRecords] = useState(data);

  function handleFilter(event) {
    const newData = data.filter(row => row.title.toLowerCase().includes(event.target.value.toLowerCase()));
    setRecords(newData);
  }

  return (
    <div className="product-list-container mx-4 py-4 shadow-md border-2 border-gray-300 p-2">
       <h1 className="mb-4 mt-1 font-bold text-lg md:text-2xl text-center md:text-left">Product List</h1>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-4 py-2 shadow-sm">
        <div className="flex justify-between  gap-4">
          <div className="flex-1 relative border-2 border-gray-300 p-1">
            <input type="text" placeholder="Filter" onChange={handleFilter} className="w-full outline-none p-1" />
          </div>

          <div className="flex-1 flex items-center relative border-2 border-gray-300 p-1">
            <FontAwesomeIcon icon={faSearch} className="mr-2" />
            <input type="text" placeholder="Search..." className="w-full outline-none p-1" />
          </div>
        </div>

        <div className="flex justify-between w-full md:w-auto gap-4 py-2">
          <div className="flex">
            <button type="button" className="p-2 border-2 border-gray-300 rounded-md">
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>

            <button type="button" className="p-2 border-2 border-gray-300 rounded-md ml-2">
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>

          <button className="bg-Secondary py-2 px-4 rounded-md text-white flex items-center">
            <FontAwesomeIcon className="text-white mr-2" icon={faPlus} /> Add Product
          </button>
        </div>
      </div>

      <section className="container mt-5 overflow-x-auto">
        <DataTable
          columns={columns}
          data={records}
          selectableRows
          fixedHeader
          pagination
          responsive
        />
      </section>
    </div>
  );
};
