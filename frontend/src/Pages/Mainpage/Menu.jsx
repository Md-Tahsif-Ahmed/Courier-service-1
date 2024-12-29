import React from 'react';
import { MdAddToPhotos } from "react-icons/md";
import { RiSecurePaymentLine } from "react-icons/ri";
import { GiEntryDoor, GiCash } from "react-icons/gi";
import { FcOnlineSupport } from "react-icons/fc";
import { GiPathDistance } from "react-icons/gi";
import { FcCalculator } from "react-icons/fc";
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <div className='lg:w-3/4 mt-10 space-y-8 mx-auto lg:mr-0'>
            <div className="flex items-center justify-center space-x-4">
                <Link to="/userboard/addparcel">
                    <button className="flex flex-col items-center justify-center p-4 w-24 h-24 lg:w-40 lg:h-40 bg-blue-500/70 text-white rounded-lg shadow-md transition transform hover:scale-105 hover:shadow-lg backdrop-blur-lg">
                        <MdAddToPhotos className="text-3xl lg:text-5xl" />
                        <h3 className="text-sm lg:text-base font-semibold mt-2">Add Parcel</h3>
                    </button>
                </Link>

            <Link to="/userboard/marchant-account">
                <button className="flex flex-col items-center justify-center p-4 w-24 h-24 lg:w-40 lg:h-40 bg-green-500/70 text-white rounded-lg shadow-md transition transform hover:scale-105 hover:shadow-lg backdrop-blur-lg">
                <GiCash className="text-3xl lg:text-5xl" />
                    <h3 className="text-sm lg:text-base font-semibold mt-2">Cash & Claim</h3>
                </button>
            </Link>

                <button className="flex flex-col items-center justify-center p-4 w-24 h-24 lg:w-40 lg:h-40 bg-yellow-500/70 text-white rounded-lg shadow-md transition transform hover:scale-105 hover:shadow-lg backdrop-blur-lg">
                <GiPathDistance className="text-3xl lg:text-5xl" />
                    <h3 className="text-sm lg:text-base font-semibold mt-2">Pick & Drop</h3>
                </button>
            </div>

            <div className="flex items-center justify-center space-x-4">
                <Link to="/userboard/price">
                    <button className="flex flex-col items-center justify-center p-4 w-24 h-24 lg:w-40 lg:h-40 bg-purple-500/70 text-white rounded-lg shadow-md transition transform hover:scale-105 hover:shadow-lg backdrop-blur-lg">
                    <FcCalculator className="text-3xl lg:text-5xl" />
                        <h3 className="text-sm lg:text-base font-semibold mt-2">Pricing</h3>
                    </button>
                </Link>

                <button className="flex flex-col items-center justify-center p-4 w-24 h-24 lg:w-40 lg:h-40 bg-orange-500/70 text-white rounded-lg shadow-md transition transform hover:scale-105 hover:shadow-lg backdrop-blur-lg">
                    <GiEntryDoor className="text-3xl lg:text-5xl" />
                    <h3 className="text-sm lg:text-base font-semibold mt-2">Latest Entries</h3>
                </button>

                <button className="flex flex-col items-center justify-center p-4 w-24 h-24 lg:w-40 lg:h-40 bg-red-500/70 text-white rounded-lg shadow-md transition transform hover:scale-105 hover:shadow-lg backdrop-blur-lg">
                    <FcOnlineSupport className="text-3xl lg:text-5xl" />
                    <h3 className="text-sm lg:text-base font-semibold mt-2">Support</h3>
                </button>
            </div>
        </div>
    );
};

export default Menu;
