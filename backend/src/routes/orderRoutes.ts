import { Router } from 'express';
import db from '../database';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// POST criar nova encomenda
router.post('/', (req, res) => {
  const {
    productId,
    customerName,
    customerEmail,
    phone,
    customDetails,
    selectedColor,
    selectedFabric,
    size,
    specialInstructions
  } = req.body;

  const id = uuidv4();
  const status = 'pending';

  db.run(
    `INSERT INTO orders 
     (id, productId, customerName, customerEmail, phone, customDetails, 
      selectedColor, selectedFabric, size, specialInstructions, status) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id, productId, customerName, customerEmail, phone, customDetails,
      selectedColor, selectedFabric, size, specialInstructions, status
    ],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ 
        message: 'Encomenda realizada com sucesso!', 
        orderId: id 
      });
    }
  );
});

// GET todas as encomendas
router.get('/', (req, res) => {
  db.all('SELECT * FROM orders ORDER BY createdAt DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

export default router;