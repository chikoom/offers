![Offers Message Board](https://res.cloudinary.com/chikoom/image/upload/v1604988001/offers/offers_1_b3jxck.png)

# Offerzzz - לוח מודעות

Simlpe sales-board app with user login (JWT), create as Nuxt.js Universal app (SSR)


## HOW TO INSTALL

**You can download and install in one of two ways:**

 1. Fork/Clone the repository and run : 
 

> npm install >> npm run build >> npm start  // then browse to http://localhost:3000
> (.env file is included in the Repo)

 OR 
 
 2. Download the **Docker Image** [from Here](https://we.tl/t-krzDz19e4w) and run :

>  docker load -i offers.2.0.0.tar 
>  docker run -p 3000:3000 offers_board
> // then browse to http://localhost:3000

## FEATURES

 - Users are able to Login/Logout (JWT Authentication)
 - Users are able to register and submit new offer
 - Phone/Email click opens the respective app
 - See how many users watching their offer **(NOT YET IMPLEMENTED)**
 - Data is stored in JSON files
 - Responsive front-end
 - RESTfull API

## TODOS LEFT

 - Connect Socket.io to Nuxt for dynamic updating of "Currently viewing you ad"
 - Popup Modal Error massages
 - More server side data validation
 - Fix transition/Vuex deprecated warnings
 - Some Design issues
 
 
## SCREENSHOTS
 - Homepage
![Offers Message Board](https://res.cloudinary.com/chikoom/image/upload/v1604988001/offers/offers_1_b3jxck.png)
 
 - You can Create a new user User:
 ![Offers Message Board](https://res.cloudinary.com/chikoom/image/upload/v1604988001/offers/offers_2_pz1aka.png)
 
 - Or login with email: testUser@gmail.com , password: testUser
![Offers Message Board](https://res.cloudinary.com/chikoom/image/upload/v1604988001/offers/offers_3_guwvcq.png)
 
 - Then Create your offer and submit it
![Offers Message Board](https://res.cloudinary.com/chikoom/image/upload/v1604988001/offers/offers_4_jclexw.png)

- You will see it at your user page and in the main page
![Offers Message Board](https://res.cloudinary.com/chikoom/image/upload/v1604988000/offers/offers_5_vrevpi.png)