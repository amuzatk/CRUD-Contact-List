//Refactored of the default solution
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      throw new Error("User is not authorized or token is missing");
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Attach user information to the request for later use
    req.user = decodedToken.user;

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    // Handle errors related to token validation
    res.status(401).send({ error: "Unauthorized" });
  }
});

module.exports = validateToken;



// //Essence is to authorize user to access certain routes
// const asyncHandler = require("express-async-handler");
// const jwt = require("jsonwebtoken");

// const validateToken = asyncHandler(async (req, res, next) => {
//   let token;
//   let authHeader = req.headers.Authorization || req.headers.authorization;
//   if (authHeader && authHeader.startsWith("Bearer")) {
//     token = authHeader.split(" ")[1];
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
//       if (err) {
//         res.status(401);
//         throw new Error("User is not authorized");
//       }
//       req.user = decode.user;
//       next();
//     });
//   }
//   if (!token) {
//     res.status(401);
//     throw new Error("User is not authorized or token is missing");
//   }
// });

// module.exports = validateToken;
