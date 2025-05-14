import { Router } from 'express';
const router = Router();

router.get('/', (__req, res) => {
    res.json({
        message: 'Users'
    });
});

export default router;