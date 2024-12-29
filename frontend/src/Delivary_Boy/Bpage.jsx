import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../Pages/Shared/Navbar';
import BSidebar from './Shared/Bsidebar';
import { FiPackage, FiMapPin, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';



const Bpage = () => {
    const [totalDelivered, setTotalDelivered] = useState(0);
    const { user } = useContext(AuthContext);

    // Fetch total delivered parcels
    useEffect(() => {
        const fetchTotalDelivered = async () => {
            try {
                if (user?.email) {
                    console.log('rrr',user)
                    // const response = await axios.get(`http://courier-production-9452.up.railway.app/api/consignment/total/boydelivered`, {
                    //     params: { boyEmail: user.email }, // Pass boyEmail dynamically
                    // });
                    const response = await axios.get('http://courier-production-9452.up.railway.app/api/consignment/total/boydelivered/user.email')
                    console.log('API Response:', response.data);
                    if (response.data.success) {
                        setTotalDelivered(response.data.totalDelivered);
                    }
                }
            } catch (error) {
                console.error('Error fetching total delivered:', error);
            }
        };
    
        fetchTotalDelivered();
    }, [user?.email]); // Add user?.email as a dependency
    

    

    return (
        <div>
            <Navbar />
            <div className="lg:flex bg-gray-100 min-h-screen">
                <BSidebar />
                
                {/* Main Dashboard Content */}
                <div className="flex-1 p-8 space-y-8">
                    <h1 className="text-2xl font-semibold text-center mb-6">Delivery Boy Dashboard</h1>
                    
                    {/* Summary Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white shadow-lg p-6 rounded-lg flex items-center space-x-4">
                            <FiPackage className="text-blue-500 text-3xl" />
                            <div>
                            <h2 className="text-lg font-semibold">Total Delivered</h2>
                            <p className="text-gray-600">{totalDelivered}</p>
                            </div>
                        </div>
                        <div className="bg-white shadow-lg p-6 rounded-lg flex items-center space-x-4">
                            <FiCheckCircle className="text-green-500 text-3xl" />
                            <div>
                                <h2 className="text-lg font-semibold">Completed Today</h2>
                                <p className="text-gray-600">5 deliveries</p>
                            </div>
                        </div>
                        <div className="bg-white shadow-lg p-6 rounded-lg flex items-center space-x-4">
                            <FiMapPin className="text-red-500 text-3xl" />
                            <div>
                                <h2 className="text-lg font-semibold">Current Location</h2>
                                <p className="text-gray-600">Dhaka, BD</p>
                            </div>
                        </div>
                    </div>

                    {/* Today's Tasks Section */}
                    <div className="bg-white shadow-lg p-6 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Today's Tasks</h2>
                        <ul className="space-y-4">
                            <li className="p-4 bg-blue-50 rounded-lg flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold">Order #12345</h3>
                                    <p className="text-gray-600">Pickup from: Location A</p>
                                    <p className="text-gray-600">Deliver to: Location B</p>
                                </div>
                                <button className="text-white bg-green-500 px-4 py-2 rounded-lg flex items-center space-x-2">
                                    <FiCheckCircle />
                                    <span>Mark Delivered</span>
                                </button>
                            </li>
                            <li className="p-4 bg-blue-50 rounded-lg flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold">Order #67890</h3>
                                    <p className="text-gray-600">Pickup from: Location C</p>
                                    <p className="text-gray-600">Deliver to: Location D</p>
                                </div>
                                <button className="text-white bg-green-500 px-4 py-2 rounded-lg flex items-center space-x-2">
                                    <FiCheckCircle />
                                    <span>Mark Delivered</span>
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Map Section */}
                    <div className="bg-white shadow-lg p-6 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Delivery Route</h2>
                        <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                            {/* Placeholder for Map Integration */}
                            <p className="text-gray-500">Map showing delivery route (Coming Soon)</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bpage;
