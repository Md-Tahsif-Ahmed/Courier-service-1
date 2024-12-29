const mongoose = require('mongoose');

const consignmentSchema = new mongoose.Schema({
  _id: { type: String },
  sphone: { type: String, required:true },
  rphone: { type: String, required:true },
  sname: { type: String },
  rname: { type: String },
  semail: { type: String },
  remail: { type: String },
  saddress: { type: String },
  raddress: { type: String },
  sdistrict: { type: String },
  rdistrict: { type: String },
  codAmount: { type: Number, required:true },
  price: { type: Number},
  deliveryCharge: { type: Number},
  invoice: { type: String },
  note: { type: String },
  weight: { type: Number },
  dtype: { type: String },
  userEmail: { // New field to store user's email
    type: String,
    
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'delivered', 'cancelled', 'asigned', 'pickedup', 'delevered', 'deposited', 'paid', 'partial-delivered'],
    default: 'pending',
   
  },
  boyEmail: { // New field to store user's email
    type: String,
    required: false,
  },
  createdAt: { type: Date, default: Date.now }
  
  ,
  approvalDate: {
    type:Date
    
  },
  pickupDate: {
    type:Date 
  },
  deliveryDate: {
    type: Date 
  },
  remark: { type: String,
    required: false,
   },
});

const Consignment = mongoose.model('Consignment', consignmentSchema);

module.exports = Consignment;
