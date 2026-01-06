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

//Update Service 
app.put('/service/update/:id',verifyToken, async (req, resp) => {
    if(req.body){
        let result = await Service.updateOne(
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

//Update Query  
app.put('/query/update/:id',verifyToken, async (req, resp) => {
    if(req.body){
        let result = await Query.updateOne(
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