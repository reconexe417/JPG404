
/*const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Allow requests from our frontend
app.use(cors({
    origin: "http://localhost:5500"
}));

// Image search API endpoint
app.get("/api/images", async (req, res) => {

    try {

        // Get the search keyword from the frontend
        const keyword = req.query.q;

        // Check if the search box is empty
        if (!keyword || !keyword.trim()) {
            return res.status(400).json({
                error: "Please enter a search keyword"
            });
        }

        // Build the Wallhaven API parameters
        const params = new URLSearchParams({
            q: keyword,
            purity: "100",
            categories: "111",
            page: "1"
        });

        // Construct the API URL
        const apiURL = `https://wallhaven.cc/api/v1/search?${params}`;

        // Send request to Wallhaven
        const response = await fetch(apiURL);

        // Check for API errors
        if (!response.ok) {
            return res.status(response.status).json({
                error: "Wallhaven API request failed"
            });
        }

        // Convert response into JSON
        const data = await response.json();

        // Send results back to frontend
        res.json(data);

    } catch (error) {

        console.error("Server error:", error);

        res.status(500).json({
            error: "Internal server error"
        });

    }

});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
