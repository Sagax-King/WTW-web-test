import express from 'express';
import controller from '../controllers/cities';
const router = express.Router();

router.get('/countries', controller.getCountries);
router.get('/cities/:code', controller.getCitiesForCountry);

export = router;