import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Layout } from "./components/Layout"
import { AboutPage } from "./pages/AboutPage"
import { ContactPage } from "./pages/ContactPage"
import { DestinationsPage } from "./pages/DestinationsPage"
import { HomePage } from "./pages/HomePage"
import { NotFoundPage } from "./pages/NotFoundPage"
import { TourDetailsPage } from "./pages/TourDetailsPage"
import { FaqPage } from "./pages/FaqPage"
import { ToursPage } from "./pages/ToursPage"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="destinations" element={<DestinationsPage />} />
          <Route path="tours" element={<Navigate to="/tours/outbound" replace />} />
          <Route path="tours/inbound" element={<Navigate to="/tours/outbound" replace />} />
          <Route path="tours/outbound" element={<ToursPage scope="outbound" />} />
          <Route path="trip/:slug" element={<TourDetailsPage />} />
          <Route path="tours/:id" element={<TourDetailsPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
