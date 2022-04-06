const express = require("express");
const cors = require('cors');
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");

const app = express();
app.use(cors());

dotenv.config();
connectDB();
app.use(express.json());


app.use('/api/users',userRoutes);
app.use('/api/notes',noteRoutes);

// ------------ Deployment function -----------

__dirname=path.resolve();
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"frontend/build")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname,"frontend","build","index.html"));
    });

}else{
    app.get("/", (res,req) => {
        res.send("API is running");
    });
}

// ------------ Deployment function -----------


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server started on PORT ${PORT}`));