const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authMiddleware = async (req, res, next) => {
  // Get the token from the request cookies
  const token = req.cookies.token;

  // If no token is found, return an error
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: You need to login first" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);

    // Fetch the user from the database using the decoded user ID
    const user = await User.findById(decoded.id).select("-password"); // Exclude the password field

    // If user not found, return an error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
      console.log("decoded", decoded);
    }

    // Attach the user object to the request object
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err); // Log the error
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = authMiddleware;
