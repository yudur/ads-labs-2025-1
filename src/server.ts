import app from './app';
import { config } from './config/env';
import { sequelize } from './config/database';
import { setupAssociations } from './models/associations';

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('connect db');

    await sequelize.sync();

    setupAssociations();

    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`); 
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

startServer()