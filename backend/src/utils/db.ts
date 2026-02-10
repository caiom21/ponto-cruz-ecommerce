import fs from 'fs';
import path from 'path';

const dbPath = path.resolve(__dirname, '../../db.json');

export const readDatabase = () => {
  try {
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler o banco de dados:', error);
    // Se o arquivo não existir, podemos retornar uma estrutura padrão
    return { users: [], products: [] };
  }
};

export const writeDatabase = (data: any) => {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Erro ao escrever no banco de dados:', error);
  }
};
