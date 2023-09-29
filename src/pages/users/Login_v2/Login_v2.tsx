import React, { useEffect, useState } from 'react';
import "./Login_v2.scss";
import { StoreType } from '../../../stores';
import apis from '../../../services/Apis';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userAction } from '@/stores/slices/user.slices';
function Login2() {
    const userStore = useSelector((store: StoreType) => {
        return store.userStore;
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/")
        }
    }, [])
    // setup logic giao dien
    const [handleShowForm, setHandleShowForm] = useState(true)
    useEffect(() => {
        const wrapper = document.querySelector(".wrapper") as HTMLElement;
        const signupHeader = document.querySelector(".signup header") as HTMLElement;
        const loginHeader = document.querySelector(".login header") as HTMLElement;

        function handleLoginClick() {
            wrapper.classList.add("active");
        }

        function handleSignupClick() {
            wrapper.classList.remove("active");
        }

        loginHeader.addEventListener("click", handleLoginClick);
        signupHeader.addEventListener("click", handleSignupClick);

        // Clean up event listeners when the component unmounts
        return () => {
            loginHeader.removeEventListener("click", handleLoginClick);
            signupHeader.removeEventListener("click", handleSignupClick);
        };
    }, []);


    const [validEmail, setValidEmail] = useState(true);
    const [validConfirmPW, setValidConfirmPW] = useState(false)
    const [validPassword, setValidPassword] = useState(true);

    useEffect(() => {
        if (userStore.data) {
            navigate("/")
        }
    }, [userStore.data])

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        let data = {
            userNameOrEmail: (e.target as any).userNameOrEmail.value,
            password: (e.target as any).password.value
        }
        const password = data.password;
        if (password.length < 6) {
            setValidPassword(false);
            return;
        }
        setValidPassword(true);
        await apis.userApi.login(data)
            .then(res => {
                // console.log("res", res)
                if (res.status == 200) {
                    localStorage.setItem("token", res.data.token)
                    dispatch(userAction.reload())
                    // navigate("/")
                    // message.success(res.data.message)
                }
                else {
                    console.log("đã xuống else", res.data.message);
                    message.error(res.data.message)
                }
            })
            .catch(err => {
                console.log("err", err)
            })
    }

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault();
        let data = {
            email: (e.target as any).email.value,
            firstName: (e.target as any).firstName.value,
            lastName: (e.target as any).lastName.value,
            userName: (e.target as any).userName.value,
            password: (e.target as any).password.value
        }
        console.log("new user", data);
        const confirmPass = (e.target as any).confirmpassword.value
        if (data.password != confirmPass) {
            setValidConfirmPW(true)
            return
        }
        const password = data.password;
        if (password.length < 6) {
            setValidPassword(false);
            return;
        }
        setValidConfirmPW(false);
        setValidPassword(true);
        await apis.userApi.register(data)
            .then(res => {
                console.log("res", res.status);
                if (res.status != 200) {
                    message.error("Dang ky khong thanh cong")

                } else {
                    message.success(res.data.message)
                }
            })
            .catch(err => console.log("err", err)
            )
    }

    async function handleResetPassword(e: React.FormEvent) {
        e.preventDefault()
        let data = {
            email: (e.target as any).email.value
        }
        console.log("data", data);

        await apis.userApi.resetPassword(data)
            .then(res => {
                console.log(res);

                message.success(res.data.message)
            })
            .catch(err => {
                console.log("err", err)
            })
    }

    return (
        <div className='account_section'>
            <div className='account_form'>
                <div className="wrapper">
                    <div className="form signup">
                        <header>Signup</header>
                        <form onSubmit={(e) => {
                            handleRegister(e)
                        }} >
                            <div className='form_name'>
                                <input name='firstName' type="text" placeholder="First name" required />
                                <input name='lastName' type="text" placeholder="Last name" required />
                            </div>
                            <div className='form_email'>
                                <input type="text"
                                    placeholder="Email address"
                                    name="email"

                                    onBlur={(e) => {
                                        const email = e.target.value;
                                        if (email.trim() === "") {
                                            setValidEmail(true);
                                        } else {
                                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                            setValidEmail(emailRegex.test(email));
                                        }
                                    }} />
                                {!validEmail && (
                                    <div style={{ color: "red" }} className="error_message">Please enter a valid email address.</div>
                                )}
                            </div>
                            <div className="form_userName">
                                <input name='userName' type="text" placeholder="User name" required />
                            </div>

                            <div className="form_password">
                                <div className="input_passswwoord">
                                    <input name='password' type="password" placeholder="Password" required />
                                    <input name='confirmpassword' type="password" placeholder="Confirm Password" required />
                                </div>

                                {!validPassword && (
                                    <div style={{ color: "red" }} className="error_message">Password must be at least 6 characters long.</div>
                                )}
                                {validConfirmPW && (
                                    <div style={{ color: "red" }} className="error_message">Incorect Confirm Password.</div>
                                )}
                            </div>
                            <div className="checkbox">
                                <input type="checkbox" id="signupCheck" />
                                <label htmlFor="signupCheck">I accept all terms & conditions</label>
                            </div>
                            <button type="submit" className='register'>Register</button>
                        </form>
                    </div>
                    <div className="form login">
                        {handleShowForm ? <>

                            <header>Login</header>

                            <form onSubmit={(e) => {
                                handleLogin(e)
                            }} >
                                <div className="form_email_login">
                                    <input name='userNameOrEmail' type="text" placeholder="Email address or User name" required
                                    />

                                </div>
                                <div className="form_pw_login">
                                    <input name='password' type="password" placeholder="Password" required />
                                    {!validPassword && (
                                        <div style={{ color: "red" }} className="error_message">Password must be at least 6 characters long.</div>
                                    )}
                                </div>

                                <span onClick={() => {
                                    setHandleShowForm(false)
                                }}>Forgot password?</span>
                                <button type='submit' className='login'>Login</button>
                            </form>
                        </> : <>
                            <header>Reset Password</header>
                            <form onSubmit={(e) => {
                                handleResetPassword(e)
                            }}>
                                <div className="form_email_login">
                                    <input name='email' type="text" placeholder="Email address " required onBlur={(e) => {
                                        const email = e.target.value;
                                        if (email.trim() === "") {
                                            setValidEmail(true);
                                        } else {
                                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                            setValidEmail(emailRegex.test(email));
                                        }
                                    }} />
                                    {!validEmail && (
                                        <div style={{ color: "red" }} className="error_message">Please enter a valid email address.</div>
                                    )}
                                </div>
                                <button type='submit' className='login'>Reset Password</button>
                                <span className='backToLogin' onClick={() => setHandleShowForm(true)}>Login pages</span>
                            </form>
                        </>}

                    </div>
                </div>
            </div>

        </div>
    );
}

export default Login2;
