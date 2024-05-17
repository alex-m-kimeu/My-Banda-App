
export const Wishlist = () => {
  const wishlistItems = [
    {
      id: 1,
      name: "Gucci duffle bag",
      price: 860,
      image: "path-to-image/gucci-bag.png",
    },
    {
      id: 2,
      name: "RGB Liquid CPU Cooler",
      price: 190,
      image: "path-to-image/rgb-cpu-cooler.png",
    },
    {
      id: 3,
      name: "GP11 Shooter USB Gamepad",
      price: 950,
      image: "path-to-image/gamepad.png",
    },
    {
      id: 4,
      name: "Quilted Satin Jacket",
      price: 710,
      image: "path-to-image/satin-jacket.png",
    },
  ];

  return (
    <>
    <div className="bg-Primary text-Text font-body min-h-screen">
      <main className="p-8">
        <h2 className="text-2xl font-bold mb-4">Wish-list (4)</h2>
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
    </>
  );
};
