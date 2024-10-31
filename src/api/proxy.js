// /api/proxy.js
import axios from "axios";

export default async function handler(req, res) {
  const { path } = req.query; // Allows dynamic path routing
  const url = `https://api-doc-tht.nutech-integrasi.com/${path}`; // Full API URL

  try {
    // Make the request to the third-party API, dynamically using the request method
    const response = await axios({
      method: req.method, // Use the request method (GET, POST, etc.)
      url,
      data: req.body, // Send the request body for POST requests
      headers: {
        "Content-Type": "application/json",
        ...req.headers, // Forward any necessary headers
      },
    });

    // Forward the response back to the client
    res.status(response.status).json(response.data);
  } catch (error) {
    // Handle and forward errors to the client
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || "Proxy error");
  }
}
