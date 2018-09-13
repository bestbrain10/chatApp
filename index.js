

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.ENV.port || 4000;
const Controller = require('./controller');


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}));
app.use('/js', )




app.get(Controller.get)
app.router(`/:msg`)
   .put(Controller.update)
   .delete(Controller.delete)
   .post(Controlller.create)


app.use(Controller.error)
   //last defender of errors
app.listen(port, () => {
    console.log(`Redis chat app is running on port ${port}`);
})