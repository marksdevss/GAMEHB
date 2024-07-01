const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3002;

const CLIENT_ID = '1257134346712645693'; 
const CLIENT_SECRET = '2icgR98GdyZTPS2dIHvNho5VRCk_5uvwCVuRyTaT5rC2jdTbV';
const REDIRECT_URI = 'http://127.0.0.1:3002/auth/discord/callback'; 

app.get('/auth/discord', (req, res) => {
    const authorizeUrl = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=identify email connections presences.read activities.read`;
    res.redirect(authorizeUrl);
});

app.get('/auth/discord/callback', async (req, res) => {
    const code = req.query.code;
    const data = {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
        scope: 'identify email connections presences.read activities.read'
    };

    const response = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(data)
    });

    const json = await response.json();
    const accessToken = json.access_token;

    const userInfo = await fetch('https://discord.com/api/users/@me', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }).then(res => res.json());

    const userPresence = await fetch('https://discord.com/api/users/@me/presences', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }).then(res => res.json());

    res.send(`
        <h1>Bem-vindo, ${userInfo.username}!</h1>
        <p>Status Atual: ${userPresence.activities && userPresence.activities.length > 0 ? userPresence.activities[0].name : 'Offline'}</p>
    `);
});

app.listen(port, () => {
    console.log(`App rodando em http://localhost:${port}`);
});
