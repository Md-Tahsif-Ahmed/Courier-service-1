import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../Pages/Shared/Navbar';
import ASidebar from '../Shared/Asidebar';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const UserDisplay = () => {
    
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetching users from the backend
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://courier-production-9452.up.railway.app/api/user');
                setUsers(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching Users');
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    if (loading) {
        return <div>Loading data....</div>;
    }
    if (error) {
        return <div>{error}</div>;
    }
    // ............

      // Delete data from table based on Id
//   const handleDelete = async (_id) => {
//     const result = await Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, delete it!',
//     });

//     if (result.isConfirmed) {
//       try {
//         await axios.delete(`http://courier-production-9452.up.railway.app/api/user/${_id}`);
//         Swal.fire(
//           'Deleted!',
//           'Your user has been deleted.',
//           'success'
//         );
//         navigate('/adminboard/user-display');
//       } catch (error) {
//         console.error("Error deleting user:", error);
//         Swal.fire(
//           'Error!',
//           'Failed to delete the user. Please try again.',
//           'error'
//         );
//       }
//     }
//   };
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
        await axios.delete(`http://courier-production-9452.up.railway.app/api/user/${_id}`);
        Swal.fire('Deleted!', 'Your user has been deleted.', 'success');
        
        // Update the users state to remove the deleted user
        setUsers(users.filter(user => user._id !== _id));
        
      } catch (error) {
        console.error("Error deleting user:", error);
        Swal.fire('Error!', 'Failed to delete the user. Please try again.', 'error');
      }
    }
  };
  

    return (
        <div>
            <Navbar />
            <div className="flex">
                <ASidebar />
                <div className="bg-gray-100 p-10 w-screen">
                    <div className="mb-8 text-start font-semibold text-xl">
                        <button>All Users</button>
                    </div>
                    <div className="p-8 bg-white shadow-sm">
                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 text-left border-b">Serial</th>
                                    <th className="py-2 px-4 text-left border-b">Name</th>
                                    <th className="py-2 px-4 text-left border-b">Email</th>
                                    <th className="py-2 px-4 text-left border-b">Role</th>
                                    <th className="py-2 px-4 text-left border-b">Action</th>
                                    <th className="py-2 px-4 text-left border-b">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={user._id}>
                                        <td className="py-2 px-4 text-left border-b">{index + 1}</td> {/* Serial number */}
                                        <td className="py-2 px-4 text-left border-b">{user.name}</td>
                                        <td className="py-2 px-4 text-left border-b">{user.email}</td>
                                        <td className="py-2 px-4 text-left border-b">{user.role}</td>
                                        <td className="py-2 px-4 text-left border-b">
                                        <Link to={`/adminboard/update-user/${user._id}`}><button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">Edit</button></Link>
                                        </td>
                                        <td className="py-2 px-4 text-left border-b">
                                        <button onClick={()=> handleDelete(user._id)} className="bg-red-500 text-white px-3 py-1 rounded-sm font-medium">Delete</button> 
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDisplay;
