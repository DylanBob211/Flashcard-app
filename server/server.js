const express = require('express')
const cors = require('cors')
const request = require("request");

const app = express()

const URL = 'https://translate.yandex.net/api/v1.5/tr/translate'
const key = 'trnsl.1.1.20190708T121747Z.01ac6564636ef01e.c1f2621aa834e2ab8d58b26e6d9402ebe9e3aeec'

app.use(express.json())
app.use(cors())


app.post('/', (req, res) => {

    const options = {  
        method: 'POST',
        url: URL,
        qs: { 
            key: key,
            lang: req.body.lang || 'it-ru' 
        },
        headers: { 
            'cache-control': 'no-cache',
            'Content-Type': 'application/x-www-form-urlencoded' 
        },
        form: { 
            text: req.body.word || 'gatto', 
            undefined: undefined 
        } 
    }

    request(options, (error, response, body) => {
        if (error) throw new Error(error);
        res.send(body)
        //TODO: understand why API sends XML and not JSON
      });
      
})



const port = process.env.PORT || 5000
app.listen(port, () => { console.log(`listening on port ${port}`)})