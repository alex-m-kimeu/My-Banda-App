import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.sub.id;

    fetchWishlistItems(token, userId);
  }, []);

  // eslint-disable-next-line no-unused-vars
  const fetchWishlistItems = (token, userId) => {
    fetch(`http://localhost:5500/wishlists`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setWishlistItems(data);
      })
      .catch(error => {
        console.error('Error fetching wishlist items:', error);
      });
  };

  return (
    <div className="bg-Primary text-Text font-body min-h-screen">
      <main className="p-8">
        <h2 className="text-2xl font-bold mb-4">Wish-list ({wishlistItems.length})</h2>
        <button className="bg-Secondary text-Variant rounded p-2 mb-6">
          Move All To Bag
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="border border-Variant2 rounded p-4 shadow-md"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover mb-4"
              />
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-lg text-Variant font-bold">${item.price}</p>
              <button className="bg-Secondary text-Variant rounded p-2 mt-4 w-full">
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
