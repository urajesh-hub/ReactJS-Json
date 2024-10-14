const express = require('express')
const cors = require('cors');
const users = require('./sample.json')
const fs = require('fs')


const app = express();
app.use(express.json());
const port = 8000;


// Use the CORS middleware
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ["GET", "POST", "PATCH", "DELETE"]
}));


// Display all users
app.get('/users', (req, res) => {
    return res.json(users);
})

// Delete User Details
app.delete('/users/:id', (req, res) => {
    let id = Number(req.params.id);
    let filteredusers = users.filter((user) => user.id !== id);
    fs.writeFile('./sample.json', JSON.stringify(filteredusers), (err, data) => {
        return res.json(filteredusers);
    })

})

//add user 

app.post('/users', (req, res) => {
    let { empcode, name, age, department, email, salary } = req.body;
    if (!empcode || !name || !age || !department || !email || !salary) {
        res.status(400).send({ message: "All Fields Required" })
    }

    let id = Date.now()
    users.push({ id, empcode, name, age, department, email, salary })
    fs.writeFile('./sample.json', JSON.stringify(users), (err, data) => {
        return res.json({ message: "User Details Added Success" })

    })

})

//update user

app.patch('/users/:id', (req, res) => {
    let id = Number(req.params.id);
    let { empcode, name, age, department, email, salary } = req.body;
    if (!empcode || !name || !age || !department || !email || !salary) {
        res.status(400).send({ message: "All Fields Required" })
    }

    let index = users.findIndex((user) => user.id == id);
    users.splice(index, 1, { ...req.body });

    fs.writeFile('./sample.json', JSON.stringify(users), (err, data) => {
        return res.json({ message: "User Details Updated Success" })

    })

})






app.listen(port, (err) => {
    console.log(`App is Running in Port ${port}`);
});
