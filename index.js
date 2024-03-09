const express = require('express');
const bodyParser = require('body-parser');
const instructorsModule = require('./instructorsRoutes');
const coursesModule = require('./coursesRoutes');
const leadCommentsModule = require('./leadCommentsRoutes');
const registrationModule = require('./registrationRoutes');

const app = express();

app.use(bodyParser.json()); // Apply body-parser middleware

// Define route handler for the root URL
app.get('/', (req, res) => {
    // Redirect to the '/instructors' route
    res.redirect('/instructors');
});


// Mounting the modules
app.use('/instructors', instructorsModule);
app.use('/courses', coursesModule);
app.use('/leadComments', leadCommentsModule);
app.use('/registration', registrationModule);

// Start the Express server
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
