import { MongoHelper } from 'pkmongo';
import * as MongoCollection from '../common/constants/MongoCollection';

export async function getProductDetails(product_id) {
    return await MongoHelper.findOneByCriteria(MongoCollection.PRODUCTS, { "id": product_id });
}


export async function addProductRatingToAverage(product_id, rating) {

    let product = await getProductDetails(product_id);
    let totalRatings = product.avg_rating * product.num_of_ratings;

    let newCount = product.num_of_ratings + 1;
    let newTotal = totalRatings + rating;
    let newAvg = newTotal / newCount;

    await MongoHelper.updateOneByCriteria(MongoCollection.PRODUCTS, { id: product_id }, { avg_rating: newAvg, num_of_ratings: newCount })

    return {
        avg_rating: newAvg,
        num_of_ratings: newCount
    }
}


export async function updateProductRatingAverage(product_id, oldRating, rating) {

    let product = await getProductDetails(product_id);
    let totalRatings = product.avg_rating * product.num_of_ratings;
    totalRatings = totalRatings - oldRating;
    let newTotal = totalRatings + rating;
    let newAvg = newTotal / product.num_of_ratings;

    await MongoHelper.updateOneByCriteria(MongoCollection.PRODUCTS, { id: product_id }, { avg_rating: newAvg })

    return {
        avg_rating: newAvg
    }
}

