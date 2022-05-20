 import {readFile} from 'fs/promises';

import dotenv from 'dotenv';
dotenv.config();

import connect from './db/connect.js';
import Jobs from './models/Interviews.js';

const start=async()=>{
    try {
        await connect(process.env.MONGO_URL)
        const jsonProducts=JSON.parse(await readFile(new URL('./MOCK_DATA.json',import.meta.url)))
        await Jobs.create(jsonProducts)
        console.log("first")
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1) 
    }
}

start();