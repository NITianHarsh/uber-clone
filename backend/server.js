import http, { createServer } from 'http'
import app from './app.js'
import { log } from 'console';
const port = process.env.PORT || 3000;

const server = http.createServer(app);
server.listen(port, ()=>{
    console.log(`Server is listening and running on port ${port}`);
    
});