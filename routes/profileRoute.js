const express=require('express');
const Router=express.Router();
const profileController=require('../controllers/profile/profileController');

Router.post('/getallusers',profileController.getAllUsers);

Router.post('/getfriends',profileController.getFriends);

module.exports=Router;