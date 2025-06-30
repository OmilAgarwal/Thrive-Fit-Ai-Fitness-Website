const express = require("express");
const { createObjectCsvWriter } = require("csv-writer");
const path = require("path");

const router = express.Router();

// Path to save the CSV file
const csvFilePath = path.join(__dirname, "../data/contactData.csv");

// Set up the CSV writer
const csvWriter = createObjectCsvWriter({
  path: csvFilePath,
  header: [
    { id: "name", title: "Name" },
    { id: "email", title: "Email" },
    { id: "message", title: "Message" },
  ],
});

// Route for handling contact form submission
router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  // Prepare the data to be written to CSV
  const data = {
    name,
    email,
    message,
  };

  try {
    // Check if the file exists and if it's empty, write the header first
    const fs = require("fs");
    if (!fs.existsSync(csvFilePath) || fs.readFileSync(csvFilePath).length === 0) {
      // Write the header and the data if the file is empty
      await csvWriter.writeRecords([data]);
    } else {
      // Append the data to the CSV file
      await csvWriter.writeRecords([data]);
    }

    res.status(200).json({ message: "Contact data saved successfully!" });
  } catch (error) {
    console.error("Error saving contact data:", error);
    res.status(500).json({ message: "Failed to save contact data!" });
  }
});

module.exports = router;
