# Live Updating Tree View Application
Back-End Programming Challenge : Demonstrate your knowledge of several technologies, including databases, backend design, and UI/UX by creating a live-updating tree view as a web application.

## Requirements
- The ​tree ​should ​contain ​a ​group ​of ​nodes, ​with ​a main ​(root) ​node ​that ​can ​have ​any ​number ​of ‘factories’.
- These ​factory ​nodes ​can ​in ​turn ​generate ​a ​set amount ​of ​random ​numbers ​(up ​to ​15), represented ​as ​child ​nodes ​of ​their ​respective factories.
- Factories ​and ​children ​should ​be ​created through ​some ​means ​of ​user ​input ​(right ​click, button ​press, ​etc) ​specifying ​the ​number ​of children ​to ​generate ​(up ​to ​15) ​and ​the ​ranges ​of those ​children.
- Factories ​should ​have ​an ​adjustable ​name assigned ​to ​them, ​be ​removable, ​and ​have ​an adjustable ​lower ​and ​upper ​bound ​for ​the random ​number ​generation.
- You ​may ​use ​any ​programming ​languages ​and front-end ​design ​styles ​of ​your ​choosing ​to create ​the ​project.
- All ​users ​should ​see ​any ​changes ​made ​to the ​tree ​immediately ​across ​browsers without ​refreshing ​or ​polling.
- The ​state ​of ​the ​tree ​should ​remain persistent; ​reloading ​should ​not ​undo ​any state.
- All ​of ​a ​factory’s ​existing ​child ​nodes ​should be ​removed ​upon ​each ​new ​generation.
- Your ​project ​should ​be ​secure, ​validate inputs, ​and ​protect ​against ​injections.
- Your ​project ​should ​be ​hosted ​on ​the ​web using ​a ​service ​such ​as ​Amazon ​AWS ​or Heroku ​to ​run ​your ​submission.
- The ​project ​should ​exhibit ​both ​a ​frontend and ​backend ​codebase ​built ​by ​you.
- Use ​a ​database ​on ​your ​backend, ​not ​Firebase.
- Please ​submit ​your ​project, ​link, ​and ​source to ​the ​email ​listed ​below.

## Stack Used
+ **MEAN Stack**
	+ [MongoDB](https://www.mongodb.com/) 
	+ [AngularJS (1.6.9)](https://angularjs.org/) 
	+ [ExpressJS](https://expressjs.com/)
	+ [NodeJS](https://nodejs.org/en/)
+ [Socket.io](https://socket.io/) - For real-time bidirectional communication
+ [AngularJS Material](https://material.angularjs.org/)

## Deployment
+ Application runs on **port: 3000**, both on localhost as well as the AWS server
+ **To deploy the project locally**
	+ Make sure you have NodeJS and MongoDB installed on your system
	+ AngularJS and AngularJS Material are download from a CDN
	+ Clone this Git repository
	+ Go to the root of the downloaded project
	+ Run `npm install`
	+ Run `node server.js`
	+ Visit [localhost:3000](localhost:3000)

+ **AWS Deployment**
	+ The application has been deployed to an AWS server
	+ Check out [ec2-18-191-252-51.us-east-2.compute.amazonaws.com:3000](ec2-18-191-252-51.us-east-2.compute.amazonaws.com:3000)
	+ If you encounter any issues with the AWS instance, please contact me on shantanu.rajenimbalkar@gmail.com and I will fix it as soon as possible.