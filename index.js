require('./db/connection')
const express=require('express');
const bodyParser=require('body-parser');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.urlencoded({ extended: false }));

const author=require('./router/author')

const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.status(200).send({
   message: 'welcome to The Blog API'
}));
app.use('/author',author)


app.listen(port, () => console.log(`Server is running on PORT ${port}`));