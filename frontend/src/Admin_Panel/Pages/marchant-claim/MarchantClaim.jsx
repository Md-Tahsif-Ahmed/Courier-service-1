import React, { useContext, useEffect, useState } from 'react';
import ASidebar from '../../Shared/Asidebar';
import BSidebar from '../../../Delivary_Boy/Shared/Bsidebar';
import Sidebar from '../../../Pages/Shared/Sidebar';
import { AuthContext } from '../../../contexts/AuthContext';
import Navbar from '../../../Pages/Shared/Navbar';
import axios from 'axios';
import Swal from 'sweetalert2';

function MarchantClaim() {
  const { user } = useContext(AuthContext);

  // Static data for now
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    const fetchclaims = async () => {
      try {
        console.log('User:', user);  // Log the user object to see if it's available
        if (user?.email) {  // Ensure user is logged in and email is available
          const response = await axios.get(`http://courier-production-9452.up.railway.app/api/claim?status=pending`);
          console.log('Fetched pending claims:', response);
          if (Array.isArray(response.data)) {
            setClaims(response.data);  // Ensure it's an array
          } else {
            console.error('Unexpected response format:', response.data);
          }
        } else {
          console.error('User is not logged in or user email is undefined');
        }
      } catch (error) {
        console.error('Error fetching claims', error);
      }
    };
  
    fetchclaims();
  }, [user]);  

  // Handle approve/reject actions
 
  const approveClaim = async (claimId) => {
    try {
      const response = await axios.patch(`http://courier-production-9452.up.railway.app/api/claim/${claimId}/approve`);
      console.log('claim approved:', response.data);
      setClaims(claims.filter(claim => claim._id !== claimId)); // Remove approved claim from pending list
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: " claim Successfully Approved ",
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error('Error approving claim', error);
    }
  };

  const rejectClaim = async (claimId) => {
    try {
      const response = await axios.patch(`http://courier-production-9452.up.railway.app/api/claim/${claimId}/reject`);
      console.log('claim rejected:', response.data);
      setClaims(claims.filter(claim => claim._id !== claimId));  
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: " claim Has been Rejected ",
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error('Error rejecting claim', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        {user ? (
          <>
            {user.role === 'Admin' ? (
              <ASidebar />
            ) : user.role === 'Delivery Boy' ? (
              <BSidebar />
            ) : (
              <Sidebar />
            )}
          </>
        ) : null}
        <div className="p-6 w-full">
          <h2 className="text-2xl font-bold mb-4">Merchant Claim Requests</h2>
          <table className="table-auto w-full border border-gray-200 shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Merchant Name</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((claim) => (
                <tr key={claim._id} className="text-center border-t">
                  <td className="px-4 py-2">{claim.userEmail}</td>
                  <td className="px-4 py-2">{claim.claimAmount}</td>
                  <td className="px-4 py-2">{new Date(claim.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{new Date(claim.createdAt).toLocaleTimeString()}</td>
                  <td className="px-4 py-2">{claim.status}</td>
                  <td className="px-4 py-2">
                    {claim.status === 'pending' && (
                      <>
                           <div className="flex space-x-2">
                           <button
                                className="bg-green-600 text-white py-1 px-2 rounded"
                                onClick={() => approveClaim(claim._id)}
                              >
                                Approve
                              </button>
                              <button
                                className="bg-red-600 text-white py-1 px-2 rounded"
                                onClick={() => rejectClaim(claim._id)}
                              >
                                Reject
                              </button>
                           </div>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default MarchantClaim;
