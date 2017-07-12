import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';
import fs from 'fs';

/*eslint-disable no-console*/

const port = 3000;
const app = express();

app.use(compression());
app.use(express.static('build'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/mapData', (req, res) => {
    var filePath = path.join(__dirname, 'mapData.json');
    console.log('Returning map data:' + filePath);
    fs.readFile(filePath, function(err, data) {
        if (err) {
            res.writeHead(404);
            return res.end("File not found.");
        }

        res.setHeader("Content-Type", 'application/json'); //Solution!
        res.writeHead(200);
        res.end(data);
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../' + req.path));
});

app.listen(port, (err) => {
    if(err) {
        console.log(err);
    } else {
        open(`http://localhost:${port}`);
    }
});