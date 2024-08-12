import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
