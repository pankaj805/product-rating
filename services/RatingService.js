import { MongoHelper } from 'pkmongo';
import * as MongoCollection from '../common/constants/MongoCollection';

export async function addRatingForProduct(product_id, user_id, rating) {
    let dataTobeInserted = {
        product_id, user_id, rating
    }
    await MongoHelper.insertOne(MongoCollection.PRODUCT_RATINGS, dataTobeInserted);
}

export async function getProductRatingForUser(product_id, user_id) {
    return await MongoHelper.findOneByCriteria(MongoCollection.PRODUCT_RATINGS, { product_id, user_id });
}

export async function updateRatingForProduct(product_id, user_id, rating) {
    await MongoHelper.updateOneByCriteria(MongoCollection.PRODUCT_RATINGS, { product_id, user_id }, { rating });
}