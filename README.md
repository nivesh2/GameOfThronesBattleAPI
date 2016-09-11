SetUp project:
 1. Just change the mongo database url to yours in: config>config.js
    - i had used mongo labs(mongoDB service) credentials as a remote database, which i have removed.
 2. run: 
   	- npm install
	- npm start

    to start in debug mode:
	- npm install
	- npm install -g debug
	- DEBUG='main:*' node app.js

 3. lauch in web browser: http://localhost:3000/
 4. You can find the screenshots in the screenshots folder.
 5. Note: comment the csv load middleware once, csv is loaded in the database
 

API routes: 
 local:
    - http://localhost:3000/list
    - http://localhost:3000/count
    - http://localhost:3000/stats
    - http://localhost:3000/search?

