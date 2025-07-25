# Restaurant Management System

Sistema de gerenciamento de restaurante com frontend Angular, backend Node.js/Express e banco de dados PostgreSQL.

## 🐳 Docker Compose Setup

Este projeto utiliza Docker Compose para gerenciar todos os serviços com as dependências corretas.

### Pré-requisitos

- Docker Desktop instalado e rodando
- Git (para clonar o repositório)

### Estrutura dos Serviços

1. **Database (PostgreSQL)** - Porta 5432
2. **Backend (Node.js/Express)** - Porta 3000 (depende do database)
3. **Frontend (Angular)** - Porta 4200 (depende do backend)

### Seed Automático (Simplificado)

O seed agora roda diretamente no backend quando a variável `AUTO_SEED=true` está definida:

- **Mais eficiente**: Sem container adicional
- **Menos RAM**: Apenas 3 containers em vez de 4
- **Controlável**: Pode ser habilitado/desabilitado facilmente

**Controle do Seed:**

```bash
# No .env ou variável de ambiente
AUTO_SEED=true   # Executa seed automaticamente
AUTO_SEED=false  # Não executa seed
```

### Como Executar

```bash
# Com seed automático
docker-compose up --build

# Sem seed (definir variável)
AUTO_SEED=false docker-compose up --build
```

### URLs de Acesso

- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:3000
- **Database**: localhost:5432

### Comandos Úteis

```bash
# Ver logs de um serviço específico
docker-compose logs backend
docker-compose logs frontend
docker-compose logs db

# Parar todos os serviços
docker-compose down

# Remover volumes (limpar dados do banco)
docker-compose down -v

# Reconstruir apenas um serviço
docker-compose up --build backend

# Executar comandos dentro de um container
docker-compose exec backend npm run seed:mock  # Executar seed manualmente
docker-compose exec db psql -U postgres -d restaurant_db

# Controlar seed via variável de ambiente
AUTO_SEED=false docker-compose up --build  # Iniciar sem seed
AUTO_SEED=true docker-compose up --build   # Iniciar com seed
```

### Ordem de Inicialização

O Docker Compose está configurado com health checks para garantir a ordem correta:

1. **Database** inicia primeiro e fica pronto para conexões
2. **Backend** aguarda o database estar saudável antes de iniciar
   - Se `AUTO_SEED=true`, executa os dados de exemplo automaticamente
3. **Frontend** aguarda o backend estar saudável antes de iniciar

### Variáveis de Ambiente

As configurações estão no arquivo `.env`:

```env
# Database
POSTGRES_DB=restaurant_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres123
DB_PORT=5432

# Backend
BACKEND_PORT=3000
DATABASE_URL=postgresql://postgres:postgres123@db:5432/restaurant_db

# Frontend
FRONTEND_PORT=4200
```

### Troubleshooting

#### Problema: Frontend não acessa o Backend

**1. Teste a conectividade:**

```bash
test-connectivity.bat
```

**2. Verifique se o backend está respondendo:**

```bash
curl http://localhost:3000/health
curl http://localhost:3000/customers
```

**3. Verifique os logs:**

```bash
docker-compose logs backend
docker-compose logs frontend
```

**4. Verifique se todos os containers estão rodando:**

```bash
docker-compose ps
```

#### Problema: Portas já em uso

```bash
# Verificar quais portas estão em uso
netstat -an | find "4200"
netstat -an | find "3000"
netstat -an | find "5432"

# Parar processos que estão usando as portas
# Ou alterar as portas no docker-compose.yml
```

#### Problema: Database não conecta

```bash
# Verificar logs do database
docker-compose logs db

# Verificar health check
docker-compose ps
```

#### Problema: Frontend não acessa backend

```bash
# Verificar se o backend está rodando
curl http://localhost:3000/health

# Verificar logs
docker-compose logs backend
```

### Desenvolvimento

Para desenvolvimento, você pode:

1. Manter o database no Docker
2. Rodar backend e frontend localmente para hot reload

```bash
# Manter apenas o database
docker-compose up db

# Backend local
cd backend
npm run dev

# Frontend local
cd frontend
ng serve
```
