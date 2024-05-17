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
];

export const CategoriesPage = () => {
  return (
    <div className="bg-Primary font-body text-Text min-h-screen">
      <main className="p-4 md:p-8 lg:p-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center">
          Clothing
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border rounded-3xl shadow-md">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover mb-4 sm:h-48 md:h-56 lg:h-64 xl:h-72"
              />
              <h3 className="px-2 font-semibold">{product.name}</h3>
              <p className="px-2 text-Green">By {product.seller}</p>
              <div className="flex justify-between">
                <p className="px-2 text-lg text-Green">{product.price}</p>
                <button className="mt-2 px-5 font-bold mr-2 text-xl mb-3 bg-Secondary text-Primary rounded-lg flex items-center">
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
