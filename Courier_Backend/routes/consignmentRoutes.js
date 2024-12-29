const express = require('express');
const { addConsignment, getAllConsignments, getConsignmentById, updateConsignment, deleteConsignment, approveConsignment, rejectConsignment, asignConsignment, getConsignmentByEmail, pickupConsignment, getConsignmentByNumber, deliveredConsignment, payAdminConsignment,
    addRemark, partialDelivered, totalDeliveredByBoy, assignRider 
  } = require('../controllers/consignmentController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// Add a new consignment
router.post('/consignment', addConsignment);
// Get all consignments
router.get('/consignment', getAllConsignments);
router.get('/consignment/:id', getConsignmentById);
router.get('/consignment/by-email/:email', getConsignmentByEmail); 
router.get('/consignment/receiver/:rphone', getConsignmentByNumber);
router.patch('/consignment/:id', updateConsignment);
router.delete('/consignment/:id', deleteConsignment);
router.patch('/consignment/:id/approve', approveConsignment);
router.patch('/consignment/:id/reject', rejectConsignment);
router.patch('/consignment/:id/asign-job', asignConsignment);
router.patch('/consignment/:id/pickup', pickupConsignment);
router.patch('/consignment/:id/delivered', deliveredConsignment);
router.patch('/consignment/:id/payadmin', payAdminConsignment);
// Backend (Route)
router.patch('/consignment/:id/remark', addRemark);
router.patch('/consignment/:parcelId/partial-delivered', partialDelivered);
// delivery boy total

router.get('/consignment/total/boydelivered/:email', totalDeliveredByBoy);
router.patch('/assign-rider', assignRider);
 
module.exports = router;


 
   