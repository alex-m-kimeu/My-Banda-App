import { LiaTrashAltSolid } from "react-icons/lia";
import { LiaEditSolid } from "react-icons/lia";

export const ProductTable = ({ products, onEditProduct, onDeleteProduct }) => {
  return (
    <div className="flex h-auto font">
      <div className="relative overflow-x-auto w-full">
        <table className="w-full mx-auto text-left">
          <thead className="text-sm md:text-base text-Text">
            <tr className="border-b">
              <th className="p-[10px] font-semibold">Product ID</th>
              <th className="p-[10px] font-semibold">Products</th>
              <th className="p-[10px] font-semibold">Category</th>
              <th className="p-[10px] font-semibold">Inventory</th>
              <th className="p-[10px] font-semibold">Price</th>
              <th className="p-[10px] font-semibold flex justify-center items-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-sm md:text-[16px] font-normal text-Variant2">
            {products.map((product) => (
              <tr key={product.id} className="border-b space-y-4">
                <td className="p-[10px]">#{product.id}</td>

                <td className="p-[10px]">
                  <img
                    className="inline-block h-6 w-6 rounded-full object-cover mr-1"
                    src={
                      product.images && product.images.length > 0
                        ? product.images[0]
                        : ""
                    }
                    alt={product.title}
                  />
                  {product.title}
                </td>
                <td className="p-[10px]">{product.category_name}</td>
                <td className="p-[10px]">{product.quantity}</td>
                <td className="p-[10px] text-green-600">$ {product.price}</td>
                <td className="p-[10px] flex justify-center items-center gap-2">
                  <button
                    className="text-Text"
                    onClick={() => onEditProduct(product.id)}
                  >
                    <LiaEditSolid className="w-[20px] h-[20px] hover:text-Secondary" />
                  </button>
                  <button
                    className="text-Text hover:text-red-500"
                    onClick={() => onDeleteProduct(product.id)}
                  >
                    <LiaTrashAltSolid className="w-[20px] h-[20px]" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
