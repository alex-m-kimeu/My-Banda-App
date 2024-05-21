import { createContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';



const BuyerContext = createContext({});

// const getDefaultCart = ()=> {
//   let cart = {}
//   for (let i = 0; i < )
// }

export const BuyerProvider =({ children })=>{
    const [products, setProducts]= useState([]);
    const [loading, setLoading] = useState(true);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartNum, setCartNum] = useState(0)


    // fetch length of cart
    useEffect(() => {
      const token = localStorage.getItem("token");
  
      fetch("http://127.0.0.1:5500//carts", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // getTotalCartItems(data)
             setCartNum(data.length = data.length+1)
  

        })
        .catch((error) => console.error(error));
    }, []);

    
    // Add to cart function
    const handleAddToCart=(id)=>{
        const token = localStorage.getItem('token')
    
    
        fetch(`http://127.0.0.1:5500/products/${id}`, {
          method: "POST",
          headers: {
              'Authorization': `Bearer ${token}`
          }
      })
      .then(response => response.json())
      .then(product => {setProducts ((prev)=>({...prev, product}))

      })
      .catch(error => console.error('Error:', error));
    };

    // add to wishlist fuction
    const handleAddToWishlist = (id) => {
        const token = localStorage.getItem("token");
    
    
        fetch(`http://localhost:5500/wishlists/${id}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then(product => { 
            setWishlistItems((prev)=>({...prev,product}))
            
            

  
    })
          .catch((error) => {
            console.error("Error adding product to wishlist:", error);
          });
      };
      

 

           
  



    return (
        <BuyerContext.Provider value={{
handleAddToCart,wishlistItems, setWishlistItems,handleAddToWishlist, setCartNum,cartNum, products, setProducts
         }}>
            {children}
        </BuyerContext.Provider>
    )
}

export default BuyerContext;