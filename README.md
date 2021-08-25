# SatVI
Craiglist-like WebSite.\
I've first started this project with its frontend, using it as a learning and testing playground during internship.\
Last week of internship I've started learning backend with help of an intern friend. After Internship, I had to disconnect it from company's backend so I decided to build the backend to see it working again.\
It is not finished, as it was never intended to be.\
It is now live on https://satvi.yektaseckinsatir.com/ for demonstration\
Demo database is hosted as read-only. You may use:\
email:    guest@deneme.son\
password: guest
### I may be updating (hopefully) with instructions on running it in your local environment
A brief summary for now: Install python, pip, nodejs, and react. In backend directory run: ```pip install - r requirements.txt; uvicorn main:app --reload```. In frontend, after installing imported packages, run ```npm start```.\
Then update origins array in main.py to contain the link to your frontend as a string without the / at the end.\
And update the parameters which call the ApolloClient constructor with your backend url.


https://user-images.githubusercontent.com/62249520/130761281-bb66bc26-235e-4a86-8119-932930483ce5.mp4

