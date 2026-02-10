import dotenv from 'dotenv';

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || 'seu_segredo_super_secreto_e_muito_longo_para_ser_seguro';
