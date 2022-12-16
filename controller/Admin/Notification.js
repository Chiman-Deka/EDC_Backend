const Notification = require("../../model/notification");

const fetchallNotification = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.user.id });
        res.json(notifications);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Internal server Error occured");
    }
};

const addNotification = async (req, res) => {
    try {
        try {
            const { title } = req.body;
            const notification = new Notification({
                title,
                user: req.user.id,
            });
            const savedNotification = await notification.save();
            res.json(savedNotification);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some Internal server Error occured");
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Internal server Error occured");
    }
};

const updateNotification = async (req, res) => {
    try {
        const { title } = req.body;
        const newNotification = {};
        if (title) {
            newNotification.title = title;
        }
        let notification = await Notification.findById(req.params._id); 
        if (!notification) {
            return res.status(404).send("Not Found");
        } 

        // if(event.user.toString() !== req.user._id){        // here user is the object id of the selected eventdocumnet...if !== then user is trying to acces the events of other user
        //     return res.status(401).send("Not Allowed");
        // }

        notification = await Notification.findByIdAndUpdate(
            req.params._id,
            { $set: newNotification },
            { new: true }
        ); // now eventdocument is updated
        res.json({ notification });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Internal server Error occured");
    }
};

const deleteNotification = async (req, res) => {
    try {
        let notification = await Notification.findById(req.params._id); // it returns the document by its respective id... here id is from this one "/updateevent/:id"
        if (!notification) {
            return res.status(404).send("Not Found");
        } 

        // if(event.user.toString() !== req.user._id){        // here user is the object id of the selected eventdocumnet...if !== then user is trying to acces the events of other user
        //     return res.status(401).send("Not Allowed");
        // }

        notification = await Notification.findByIdAndDelete(req.params._id); 
        res.json({ Success: "The event has been deleted", notification: notification });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Internal server Error occured");
    }
};

exports.fetchallNotification = fetchallNotification;
exports.addNotification = addNotification;
exports.updateNotification = updateNotification;
exports.deleteNotification = deleteNotification;
