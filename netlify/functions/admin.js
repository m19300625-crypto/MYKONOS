import { createClient } from '@libsql/client/web';

export const handler = async (event, context) => {
    // 1. Configuração de CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Authorization, Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    // 2. PROTEÇÃO DA ROTA (Validação do Token Secreto)
    const authHeader = event.headers.authorization;
    const secret = process.env.ADMIN_SECRET;

    if (!authHeader || authHeader !== `Bearer ${secret}`) {
        return { 
            statusCode: 401, 
            headers, 
            body: JSON.stringify({ error: "Acesso Negado. Token inválido." }) 
        };
    }

    // 3. Conexão Segura ao Turso (Acontece apenas no Servidor)
    const turso = createClient({
        url: process.env.TURSO_DB_URL,
        authToken: process.env.TURSO_DB_TOKEN,
    });

    try {
        if (event.httpMethod === 'GET') {
            // Exemplo: Buscar serviços
            // const result = await turso.execute('SELECT * FROM services');
            return { 
                statusCode: 200, 
                headers, 
                body: JSON.stringify({ message: "Autenticado com sucesso!", data: [] }) 
            };
        }

        if (event.httpMethod === 'POST') {
            const body = JSON.parse(event.body);
            // Exemplo: Atualizar um preço
            // await turso.execute({ sql: 'UPDATE services SET price = ? WHERE id = ?', args: [body.price, body.id] });
            return { 
                statusCode: 200, 
                headers, 
                body: JSON.stringify({ message: "Dados atualizados com sucesso!" }) 
            };
        }

        return { statusCode: 405, headers, body: 'Method Not Allowed' };

    } catch (error) {
        console.error("Erro na BD:", error);
        return { 
            statusCode: 500, 
            headers, 
            body: JSON.stringify({ error: "Erro interno no servidor." }) 
        };
    }
};
