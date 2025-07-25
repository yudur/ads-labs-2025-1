import app from './app';
import { config } from './config/env';
import { sequelize } from './config/database';
import { setupAssociations } from './models/associations';
import { runSeed } from './seeds/mock';

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('connect db');

    await sequelize.sync();

    setupAssociations();

    // Executar seed automaticamente se habilitado
    if (process.env.AUTO_SEED === 'true') {
      console.log('🌱 Auto seed habilitado. Executando seed...');
      try {
        await runSeed();
        console.log('✅ Seed executado com sucesso!');
      } catch (seedError) {
        console.error('❌ Erro ao executar seed:', seedError);
      }
    }

    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`); 
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

startServer()