/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const ChooseCompany = () => {
  const [companies, setCompanies] = useState([]);
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-Primary p-4">
      <h1 className="text-3xl font-bold text-Variant mb-8">Choose Company</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-6xl">
        {companies.map((company) => (
          <div
            key={company.id}
            className="bg-Variant3 cursor-pointer p-6 rounded-lg shadow-lg flex flex-col justify-center items-center text-center transform transition duration-500 hover:scale-105"
          >
            <img
              src={company.logo}
              alt={company.name}
              className="w-24 h-24 mb-4 object-cover rounded-full border-2 border-Secondary"
            />
            <h2 className="text-xl font-semibold text-Variant2 mb-2">
              {company.name}
            </h2>
            <p className="text-sm text-Variant2">{company.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
