import React from "react";
import { CartTable } from "./CartTable";
import { Cartcard} from "./Cartcard";

export const CartsList = ({onDelete, products, setButtonClicked}) => {


  
  return (
    <div className="flex h-auto font" >
        <div  className="relative overflow-x-auto w-full">
        <div className="sm:hidden flex mt-4 flex-wrap justify-center gap-4">
          {products.map((product) => {
            return <Cartcard key={product.products.id} product={product} onDelete={onDelete}  setButtonClicked={setButtonClicked}/>
          })}
        </div>

        <table className="hidden sm:table w-full mx-auto text-left">
      <thead className="text-[18px] bg-Variant3  text-Text shadow-md">
        <tr className="border-[6px] border-white">
          <th className="p-[10px]">Product</th>
          <th className="p-[10px]">Price </th>
          <th className="p-[10px]">Quantity</th>
          <th className="p-[10px]">Subtotal</th>
          <th className="p-[10px]">Remove</th>
        </tr>
      </thead>
      <tbody className="text-[16px] font-normal text-Variant2">
        {/* // one product */}
        {products.map((product) => {
              return <CartTable  key={product.products.id}  setButtonClicked={setButtonClicked} product={product} onDelete={onDelete} />
            })}
      </tbody>
    </table>
        </div>
    </div>
  );
};
