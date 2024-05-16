import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const products = [
  {
    id: 1,
    name: "Gucci duffle bag",
    price: "$850",
    image: "https://via.placeholder.com/200",
    seller: "sellername",
  },
  {
    id: 2,
    name: "RGB liquid CPU Cooler",
    price: "$190",
    image: "https://via.placeholder.com/200",
    seller: "sellername",
  },
  {
    id: 3,
    name: "GP11 Shooter USB gamepad",
    price: "$950",
    image: "https://via.placeholder.com/200",
    seller: "sellername",
  },
  {
    id: 4,
    name: "Quilted Satin Jacket",
    price: "$710",
    image: "https://via.placeholder.com/200",
    seller: "sellername",
  },
  {
    id: 5,
    name: "Quilted Satin Jacket",
    price: "$710",
    image: "https://via.placeholder.com/200",
    seller: "sellername",
  },
];

const ProductDisplay = () => {
  return (
    <div className="bg-Primary font-body text-Text min-h-screen">
      <main className="p-4 md:p-12">
        <h1 className="text-2xl md:text-3xl font-extrabold text-center">Jewelry</h1>
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Rings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border rounded-3xl shadow-md p-2">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover mb-4"
              />
              <h3 className="px-2 font-semibold">{product.name}</h3>
              <div className="flex">
                <p className="px-2 text-Text">By</p>
                <p className="text-Green">{product.seller}</p>
              </div>
              <div className="flex justify-between items-center px-2">
                <p className="text-lg text-Green">{product.price}</p>
                <button className="mt-2 px-4 py-1 font-bold text-lg bg-Secondary text-Primary rounded-lg flex items-center">
                  <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductDisplay;

// fetching actual products
// button routing
// page routing