const router = require('express').Router();
const watsonSession = require('./api/watson');

router.get('/', (req, res) => res.json({message: 'online'}));
router.get('/session', watsonSession.session);
router.get('/message/:id/:type/:text', watsonSession.message);


module.exports = router;