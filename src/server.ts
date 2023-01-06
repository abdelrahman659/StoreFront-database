import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import config from './config';
import routes from './routers/index';
const app: express.Application = express();
// check the port in env file if not found use port 5000
const port = config.port || 3000;
//Returns middleware 
app.use(express.json());
app.use(bodyParser.json());
app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})
app.use('/api',routes);

app.use((_req:Request,res:Response)=>{
    res.status(404).json({
        message:"Read the API documentation to find the correct path"
    })
})
app.listen(3000, function () {
    console.log(`starting app on: ${port}`)
})

export default app;
