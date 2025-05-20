# Job Platform Backend

The backend of the Job Platform powers a scalable job portal, handling user authentication, job management, PDF resume uploads, M-Pesa payments, and admin operations. Built with Node.js, Express.js, and MongoDB, it ensures security (JWT, bcrypt) and seamless integration with the frontend. For more information on the user interface, see the [Intach UI in the main README](../README.md).

## Features
- **Authentication**: Secure user signup/login with JWT (`auth.js`).
- **Job Management**: Create, apply, and delete jobs with PDF validation (`job.js`).
- **Payments**: M-Pesa STK Push for premium subscriptions (`payment.js`).
- **Admin Controls**: Manage users and jobs (`admin.js`).
- **Security**: Input validation, 5MB file size limit, role-based access.

## Technologies
- Node.js, Express.js
- MongoDB, Mongoose
- Multer (file uploads)
- jsonwebtoken, bcrypt
- M-Pesa STK Push API (sandbox)
- dotenv

## Setup
1. **Navigate to Backend**:
   ```bash
   cd backend


Install Dependencies:
npm install


Configure Environment:

Create .env with:MONGO_URI=mongodb://localhost:27017/jobPlatform
JWT_SECRET=your_jwt_secret
MPESA_SHORTCODE=your_mpesa_shortcode
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
MPESA_PASSKEY=your_passkey
PORT=5000




Run MongoDB:

Start locally (mongod) or use MongoDB Atlas.


Start Server:
npm start


Runs on http://localhost:5000.



Key Code Snippets
Job Application with PDF Validation
Handles Applicant job applications, validating PDF resumes (backend/routes/job.js).
// File: routes/job.js
const express = require('express');
const router = express.Router();
const jwtAuth = require('../middleware/jwtAuth');
const Job = require('../models/Job');
const Application = require('../models/Application');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${req.user._id}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single('document');

router.post('/:jobId/applications', jwtAuth, upload, async (req, res) => {
  const { sop } = req.body;
  const { jobId } = req.params;
  const userId = req.user._id;
  const documentPath = req.file ? req.file.path : null;

  try {
    if (req.user.type !== 'applicant') {
      return res.status(403).json({ success: false, message: 'Only applicants can apply' });
    }
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    const application = new Application({
      userId,
      recruiterId: job.userId,
      jobId,
      sop,
      document: documentPath,
      status: 'applied',
      dateOfApplication: new Date(),
    });
    await application.save();
    res.json({ success: true, application });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

Purpose: Validates PDF uploads, ensures Applicant-only access, and saves applications to MongoDB.
M-Pesa Payment
Initiates M-Pesa STK Push payments for premium subscriptions (backend/routes/payment.js).
// File: routes/payment.js
const express = require('express');
const router = express.Router();
const jwtAuth = require('../middleware/jwtAuth');
const PaymentModel = require('../models/PaymentModel');
const axios = require('axios');
require('dotenv').config();

router.post('/', jwtAuth, async (req, res) => {
  const { phone, amount } = req.body;
  const userId = req.user._id;

  try {
    const auth = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString('base64');
    const { data: { access_token } } = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
      headers: { Authorization: `Basic ${auth}` },
    });

    const timestamp = new Date().toISOString().replace(/[-T:\.Z]/g, '').slice(0, 14);
    const password = Buffer.from(`${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`).toString('base64');
    const stkPushData = {
      BusinessShortCode: process.env.MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: phone,
      PartyB: process.env.MPESA_SHORTCODE,
      PhoneNumber: phone,
      CallBackURL: 'https://your-callback-url.com/callback',
      AccountReference: `JobPlatform-${userId}`,
      TransactionDesc: 'Premium Subscription',
    };

    const { data } = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', stkPushData, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (data.ResponseCode === '0') {
      const payment = new PaymentModel({ userId, phone, amount, dateOfPayment: new Date() });
      await payment.save();
      res.json({ success: true, payment });
    } else {
      res.status(400).json({ success: false, message: 'Payment initiation failed' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

Purpose: Enables secure M-Pesa payments, tested in sandbox mode.
Testing

Tool: Postman
Example: Tested POST /api/auth/login with {"email": "applicant@test.com", "password": "password123"}, expecting 200 OK and JWT.
Details: Created a “Job Platform APIs” collection, tested endpoints with JWTs, and verified database updates in MongoDB Compass. See main README for more.

Structure
backend/
├── models/ (User.js, Job.js, Application.js, PaymentModel.js)
├── routes/ (auth.js, job.js, payment.js, admin.js)
├── middleware/ (jwtAuth.js)
├── uploads/ (PDF storage)
├── server.js
└── .env

More Information
Explore the Intach UI in the main README for frontend details and user interface workflows.
License
MIT License. See LICENSE.
