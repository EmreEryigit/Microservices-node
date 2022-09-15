const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const handleEvent = async (type, data) => {
    if (type === "CommentCreated") {
        const status = data.content.includes("orange")
            ? "rejected"
            : "approved";
        await axios.post("http://event-bus-srv:4005/events", {
            type: "CommentModerated",
            data: {
                ...data,
                status,
            },
        });
    }
};

app.post("/events", async (req, res) => {
    const { type, data } = req.body;
    await handleEvent(type, data);
    res.send({});
});

app.listen(4003, async () => {
    console.log("moderation listening on 4003");

    try {
        const res = await axios.get("http://event-bus-srv:4005/events");
        for (let event of res.data) {
            console.log(event.data)
            console.log("Processing event:", event.type);
            await handleEvent(event.type, event.data);
        }
    } catch (e) {
        console.log(e.message);
    }
});
