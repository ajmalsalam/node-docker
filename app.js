const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hi, your Jenkins ECS CI/CD Pipeline Working!');
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
