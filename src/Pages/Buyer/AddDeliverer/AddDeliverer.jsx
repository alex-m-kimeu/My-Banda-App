import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FaLocationDot } from "react-icons/fa6";
import toast from "react-hot-toast";


export const ChooseCompany = () => {
  const [companies, setCompanies] = useState([]);
  const [locationData, setLocationData] = useState({ location: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      fetchCompanies(token);
    } catch (error) {
      console.error("Invalid token:", error);
      navigate("/signin");
    }
  }, [navigate]);

  const handleLocationChange = (e) => {
    const { id, value } = e.target;
    setLocationData((locationData) => ({ ...locationData, [id]: value }));
  };

  const fetchCompanies = (token) => {
    fetch("http://127.0.0.1:5500/companies", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCompanies(data);
      })
      .catch((error) => {
        console.error("Error fetching company details:", error);
      });
  };

  const handleSubmitLocation = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.sub.id;

    const userData = new FormData();
    userData.append("location", locationData.location);

    fetch(`http://127.0.0.1:5500/location`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },

      body: userData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setLocationData({ location: "" });
        toast.success("New location added sucessfully")
    

      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const HandleAddDeliverer = (company_id) => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.sub.id;

    fetch(`http://127.0.0.1:5500/deliverer/${company_id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },

    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        toast.success("Deliverer added sucessfully")

      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleMakeOrder =()=>{
   
    // if(companies[0].location === 'Current'){
    //    if(companies[0].deliverycompany_id === 0){

    //     toast.error("Give location to be delivered to and choose delivery company")
    //    }
    // } 
    console.log('yey')
        navigate('/orderconfirmation')
    
  }
  return (
    <div  className="lg:px-28 md:px-20 sm:px-10  py-5 ">
    
      <div>
        <h1 className="font-bold mb-3">Add Location</h1>
      </div>
      <div className="">
      
       <div className="flex justify-between ">
       <form action="" className="flex" onSubmit={handleSubmitLocation}>
       <div className="flex"><FaLocationDot className=" h-10 bg-gray-100 w-10 p-2 rounded-l"/>
        <input type="text" className="bg-gray-100 rounded-r focus:outline-none py-1 px-1"  id="location" value={locationData.location} onChange={handleLocationChange}  />
        </div>
       <button
           type="submit"
           className="bg-white shadow hover:bg-Secondary hover:bg-opacity-10 focus:bg-opacity-40 px-4 py-2 rounded hover:cursor-pointer ml-3"
         >
           Submit
         </button>
       </form>
       <button className="bg-white shadow hover:bg-Secondary hover:bg-opacity-10 focus:bg-opacity-40 px-4 py-2 rounded hover:cursor-pointer ml-3"  onClick={handleMakeOrder}>Create Order</button>
       </div>
       <div>
 <h1 className="font-bold mt-10">Choose Delivery Company</h1>
     
 <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">

        {companies.map((company) => (
          <div
            key={company.id}
            className="relative cursor-pointer p-6 rounded-lg shadow-lg px-10 text-start flex flex-wrap  justify-between items-center"
          >
            <div className=" flex flex-col content-between  place-content-between">
           <div>
           <h2 className="text-xl font-semibold text-Variant2 mb-2">
              {company.name}
            </h2>
           <div className="max-w-96 "> <p className="text-sm text-Variant2 ">{company.description}</p></div>
           </div>
           <div className="flex mt-7">
           <FaLocationDot className="mr-2" />
            {company.location}
           </div>
           
            </div>
          <div>
          <img
              src={company.logo}
              alt={company.name}
              className="w-24 h-24 mb-10 object-cover rounded-full border-2 border-Secondary"
            />
            <button className="transform transition duration-200 hover:scale-105 focus:bg-Secondary hover:bg-Secondary hover:bg-opacity-10 text-xs focus:bg-opacity-40 focus bg-White shadow px-2 py-1 rounded bg-opacity-30 absolute bottom-5 right-5" onClick={()=>HandleAddDeliverer(company.id)}>Choose Deliverer</button>
          </div>
            
          </div>
        ))}
      </div> 
       </div>
      
      </div>
    </div>
  );
};

