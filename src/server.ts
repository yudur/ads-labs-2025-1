import express from 'express';
import { config } from './config/env';

const app = express();

app.get("/", (req: any, res: any) => {
  return res.json({ message: "hello word" });
});

app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`); 
    });