import "reflect-metadata";
import express from "express";
import cors from "cors";


import userRoutes from './routes/userRoutes'
import itemRoutes from './routes/itemRoutes'
import authRoutes  from './routes/authRoutes'

import { AppDataSource } from "./database/data-source";

//
async function main() {
  try{
    //db
    await AppDataSource.initialize();

    const app = express();
    app.use(cors());
    app.use(express.json());

  
    
    //routes views
    app.use('/', authRoutes);
    app.use('/users', userRoutes);
    app.use('/items', itemRoutes);

    //Start server
    const port = 7000;
    app.listen(port, () => {
    console.log(`Servidor do Achei! esperando reqs: http://localhost:${port} OU http://127.0.0.1:${port}`);
      });

  }catch(error){
    throw error;
  }
};

main();
