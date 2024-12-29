import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../contexts/AuthContext';
import ASidebar from '../../../Admin_Panel/Shared/Asidebar';
import BSidebar from '../../Shared/Bsidebar';
import Sidebar from '../../../Pages/Shared/Sidebar';
import Navbar from '../../../Pages/Shared/Navbar';

const AccountBoy = () => {
    const [balance, setBalance] = useState(0); // Initialize balance state
    const {user} = useContext(AuthContext);

    useEffect(() => {
        // Fetch the user data if email is available
        const fetchUserData = async () => {
            try {
                if (user?.email) {
                    const response = await axios.get(`http://courier-production-9452.up.railway.app/api/user/email/${user.email}`);
                    console.log('....ll', response.data);
                    setBalance(response.data.balance);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [user]); // Adding `user` as a dependency

    return (
        <>
        <Navbar />
            <div className="flex">
                {user ? (
                    <>
                    {user.role === "Admin" ? (
                        <ASidebar />  // Admin Sidebar
                    ) : user.role === "Delivery Boy" ? (
                        <BSidebar />  // Delivery Boy Sidebar
                    ) : (
                        <Sidebar />  // Default Sidebar for other users
                    )}
                    </>
                ) : null}
        
                <div className='flex justify-center items-center ml-56 mt-56 lg:mt-0 '>
                    <div className="card bg-sky-600 text-primary-content w-96">
                        <div className="card-body">
                            <h2 className="card-title">My Account</h2>
                            <p className='text-center'>Balance: Tk <span className='font-bold text-lg text-white'>{balance}</span></p> {/* Display balance */}
                            <div className="card-actions justify-end">
                                <button className="btn text-white bg-green-950 border-0 hover:bg-green-900">
                                    Transfer to Admin Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AccountBoy;
