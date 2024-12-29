import React, { useContext, useEffect, useState } from 'react';
import Barcode from 'react-barcode';
import QRCode from 'react-qr-code';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './label.css';
import logo from '../../assets/Tspeed.jpg'
import Sidebar from '../Shared/Sidebar';
import Navbar from '../Shared/Navbar';
import BSidebar from '../../Delivary_Boy/Shared/Bsidebar';
import ASidebar from '../../Admin_Panel/Shared/Asidebar';
import { AuthContext } from '../../contexts/AuthContext';

const Label = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams(); // Get parcel ID from route parameters
  const [parcelData, setParcelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParcelData = async () => {
      try {
        const response = await axios.get(`http://courier-production-9452.up.railway.app/api/consignment/${id}`);
        setParcelData(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching parcel data');
        setLoading(false);
      }
    };

    if (id) {
      fetchParcelData();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!parcelData) {
    return <div>No parcel data found.</div>;
  }

  return (
    <>
      <Navbar></Navbar>
      <div className="flex">
      {
        user ? (
          <>
            {user?.role === "Admin" ? (
              <ASidebar /> // Renders the Admin Sidebar
            ) : user?.role === "Delivery Boy" ? (
              <BSidebar /> // Renders the Delivery Boy Sidebar
            ) : (
              <Sidebar /> // Default Sidebar for other users
            )}
          </>
        ) : (
          null // You can render something else here if no user is logged in
        )
      }
        <div className="flex flex-col items-center p-6 bg-gray-50 w-screen">
          {/* Parcel Header */}
          <div className="w-full flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Parcel ID# {parcelData._id}</h2>
            <div className="flex space-x-4">
              <Link to={`/userboard/invoice/${id}`}><button className="bg-gray-200 text-gray-800 px-4 py-2 rounded">Invoice</button></Link>
              <Link to={`/userboard/label/${id}`}><button className="bg-green-500 text-white px-4 py-2 rounded">Label</button></Link>
            </div>
          </div>

          {/* Label Container */}
          <div className=" flex items-start bg-white px-6 py-2 rounded-lg shadow-md w-full max-w-4xl">
            {/* Left: Parcel Info */}
            <div className="border p-1 w-1/3 printable-label">
              <div className="flex items-center justify-center">
                <img src={logo} alt="Logo" className="h-16 w-40" />
              </div>
              {/* <p className="text-sm text-center font-semibold">{parcelData.companyName}</p>
              <p className="text-xs text-center">ID: {parcelData.websiteMakerId}</p> */}

              {/* Barcode */}
              <div className="flex items-center justify-center">
                <Barcode value={parcelData._id} />
              </div>

              {/* QR Code */}
              <div className="flex items-center space-x-4">
                <div className="flex justify-center">
                  <QRCode value={`Parcel: ${parcelData._id}`} size={70} />
                </div>

                {/* Parcel Details */}
                <div className="text-xs">
                  <p>ID: <strong>{parcelData._id}</strong></p>
                  <p>D. Type: {parcelData.dtype}</p>
                  <p>WGT: {parcelData.weight}</p>
                </div>
              </div>
              <div className="mt-4 border-2">
                <div className="ml-2">
                  <p>Sender Name: <strong>{parcelData.sname}</strong></p>
                  <p>Sender Phone: <strong>{parcelData.sphone}</strong></p>
                  <p>Sender Address: <strong>{parcelData.saddress}</strong></p>
                  <p>Reciever Name: <strong>{parcelData.rname}</strong></p>
                  <p>Reciever Phone: <strong>{parcelData.rphone}</strong></p>
                  <p>Reciever Address: <strong>{parcelData.raddress}</strong></p>
                </div>
              </div>
              <div className="mt-4 border-2">
                <p className='flex justify-around'>COD: <strong>{parcelData.codAmount}</strong></p>
              </div>

              {/* Footer */}
              <div className="text-center text-xs mt-4 flex justify-between items-center">
                <div className='space-y-1'>
                  <p>{new Date(parcelData.createdAt).toLocaleDateString('en-CA')}</p>
                  <p>{new Date(parcelData.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                </div>
                <div>
                  <strong>TopSpeed Courier Service Ltd.</strong>
                  <p>www.TopSpeedbd.com</p>
                </div>
              </div>
            </div>

            {/* Right: Print Button */}
            <div className="w-2/3 flex justify-center items-start">
              <button className="bg-green-500 text-white px-6 py-3 rounded" onClick={() => window.print()}>Print</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Label;
