import { Router } from 'express';
let router = Router();
import * as ProductController from '../controllers/ProductController';
import { VALID_RATINGS } from '../common/constants/CommonConstants';


router.get('/:product_id', async (req, res, next) => {
    try {
        let product_id = parseInt(req.params.product_id);
        res.data = await ProductController.getProductDetails(product_id);
        next();
    } catch (e) {
        next(e);
    }
})

router.post('/:product_id/rating', async (req, res, next) => {
    try {

        let { rating, user_id } = req.body;
        // Ideally no need to send user_id, we can extract it from session.


        // Validation for rating
        if (!rating || VALID_RATINGS.indexOf(rating) == -1) {
            var err = new Error("Please send a valid rating!");
            err.code = 1001;
            err.status = 400;
            next(err);
        }

        let product_id = parseInt(req.params.product_id);

        res.data = await ProductController.addReview(product_id, user_id, rating);
        next();
    } catch (e) {
        next(e);
    }
})

router.put('/:product_id/rating', async (req, res, next) => {
    try {

        let { rating, user_id } = req.body;
        // Ideally no need to send user_id, we can extract it from session.

        // Validation for rating
        if (!rating || VALID_RATINGS.indexOf(rating) == -1) {
            var err = new Error("Please send a valid rating!");
            err.code = 1001;
            err.status = 400;
            next(err);
        }

        let product_id = parseInt(req.params.product_id);

        res.data = await ProductController.updateReview(product_id, user_id, rating);
        next();
    } catch (e) {
        next(e);
    }
})

export default router;