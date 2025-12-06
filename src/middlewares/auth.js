import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid Authorization header" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user info
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const permit = (...allowedRoles) => {
  return (req, res, next) => {
     console.log(req.user);
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
     console.log("Allowed roles for this route:", allowedRoles);
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }

    next();
  };
};


