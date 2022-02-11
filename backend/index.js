//const express = require('express');  in old versions
//to use new version add "type" : "module" in package.json

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoute from './routes/Posts.js';

const app = express();

const PORT = process.env.PORT || 1122;

dotenv.config();

//to parse the values that is posted
//app.use(express.json()) --- one more method
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/posts', postRoute);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Database connected!!');
    })
    .catch((err) => {
        console.log(err);
    });


app.listen(PORT, () => {
    console.log(`Backend server is running in ${PORT}`);
})