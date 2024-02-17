const express = require('express');
const app = express();

// route handler
app.get('/', (req, res) => {
    res.send({ Hello: 'world!'});
});


app.listen(5000);