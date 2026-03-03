const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const path = require("path");
require('./db/config');
const User = require('./db/User');
const Admin = require('./db/Admin');
const Service = require('./db/Service');
const Expert = require('./db/Expert');
const Query = require('./db/Query');
const jwt = require('jsonwebtoken');
const { json } = require('stream/consumers');
const jwtkey = 'rds';

const app = express();

app.use(express.json());
app.use(cors());

//User Register
app.post("/register", async (req, resp) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        resp.send({ result: "User Already Registered" });
    } else {
       let user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        delete result.password;
        if (result) {
            resp.send(result);
        } else {
            resp.send({ result: 'Enter Details' });
        }
    }
});

// User Login
app.post('/login', async (req, resp) => {
    if (req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    resp.send({ result: 'Something went wrong' });
                } else {
                    resp.send({ user, auth: token });
                }
            });
        } else {
            resp.send({ result: 'No user Found' });
        }
    } else {
        resp.send({ result: 'Please Enter valid email and password' });
    }
});

//One User Fetch
app.get('/user/:id', verifyToken, async (req, resp) => {
    let result = await User.findOne({ _id: req.params.id });
    if (result) {
        resp.send(result);
    } else {
        resp.send({ result: 'no record found' });
    }
});

//One User Update
app.put('/user/:id', verifyToken, async (req, resp) => {
    let result = await User.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    resp.send(result);
});

//Admin Register
app.post("/admin/register", async (req, resp) => {
    let admin = await Admin.findOne({ email: req.body.email });
    if (admin) {
        resp.send({ result: "Admin Already Registered" });
    } else {
        admin = new Admin(req.body);
        let result = await admin.save();
        result = result.toObject();
        delete result.password;
        if (result) {
            resp.send(result);
        } else {
            resp.send(result);
        }
    }
});

//Admin Login
app.post('/admin/login', async (req, resp) => {
    if (req.body.email && req.body.password) {
        let admin = await Admin.findOne(req.body).select("-password");
        if (admin) {
            if (admin.dept == req.body.dept) {
                jwt.sign({ admin }, jwtkey, { expiresIn: "2h" }, (err, token) => {
                    if (err) {
                        resp.send({ result: 'Something went wrong' });
                    } else {
                        resp.send({ admin, auth: token });
                    }
                });
            } else {
                resp.send({ result: 'No user Found' });
            }

        } else {
            resp.send({ result: 'No user Found' });
        }
    } else {
        resp.send({ result: 'No user Found' });
    }
});

//Expert Register
app.post("/expert/register", async (req, resp) => {
    let expert = await Expert.findOne({ email: req.body.email });
    if (expert) {
        resp.send({ result: "Expert Already Registered" });
    } else {
        expert = new Expert(req.body);
        let result = await expert.save();
        result = result.toObject();
        delete result.password;
        if (result) {
            resp.send(result);
        } else {
            resp.send(result);
        }
    }
});

//Expert Login
app.post('/expert/login', async (req, resp) => {
    if (req.body && (req.body.email && req.body.password)) {
        let expert = await Expert.findOne(req.body).select("-password");
        if (expert) {
            if (expert.verified == true) {
                jwt.sign({ expert }, jwtkey, { expiresIn: "2h" }, (err, token) => {
                    if (err) {
                        resp.send({ result: 'Something went wrong' });
                    } else {
                        resp.send({ expert, auth: token });
                    }
                });
            } else {
                resp.send({ result: 'You are not Verified. Please contact our admin or mail us.' });
            }

        } else {
            resp.send({ result: 'No user Found' });
        }
    } else {
        resp.send({ result: 'Enter valid details' });
    }
});



//Book Appointment with login
app.post('/service',verifyToken, async (req, resp) => {
    if(req.body){
        let service = new Service(req.body);
        let result = await service.save();
        if(result){
        resp.send(result);
        }else{
            resp.send(result);
        }
    }else{
        resp.send({ result: 'Please enter details' });
    }
});




// Email to Expert when assigned a service
const sendExpertAssignmentEmail = async (expertData, serviceData) => {
    const mailOptions = {
        from: `"${process.env.COMPANY_NAME || 'Cyber Bandhu'}" <${process.env.SENDER_EMAIL}>`,
        to: expertData.email,
        subject: 'New Service Assigned - Cyber Bandhu',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: #667eea; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                    .content { background: #f9f9f9; padding: 25px; border-radius: 0 0 8px 8px; }
                    .details { background: white; padding: 15px; border-radius: 6px; margin: 15px 0; }
                    .detail-row { margin: 8px 0; }
                    .label { font-weight: bold; color: #667eea; display: inline-block; width: 120px; }
                    .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2 style="margin: 0;">🎯 New Service Assigned</h2>
                    </div>
                    <div class="content">
                        <p>Hi ${expertData.name},</p>
                        
                        <p>You have been assigned a new service request.</p>
                        
                        <div class="details">
                            <h3 style="color: #667eea; margin-top: 0;">Service Details:</h3>
                            <div class="detail-row">
                                <span class="label">Service:</span> ${serviceData.service_name}
                            </div>
                            <div class="detail-row">
                                <span class="label">Description:</span> ${serviceData.service_des || 'N/A'}
                            </div>
                            <div class="detail-row">
                                <span class="label">Date:</span> ${new Date(serviceData.date).toLocaleDateString('en-IN')}
                            </div>
                        </div>
                        
                        <div class="details">
                            <h3 style="color: #667eea; margin-top: 0;">Customer Details:</h3>
                            <div class="detail-row">
                                <span class="label">Name:</span> ${serviceData.user_name}
                            </div>
                            <div class="detail-row">
                                <span class="label">Mobile:</span> ${serviceData.mobile_no}
                            </div>
                            <div class="detail-row">
                                <span class="label">Address:</span> ${serviceData.address || 'N/A'}
                            </div>
                            <div class="detail-row">
                                <span class="label">City:</span> ${serviceData.city || 'N/A'}
                            </div>
                        </div>
                        
                        <p>Please login to your dashboard to view complete details and start working on this service.</p>
                        
                        <p style="margin-top: 25px;">Best regards,<br><strong>Cyber Bandhu Team</strong></p>
                    </div>
                    <div class="footer">
                        <p>© ${new Date().getFullYear()} Cyber Bandhu | Your Digital Friend</p>
                    </div>
                </div>
            </body>
            </html>
        `,
        text: `Hi ${expertData.name},

You have been assigned a new service request.

Service Details:
- Service: ${serviceData.service_name}
- Description: ${serviceData.service_des || 'N/A'}
- Date: ${new Date(serviceData.date).toLocaleDateString('en-IN')}

Customer Details:
- Name: ${serviceData.user_name}
- Mobile: ${serviceData.mobile_no}
- Address: ${serviceData.address || 'N/A'}, ${serviceData.city || 'N/A'}

Please login to your dashboard to view complete details.

Best regards,
Cyber Bandhu Team

© ${new Date().getFullYear()} Cyber Bandhu`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Expert assignment email sent:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Expert email error:', error);
        return { success: false, error: error.message };
    }
};

// Email to User when expert is assigned
const sendUserExpertAssignedEmail = async (serviceData, expertData) => {
    const mailOptions = {
        from: `"${process.env.COMPANY_NAME || 'Cyber Bandhu'}" <${process.env.SENDER_EMAIL}>`,
        to: serviceData.email,
        subject: 'Expert Assigned to Your Service - Cyber Bandhu',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: #667eea; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                    .content { background: #f9f9f9; padding: 25px; border-radius: 0 0 8px 8px; }
                    .details { background: white; padding: 15px; border-radius: 6px; margin: 15px 0; }
                    .detail-row { margin: 8px 0; }
                    .label { font-weight: bold; color: #667eea; display: inline-block; width: 120px; }
                    .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2 style="margin: 0;">✓ Expert Assigned</h2>
                    </div>
                    <div class="content">
                        <p>Hi ${serviceData.user_name},</p>
                        
                        <p>Good news! An expert has been assigned to your service request.</p>
                        
                        <div class="details">
                            <h3 style="color: #667eea; margin-top: 0;">Your Expert:</h3>
                            <div class="detail-row">
                                <span class="label">Name:</span> ${expertData.name}
                            </div>
                            <div class="detail-row">
                                <span class="label">Mobile:</span> ${expertData.mobile_no}
                            </div>
                            <div class="detail-row">
                                <span class="label">Rating:</span> ⭐ ${expertData.rating}/5
                            </div>
                        </div>
                        
                        <div class="details">
                            <h3 style="color: #667eea; margin-top: 0;">Service Details:</h3>
                            <div class="detail-row">
                                <span class="label">Service:</span> ${serviceData.service_name}
                            </div>
                            <div class="detail-row">
                                <span class="label">Date:</span> ${new Date(serviceData.date).toLocaleDateString('en-IN')}
                            </div>
                        </div>
                        
                        <p>Your expert will contact you shortly to confirm the appointment.</p>
                        
                        <p style="margin-top: 25px;">Thanks,<br><strong>Cyber Bandhu Team</strong></p>
                    </div>
                    <div class="footer">
                        <p>© ${new Date().getFullYear()} Cyber Bandhu | Your Digital Friend</p>
                    </div>
                </div>
            </body>
            </html>
        `,
        text: `Hi ${serviceData.user_name},

Good news! An expert has been assigned to your service request.

Your Expert:
- Name: ${expertData.name}
- Mobile: ${expertData.mobile_no}
- Rating: ${expertData.rating}/5

Service Details:
- Service: ${serviceData.service_name}
- Date: ${new Date(serviceData.date).toLocaleDateString('en-IN')}

Your expert will contact you shortly to confirm the appointment.

Thanks,
Cyber Bandhu Team

© ${new Date().getFullYear()} Cyber Bandhu`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('User notification email sent:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('User email error:', error);
        return { success: false, error: error.message };
    }
};


// Update Service with email notifications
app.put('/service/update/:id', verifyToken, async (req, resp) => {
    try {
        if (!isValidObjectId(req.params.id)) {
            return resp.status(400).send({ result: 'Invalid service ID format' });
        }
        
        if (!req.body) {
            return resp.status(400).send({ result: 'Please enter details' });
        }
        
        // Fetch the service before updating
        const service = await Service.findById(req.params.id);
        if (!service) {
            return resp.status(404).send({ result: 'Service not found' });
        }
        
        // Check if expert_id is being added (assignment)
        const isExpertAssignment = req.body.expert_id && 
                                   (!service.expert_id || service.expert_id === '');
        
        // Update the service
        const result = await Service.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        
        // Send emails if expert is assigned
        if (isExpertAssignment) {
            try {
                // Fetch expert details
                const expert = await Expert.findById(req.body.expert_id).select("-password");
                
                if (expert) {
                    // Send email to expert
                    const expertEmailResult = await sendExpertAssignmentEmail(expert, result);
                    
                    // Send email to user
                    const userEmailResult = await sendUserExpertAssignedEmail(result, expert);
                    
                    if (expertEmailResult.success && userEmailResult.success) {
                        console.log('Both notification emails sent successfully');
                        return resp.send({ 
                            success: true, 
                            result,
                            message: 'Service updated and notifications sent to expert and user'
                        });
                    } else {
                        console.warn('Some emails failed to send');
                        return resp.send({ 
                            success: true, 
                            result,
                            message: 'Service updated but some notifications failed',
                            emailStatus: {
                                expertEmail: expertEmailResult.success,
                                userEmail: userEmailResult.success
                            }
                        });
                    }
                } else {
                    console.warn('Expert not found for email notification');
                    return resp.send({ 
                        success: true, 
                        result,
                        message: 'Service updated but expert not found for notification'
                    });
                }
            } catch (emailError) {
                console.error('Error sending notification emails:', emailError);
                return resp.send({ 
                    success: true, 
                    result,
                    message: 'Service updated but notification emails failed',
                    emailError: emailError.message
                });
            }
        }
        
        // If not an expert assignment, just return the update result
        resp.send({ success: true, result });
        
    } catch (err) {
        console.error('Error updating service:', err);
        resp.status(500).send({ 
            result: 'Update failed', 
            error: err.message 
        });
    }
});




//get one service details by id
app.get('/service/details/:id',verifyToken, async (req, resp) => {
  try {
    const id = req.params.id;
    if (!id) {
      return resp.status(400).send({ error: 'Id parameter is required' });
    }
    const result = await Service.findById(id);
    if (!result) {
      return resp.status(404).send({ error: 'Service not found' });
    }
    resp.send(result);
  } catch (error) {
    resp.status(500).send({ error: 'Server error', details: error.message });
  }
});


// Shorter email sending function
const sendQueryResolvedEmail = async (queryData) => {
    const mailOptions = {
        from: `"${process.env.COMPANY_NAME || 'Cyber Bandhu'}" <${process.env.SENDER_EMAIL}>`,
        to: queryData.email,
        subject: 'Your Query Has Been Resolved - Cyber Bandhu',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: #667eea; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                    .content { background: #f9f9f9; padding: 25px; border-radius: 0 0 8px 8px; }
                    .status-badge { display: inline-block; background: #10b981; color: white; 
                                   padding: 5px 15px; border-radius: 20px; font-size: 14px; }
                    .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2 style="margin: 0;">✓ Query Resolved</h2>
                    </div>
                    <div class="content">
                        <p>Hi ${queryData.f_name},</p>
                        
                        <p>Your query "<strong>${queryData.query_name}</strong>" has been resolved.</p>
                        
                        <p><span class="status-badge">Resolved</span></p>
                        
                        <p>Need more help? <a href="http://localhost:3000/contact" style="color: #667eea;">Contact us</a></p>
                        
                        <p style="margin-top: 25px;">Thanks,<br><strong>Cyber Bandhu Team</strong></p>
                    </div>
                    <div class="footer">
                        <p>© ${new Date().getFullYear()} Cyber Bandhu | Your Digital Friend</p>
                    </div>
                </div>
            </body>
            </html>
        `,
        text: `Hi ${queryData.f_name},

Your query "${queryData.query_name}" has been resolved.

Need more help? Visit: http://localhost:3000/contact

Thanks,
Cyber Bandhu Team

© ${new Date().getFullYear()} Cyber Bandhu`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Email error:', error);
        return { success: false, error: error.message };
    }
};

app.put('/query/update/:id', verifyToken, async (req, resp) => {
    try {
        if (!isValidObjectId(req.params.id)) {
            return resp.status(400).send({ result: 'Invalid query ID format' });
        }
        
        if (!req.body) {
            return resp.status(400).send({ result: 'Please enter details' });
        }
        
        // Fetch the query before updating to get email details
        const query = await Query.findById(req.params.id);
        if (!query) {
            return resp.status(404).send({ result: 'Query not found' });
        }
        
        // Update the query
        const result = await Query.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        
        // Send email if status changed to 'done'
        if (req.body.status === 'done' && query.status !== 'done') {
            const emailResult = await sendQueryResolvedEmail(result);
            
            if (emailResult.success) {
                console.log('Notification email sent to:', result.email);
                return resp.send({ 
                    success: true, 
                    result,
                    message: 'Query updated and email notification sent successfully'
                });
            } else {
                console.error('Failed to send email notification:', emailResult.error);
                return resp.send({ 
                    success: true, 
                    result,
                    message: 'Query updated but email notification failed',
                    emailError: emailResult.error
                });
            }
        }
        
        // If status is not 'done', just return the update result
        resp.send({ success: true, result });
        
    } catch (err) {
        console.error('Error updating query:', err);
        resp.status(500).send({ 
            result: 'Update failed', 
            error: err.message 
        });
    }
});


//Query from landing page
app.post('/query',verifyToken, async (req, resp) => {
    if(req.body){
        let query = new Query(req.body);
        let result = await query.save();
        if(result){
        resp.send(result);
        }else{
            resp.send(result);
        }
    }else{
        resp.send({ result: 'Please enter details' });
    }
});

//Get all Pending Query in Admin dashboard
app.get('/query/pending', verifyToken, async (req, resp) => {
    let result = await Query.find({ status:'pending' });
    if (result) {
        resp.send(result);
    } else {
        resp.send({ result: 'no record found' });
    }
});

//Get all Query in Admin dashboard
app.get('/query/all', verifyToken, async (req, resp) => {
    let result = await Query.find();
    if (result) {
        resp.send(result);
    } else {
        resp.send({ result: 'no record found' });
    }
});

//Get all Pending Services
app.get('/service/pending', verifyToken, async (req, resp) => {
    let result = await Service.find({ status:'pending' , expert_id:null });
    if (result) {
        resp.send(result);
    } else {
        resp.send({ result: 'no record found' });
    }
});

//Get all Pending Services by expert_id
app.get('/service/pending/:id', verifyToken, async (req, resp) => {
    let result = await Service.find({ status:'pending' , expert_id:req.params.id });
    if (result) {
        resp.send(result);
    } else {
        resp.send({ result: 'no record found' });
    }
});

//Get all service of one user using id
app.get('/service/done/user/:id', verifyToken, async (req, resp) => {
    let result = await Service.find({ status:'done' , user_id:req.params.id });
    if (result) {
        resp.send(result);
    } else {
        resp.send({ result: 'no record found' });
    }
});

//Get all Services by expert_id
app.get('/service/expert/:id', verifyToken, async (req, resp) => {
    let result = await Service.find({ expert_id:req.params.id });
    if (result) {
        resp.send(result);
    } else {
        resp.send({ result: 'no record found' });
    }
});

//Get one Services details by expert_id
app.get('/expert/pending-service/:id',verifyToken, async (req, resp) => {
    let result = await Service.find({ status:'pending' , _id:req.params.id });
    if (result) {
        resp.send(result);
    } else {
        resp.send({ result: 'no record found' });
    }
});

//Get all Services in Admin dashboard
app.get('/service/all', verifyToken, async (req, resp) => {
    let result = await Service.find();
    if (result) {
        resp.send(result);
    } else {
        resp.send({ result: 'no record found' });
    }
});



//Get all active Experts
app.get('/expert/active', verifyToken, async (req, resp) => {
    let result = await Expert.find({ status:'active' });
    if (result) {
        resp.send(result);
    } else {
        resp.send({ result: 'no record found' });
    }
});

//Get all Experts
app.get('/expert/all', verifyToken, async (req, resp) => {
    let result = await Expert.find();
    if (result) {
        resp.send(result);
    } else {
        resp.send({ result: 'no record found' });
    }
});

//One Expert Fetch
app.get('/expert/:id', verifyToken, async (req, resp) => {
    let result = await Expert.findOne({ _id: req.params.id });
    if (result) {
        resp.send(result);
    } else {
        resp.send({ result: 'no record found' });
    }
});


//update expert details
app.put('/expert/update/:id',verifyToken, async (req, resp) => {
    if(req.body){
        let result = await Expert.updateOne(
            { _id: req.params.id },
            {
                $set: req.body
            }
        )
        resp.send(result);
    }else{
        resp.send({ result: 'Please enter details' });
    }
});

//Jwt Verification
function verifyToken(req, resp, next) {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(' ')[1];
        jwt.verify(token, jwtkey, (err, valid) => {
            if (err) {
                resp.status(401).send({ result: 'please provide valid token' });
            } else {
                next();
            }
        })
    } else {
        resp.status(403).send({ result: 'please add token with header' });
    }
}

app.listen(5000);