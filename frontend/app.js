require('dotenv').config();

const express = require('express');
const app = express();
const port = 3500;


app.listen(port, () => {
    console.log(`Frontend server running at http://localhost:${port}`);
});

app.set('view engine', 'ejs');
app.set('views', './views');
//const URL = 'http://localhost:9000/submit';
const BACKEND_URL = process.env.BACKEND_URL;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/', async (req, res) => {
    try {
        const response = await fetch(`${BACKEND_URL}/submit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(req.body).toString(),
        });
        const data = await response.json();
        res.send(`<h2>Submission successful!</h2><pre>${JSON.stringify(data, null, 2)}</pre><a href=\"/\">Go back</a>`);
    } catch (error) {
        res.status(500).send('Error submitting data to backend.');
    }
});



