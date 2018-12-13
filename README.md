# React Study App Project 

## Intro

This is an optional project for those who want to keep practicing building React applications over winter break. 

This project will be less guided than what you are used to building so far. There will be no design files provided, nor will there be a specified MVP. We are simply providing you with an API and a documentation for the API, and it is up to you to figure out how to use them to build a front end project. 

Building this without as much guidance as you have become accustomed to will be an invaluable learning experience and this will also provide you with an exceptional portfolio piece.

Feel free to work on this alone or find a partner to build with. If you choose to work with a partner make sure you are familiar with how to collaborate on github so as to avoid merge conflicts.

The server is still in beta. Changes may be made to it that could require minor changes to your own code. Join the `#fsw15-winter-break-project` channel to be alerted about any updates as well as to chat with your fellow students about the project.

___

## The Project

Get started by forking and cloning this repo and running `create-react-app`. Remember to submit a Pull Request on your first commit. 

[We have built an API for you to use in this project](https://lambda-study-app.herokuapp.com/api/)   
[Here is the repo for the API if you are interested in taking a look at how this all works on the backend!](https://github.com/llwor94/study-app-api)

The application has two major parts. The quiz section, and the forum section. 

The documentation will guide you as to how to interact with these routes and it is up to you as to how you would like to integrate them into your client app. If you have any questions about the API, reach out to Lauren. 

You will have to do a some further reading into [axios](https://github.com/axios/axios) regarding setting headers and sending in param queries. 

* ### Authentication 

This project requires authentication.
In the `/api/auth/login` and `/api/auth/register` routes the success response will provide you with a token. Simply store that token value on your local storage and send that value in to any route that requires authentication. [Here is an example](https://codesandbox.io/s/yq2rp725p1). Feel free to play around with it and look at the console for the response objects that are being logged there. 

To log out a user, simply remove the token from your local storage.

---

We will have a demo after break where you will be able to share your projects with the cohort if you choose. 
Feel free to reach out to Lauren or Trevor with any questions you may have. Good luck and have fun!
