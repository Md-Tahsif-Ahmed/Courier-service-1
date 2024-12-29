import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../contexts/AuthContext';
import ASidebar from '../../Shared/Asidebar';
import Navbar from '../../../Pages/Shared/Navbar';
import BSidebar from '../../../Delivary_Boy/Shared/Bsidebar';
import Sidebar from '../../../Pages/Shared/Sidebar';
 

const Diposite = () => {
    const [parcels, setParcels] = useState([]);
    const [balance, setBalance] = useState(0);
    const [transferAmount, setTransferAmount] = useState(0);
    const  { user, token } = useContext(AuthContext);

    useEffect(() => {
        const fetchParcels = async () => {
            try {
                if (user?.email) {
<<<<<<< HEAD
                    let url = `http://http://localhost:5000/api/consignment?status=deposited&role=${user.role}`;
=======
                    let url = `http://courier-production-9452.up.railway.app/api/consignment?status=deposited&role=${user.role}`;
>>>>>>> 1e72005604a3f72f23b7cc82244484f46d8ecfe0
                    if (user.role === "Delivery Boy") {
                        url += `&boyEmail=${user.email}`;
                    } else if (user.role !== "Admin") {
                        url += `&userEmail=${user.email}`

                    }
                    const response = await axios.get(url);
                    console.log('Fetched Diposite parcls:', response);
                    if (Array.isArray(response.data)) {
                        setParcels(response.data);
                    }
                }
            } catch (error) {
                console.error('Error fetching parcels', error);
            }
        };
        fetchParcels();
    }, [user]);

    useEffect(() => {
      // Fetch the user data if email is available
      const fetchUserData = async () => {
          try {
              if (user?.email) {
                 if(user?.role === "Admin"){
                  const response = await axios.get(`http://courier-production-9452.up.railway.app/api/user/email/${user.email}`);
                  console.log('....ll', response.data);
                  setBalance(response.data);
              }
            }
          } catch (error) {
              console.error('Error fetching user data:', error);
          }
      };

      fetchUserData();
  }, [user, balance, parcels]); // Adding `user` as a dependency
 
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
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold mb-6">Delivered Parcels</h2>
            {user ? (
          <>
            {user.role === "Admin" ?(
              <p className='text-xl font-bold mb-6 text-green-600'><span className='text-black'>Recieved Amount: </span>{balance.balance} Tk</p>
            ): null}
          </>
        ) : null
        }
           
          </div>
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
                  <th className="py-0.5 px-4 text-center border-b">Sender Email</th>
                  <th className="py-0.5 px-4 text-center border-b">Receiver Name</th>
                  <th className="py-0.5 px-4 text-center border-b">COD Amount</th>
                  <th className="py-0.5 px-4 text-center border-b">Price</th>
                  <th className="py-0.5 px-4 text-center border-b">D.Charge</th>
                  <th className="py-0.5 px-4 text-center border-b">Status</th>
                  <th className="py-0.5 px-4 text-center border-b">Details</th>
                  {/* <th className="py-0.5 px-4 text-center border-b">Pickup Date</th> */}
                  <th className="py-0.5 px-4 text-center border-b">Delivery Date</th>
                  <th className="py-0.5 px-4 text-center border-b">Boy Info.</th>
              
                   
                
                </tr>
              </thead>
              <tbody>
                {parcels.length > 0 ? (
                  parcels.map(parcel => (
                    <tr key={parcel._id} className="border-t">
                      <td className="py-0.5 px-4 text-center border-b">{parcel.semail}</td>
                      <td className="py-0.5 px-4 text-center border-b">{parcel.rname}</td>
                      <td className="py-0.5 px-4 text-center border-b">{parcel.codAmount}</td>
                      <td className="py-0.5 px-4 text-center border-b">{parcel.price}</td>
                      <td className="py-0.5 px-4 text-center border-b">{parcel.deliveryCharge}</td>
                      <td className="py-0.5 px-4 text-center border-b">
                        <span className='px-2 py-1 rounded-lg bg-yellow-400 text-white'>{parcel.status}</span>
                      </td>

                      <td className="py-0.5 px-2 text-center border-b">
                        <Link to={`/userboard/con-unique/${parcel._id}`}>
                          <button className="bg-blue-600 text-white px-2 py-1 rounded">View</button>
                        </Link>
                      </td>
                      {/* <td py-0.5 px-4 text-center border-b>{new Date(parcel.pickupDate).toLocaleDateString('en-GB')}</td> */}
                      <td className='py-0.5 px-4 text-center border-b'>{new Date(parcel.deliveryDate).toLocaleDateString('en-GB')}</td>
                      <td className="py-0.5 px-4 text-center border-b">{parcel.boyEmail}</td>
                      <td className='py-0.5 px-4 text-center border-b'>
 
                      </td>
                    
                  
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

export default Diposite;