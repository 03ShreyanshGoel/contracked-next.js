import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes';
import { updateContests } from './cron/updateContests';

dotenv.config();

const app = express();
const allowedOrigins = [
    "http://localhost:3000", 
    "https://contracked.vercel.app"
]
app.use(cors({
    // origin: 'https://contracked.vercel.app'
    origin: (origin,callback)=>{
        if(!origin) return callback(null, true);
        if(allowedOrigins.includes(origin)){
            return callback(null, true);
        }else{
            return callback(new Error("Not allowed by CORS"));
        }
    },
    credentials:true,
}));

app.use(express.json());
app.use('/api', routes);

// Run contest update on server start
updateContests();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
