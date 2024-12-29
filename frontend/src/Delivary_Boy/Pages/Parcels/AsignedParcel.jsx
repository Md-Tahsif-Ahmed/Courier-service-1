import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import ASidebar from '../../../Admin_Panel/Shared/Asidebar';
import BSidebar from '../../Shared/Bsidebar';
import Sidebar from '../../../Pages/Shared/Sidebar';
import Navbar from '../../../Pages/Shared/Navbar';
import Swal from 'sweetalert2';

const AsignedParcel = () => {
  const [parcels, setParcels] = useState([]);
  const [pendingBalance, setPendingBalance] = useState(0);
  const { user, token } = useContext(AuthContext);
  const [riders, setRiders] = useState([]); // Correct way to use useState
  const [selectedRiders, setSelectedRiders] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
    const fetchParcels = async () => {
      try {
        if (user?.email) {
          let url = `http://courier-production-9452.up.railway.app/api/consignment?status=asigned&role=${user.role}`;

          // Add boyEmail or userEmail based on the role
          if (user.role === "Delivery Boy") {
            url += `&boyEmail=${user.email}`;
          } else if (user.role !== "Admin") {
            url += `&userEmail=${user.email}`;
          }

          const response = await axios.get(url);
          console.log('Fetched Asigned parcels:', response);
          if (Array.isArray(response.data)) {
            setParcels(response.data);
          } 
        }
      } catch (error) {
        console.error('Error fetching parcels', error);
      }
    };

    fetchParcels();
  }, 2000); // Poll every 2 seconds

  return () => clearInterval(interval); // Cleanup on unmount
}, [user]);

//   pickup parcel.............
const pickupParcel = async (parcelId, codAmount) => {
    try {
      const response = await axios.patch(
        `http://courier-production-9452.up.railway.app/api/consignment/${parcelId}/pickup`,
        { boyEmail: user.email } // Pass the user's email in the request body
      );
      
      console.log('Parcel Picked up:', response.data);
      setParcels(parcels.filter(parcel => parcel._id !== parcelId)); // Remove the assigned parcel from the list
      setPendingBalance(pendingBalance + codAmount);
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Successfully Picked up this Parcel",
        showConfirmButton: false,
        timer: 1800
      });
    } catch (error) {
      console.error('Error Pickedup parcel', error);
    }
  };

  // update Delivery boy/rider ...............

   // fetch Rider/Delivery Boy by role.....
   useEffect(() => {
    const fetchDeliveryBoys = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/roleby/role', {
          params: { role: 'Delivery Boy' },
        });
        setRiders(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching delivery boys');
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveryBoys();
  }, []);
// rider chang on dropdown....
  const handleRiderChange = (parcelId, riderId) => {
    // Update selected rider for a specific parcel
    setSelectedRiders((prev) => ({
      ...prev,
      [parcelId]: riderId,
    }));
  };

  // asigned and submitt ... rider
  const handleSubmit = async (parcelId) => {
    const selectedRiderId = selectedRiders[parcelId]; // Get the selected rider's ID
  
    if (!selectedRiderId) {
      alert('Please select a delivery boy!');
      return;
    }
  
    try {
      const response = await axios.patch('http://localhost:5000/api/assign-rider', {
        consignmentId: parcelId,
        riderId: selectedRiderId,
      });
  
      console.log('Parcel boy update:', response.data);
      // setParcels(parcels.filter(parcel => parcel._id !== parcelId)); // Remove the assigned parcel from the list
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Successfully Update Rider for this Parcel",
        showConfirmButton: false,
        timer: 1800
      });
    } catch (error) {
      console.error('Error updating consignment:', error);
      alert('Failed to update consignment.');
    }
  };
  

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

        <div className="p-8 bg-gray-100 w-screen">
          <h2 className="text-xl font-bold mb-6">Asigned Parcels</h2>
          {user?.role !== "Delivery Boy"?(<div className="flex items-center gap-2 mb-4 ">
                  <Link to='/userboard/con-details'><button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">All</button></Link>
                  <Link to='/adminboard/pending'><button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">Pending</button></Link>
                  <Link to='/userboard/approval'><button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">Approved</button></Link>
                  <Link to='/boyboard/delevered'><button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">Deliverd</button></Link>
                  <Link to='/userboard/reject'><button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">Cancelled</button></Link>
                  <Link to='/boyboard/asign'><button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">Asigned Parcel</button></Link>
                  <Link to='/boyboard/pickup'><button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">Pickedup</button></Link>
              </div>): ''}
          <div className="bg-white shadow-sm p-8">
            <table className="min-w-full printable-label">
              <thead>
                <tr>
                  <th className="py-0.5 px-4 text-center border-b">Sender Name</th>
                  <th className="py-0.5 px-4 text-center border-b">Receiver Name</th>
                  <th className="py-0.5 px-4 text-center border-b">COD Amount</th>
                  <th className="py-0.5 px-4 text-center border-b">Status</th>
                  <th className="py-0.5 px-4 text-center border-b">Details</th>
                  <th className="py-0.5 px-4 text-center border-b">Pickup Date</th>
                  <th className="py-0.5 px-4 text-center border-b">Delivery Date</th>
                  <th className="py-0.5 px-4 text-center border-b">Boy Info.</th>
                  {user?.role === "Delivery Boy" ? (
                        <th className="py-0.5 px-4 text-center border-b">Action</th>
                        ) : user?.role === "Admin" ? ( <th className="py-0.5 px-4 text-center border-b">Change Rider</th>): ''
                       }
                 
                </tr>
              </thead>
              <tbody>
                {parcels.length > 0 ? (
                  parcels.map(parcel => (
                    <tr key={parcel._id} className="border-t">
                      <td className="py-0.5 px-4 text-center border-b">{parcel.sname}</td>
                      <td className="py-0.5 px-4 text-center border-b">{parcel.rname}</td>
                      <td className="py-0.5 px-4 text-center border-b">{parcel.codAmount}</td>
                      <td className="py-0.5 px-4 text-center border-b">
                        <span className='px-2 py-1 rounded-lg bg-yellow-400 text-white'>{parcel.status}</span>
                      </td>

                      <td className="py-0.5 px-2 text-center border-b">
                        <Link to={`/userboard/con-unique/${parcel._id}`}>
                          <button className="bg-blue-600 text-white px-2 py-1 rounded">View</button>
                        </Link>
                      </td>
                      <td className='py-0.5 px-4 text-center border-b'>{new Date(parcel.pickupDate).toLocaleDateString('en-GB')}</td>
                      <td className='py-0.5 px-4 text-center border-b'>{new Date(parcel.deliveryDate).toLocaleDateString('en-GB')}</td>
                      <td className="py-0.5 px-4 text-center border-b">{parcel.boyEmail}</td>
                      { 
                        user?.role === "Admin" ? (
                          <td className="py-2 px-4 text-center border-b">
                          <select
                            className="border px-2 py-1 rounded"
                            value={selectedRiders[parcel._id] || ''}
                            onChange={(e) => handleRiderChange(parcel._id, e.target.value)}
                          >
                            <option value="" disabled>
                              Select Delivery Boy
                            </option>
                            {riders.map((boy) => (
                              <option key={boy._id} value={boy._id}>
                                {boy.name}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => handleSubmit(parcel._id)}
                            className="bg-green-500 text-white px-3 py-1 rounded ml-2"
                          >
                            Change
                          </button>
                        </td>
                        ): user?.role === "Delivery Boy" ? (
                        <td className="py-0.5 px-2 text-center border-b"><button
                        className="bg-green-600 text-white py-1 px-2 rounded"
                        onClick={() => pickupParcel(parcel._id, parcel.codAmount)}
                        >
                        Pickup
                        </button></td>
                        ) : ''
                       }
                     
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      No Asigned parcels available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AsignedParcel;