import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../Shared/Sidebar";
import Navbar from "../Shared/Navbar";
import Swal from "sweetalert2";
import ASidebar from "../../Admin_Panel/Shared/Asidebar";
import { AuthContext } from "../../contexts/AuthContext";
import BSidebar from "../../Delivary_Boy/Shared/Bsidebar";
// import withReactContent from "sweetalert2-react-content";

const ConDetails = () => {
  const { user, token } = useContext(AuthContext);
  const { id } = useParams(); //
  const [parcelData, setParcelData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from backend
    axios.get(`http://courier-production-9452.up.railway.app/api/consignment/${id}`)
      .then(response => {
        setParcelData(response.data);
      })
      .catch(error => {
        console.error("Error fetching parcel data:", error);
      });
  }, []);

  if (!parcelData) {
    return <div>Loading...</div>;
  }
  // Delete data from table based on Id
  const handleDelete = async (_id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://courier-production-9452.up.railway.app/api/consignment/${_id}`);
        Swal.fire(
          'Deleted!',
          'Your consignment has been deleted.',
          'success'
        );
        navigate('/userboard/con-details');
      } catch (error) {
        console.error("Error deleting parcel:", error);
        Swal.fire(
          'Error!',
          'Failed to delete the parcel. Please try again.',
          'error'
        );
      }
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="flex ">
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

        <div className="bg-gray-100  w-screen p-10">
            <div className="mb-8 text-start font-semibold text-xl"></div>
               
              <div className=" p-6 bg-white shadow-sm ">
               
              <div className="flex items-center gap-2 mb-4 ">
                  <button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">Open Support Ticket</button>
                  <Link to={`/userboard/invoice/${id}`}><button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">Invoice</button></Link>
                 <Link to={`/userboard/label/${id}`}><button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">Level</button></Link>
                 {
                  user?.role !== "Delivery Boy"?(<Link to={`/userboard/updateparcel/${id}`}><button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">Edit</button></Link>):
                  (null)
                 }
                  
              </div>
               <div className="border p-6 ">
                <div className="flex justify-between items-start">
                  <div className="text-gray-500">
                    <p className="text-gray-500">{new Date(parcelData.createdAt).toLocaleString()}</p>
                    <p>Id: {parcelData._id}</p>
                    <p>Invoice: {parcelData.invoice}</p>
                    <p>Tracking Code: {parcelData.trackingCode}</p>
                    <p>Tracking Link: 
                      <a href={parcelData.trackingLink} className="text-blue-500">
                        {parcelData.trackingLink}
                      </a>
                    </p>
                  </div>
                  <div className="text-">
                    <p className="text-gray-500">Created at: {new Date(parcelData.createdAt).toLocaleString()}</p>
                    {parcelData.status === "approved" ? (<p className="text-gray-500">Approved at: Yes</p>): (<p className="text-gray-500">Approved at: Not Yet </p>)}
                    <p><span className="text-gray-500">Weight:</span> {parcelData.weight || "KG"}</p>
                    <p className="font-bold text-lg">COD: ৳ {parcelData.codAmount}</p>
                    <p className="text-red-500">{parcelData.status}</p>
                    <div className="mt-4 flex space-x-4">
                      {parcelData.status === "approved" || parcelData.status === "asigned" ||  parcelData.status === "pickedup"  ||  parcelData.status === "delevered" ? (
                        // <button disabled className="bg-red-500 text-white px-4 py-2 rounded">
                        //   Delete
                        // </button>
                        ''
                        
                      ) : (
                        <button
                          onClick={() => handleDelete(parcelData._id)}
                          className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                          Delete
                        </button>
                      )}
                      <p className="text-gray-500">{parcelData.status}</p>
                    </div>

                  </div>
                </div>

                <div className="mt-4">
                  <p><span className="font-semibold">Name:</span> {parcelData.rname}</p>
                  <p><span className="font-semibold">Address: </span>{parcelData.raddress}</p>
                  <p>
                    <span className="font-semibold">Phone Number:</span>{parcelData.rphone}
                    <a href={`tel:${parcelData.rphone}`} className="ml-2 text-white px-2 py-1 rounded-md border-0 bg-blue-500">Call</a>
                  </p>
                </div>
               </div>

                
              </div>
        </div>  
        
      </div>
    </>
  );
};

export default ConDetails;
