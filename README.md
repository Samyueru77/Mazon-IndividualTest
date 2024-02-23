Course API
This is a simple Course API built using Express and MongoDB to manage courses in a university or college. The API has the following endpoints:

Root endpoint
GET /: Returns a welcome message.
Endpoint to get all courses sorted by name
GET /courses/SortedByName: Returns a list of all courses sorted by their names (descriptions).
Endpoint to get all course descriptions and tags
GET /courses/NameAndSpecialization: Returns a list of all course descriptions and their corresponding tags.
Endpoint to get all published courses (BSIT and BSIS) descriptions and tags
GET /courses/PublishedCourses: Returns a list of all course descriptions and tags for courses with "BSIT" or "BSIS" tags.
Setup
Make sure you have Node.js and MongoDB installed on your machine.
Clone this repository and navigate to the project directory.
Run npm install to install the required dependencies.
Create a .env file in the project root directory and add the following line:
Copy code
MONGODB_URI=mongodb://localhost:27017/mongo-test
Run node index.js to start the server.
Database Schema
The API uses a Course model with the following schema:

json
{
  "1st Year": [
    {
      "description": "Course 1",
      "tags": ["BSIT", "BSIS"]
    },
    ...
  ],
  "2nd Year": [
    {
      "description": "Course 2",
      "tags": ["BSIT"]
    },
    ...
  ],
  ...
}
Each year has an array of courses, and each course has a description and an array of tags.

Feel free to modify and extend the API according to your needs. Happy coding!
