import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FaLocationDot } from "react-icons/fa6";
import toast from "react-hot-toast";


export const ChooseCompany = () => {
  const [companies, setCompanies] = useState([]);
  const [locationData, setLocationData] = useState({ location: "" });
  const [loading, setLoading] = useState(false);

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
    fetch("https://my-banda.onrender.com/companies", {
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

    fetch(`https://my-banda.onrender.com/location`, {
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

    fetch(`https://my-banda.onrender.com/deliverer/${company_id}`, {
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

  const handleMakeOrder = () => {
    setLoading(true);
    setTimeout(() => {
      toast.success("Order successfully made")
      setLoading(false);
      navigate('/orderconfirmation');
    }, 4000);



  }
  return (
    <div className="lg:px-28 md:px-20 sm:px-10  py-5 ">
      <div className="flex justify-center ">
        {loading && <div role="status">
          <svg aria-hidden="true" className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-Secondary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>}
      </div>
      <div>
        <h1 className="font-bold mb-3">Add Location</h1>
      </div>
      <div className="">

        <div className="flex justify-between ">
          <form action="" className="flex" onSubmit={handleSubmitLocation}>
            <div className="flex"><FaLocationDot className=" h-10 bg-gray-100 w-10 p-2 rounded-l" />
              <input type="text" className="bg-gray-100 rounded-r focus:outline-none py-1 px-1" id="location" value={locationData.location} onChange={handleLocationChange} />
            </div>
            <button
              type="submit"
              className="bg-white shadow hover:bg-Secondary hover:bg-opacity-10 focus:bg-opacity-40 px-4 py-2 rounded hover:cursor-pointer ml-3"
            >
              Submit
            </button>
          </form>
          <button className="bg-white shadow hover:bg-Secondary hover:bg-opacity-10 focus:bg-opacity-40 px-4 py-2 rounded hover:cursor-pointer ml-3" onClick={handleMakeOrder}>Create Order</button>
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
                  <button className="transform transition duration-200 hover:scale-105 focus:bg-Secondary hover:bg-Secondary hover:bg-opacity-10 text-xs focus:bg-opacity-40 focus bg-White shadow px-2 py-1 rounded bg-opacity-30 absolute bottom-5 right-5" onClick={() => HandleAddDeliverer(company.id)}>Choose Deliverer</button>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

