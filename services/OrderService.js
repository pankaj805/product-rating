import { MongoHelper } from 'pkmongo';
import * as MongoCollection from '../common/constants/MongoCollection';

export async function checkProductHistoryForUser(product_id, user_id) {
    console.log("product_id, user_id:", { product_id, user_id })
    let record = await MongoHelper.findOneByCriteria(MongoCollection.ORDER_LINES, { "prod_id": product_id, "user_id": user_id });
    console.log("record:", record)

    if (record) {
        return true;
    }
    return false;
}