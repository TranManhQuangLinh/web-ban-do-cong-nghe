const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
// xác thực quyền

// chỉ admin
const authAdminMiddleWare = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(401).json({
        message: "authentication error",
        status: "ERROR",
      });
    }
    // console.log(user);
    if (user?.role === "Admin") {
      next();
    } else {
      return res.status(401).json({
        message: "authentication error",
        status: "ERROR",
      });
    }
  });
};

// chỉ admin và user có id giống id trên param 
const authAdminUserMiddleWare = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  const userId = req.params.id;
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(401).json({
        message: "authentication error",
        status: "ERROR",
      });
    }
    // console.log(user);
    if (user?.role === "Admin" || user?.id === userId) {
      req.loggedInUserRole  = user.role
      next();
    } else {
      return res.status(401).json({
        message: "authentication error",
        status: "ERROR",
      });
    }
  });
};

module.exports = {
  authAdminMiddleWare,
  authAdminUserMiddleWare,
};
