// const express = require("express");
const Event = require("../../model/events");
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dmyd12iwm',
  api_key: '244432794532938',
  api_secret: 'HJ3_PdoaXxQDEXC9zFPRO0I5GoY'
})

const fetchallEvents = async (req, res) => {
  try {
    const events = await Event.find({ user: req.user.id });      // all notes have been fetched...we are using the fetchuser where user is in the req.user
    // const events = await Event.find({});
    res.json(events);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Internal server Error occured");
  }
}


const addEvent = async (req, res) => {
  try {
    try {
      const { title, description, url} = req.body;     
      const event = new Event({     
        title,
        description,
        url,
        user: req.user.id,
      });
      const savedEvent = await event.save();  
      res.json(savedEvent);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Internal server Error occured");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Internal server Error occured");
  }
}

const updateEvent = async (req, res) => {
  try {
    const { title, description } = req.body;
        // Create a newEvent  object
        const newEvent = {};
        if(title){newEvent.title = title};  
        if(description){newEvent.description = description};  

        // Find the event to be updated and update it
        let event= await Event.findById(req.params._id);   // it returns the document by its respective id... here id is from this one "/updateevent/:id"
        if(!event){return res.status(404).send("Not Found")}   // if the eventdocument does not even exist

        // if(event.user.toString() !== req.user._id){        // here user is the object id of the selected eventdocumnet...if !== then user is trying to acces the events of other user
        //     return res.status(401).send("Not Allowed");
        // }

        // now we have the eventdocuumnet and only the user is accesing it
        event= await Event.findByIdAndUpdate(req.params._id, {$set: newEvent}, {new:true})   // now eventdocument is updated
        res.json({event});
      
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Internal server Error occured");
  }
}

const deleteEvent = async (req, res) => {
  try {
    const { title, description } = req.body;

        // Find the eventto be deleted and delete it
        let event= await Event.findById(req.params._id);   // it returns the document by its respective id... here id is from this one "/updateevent/:id"
        if(!event){return res.status(404).send("Not Found")}   // if the eventdocument does not even exist

        // if(event.user.toString() !== req.user._id){        // here user is the object id of the selected eventdocumnet...if !== then user is trying to acces the events of other user
        //     return res.status(401).send("Not Allowed");
        // }

        // now we have the eventdocuumnet and only the user is accesing it
        event= await Event.findByIdAndDelete(req.params._id)   // now eventdocument is updated
        res.json({"Success": "The event has been deleted", event: event});
      
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Internal server Error occured");
  }
}


// module.exports = router;
exports.addEvent = addEvent;
exports.updateEvent = updateEvent;
exports.deleteEvent = deleteEvent;
exports.fetchallEvents = fetchallEvents;
