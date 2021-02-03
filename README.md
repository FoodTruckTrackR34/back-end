# Food Truck Back-End endpoints

baseURL: https://food-truck-back-end-lambda.herokuapp.com

## Auth

###/api/auth/register [POST]
For registration. Expects an object structured like this:
`{
  username: "",
  password: "",
  email: "",
  role: "",
}`
Returns an object like this:
`{
  "user_id": 3,
  "username": "josh2",
  "role": "diner"
}`
 
###/api/auth/login [POST]
 For logging in. Expects
`{
  username: "",
  password: ""
}`
Returns
`{ 
  message: "Welcome",
  token,
  role: `${decodedToken.role}`,
  userData: {
              user_id: `${user.user_id}`,
              username: `${user.username}`,
              email: `${user.email}`,
              role: `${user.role}`,
              lat: `${user.lat}`,
              lng: `${user.lng}`
           }
}`

###/api/auth/diner-location [PUT]
For updating/adding diner location. Expects an object structured like this:
{ 
  lat: [int],
  lng: [int],
  username: ""
}
Returns a the complete user object.


## Trucks

###/api/trucks [GET]
For getting an array of all existing food trucks. Requires token in Authorization header. Expects no data as input.
Returns array of all trucks, structured like this:
`[
    {
        truck_id: 3,
        imageOfTruck: "www.truckimages.com",
        cuisineType: "hi",
        departureTime: null,
        lat: 1,
        lng: 2
    }
]`

###/api/trucks [POST]
For posting a new truck. Requires token in Authorization header. User must be an operator. Expects
`{
    imageOfTruck: "[image_url_goes_here]",
    cuisineType: "",
    departureTime: "[must_be_a_datetime_datatype*]",
    lat: [coordinate_system_int_lattitude],
    lng: [coordinate_system_int_longitude],
    user_id: 1
}`
Notably `imageOfTruck` must be unique and not null; `cuisineType` must be not null; and `user_id` (the user_id of the operator posting the truck) must be a not null and an integer.
Returns the added truck, e.g.,
`{
    truck_id: 5,
    imageOfTruck: "www.truckimages3.com",
    cuisineType: "food",
    departureTime: null,
    lat: 1.938474,
    lng: 2.003283,
    user_id: 1
}`
*Maybe don't mess with departureTime until I figure out exactly how datetimes are supposed to be formatted for this database I'm using.

###/api/trucks/:id [PUT]
For updating the truck of the given :id. Requires token in Authorization header. User must be an operator. Expects (same as POST)
{
    imageOfTruck: "[image_url_goes_here]",
    cuisineType: "",
    departureTime: "[must_be_a_datetime_datatype]",
    lat: [coordinate_system_int_lattitude],
    lng: [coordinate_system_int_longitude],
    user_id: 1
}

###/api/trucks/:id [DELETE]
For deleting the truck of the given :id. Requires token in Authorization header. User must be an operator. Expects no input. Returns,
`{ message: "Deleted truck with id ${id} from database" }`

Update 2/3/2021, ~6:00 PM: I am not running token and role checks on the backend endpoints, because my frontend team was 
having trouble getting their axiosWithAuth to send the token returned by the login POST request above. 
So they are taking care of Authorization by means of private routing — i.e., they are simply setting the token 
returned by a successful login to localStorage, and then checking for the presence or absence of that token with a 
<PrivateRoute path="/path" component={componentName} /> for all their restricted components. 
So, again, at present there are no token or role checks on the back-end, which means that they do not at present 
need to run axiosWithAuth on the restricted data endpoints; however, it is possible that, if we get the front-end 
axiosWithAuth working for our team, I will add back in the token and role restrictions on the back end.

