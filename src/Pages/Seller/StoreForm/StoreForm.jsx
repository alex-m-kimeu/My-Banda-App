import { useState, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const StoreForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    store_name: "",
    description: "",
    location: "",
    image: "",
  });

  const [preview, setPreview] = useState(null);
  const imageInputRef = useRef();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevFormData) => ({ ...prevFormData, image: file }));

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.sub.id;

    const storeData = new FormData();
    storeData.append("store_name", formData.store_name);
    storeData.append("description", formData.description);
    storeData.append("location", formData.location);
    storeData.append("seller_id", userId);
    storeData.append("image", formData.image);

    fetch("https://my-banda.onrender.com/stores", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: storeData,
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Network response was not ok");
        }
        return resp.json();
      })
      .then((data) => {
        toast.success("Your store has been created successfullly");

        setTimeout(() => {
          navigate("/seller/dashboard");
        }, 2000);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your post operation:",
          error
        );
      });

    setFormData({
      store_name: "",
      description: "",
      image: "",
      location: "",
    });
    imageInputRef.current.value = "";
    setPreview(null);
  };

  return (
    <div className="flex justify-center  p-[10px] ">
      <div className=" max-w-md w-full p-3 py-10 rounded shadow shadow-boxShadow">
        <form onSubmit={handleSubmit} className="bg-primary">
          <h3 className="text-Text font-bold text-xl text-center lg:text-left mb-5">
            Store Information
          </h3>
          <div className="flex flex-col space-y-6">
            <input
              id="store_name"
              type="text"
              name="store_name"
              placeholder="Store Name"
              value={formData.store_name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-Primary rounded-md text-sm border text-Variant2 outline-none"
              required
            />
            <textarea
              id="description"
              name="description"
              placeholder="Store Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-Primary rounded-md text-sm border text-Variant2 outline-none"
              required
            />
            <input
              id="location"
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-Primary rounded-md text-sm border text-Variant2 outline-none"
              required
            />
            <input
              ref={imageInputRef}
              id="image"
              type="file"
              name="image"
              onChange={handleImageChange}
              className="w-full px-4 py-2 bg-Primary rounded-md text-sm border text-Variant2 outline-none"
              required
            />

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-64 object-cover mt-4"
              />
            )}

            <div className="flex justify-center lg:justify-start space-x-6">
              <button
                type="submit"
                className="bg-Secondary text-sm text-white font-normal py-2 px-4 rounded-md"
              >
                Save
              </button>
              <button
                type="button"
                className="bg-Secondary text-sm text-white font-normal py-2 px-4 rounded-md"
                onClick={() => {
                  setFormData({
                    store_name: "",
                    description: "",
                    location: "",
                    image: "",
                  });
                  imageInputRef.current.value = "";
                  setPreview(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
