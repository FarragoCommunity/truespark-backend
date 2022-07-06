const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv").config()
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const userRouter = require('./routers/userRouter')
const articleRouter = require('./routers/articleRouter')
const categoryRouter = require('./routers/catogoryRouter')
const commentRouter = require('./routers/commentRouter')
const adminRouter = require('./routers/adminRouter')

// middleware
app.use(cookieParser())
app.use(express.json());
app.use(cors({origin:'http://localhost:3000', credentials:true}));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"))
app.use('/api/v1/users',userRouter)
app.use('/api/v1/articles',articleRouter)
app.use('/api/v1/categories',categoryRouter)
app.use('/api/v1/comment',commentRouter)
app.use('/api/v1/admin',adminRouter)

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });


app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
 