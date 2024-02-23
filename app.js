// Importing required modules
const express = require("express");
const mongoose = require("mongoose");
const Course = require("./models/courseModel");

// Initializing express app
const app = express();
const PORT = 8080;

// Root endpoint
app.get("/", (req, res) => {
 res.send("WELCOME TO API!");
});

// Endpoint to get all courses sorted by name
app.get("/courses/SortedByName", async (req, res) => {
 try {
   // Finding all courses in the database
   const years = await Course.find();
   let courses = []; // Initialize an empty array to store all courses

   // Iterate over each year and extract courses from each year
   years.forEach((year) => {
     ["1st Year", "2nd Year", "3rd Year", "4th Year"].forEach((yearKey) => {
       if (year[yearKey]) {
         courses.push(...year[yearKey]); // Spread operator to add courses to the array
       }
     });
   });

   // Sorting courses by description (name)
   courses.sort((a, b) => a.description.localeCompare(b.description));

   // Sending sorted courses as JSON response
   res.json(courses);
 } catch (err) {
   res.status(500).json({ message: err.message });
 }
});

// Endpoint to get all course descriptions and tags
app.get("/courses/NameAndSpecialization", async (req, res) => {
 try {
   const years = await Course.find();
   let courses = [];

   years.forEach((year) => {
     ["1st Year", "2nd Year", "3rd Year", "4th Year"].forEach((yearKey) => {
       if (year[yearKey]) {
         courses.push(...year[yearKey]);
       }
     });
   });

   // Extracting descriptions and tags from courses
   const descriptionsAndTags = courses.map((course) => ({
     description: course.description,
     tags: course.tags,
   }));

   res.json(descriptionsAndTags);
 } catch (err) {
   res.status(500).json({ message: err.message });
 }
});

// Endpoint to get all published courses (BSIT and BSIS) descriptions and tags
app.get("/courses/PublishedCourses", async (req, res) => {
 try {
   const years = await Course.find();
   let courses = [];

   years.forEach((year) => {
     ["1st Year", "2nd Year", "3rd Year", "4th Year"].forEach((yearKey) => {
       if (year[yearKey]) {
         courses.push(...year[yearKey]);
       }
     });
   });

   // Filtering courses based on tags and extracting descriptions and tags
   const descriptionsAndTags = courses
     .filter(
       (course) => course.tags.includes("BSIT") || course.tags.includes("BSIS")
     )
     .map((course) => ({
       description: course.description,
       tags: course.tags,
     }));

   res.json(descriptionsAndTags);
 } catch (err) {
   res.status(500).json({ message: err.message });
 }
});

// Connecting to MongoDB and starting the server
mongoose
 .connect("mongodb://localhost:27017/mongo-test")
 .then(() => {
   console.log("Database Connected!");

   // Start the server
   app.listen(PORT, () => {
     console.log(`Listening on http://localhost:${PORT}...`);
   });
 })
 .catch((error) => {
   console.log(error);
 });