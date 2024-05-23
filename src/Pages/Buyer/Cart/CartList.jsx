import { CartTable } from "./CartTable";
import { Cartcard } from "./Cartcard";

export const CartsList = ({ onDelete, products, setButtonClicked, setClicked }) => {
  return (
    <div className="flex h-auto font" >
      <div className="relative overflow-x-auto w-full">
        <div className="sm:hidden justify-between mt-3">
          {products.map((product) => {
            return <Cartcard key={product.products.id} product={product}  onDelete={onDelete}/>
          })}
        </div>
        <table className="hidden sm:table w-full mx-auto text-left">
          <thead className="text-base md:text-xl text-Text">
            <tr className="border-b">
              <th className="p-[10px] font-semibold">Product</th>
              <th className="p-[10px] font-semibold">Price </th>
              <th className="p-[10px] font-semibold">Quantity</th>
              <th className="p-[10px] font-semibold">Subtotal</th>
              <th className="p-[10px] font-semibold">Remove</th>
            </tr>
          </thead>
          <tbody className="text-sm md:text-base font-normal text-Variant2">
            {products.map((product) => {
              return <CartTable key={product.products.id} s product={product} onDelete={onDelete} />
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
