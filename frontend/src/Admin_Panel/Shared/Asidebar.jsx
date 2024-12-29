import React, { useContext } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
// import { AuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
const ASidebar = () => {
    // const { user, token } = useContext(AuthContext);

    // // Debugging: log the user and token values
    // console.log('User:', user); 
    // console.log('Token:', token); 

    return (
        <div className="flex">
            {/* Sidebar for desktop and hidden on mobile */}
            <div className="drawer lg:drawer-open">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* Hamburger for mobile */}
                    <label htmlFor="my-drawer" className="btn border-0 drawer-button lg:hidden fixed top-4 left-4 z-50">
                        <RxHamburgerMenu size={24} />
                    </label>
                </div>

                {/* Sidebar content */}
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-64 h-full bg-gray-600 text-white space-y-2">
                        {/* <li><a href="/adminboard/adminpage" className="text-lg">Dashboard</a></li>
                        <li><a href="/adminboard/user-display" className="text-lg">User Handle</a></li>
                        <li><a href="/adminboard/pending" className="text-lg">Pending Parcels</a></li>
                        <li><a href="/adminboard/pricing-set" className="text-lg">Change Pricing</a></li>
                        <li><a href="/boyboard/partial-deli" className="text-lg">Partial Delivery</a></li>
                        <li><a href="/adminboard/diposite" className="text-lg">Deposite Info.</a></li>

                        <li><a href="/adminboard/wise" className="text-lg">Marchant Due</a></li>
                        <li><a href="/adminboard/marchant-claim" className="text-lg">Marchant Claim</a></li>
                        <li><a href="/adminboard/claim-approved" className="text-lg">Claims History</a></li>
                        <li><a href="/adminboard/casheer" className="text-lg">Cash Amount</a></li> */}

                        <li><Link to="/adminboard/adminpage" className="text-lg">Dashboard</Link></li>
                        <li><Link to="/adminboard/user-display" className="text-lg">User Handle</Link></li>
                        <li><Link to="/adminboard/pending" className="text-lg">Pending Parcels</Link></li>
                        <li><Link to="/adminboard/pricing-set" className="text-lg">Change Pricing</Link></li>
                        <li><Link to="/boyboard/partial-deli" className="text-lg">Partial Delivery</Link></li>
                        <li><Link to="/adminboard/diposite" className="text-lg">Deposite Info.</Link></li>
                        <li><Link to="/adminboard/wise" className="text-lg">Marchant Due</Link></li>
                        <li><Link to="/adminboard/marchant-claim" className="text-lg">Marchant Claim</Link></li>
                        <li><Link to="/adminboard/claim-approved" className="text-lg">Claims History</Link></li>
                        <li><Link to="/adminboard/casheer" className="text-lg">Cash Amount</Link></li>

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ASidebar;
