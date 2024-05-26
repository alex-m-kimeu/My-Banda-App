import React, { useState, } from 'react'

export const SingleOrder = ({order, handleDelete}) => {
    const[singleorder, setSingleOrder]=useState({})
    const[canclemodal, showCancelmodal]=useState(false)

    const handleCancleOrder=()=>{
        const token = localStorage.getItem("token");

        const userData = new FormData();
        userData.append("status", "Cancelled");
    

        fetch(`http://127.0.0.1:5500/orderByID/${order.id}`, {
          method: "PATCH",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: userData,

        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            setSingleOrder(data);
            showCancelmodal(true)
            
          })
          .catch((error) => {
            console.error("Error fetching orders", error);
          });
    }

    const handledeleteOrder =()=>{
        const token = localStorage.getItem("token");

        fetch(`http://127.0.0.1:5500/orderByID/${order.id}`, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            handleDelete(order.id);
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation: ', error);
          });
    }

    let cancel =(
        <div className="fixed top-0 left-0  flex items-center w-full mt-5 justify-center ">
                    <div className="bg-white border dark:bg-variant1-dark p-4 rounded shadow-lg shadow-red-100 relative  max-w-full w-[350px] lg:w-[500px]">
                        <p>Are you sure you want to cancel your order?</p>
                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={() => showCancelmodal(false)} className="text-xs px-2  rounded hover:cursor-pointer absolute top-1 right-1">x</button>
                                <button type="button" onClick={() => {showCancelmodal(false); handledeleteOrder()}} className="bg-variant1-light px-4 py-1 rounded hover:cursor-pointer text-xs border">Yes, Cancel Order</button>
                            </div>
                        
                    </div>
                </div>
    )

let progress;

if (order.status == "Pending" ){
progress = (
    <div className='w-full h-1 bg-gray-100 rounded-full overflow-hidded mx-2 mt-3'>
  <div className='bg-red-200 h-1 rounded-full shadow shadow-red-200' role="progressbar" style={{ width: '10%' }}></div>

  </div>
) 
}else if (order.status=='Processing' ){
    progress = (
        <div className='w-full h-1 bg-gray-100 rounded-full overflow-hidded mx-2 mt-3'>
      <div className='bg-orange-200 h-1 rounded-full shadow  shadow-orange-200' role="progressbar" style={{ width: '33%' }}></div>
    
      </div>
    )
}else if (order.status=='Shipped' ){
    progress = (
        <div className='w-full h-1 bg-gray-100 rounded-full overflow-hidded mx-2 mt-3'>
      <div className='bg-lime-200 h-1 rounded-full shadow shadow-lime-200' role="progressbar" style={{ width: '66%' }}></div>
      </div>
    )
}else if (order.status=='Completed' ){
    progress = (
        <div className='w-full h-1 bg-gray-100 rounded-full overflow-hidded mx-2 mt-3'>
      <div className='bg-green-200 h-1 rounded-full shadow shadow-green-200' role="progressbar" style={{ width: '100%' }}></div>
      </div>
    )
}


  return (
   <div>
   
                <>
                     <div className='shadow h-48 mr-3  my-5 rounded flex  py-4 p-4  relative'>
<div className='h-40 min-w-32 '>
  <img src={order.products.images[0]} alt=""  className='h-40  w-40 rounded-sm'/>
</div>
<div className=' ml-4 w-full pt-2 flex flex-col justify-between'>
  <div>
  <p className='font-body text-[8px] font-light  w-20 rounded-full bg-gray-100 text-center'>{order.store.store_name}</p>
  <p className='font-semibold text-lg'>{order.products.title}</p>
  <p className='text-Secondary font-semibold'>$ {order.products.price}</p>
  </div>
  <div>
  <p className='text-sm'>Quantity: {order.quantity}</p>
  </div>

  {order.delivery_status == "Denied" ? (<div className='text-red-300 text-xs'>Order has been denied by deliverycompany</div>):(<div>
  <p className='text-sm'>Order-Status:  {order.status}</p>
    {progress}
  </div>)}
  {order.status == 'Cancelled'   || order.delivery_status == 'Denied' ?(<div className='absolute right-3 top-3 text-[8px] bg-red-300 bg-opacity-30 cursor-pointer hover:bg-opacity-50 px-2 py-1 rounded'  onClick={() => {handledeleteOrder()}}>Delete order</div>):( <div className='absolute right-3 top-3 text-[8px] bg-Secondary bg-opacity-30 cursor-pointer hover:bg-opacity-50 px-2 py-1 rounded'  onClick={()=>handleCancleOrder(order.id)}> Cancel order</div>)}
   
 
</div>
</div>
                </>
        {canclemodal ?(<div>{cancel}</div>):(<div></div>)}
   </div>
  )
}


 