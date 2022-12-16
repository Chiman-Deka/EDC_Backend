const Notification = require("../../model/notification");


const fetchallNotificationPublic = async (req, res) => {
    try {
        const pevents = await Notification.find({});
        res.json(pevents);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Internal server Error occured");
    }
}



exports.fetchallNotificationPublic = fetchallNotificationPublic;