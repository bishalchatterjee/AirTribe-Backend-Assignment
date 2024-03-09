const express = require('express');
const instructorsModule = require('./instructorsRoutes');
const coursesModule = require('./coursesRoutes');
const leadsModule = require('./leadsRoutes');
const leadCommentsModule = require('./leadCommentsRoutes');

const app = express();

// Define route handler for the root URL
app.get('/', (req, res) => {
    // Redirect to the '/instructors' route
    res.redirect('/instructors');
});


// Mounting the modules
app.use('/instructors', instructorsModule);
app.use('/courses', coursesModule);
app.use('/leads', leadsModule);
app.use('/lead-comments', leadCommentsModule);

// Start the Express server
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
