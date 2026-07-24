const express = require("express");
const pollsRouter = express.Router();
const { Poll, Option, Vote } = require("../models");

pollsRouter.get("/", async (req, res, next) => {
  try {
    const allPolls = await Poll.findAll();

    return res.json(allPolls);
  } catch (err) {
    next(err);
  }
});
pollsRouter.get("/:id", async (req, res, next) => {
  try {
    const poll = await Poll.findByPk(req.params.id, {
      include: [
        {
          model: Option,
          as: "options",
          include:[
      {
        model: Vote,
        as: "votes",
      },
    ],
        },
      ],
  });
   console.log(poll);
    if (!poll) {
  return res.sendStatus(404);
}

console.log(JSON.stringify(poll, null, 2));

res.json(poll);
  } catch (err) {
    next(err);
  }
});

pollsRouter.post("/create", async (req, res, next) => {
  try {
    const { title, description, options } = req.body;
    const newPoll = await Poll.create({ title, description });
  if (options && Array.isArray(options)) {
    const optionPromises = options.map((item) =>
    Option.create({ text: item.text, pollId: newPoll.id })
  );
    await Promise.all(optionPromises);
}

    return res.status(201).json(newPoll);
  } catch (err) {
    next(err);
  }
});

pollsRouter.post("/:id/vote", async (req, res, next) => {
  try {
    const { tableName, optionId } = req.body;
    const newVote = await Vote.create({ tableName, optionId });
    const voted = await Vote.findOne({
      where: { optionId: optionId },
    });
    if (!voted) {
      return res.status(404).json();
    } else {
      res.status(201).json(voted)
    }
  } catch (err) {
    next(err);
  }
});

pollsRouter.delete("/:id", async (req, res, next) => {
  try {
    const deleteOption = await Poll.findByPk(req.params.id);

    if (!deleteOption) {
      return await res.status(404).json();
    }
     await deleteOption.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});
pollsRouter.use((err, req, res, next) => {
  console.error(err);
  res.sendStatus(500);
});
module.exports = pollsRouter;
