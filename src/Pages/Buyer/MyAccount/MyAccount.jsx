import React, { useEffect, useRef, useState } from "react";
import { Details } from "./Details";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";


export const MyAccount = () => {
    const [user, setUser] = useState({});
    const [showNameModal, setShowNameModal] = useState(false);
    const [userNameData, setUsernameData] = useState({ username: "" });
    const [showContactModal, setShowContactModal] = useState(false);
    const [contact, setContact] = useState({ contact: "" });
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [email, setEmail] = useState({ email: "" });
    const [showImageModal, setShowImageModal] = useState(false);
    const [image, setImage] = useState({ image: "" });
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [password, setPassword] = useState({ current: "", newpassword: "", confirmpassword: "" });
    const [preview, setPreview] = useState(null);
    const imageInputRef = useRef();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.sub.id;
    
        fetch(`http://127.0.0.1:5500/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data);
            setUser(data);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

      const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevFormData) => ({ ...prevFormData, image: file }));
    
        setPreview(URL.createObjectURL(file));
      };
    
      const handleUsernameChange = (e) => {
        const { id, value } = e.target;
        setUsernameData((userNameData) => ({ ...userNameData, [id]: value }));
      };
    
      const handlePasswordChange = (e) => {
        const { id, value } = e.target;
        setPassword((passwordData) => ({ ...passwordData, [id]: value }));
      };
    
      const handleContactChange = (e) => {
        const { id, value } = e.target;
        setContact((userNameData) => ({ ...userNameData, [id]: value }));
      };
    
      const handleEmailChange = (e) => {
        const { id, value } = e.target;
        setEmail((emailData) => ({ ...emailData, [id]: value }));
      };
    
      const handleSubmitUsername = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.sub.id;
    
        const userData = new FormData();
        userData.append("username", userNameData.username);
    
        fetch(`http://127.0.0.1:5500/user/${userId}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
    
          body: userData,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
            setUser(data);
            setShowNameModal(false);
            setUsernameData({ username: "" });
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      };

      const handleSubmitContact = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.sub.id;
    
        const userData = new FormData();
        userData.append("contact", contact.contact);
    
        fetch(`http://127.0.0.1:5500/user/${userId}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
    
          body: userData,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
            setUser(data);
            setShowContactModal(false);
            setContact({ contact: "" });
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      };
  
  return (
    <div>
      
    </div>
  )
}

