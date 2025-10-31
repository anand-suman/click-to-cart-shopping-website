const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')
const path = require('path')


const app = express()
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}))
// Set response headers
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     res.header('Access-Control-Allow-Credentials', 'true');
//     next();
// });
console.log(process.env.FRONTEND_URL);
app.use(express.json())
app.use(cookieParser())

// serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use("/api",router)

const PORT = 8080 || process.env.PORT


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("connnect to DB")
        console.log("Server is running "+PORT)
    })
})
