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
  
  return (
    <div>
      
    </div>
  )
}

