import jwt from "jsonwebtoken";
// for logged-in user token verification

export const authenticateMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    // No token provided, send an unauthorized response
    return res.status(401).json({ error: "Unauthorized - No token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_STRING);

    // Attach the decoded user information to the request for later use
    req.user = decoded;

    // User is authenticated, proceed to the next middleware or route
    next();
  } catch (error) {
    // Token is invalid, send an unauthorized response
    return res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
};
