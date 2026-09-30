import "dotenv/config"
import cors from "cors"
import express, { type ErrorRequestHandler } from "express"
import enquiryRoutes from "./routes/enquiryRoutes"

const app = express()
const port = Number(process.env.PORT) || 5000
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173"

app.use(cors({ origin: frontendUrl }))
app.use(express.json({ limit: "16kb" }))
app.use("/api/enquiries", enquiryRoutes)

const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  if (res.headersSent) {
    next(error)
    return
  }

  const bodyError = error as { type?: string; status?: number }
  if (bodyError.type === "entity.too.large" || bodyError.status === 413) {
    res.status(413).json({
      success: false,
      message: "The enquiry is too large to submit.",
    })
    return
  }

  if (error instanceof SyntaxError) {
    res.status(400).json({
      success: false,
      message: "Request body must be valid JSON.",
    })
    return
  }

  console.error(error)
  res.status(500).json({
    success: false,
    message: "We could not save your enquiry. Please try again in a moment.",
  })
}

app.use(errorHandler)

app.listen(port, () => {
  console.log(`247 Travel API listening on http://localhost:${port}`)
})
