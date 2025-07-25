#!/bin/bash

echo "🚀 Iniciando backend do Restaurant App..."

# Função para executar o seed após o servidor estar rodando
run_seed_after_server_start() {
    echo "⏳ Aguardando servidor ficar disponível..."
    
    # Aguardar o servidor estar respondendo (máximo 60 segundos)
    timeout=60
    count=0
    
    while [ $count -lt $timeout ]; do
        if curl -f http://localhost:3000/health >/dev/null 2>&1; then
            echo "✅ Servidor está rodando!"
            break
        fi
        echo "⏳ Tentativa $((count + 1))/$timeout - Aguardando servidor..."
        sleep 2
        count=$((count + 2))
    done
    
    if [ $count -ge $timeout ]; then
        echo "❌ Timeout: Servidor não ficou disponível em $timeout segundos"
        return 1
    fi
    
    # Aguardar mais 5 segundos para garantir que o banco está conectado
    echo "⏳ Aguardando conexão com banco de dados..."
    sleep 5
    
    # Executar o seed
    echo "🌱 Executando seed do banco de dados..."
    npm run seed:mock
    
    if [ $? -eq 0 ]; then
        echo "✅ Seed executado com sucesso!"
    else
        echo "❌ Erro ao executar seed"
    fi
}

# Iniciar o servidor em background
echo "🔧 Iniciando servidor Node.js..."
npm run dev &

# Capturar o PID do processo do servidor
SERVER_PID=$!

# Executar seed em background após o servidor iniciar
run_seed_after_server_start &

# Aguardar o processo do servidor (mantém o container rodando)
wait $SERVER_PID
