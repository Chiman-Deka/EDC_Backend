const Event = require("../../model/events");


const fetchallEventsPublic = async (req, res) => {
    try {
        const pevents = await Event.find({});
        res.json(pevents);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Internal server Error occured");
    }
}



exports.fetchallEventsPublic = fetchallEventsPublic;

