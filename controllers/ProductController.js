import * as ProductService from '../services/ProductService';
import { checkProductHistoryForUser } from '../services/OrderService';
import { addRatingForProduct, getProductRatingForUser, updateRatingForProduct } from '../services/RatingService'

export const getProductDetails = ProductService.getProductDetails;

export const addReview = async (product_id, user_id, rating) => {
    let isPrevBoughtItem = await checkProductHistoryForUser(product_id, user_id);

    if (!isPrevBoughtItem) {
        var err = new Error("You have not purchased the product before!");
        err.code = 1002;
        err.status = 403;
        throw err;
    }

    let isPrevRated = await getProductRatingForUser(product_id, user_id);

    if( isPrevRated && isPrevRated.rating){
        var err = new Error("You have rated the product before!");
        err.code = 1003;
        err.status = 403;
        throw err;
    }

    await addRatingForProduct(product_id, user_id, rating);
    return await ProductService.addProductRatingToAverage(product_id, rating);
}


export const updateReview = async (product_id, user_id, rating) => {
    let isPrevBoughtItem = await checkProductHistoryForUser(product_id, user_id);

    if (!isPrevBoughtItem) {
        var err = new Error("You have not purchased the product before!");
        err.code = 1002;
        err.status = 403;
        throw err;
    }

    let isPrevRated = await getProductRatingForUser(product_id, user_id);

    if(!isPrevRated){
        var err = new Error("You have not rated the product before!");
        err.code = 1003;
        err.status = 403;
        throw err;
    }

    await updateRatingForProduct(product_id, user_id, rating);
    return await ProductService.updateProductRatingAverage(product_id, isPrevRated.rating, rating);

}