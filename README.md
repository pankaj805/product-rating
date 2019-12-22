# product-rating
A sample application to implement simple product rating system


## Sample Schema

![Schema Diagram](https://c.imge.to/2019/12/22/viWBW2.png)

## Sample Data

### users
```
{
    "id": 123,
    "email": "abc@gmail.com",
    "password": "12345678",
    "name": "Pankaj Panigrahi"
}
```

### orders
```
{
    "id": 201,
    "user_id": 123
}
```

### orderlines

```
{
    "user_id": 123,
    "order_id": 201,
    "prod_id": 501
}
```
```
{
    "user_id": 123,
    "order_id": 201,
    "prod_id": 502
}
```

### products

```
{
    "id": 501,
    "name": "IKEA Armchair",
    "price": 100,
    "avg_rating": 3,
    "num_of_ratings": 4
}
```
```
{
    "id": 502,
    "name": "IKEA Sofa",
    "price": 200,
    "avg_rating": 0,
    "num_of_ratings": 0
}
```
```
{
    "id": 503,
    "name": "Hometown Armchair",
    "price": 80,
    "avg_rating": 0,
    "num_of_ratings": 0
}
```

### prod_ratings

```
{
    "product_id": 501,
    "user_id": 171,
    "rating": 4
}
```
```
{
    "product_id": 501,
    "user_id": 123,
    "rating": 3
}
```


## POSTMAN COLLECTION TO RUN
https://www.getpostman.com/collections/00ff55fd97fb8eb8aeea
