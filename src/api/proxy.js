// /api/proxy.js
import axios from "axios";

export default async function handler(req, res) {
  const { path } = req.query; // This allows for dynamic path forwarding
  const url = `https://api-doc-tht.nutech-integrasi.com/${path}`; // Construct full API URL

  try {
    const response = await axios({
      method: req.method,
      url,
      data: req.body,
      headers: {
        "Content-Type": "application/json",
        // Add any other headers you need here, e.g., authorization tokens
        ...req.headers,
      },
    });

    // Forward the response back to the client
    res.status(response.status).json(response.data);
  } catch (error) {
    // Handle errors and forward them back to the client
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || "Proxy error");
  }
}
