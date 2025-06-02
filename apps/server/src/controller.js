const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const { nanoid } = require("nanoid");

const adapter = new FileSync("data/db.json");
const db = low(adapter);

exports.getAll = (req, res) => {
    setTimeout(() => {
        const posts = db.get("tasks").sortBy("createdDate").reverse().value();
        res.send(posts);
    }, 3000);
};

exports.getCompleted = (req, res) => {
    const posts = db
        .get("tasks")
        .filter((item) => item.completed)
        .sortBy("createdDate")
        .reverse()
        .value();
    res.send(posts);
};

exports.create = (req, res) => {
    if (!req.body.text) {
        res.status(422).send("'text' field must be present in json");
    } else {
        const written = db
            .get("tasks")
            .push({
                id: nanoid(),
                text: req.body.text,
                completed: false,
                createdDate: new Date().getTime(),
            })
            .last()
            .write();
        res.send(written);
    }
};

exports.delete = (req, res) => {
    const id = req.params["id"];
    if (!id) {
        res.status(422).send("'id' must be present in params");
    } else {
        const deleted = db.get("tasks").remove({ id }).write();
        if (deleted.length === 0) {
            res.status(404).send("id not found, nothing to delete");
        } else {
            res.send();
        }
    }
};

exports.updateText = (req, res) => {
    const { text } = req.body;
    const id = req.params["id"];
    if (!text) {
        res.status(422).send("'text' field must be present in json");
    } else if (!id) {
        res.status(422).send("'id' must be present in params");
    } else {
        const written = db.get("tasks").find({ id }).assign({ text }).write();
        res.send(written);
    }
};

exports.complete = (req, res) => {
    const id = req.params["id"];
    if (!id) {
        res.status(422).send("'id' must be present in params");
    } else {
        const completed = db
            .get("tasks")
            .find({
                id,
                completed: false,
            })
            .assign({
                completed: true,
                completedDate: new Date().getTime(),
            })
            .write();
        if (!completed.id) {
            res.status(404).send(
                "id not found or trying to complete already completed item",
            );
        } else {
            res.send(completed);
        }
    }
};

exports.incomplete = (req, res) => {
    const id = req.params["id"];
    if (!id) {
        res.status(422).send("'id' must be present in params");
    } else {
        const incompleted = db
            .get("tasks")
            .find({
                id,
                completed: true,
            })
            .assign({
                completed: false,
                completedDate: undefined,
            })
            .write();
        if (!incompleted.id) {
            res.status(404).send(
                "id not found or trying to incomplete not completed item",
            );
        } else {
            res.send(incompleted);
        }
    }
};

exports.completeAll = (req, res) => {
    const tasks = db
        .get("tasks")
        .filter((task) => !task.completed)
        .value();

    if (tasks.length === 0) {
        res.send({ modified: 0, tasks: [] });
        return;
    }

    const completedTasks = tasks.map((task) => {
        const updated = db
            .get("tasks")
            .find({ id: task.id })
            .assign({
                completed: true,
                completedDate: new Date().getTime(),
            })
            .write();
        return updated;
    });

    res.send({ modified: completedTasks.length, tasks: completedTasks });
};

exports.deleteCompleted = (req, res) => {
    const completedTasks = db
        .get("tasks")
        .filter((task) => task.completed)
        .value();

    if (completedTasks.length === 0) {
        res.send({ deleted: 0 });
        return;
    }

    const deleted = db
        .get("tasks")
        .remove((task) => task.completed)
        .write();

    res.send({ deleted: deleted.length });
};
