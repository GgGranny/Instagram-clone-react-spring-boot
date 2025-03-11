import React, { useEffect, useState } from "react";
import "../css/login.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert } from "@mui/material";

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showAlert, setShowAlert] = useState(null); // `null` means no alert

    // Handle input changes correctly
    const handleOnChangeUsername = (event) => {
        const username = event.target.value.toString().trim();
        setUsername(username);
    };
    const handleOnChangePassword = (event) => {
        const password = event.target.value.toString().trim();
        setPassword(password);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = { username, password };
        try {
            const response = await axios.post("http://localhost:8080/api/login", formData, { withCredentials: true });

            if (response.status === 200) {
                setShowAlert("success");
                console.log(response.data);
                navigate("/home");

            } else if (response.status === 422) {
                setShowAlert("error");
            }

            // Hide alert after 3 seconds
            setTimeout(() => setShowAlert(null), 3000);
        } catch (error) {
            console.log(error);
            setShowAlert("error");
        }
    };

    return (
        <div className="text-gray-400 h-screen flex justify-center items-center">
            <form onSubmit={handleSubmit} className="min-w-80 grid grid-cols-1 gap-5 border-white border rounded p-3.5">
                <div className="text-5xl text-white text-center">
                    <a href="#"><h1>Instagram</h1></a>
                </div>
                <div className="grid grid-cols-1 gap-2">
                    <div className="mt-1 relative">
                        <label htmlFor="username" className={username.length > 0 ? "animate-moveUp" : ""}>Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={handleOnChangeUsername}
                            className={username.length > 0 ? "pt-2 text-xs font-normal" : ""}
                        />
                    </div>
                    <div className="relative">
                        <label htmlFor="password" className={password.length > 0 ? "animate-moveUp" : ""}>Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handleOnChangePassword}
                            className={password.length > 0 ? "pt-2 text-xs" : ""}
                        />
                    </div>
                    <div>
                        <NavLink to="/Signup" className="text-white text-sm">Don't have an account? Sign Up</NavLink>
                    </div>
                </div>
                <div className="flex justify-center w-full">
                    <button type="submit" className="bg-blue-400 text-white rounded p-1 w-full hover:bg-blue-300 hover:cursor-pointer">
                        Login
                    </button>
                </div>
            </form>

            {/* Show alert conditionally */}
            {showAlert === "success" && <Alert severity="success" className="absolute bottom-5 left-5">Login Successful</Alert>}
            {showAlert === "error" && <Alert severity="error" className="absolute bottom-5 left-5">Login Failed</Alert>}
        </div>
    );
}
