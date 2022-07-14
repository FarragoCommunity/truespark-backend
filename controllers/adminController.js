const jwt = require("jsonwebtoken");

// admin login
 exports.adminLogin = async (req, res) => {
    let message;
    try {
      // checking is there have email and password
      if (!req.body.usename || !req.body.password) {
         return res.status(400).json({
            message: "Please provide usename and password",
         });
      }
      // checking is the username and password is correct
      if (req.body.usename !== process.env.JWT_ADMIN || req.body.password !== process.env.JWT_ADMIN_PASSWORD) {
         return res.status(400).json({
            message: "Invalid usename or password",
         });
      }
      // generating a jwt
      const token = await jwt.sign({username:process.env.JWT_ADMIN}, process.env.JWT_SECRET);
      let user = {
         username: process.env.JWT_ADMIN,
      }

      res.status(200).json({
         user,
         token,
         success: true,
      });
    } catch (error) {
      res.status(400).json({
         error,
         success: false,
         message,
      });
    }
     }

// verify admin  token
exports.verifyAdminToken = async (req, res , next) => {
   let message;
   try {
      const token = req.body.jwt;
      if (!token) {
         return res.status(400).json({
            message: "Please provide token",
         });
      }
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.username !== process.env.JWT_ADMIN) {
         return res.status(400).json({
            message: "Invalid token",
         });
      }
      res.status(200).json({
         decoded,
         success: true,
      });
      // req.user = decoded;
      next();
   } catch (error) {
      res.status(400).json({
         error,
         success: false,
         message,
      });
   }
}
   