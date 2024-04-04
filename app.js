// app.js (updated)

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

const postsFilePath = path.join(__dirname, 'data', 'posts.json');

app.get('/api/posts', (req, res) => {
    fs.readFile(postsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        try {
            const posts = JSON.parse(data);
            res.json(posts);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});

app.post('/api/posts', (req, res) => {
    const newPost = req.body;
    fs.readFile(postsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        try {
            const posts = JSON.parse(data);
            newPost.id = Date.now().toString(); // Assign unique ID
            posts.push(newPost);
            fs.writeFile(postsFilePath, JSON.stringify(posts, null, 2), (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Internal server error' });
                    return;
                }
                res.status(201).json(newPost);
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});

app.delete('/api/posts/:postId', (req, res) => {
    const postId = req.params.postId;
    fs.readFile(postsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        try {
            let posts = JSON.parse(data);
            posts = posts.filter(post => post.id !== postId);
            fs.writeFile(postsFilePath, JSON.stringify(posts, null, 2), (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Internal server error' });
                    return;
                }
                res.status(200).json({ message: 'Post deleted successfully' });
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
