const fs = require('fs');
const express = require('express')
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = process.env.PORT || 3001


app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'))
})

app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'db/db.json'))
})

app.post('/api/notes', (req, res) => {
    let note = req.body;
    note.id = uuidv4()
    fs.readFile(path.join(__dirname,'db/db.json'),'utf8' , (err, data) => {
      if (err) {
        console.error('ERROR!', err)
      }
      else {
        let data_array = JSON.parse(data);
        data_array.push(note)
        fs.writeFile(path.join(__dirname,'db/db.json'), JSON.stringify(dataArr), (err) => {
          (err) ? console.log('ERROR!', err) : console.log('Successfully Written!')
        } )
      }
    })
    res.send('Saved')
})

app.delete('/api/notes/:id', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error('ERROR!', err);
        } else {
            const id = req.params.id;
            const modified_array = JSON.parse(data);
            let new_notes = modified_array.filter(notes => notes.id != id);
            fs.writeFile('./db/db.json', JSON.stringify(new_notes, null, 4), (err) =>
                err ? console.log('ERROR!', err) : console.log('Succesfully Deleted!'));
        }
    });
    res.send('Deleted');
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
  });
  

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});