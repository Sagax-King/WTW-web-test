import express from 'express';
import controller from '../controllers/temperatures';
const router = express.Router();

router.get('/graph/:code', controller.getGraph);

export = router;