import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const OrderForm = () => {
  const { state } = useLocation();
  const { order } = state || {};
  const [productDetails, setProductDetails] = useState({});
  const [buyerDetails, setBuyerDetails] = useState({});
  const [deliveryDetails, setDeliveryDetails] = useState({});
  const [orderStatus, setOrderStatus] = useState(order ? order.status : '');
  const [statusOptions] = useState([
    { value: 'Pending', label: 'Pending' },
    { value: 'Processing', label: 'Processing' },
    { value: 'Shipped', label: 'Shipped' },
    { value: 'Delivered', label: 'Delivered' },
    { value: 'Cancelled', label: 'Cancelled' },
  ]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (order && order.product_id) {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(`http://127.0.0.1:5500/products/${order.product_id}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const productData = await response.json();
            setProductDetails(productData);
          } else {
            console.error('Failed to fetch product details:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      }
    };

    fetchProductDetails();

    if (order) {
      setBuyerDetails(order.buyer || {});
      setDeliveryDetails(order.deliverycompany || {});
      setOrderStatus(order.status || '');
    }
  }, [order]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('status', orderStatus);

    try {
      const response = await fetch(`http://127.0.0.1:5500/orderByID/${order.id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage('Order status updated successfully!');
        setTimeout(() => setSuccessMessage(''), 2000);
      } else {
        alert('Failed to update order status');
      }
    } catch (error) {
      alert('Error updating order status:', error);
    }
  };

  return (
    <div className="p-4 sm:p-8 mx-auto mt-10 sm:mt-10 md:mt-10 lg:mt-30 xl:mt-30 lg:ml-0 sm:ml-[-20px] sm:w-[calc(100%-60px)]">
      <form className="sm:h-auto" onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-center sm:text-left mb-4 sm:mb-0">Manage Orders (Order Details)</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

          {/* Product Details Section */}
          <div>
            <h2 className="text-black font-bold mb-4">Product Details</h2>
            <div className="overflow-hidden flex">
              <div className="p-2 sm:p-4 flex items-center">
                <div className="w-20 mr-4">
                  <img src={productDetails.images} alt={productDetails.title} className="max-w-full h-auto rounded" />
                </div>
                <div>
                  <p className="mb-2 text-gray-600"><strong>Product Name:</strong> {productDetails.title}</p>
                  <p className="mb-2 text-gray-600"><strong>Price:</strong> {productDetails.price}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Buyer Details Section */}
          <div>
            <h2 className="text-black font-bold mb-4">Buyer Details</h2>
            <div className="overflow-hidden">
              <div className="p-2 sm:p-4">
                <p className="mb-2 text-gray-600"><strong>Buyer ID:</strong> {buyerDetails.id}</p>
                <p className="mb-2 text-gray-600"><strong>Name:</strong> {buyerDetails.username}</p>
                <p className="mb-2 text-gray-600"><strong>Email:</strong> {buyerDetails.email}</p>
                <p className="mb-2 text-gray-600"><strong>Phone:</strong> {buyerDetails.contact}</p>
              </div>
            </div>
          </div>

          {/* Delivery Details Section */}
          <div>
            <h2 className="text-black font-bold mb-4">Delivery Details</h2>
            <div className="overflow-hidden">
              <div className="p-2 sm:p-4">
                <p className="mb-2 text-gray-600"><strong>Company:</strong> {deliveryDetails.description}</p>
                <p className="mb-2 text-gray-600"><strong>Company Location:</strong> {deliveryDetails.location}</p>
                <p className="mb-2 text-gray-600"><strong>Location:</strong> {order.location}</p>
                <p className="mb-2 text-gray-600">
                  <strong>Delivery Status:</strong>
                  <span className="bg-green-600 text-white ml-3 px-1 py-1 rounded">{order.delivery_status}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Order Status Section */}
          <div>
            <h2 className="text-black font-bold mb-4">Status</h2>
            {successMessage && <p className="text-green-600 mb-2">{successMessage}</p>}
            <div className="overflow-hidden cursor-pointer">
              <div className="p-2 sm:p-4">
                <select value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)} className="px-4 py-2 border rounded w-full sm:w-auto cursor-pointer">
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button type="submit" className="px-4 py-2 bg-Secondary text-white rounded hover:bg-yellow-600">
            Update Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
