import { Router, type NextFunction, type Request, type Response } from "express"
import { rateLimit } from "express-rate-limit"
import { createEnquiry } from "../controllers/enquiryController"

const router = Router()

const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    res.status(429).json({
      success: false,
      message: "Too many enquiries from this connection. Please wait 15 minutes and try again.",
    })
  },
})

function requireJson(req: Request, res: Response, next: NextFunction) {
  if (!req.is("application/json")) {
    res.status(415).json({
      success: false,
      message: "Content-Type must be application/json.",
    })
    return
  }
  next()
}

router.post("/", enquiryLimiter, requireJson, createEnquiry)

export default router
