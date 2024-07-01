const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());

let groups = [];
let posts = [];
let suggestions = [
    { name: 'Grupo de Jogos', type: 'community' },
    { name: 'Desenvolvedores Web', type: 'community' },
    { name: 'User1', type: 'user' },
    { name: 'User2', type: 'user' }
];

// Endpoints para grupos
app.get('/groups', (req, res) => {
    res.json(groups);
});

app.post('/groups', (req, res) => {
    const { name, description } = req.body;
    const newGroup = { name, description };
    groups.push(newGroup);
    res.status(201).json(newGroup);
});

app.post('/groups/:groupName/join', (req, res) => {
    const { groupName } = req.params;
    const { username } = req.body;
    const group = groups.find(g => g.name === groupName);
    if (!group) {
        return res.status(404).json({ message: 'Group not found' });
    }
    // Implementar a lógica para adicionar o usuário ao grupo
    res.status(200).json({ message: `User ${username} joined group ${groupName}` });
});

// Endpoints para sugestões
app.get('/suggestions', (req, res) => {
    res.json(suggestions);
});

// Endpoints para postagens
app.get('/posts', (req, res) => {
    res.json(posts);
});

app.post('/posts', (req, res) => {
    const { content, link, author } = req.body;
    const image = req.files ? req.files.image : null;
    const video = req.files ? req.files.video : null;
    const newPost = { content, link, author, image, video };
    posts.push(newPost);
    res.status(201).json(newPost);
});

app.listen(port, () => {
    console.log(`API running at http://localhost:${port}`);
});
