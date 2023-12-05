const express = require("express");
const uuid = require("uuid");
const members = require("../../Members");

const route = express.Router();

route.get("/", (req, res) => res.json(members));

// Get a singel member
route.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  const singelMember = members.filter(
    (member) => member.id === parseInt(req.params.id)
  );
  if (found) {
    res.send(singelMember);
  } else {
    res.status(404).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

// Create Member
route.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: `Please add name and email` });
  }
  members.push(newMember);
  res.json(members);
});

// Update member
route.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    const updateMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updateMember.name ? updateMember.name : member.name;
        member.email = updateMember.email ? updateMember.email : member.email;

        res.json({ msg: "Member updated", member });
      }
    });
  } else {
    res.status(400).json({ msg: `No member with id of ${req.params.id}` });
  }
});

// Delete member
route.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: "Member deleted",
      members: members.filter(
        (member) => member.id !== parseInt(req.params.id)
      ),
    });
  } else {
    res.status(404).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

module.exports = route;
