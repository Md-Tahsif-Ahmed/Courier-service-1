import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import '../Parcel/label.css';
import Sidebar from '../Shared/Sidebar';
import Navbar from '../Shared/Navbar';
import Pagination from '../../Pagination';
import { Link } from 'react-router-dom';
import BSidebar from '../../Delivary_Boy/Shared/Bsidebar';
import ASidebar from '../../Admin_Panel/Shared/Asidebar';
import { AuthContext } from '../../contexts/AuthContext';
 

 
 

const ConsignmentDisplay = () => {
  const { user, token } = useContext(AuthContext);
  const [consignments, setConsignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Current active page
  const itemsPerPage = 10; // Number of items per page
  const [searchTerm, setSearchTerm] = useState(''); // New state for search input

   
 
  useEffect(() => {
    const fetchConsignments = async () => {
      if (!user?.email) return;

      try {
        if (user?.role === "Admin"){
          const response = await axios.get('http://courier-production-9452.up.railway.app/api/consignment', {
            params: { parcel: searchTerm },
          });
                setConsignments(response.data);
                setLoading(false);
                }
        else {
          const response = await axios.get(`http://courier-production-9452.up.railway.app/api/consignment/by-email/${user.email}`, {
            params: { parcel: searchTerm },
          });
        
      

        setConsignments(response.data);
        setLoading(false);
      }
    } catch (err) {
        setConsignments([])
        setLoading(false);
      }
    };

    fetchConsignments();
  }, [ user?.email, user?.role, searchTerm ]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page for new search results
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = consignments.slice(indexOfFirstItem, indexOfLastItem);

  if (loading) {
    return <div>Loading data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Navbar />
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
        <div className="bg-gray-100 p-10">
          <div className="mb-8 text-start font-semibold text-xl">
          
              <div className="flex justify-between mb-8">
              <h2 className="text-xl font-semibold">All Consignment</h2>
              <input
                type="text"
                placeholder="Search Consignment"
                value={searchTerm}
                onChange={handleSearch}
                className="border focus:outline-none px-4 py-0.5"
              />
           
            </div>
          </div>
          <div className="flex items-center gap-2 mb-4 ">
                  <Link to='/userboard/con-details'><button className="bg-green-500 px-3 py-0.5 text-white rounded-sm font-medium">All</button></Link>
                  <Link to='/adminboard/pending'><button className="bg-green-500 px-3 py-0.5 text-white rounded-sm font-medium">Pending</button></Link>
                  <Link to='/userboard/approval'><button className="bg-green-500 px-3 py-0.5 text-white rounded-sm font-medium">Approved</button></Link>
                  <Link to='/boyboard/delevered'><button className="bg-green-500 px-3 py-0.5 text-white rounded-sm font-medium">Deliverd</button></Link>
                  <Link to='/userboard/reject'><button className="bg-green-500 px-3 py-0.5 text-white rounded-sm font-medium">Cancelled</button></Link>
                  <Link to='/boyboard/asign'><button className="bg-green-500 px-3 py-0.5 text-white rounded-sm font-medium">Asigned Parcel</button></Link>
                  <Link to='/boyboard/pickup'><button className="bg-green-500 px-3 py-0.5 text-white rounded-sm font-medium">Pickedup</button></Link>

                
              </div>
          <div className="p-8 bg-white shadow-sm">
           
            <table className="min-w-full printable-label">
              <thead>
                <tr>
                  <th className="py-0.5 px-2 text-center border-b">Id</th>
                  <th className="py-0.5 px-2 text-center border-b">Invoice</th>
                  {/* <th className="py-0.5 px-2 text-center border-b">Delivary Type</th> */}
                  <th className="py-0.5 px-2 text-center border-b">Reciever Number</th>
                  <th className="py-0.5 px-2 text-center border-b">Reciever Name</th>
                  <th className="py-0.5 px-2 text-center border-b">Cod Amount</th>
                  <th className="py-0.5 px-2 text-center border-b">Weight</th>
                  {/* <th className="py-0.5 px-2 text-center border-b">S.Address</th> */}
                  <th className="py-0.5 px-2 text-center border-b">R.Address</th>
                  <th className='py-0.5 px-2 text-center border-b'>Status</th>
                  <th className='py-0.5 px-2 text-center border-b'>Details</th>
               
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((row, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-0.5 px-2 text-center border-b">{row._id}</td>
                      <td className="py-0.5 px-2 text-center border-b">{row.invoice}</td>
                      {/* <td className="py-0.5 px-2 text-center border-b">{row.dtype}</td> */}
                      <td className="py-0.5 px-2 text-center border-b">{row.rphone}</td>
                      <td className="py-0.5 px-2 text-center border-b">{row.rname}</td>
                      <td className="py-0.5 px-2 text-center border-b">{row.codAmount}</td>
                      <td className="py-0.5 px-2 text-center border-b">{row.weight}</td>
                      {/* <td className="py-0.5 px-2 text-center border-b">{row.saddress}</td> */}
                      <td className="py-0.5 px-2 text-center border-b">{row.raddress}</td>
                      <td className="py-0.5 px-2 text-center border-b">
                     <span
                     className={`px-2 py-0.5 rounded-lg ${
                       row.status === 'pending'
                         ? 'bg-yellow-800 text-white'
                         : row.status === 'approved'
                         ? 'bg-green-800 text-white'
                         : row.status === 'cancelled'
                         ? 'bg-red-800 text-white'
                         : row.status === 'asigned'
                           ? 'bg-yellow-300 text-white'
                         : row.status === 'pickedup'
                           ? 'bg-purple-500 text-white'
                         : row.status === 'delivered'
                         ? ' bg-rose-700 text-white'
                         : row.status === 'deposited'
                         ? ' bg-pink-900 text-white'
                           : row.status === 'paid'
                         ? ' bg-green-400 text-white'
                          : row.status === 'partial-delivered'
                         ? ' bg-yellow-200 text-white'
                         : ''
                     }`}
                   >
                     {row.status}
                   </span></td>
                      <td className="py-0.5 px-2 text-center border-b"><Link to={`/userboard/con-unique/${row._id}`}><button className="bg-blue-600 text-white px-2 py-0.5 rounded">Views</button></Link></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-4">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-6 flex justify-center">
              <Pagination
                activePage={currentPage}
                totalPages={Math.ceil(consignments.length / itemsPerPage)}
                onChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConsignmentDisplay;
