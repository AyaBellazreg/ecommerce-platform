const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');

app.use(cors());
//env file config
dotenv.config();
//connecting to database
mongoose.connect(
    process.env.MONGO_URL
    ).then(()=>{
        console.log("DB is connected")
    }).catch((err)=>{
        console.log(err);
    })

//accepting json format
app.use(express.json())
//end Points
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api/order', orderRoute);

app.listen(process.env.PORT || 5000, ()=>{
    console.log("server is running")
})