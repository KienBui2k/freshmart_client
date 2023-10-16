import React, { useEffect, useState } from 'react';
import "./profile.scss";
import apis from '../../../services/Apis';
import axios from 'axios';
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '@/stores';
interface UserInfo {
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    avatar: string;
}
export default function Profile() {
    const dispatch = useDispatch()

    const userStore = useSelector((store: StoreType) => {
        return store.userStore
    })


    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tabName: number) => {
        setActiveTab(tabName);
    };
    const [editPassword, setEditPassword] = useState(false)
    // useEffect(() => {
    //     setEditPassword(userStore.data?.emailAuthentication);
    // }, [userStore.data])


    const initialUserInfo: UserInfo = {
        firstName: userStore.data?.firstName || '',
        lastName: userStore.data?.lastName || '',
        email: userStore?.data?.email || '',
        userName: userStore?.data?.userName || '',
        avatar: userStore.data?.avatar || '',
    };

    const [userInfo, setUserInfo] = useState(initialUserInfo);
    const handleResetData = () => {
        setUserInfo(initialUserInfo);
        setIsDataChanged(false);
    };
    const [isDataChanged, setIsDataChanged] = useState(false);

    const [validConfirmPW, setValidConfirmPW] = useState(false)
    const [validPassword, setValidPassword] = useState(true);
    const [validConfirmPassword, setValidConfirmPassword] = useState(true);
    async function ChangePassword(e: React.FormEvent) {
        e.preventDefault();
        let data = {
            oldPassword: (e.target as any).oldPassword.value,
            newPassword: (e.target as any).newPassword.value
        }
        const oldPassword = data.oldPassword;
        if (oldPassword.length < 6) {
            setValidConfirmPassword(false);
            return;
        }

        const password = data.newPassword;
        if (password.length < 6) {
            setValidPassword(false);
            return;
        }

        const confirmPassword = (e.target as any).confirmPassword.value;
        if (data.newPassword != confirmPassword) {
            setValidConfirmPW(true)
            return;
        }
        setValidConfirmPW(false);
        setValidPassword(true);
        setValidConfirmPassword(true);
        axios.post(import.meta.env.VITE_SV_HOST + "users/change-password", data, {
            headers: {
                "token": localStorage.getItem("token")
            }
        })
            .then(res => {
                console.log("res", res);
                if (res.status != 200) {
                    message.error(res.data.message)
                } else {
                    message.success(res.data.message)
                }
            })
            .catch(err => {
                message.error("Hệ thống đang bị lỗi vui thử lại sau")
            })
    }

    async function handleResendEmail() {
        axios.get("http://127.0.0.1:3000/apis/v1/users/resend-email", {
            headers: {
                "token": localStorage.getItem("token")
            }
        })
            .then(res => {
                message.success(res.data)
            })
            .catch(err => {
                console.log("err", err);
            })
    }
    return (
        <div className="profile_section">
            <div className="profile_main">
                <div className="profile_header">
                    <h3>My Profile</h3>
                </div>
                <div className="profile_content">
                    <div className="profile_nav col-lg-4">
                        <div className="user_avatar">
                            <img src={userInfo.avatar} alt="" />
                        </div>
                        <div className="user_name">
                            <h4>Bùi hải kiên</h4>
                        </div>
                        <div className="user_option">
                            <span
                                className={activeTab === 1 ? 'active' : ''}
                                onClick={() => handleTabClick(1)}
                            >
                                My Info
                            </span>
                            <span
                                className={activeTab === 2 ? 'active' : ''}
                                onClick={() => handleTabClick(2)}
                            >
                                My Password
                            </span>
                            <span
                                className={activeTab === 3 ? 'active' : ''}
                                onClick={() => handleTabClick(3)}
                            >
                                My Address
                            </span>
                        </div>
                    </div>
                    <div className="profile_info col-lg-8">
                        {activeTab === 1 &&
                            <div className='my_info'>
                                <form className="my_info_content">
                                    <div className="my_info_title">
                                        <h3>Account Setting</h3>
                                    </div>
                                    <div className="row1">
                                        <div className="my_firstName">
                                            <span>First Name :</span>
                                            <input
                                                type="text"
                                                value={userInfo.firstName}
                                                onChange={(e) => {
                                                    setUserInfo({ ...userInfo, firstName: e.target.value });
                                                    setIsDataChanged(true);
                                                }}
                                            />
                                        </div>
                                        <div className="my_lastName">
                                            <span>Last Name :</span>
                                            <input type="text" value={userInfo.lastName}
                                                onChange={(e) => {
                                                    setUserInfo({ ...userInfo, lastName: e.target.value });
                                                    setIsDataChanged(true);
                                                }} />
                                        </div>
                                    </div>
                                    <div className="row2">
                                        <div className="my_email">
                                            <span>Email :</span>
                                            <input type="text" value={userInfo.email}
                                                onChange={(e) => {
                                                    setUserInfo({ ...userInfo, email: e.target.value });
                                                    setIsDataChanged(true);
                                                }} />
                                        </div>
                                        <div className="my_userName">
                                            <span>User Name :</span>
                                            <input type="text" value={userInfo.userName}
                                                onChange={(e) => {
                                                    setUserInfo({ ...userInfo, userName: e.target.value });
                                                    setIsDataChanged(true);
                                                }} />
                                        </div>
                                    </div>
                                    <div className="row3">
                                        <button className={isDataChanged ? 'changed' : 'update_btn'}>
                                            Update
                                        </button>
                                        <button type='button' className={isDataChanged ? 'cls' : 'close_btn'} onClick={handleResetData}>
                                            Cancel
                                        </button>
                                    </div>
                                </form>


                            </div>
                        }
                        {activeTab === 2 &&
                            <div className='my_password'>
                                {/* {userStore?.emailAuthentication == true  ? <></> : <></>} */}

                                <div className="my_password_title">
                                    <h3>Password Setting</h3>
                                </div>
                                <form
                                    onSubmit={(e) => {
                                        ChangePassword(e)
                                    }}
                                    className="my_password_content">
                                    <div className="row1">
                                        <span>Old Password</span>
                                        <input name='oldPassword' type="password" placeholder='Old password' />
                                        {!validConfirmPassword && (
                                            <div style={{ color: 'red' }}>*Please enter your old password correctly.</div>
                                        )}
                                    </div>
                                    <div className="row2">
                                        <span>New Password</span>
                                        <input name='newPassword' type="password" placeholder='New password' />
                                        {!validPassword && (
                                            <div style={{ color: "red" }} className="error_message">*Password must be at least 6 characters long.</div>
                                        )}
                                    </div>
                                    <div className="row3">
                                        <span>Confirm Password</span>
                                        <input name='confirmPassword' type="password" placeholder='Confirm password' />
                                        {validConfirmPW && (
                                            <div style={{ color: "red" }} className="error_message">*Incorect Confirm Password.</div>
                                        )}
                                    </div>
                                    <div className='row4'>
                                        <button type='submit' className='pw_update_btn'>Update</button>
                                        <button type='button' className='pw_cancel_btn'>Cancel</button>
                                    </div>
                                </form>
                                {/* </> :
                                        <>
                                            <div className='resend_email_conten'>
                                                <span>Email của bạn chưa được xác thực, vui lòng xác thực email trước khi sử dụng tính năng này!</span>
                                                <button onClick={() => {
                                                    handleResendEmail()
                                                }} type='button'>Xác thực Email</button>
                                            </div>
                                        </>
                                } */}
                            </div>
                        }

                        {activeTab === 3 &&
                            <div className='my_address'>
                                <div className="my_address_content">
                                    my address
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
