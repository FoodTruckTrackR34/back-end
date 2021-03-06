# Food Truck Back-End endpoints

Back-end baseURL: https://food-truck-back-end-lambda.herokuapp.com

Deployed web app: 
https://front-end-1-forked-by-josh.vercel.app/

## Auth

### /api/auth/register [POST]
For registration. No restrictions. Expects an object structured like this:  
```
{
  username: "josh2",  
  password: "esvewrerg",  
  email: "abc@123.com",  
  role: "diner",  
}
```  

Returns an object like this:  
```
{  
  user_id: 3,  
  username: "josh2",  
  role: "diner"  
}
```
 
### /api/auth/login [POST]
 For logging in. No restrictions. Expects
```
{
  username: "",
  password: ""
}
```
Returns
```
{ 
  message: "Welcome",
  token,
  role: `${decodedToken.role}`,
  userData: {
              user_id: `${user.user_id}`,
              username: `${user.username}`,
              email: `${user.email}`,
              role: `${user.role}`,
              latitude: `${user.latitude}`,
              longitude: `${user.longitude}`
           }
}
```

### /api/auth/diner-location [PUT]
For updating/adding diner location. Requires a token in the Authorization header, and token's role must be `diner`. Expects an object structured like this:

```
{ 
  latitude: [float],  
  longitude: [float], 
  username: ""
}
```

Returns a the complete user object.


## Trucks

### /api/trucks [GET]
For getting an array of all existing food trucks. Requires a token in the Authorization header. Expects no data as input.
Returns array of all trucks, structured like this:
```
[
    {
        truck_id: 3,
        truckName: "Good Food",
        imageOfTruck: "www.truckimages.com",
        cuisineType: "hi",
        departureTimeString: "2:00 PM",
        latitude: 1.323,
        longitude: 2.2323323,
        user_id: 2
    }
]
```
user_id represents the operator of the truck.

### /api/trucks [POST]
For posting a new truck. Requires a token in the Authorization header, and the token's role must be `operator`. Expects
```
{
    truckName: "",
    imageOfTruck: "[image_url_goes_here]",
    cuisineType: "",
    departureTimeString: "[must_be_a_string]",
    latitude: [coordinate_system_float_latitude],
    longitude: [coordinate_system_float_longitude],
    user_id: 1
}
```
Notably `imageOfTruck` must be unique and not null; `cuisineType` must be not null; and `user_id` (the user_id of the operator posting the truck) must be a not null and an integer. Returns the added truck, e.g.,

```
{
    truck_id: 5,
    truckName: "big truck 1"
    imageOfTruck: "www.truckimages3.com",
    cuisineType: "food",
    departureTimeString: null,
    latitude: 1.938474,
    longitude: 2.003283,
    user_id: 1
}
```

### /api/trucks/:id [PUT]
For updating the truck of the given :id. Requires a token in the Authorization header, and the token's role must be `operator`. Expects (same as POST)

```
{
    imageOfTruck: "[image_url_goes_here]",
    truckName: "",
    cuisineType: "",
    departureTimeString: "[must_be_a_string]",
    latitude: [coordinate_system_float_latitude],
    longitude: [coordinate_system_float_longitude],
    user_id: 1
}
```

### /api/trucks/:id [DELETE]
For deleting the truck of the given :id parameter. Requires a token in the Authorization header, and the token's role must be `operator`. Expects no input. Returns,
`{ message: "Deleted truck with id ${id} from database" }`


## Menus

### /api/menus [GET]
For getting all menus of all trucks. Requires a token in the Authorization header. Expects no input. Returns and array of menus, e.g.,
```
[
    {
        "truck_id": 3,
        "truckName": "big truck 2",
        "cuisineType": "this type",
        "itemName": "chicken",
        "itemDescription": "boiled",
        "itemPhoto": "www.chickenimages.com",
        "itemPrice": 21
    },
    {
        "truck_id": 2,
        "truckName": "big truck 2",
        "cuisineType": "hi",
        "itemName": "chicken",
        "itemDescription": "fried",
        "itemPhoto": "www.chickenimages.com",
        "itemPrice": 22
    },
]
```
There may be multiple menus per truck.

### /api/menus/:id [GET]
For getting menus of the truck with truck_id of the given :id parameter. Requires a token in the Authorization header. Again, to be clear, :id represents the *truck* id. Returns, e.g.,

```
[
    {
        "truck_id": 3,
        "truckName": "big truck 2",
        "cuisineType": "mexican",
        "itemName": "chicken",
        "itemDescription": "boiled",
        "itemPhoto": "www.chickenimages.com",
        "itemPrice": 21
    },
    {
        "truck_id": 2,
        "truckName": null,
        "cuisineType": "bangers and mash",
        "itemName": "bangers and mash",
        "itemDescription": "more bangers",
        "itemPhoto": "www.makinbangers.com",
        "itemPrice": 2
    },
]
```

### /api/menus/:id [POST]
For adding menu to truck with a truck_id of :id. Requires a token in the Authorization header, and the token's role must be `operator`. Expects,
```
    {
        "itemName": "bread",
        "itemDescription": "bread bread",
        "itemPhoto": "www.breadbread.com",
        "itemPrice": 10
    }
```
Notably, neither itemPrice nor itemName may be null. Returns the menuItem object, with the truckId and truckName with which it is associated,
```
{
    "truck_id": 5,
    "truckName": "big truck 1"
    "cuisineType": "hi",
    "itemName": "MORE FOOD for truck 5",
    "itemDescription": "food",
    "itemPhoto": "www.food.com",
    "itemPrice": 10
}
```


## Truck Ratings

### Note: it is assumed that rating *scale* will be determined and enforced client-side. That is, as they are currently set up, these endpoints could work for any integer rating scale (i.e., x out of 5, x out of 10, etc.).

### /api/trucks/add-rating [POST]
For adding a rating to a truck with a truck_id specified in the request body. Requires a token in the Authorization header, and the token's role must be `diner`. Expects,
```
{
    "truck_id": [int],
    "user_id": [int],
    "rating": [int]
}
```
Where user_id is the id of the user submitting the rating. Returns a success message.

### /api/trucks/get-all-truck-ratings [GET]
For getting all truck ratings and associated data. Requires a token in the Authorization header. Expects no input. Returns an array, like this,
```
[
    {
        "truckRatings_id": 3,
        "rating": 8,
        "truck_id": 3,
        "user_id": 1
    },
    {
        "truckRatings_id": 4,
        "rating": 6,
        "truck_id": 3,
        "user_id": 3
    },
]
```

### /api/trucks/get-truck-rating-avg [GET]
For getting the average rating (rounded) of all trucks. Requires a token in the Authorization header. Labeled by truck_id. Returns an array, formatted like this,
```
[
    {
        "avgRating": 7,
        "truck_id": 3
    },
    {
        "avgRating": 3,
        "truck_id": 6
    }
]
```
with both avgRating and truck_id being integers.


## Favorite Trucks

### /api/favorites [GET]
For getting all user-truck favorite combinations. Returns an array, like this,
```
[
    {
        "favorites_id": 12,
        "user_id": 3,
        "truckName": "truck with a name",
        "latitude": 4.23,
        "longitude": 6.633222233
    },
    {
        "favorites_id": 3,
        "user_id": 1,
        "truckName": "another truck",
        "latitude": 80.2333,
        "longitude": 29.622222333
    }
]
```

### /api/favorites/:id [GET]
For getting the favorite trucks of user with user_id equal to the given :id parameter. Returns an array, like this,
```
[
    {
        "favorites_id": 9,
        "user_id": 3,
        "truckName": null,
        "latitude": 2.2,
        "longitude": 6.6
    },
    {
        "favorites_id": 11,
        "user_id": 3,
        "truckName": "hi",
        "latitude": 2.4,
        "longitude": 6.2
    },
]
```
This would be for the endpoint `/api/favorites/3`, i.e., for a user_id of 3.

### /api/favorites [POST]
For adding new truck to user's favorites. Expects an object like this, in req.body,
```
{
    "user_id": 3,
    "truck_id": 6
}
```
Where 3 is the user_id of the user who has favorited the the truck with a truck_id of 6. A given combination of user_id and truck_id may occur only once in the table. If a duplicate is being submitted the request response should be a 403.


### /api/favorites [DELETE]
Removes the favorite relationship between the user and the truck specified in the request body ("un-favorites" based on truck_id and user_id combination). Expects a request body of the form
```
{
  user_id: [int],
  truck_id: [int]
}
```


## Note regarding token and role restrictions as of 2/3/2021, ~6:00 PM ET:
### Disregard this note. See note from 2/5/2021, ~6:30 PM ET, below.
I am not running token and role checks on the backend endpoints, because my frontend team was 
having trouble getting their axiosWithAuth to send the token returned by the login POST request above. 
So they are taking care of Authorization by means of private routing — i.e., they are simply setting the token 
returned by a successful login to localStorage, and then checking for the presence or absence of that token with a 
<PrivateRoute path="/path" component={componentName} /> for all their restricted components. 
So, again, at present there are no token or role checks on the back-end, which means that they do not at present 
need to run axiosWithAuth on the restricted data endpoints; however, it is possible that, if we get the front-end 
axiosWithAuth working for our team, I will add back in the token and role restrictions on the back end.

## Notable recent changes and additions, 2/3/2021, ~10:00 PM ET:
- Everything now returns and expects `latitude` and `longitude` *not* `lat` and `lng`, as in previous version. 

- Latitude and longitude may now be floats instead of ints.

- `truckName` is now a property of all trucks, but it may be null, to preserve the integrity of existing data.

- Menus section added above

## Notable recent changes and additions, 2/4/2021, ~7:15 PM ET:
- There is now no longer a unique constraint for the `truckImage` url string

- `departureTime` has been renamed to `departureTimeString` and now accepts a string

- Truck Ratings section added above

- The main trucks get request, `/api/trucks [GET]`, now includes the property `user_id`, which is the user_id of the truck's operator.

## Additions, 2/5/21, ~2:45 AM:
- Favorite Trucks endpoints added

## Notable recent changes and additions, 2/5/2021, ~6:30 PM ET:
- Token and role restrictions are now live; disregard the note (2/3/2021, ~6:00 PM ET) above
