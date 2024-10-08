import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FaPlus } from "react-icons/fa";
import { ProductSearch } from "./ProductSearch";
import { ProductFilter } from "./ProductFilter";
import { ProductTable } from "./ProductTable";
import toast from "react-hot-toast";

export const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.sub.id;

        const userResponse = await fetch(
          `https://my-banda.onrender.com/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const userData = await userResponse.json();
        const storeId = userData.store.id;

        const response = await fetch(`https://my-banda.onrender.com/products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        let data = await response.json();
        data = data.filter((product) => product.store_id === storeId);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearchTerm = searchTerm
      ? product.title.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const matchesSelectedCategory =
      selectedCategory !== "All"
        ? product.category_name === selectedCategory
        : true;
    return matchesSearchTerm && matchesSelectedCategory;
  });

  const handleAddProductClick = () => {
    navigate("/seller/Add/Products", { state: { editingProduct: null } });
  };

  const handleEditProduct = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://my-banda.onrender.com/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }
      const product = await response.json();
      setEditingProduct(product);
      navigate("/seller/Add/Products", { state: { editingProduct: product } });
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://my-banda.onrender.com/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      setProducts(products.filter((product) => product.id !== productId));
      toast.success("Item successfully deleted");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="py-[20px] space-y-4">
      <div className="flex justify-between">
        <h1 className="text-Text font-bold text-xl text-center lg:text-left">
          Products
        </h1>
        <button
          onClick={handleAddProductClick}
          className="bg-Secondary text-white py-[5px] px-[10px] flex gap-1 items-center"
        >
          <span>
            <FaPlus />
          </span>
          Add Product
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-Secondary"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div>
          {products.length > 0 ? (
            <div>
              <div className="flex gap-2">
                <div className="w-1/2 md:w-1/4 bg-Variant3 px-2">
                  <ProductFilter
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                  />
                </div>
                <div className="w-1/2 md:w-1/4">
                  <ProductSearch
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                  />
                </div>
              </div>
              <ProductTable
                products={filteredProducts}
                onDeleteProduct={handleDeleteProduct}
                onEditProduct={handleEditProduct}
              />
            </div>
          ) : (
            <div>
              <div className="flex justify-center">
                <p className="text-lg font-semibold ">
                  You do not have any products :({" "}
                </p>
              </div>
              <div className="flex justify-center ">
                <img
                  src="https://elements-cover-images-0.imgix.net/41ce1856-ce64-47eb-9cc9-d50c75ba936b?auto=compress%2Cformat&w=900&fit=max&s=ba27396ca2b150afd778262eed2ec8af"
                  alt=""
                  className="h-96 "
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
