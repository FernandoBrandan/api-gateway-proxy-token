import { Router } from 'express';
const router = Router();

router.get('/', (__req, res) => {
    console.log('vercel');

    res.json({
        message: 'Users - vercel'
    });
});

export default router;