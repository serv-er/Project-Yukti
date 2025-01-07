import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify"
import "./Login.css";
import { clearAllUserErrors, register } from "../store/slices/userSlice";

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [role, setRole] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [college, setCollege] = useState("")
    const { loading, isAuthenticated, error, message } = useSelector((state) => state.user)

    const dispatch = useDispatch()
    const navigateTo = useNavigate()

    const handleRegisterClick = (e) => {
        e.preventDefault();
        let registerData;
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return; // Prevent form submission if passwords don't match
        }
        if (role === "Student" || role === "Faculty") {
            registerData = { name, role, email, password, college };
        }
        if (role === "Employer") {
            registerData = { name, role, email, password, companyName };
        }
        dispatch(register(registerData));
    };

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearAllUserErrors)
        }
        if (isAuthenticated) {
            navigateTo("/");
        }
    }, [dispatch, error, loading, isAuthenticated,message])

    return (
        <div className="login-container">
            <div className="login-form-container ">
                <form onSubmit={handleRegisterClick}>
                    <h2 className="login-text">Register</h2>

                    <div className="input-container">
                        <label className="label">NAME</label>
                        <input type="text" placeholder="Type Your Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="input-container">
                        <label className="label">Role</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="Student">Student</option>
                            <option value="Faculty">Faculty</option>
                            <option value="Employer">Employer</option>
                        </select>
                    </div>

                    <div className="input-container">
                        <label className="label">EMAIL</label>
                        <input type="email" placeholder="Youremail@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="input-container">
                        <label className="label">PASSWORD</label>
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="input-container">
                        <label className="label">Confirm Password</label>
                        <input type="password" placeholder="confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>


                    {
                        role === "Employer" ? (<div className="input-container">
                            <label className="label">Company Name</label>
                            <input
                                type="text"
                                placeholder="Company Name"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)} />
                        </div>
                        ) : (

                            <div className="input-container">
                                <label className="label">College Name</label>
                                <input
                                    type="text"
                                    placeholder="College Name"
                                    value={college} onChange={(e) => setCollege(e.target.value)} />
                            </div>)
                    }
                    <button className="login" type="submit">Register</button>
                    <p className="forgot-password1">Registered already?</p>

                    <p className="forgot-password1">
                        <Link to={"/login"} className="forgot-password">Login Now</Link>
                    </p>
                </form>
            </div>

        </div>
    );
};

export default Register;
