const express = require("express");
const faker = require("faker");
const router = express.Router();
const userService = require("./user.service");
const gigService = require("../gigs/gig.service");

const seed = (many = 10) => {
  const type = Math.random() >= 0.5 ? "pro" : "visitor";
  const userData = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.internet.userName().toLowerCase(),
    avatar: faker.internet.avatar(),
    email: faker.internet.email(),
    password: "test",
    type
  };
  userService
    .create(userData)
    .then((res, err) => {
      if (err) return;
      if (userData.type == "pro") {
        const gigData = {
          _userId: res,
          _providerName: `${userData.firstName} ${userData.lastName}`,
          _rating: Math.random() * 4 + 1,
          title: faker.company.catchPhrase(),
          image: [
            faker.image.business(),
            faker.image.people(),
            faker.image.technics()
          ],
          price: Math.ceil(Math.random() * 5 + 1) * 10
        };
        gigService.create(gigData).then((res, err) => {});
      }
      return "10";
    })
    .catch(err => console.log(err));
};

// routes
router.post("/authenticate", authenticate);
router.post("/register", register);
router.get("/", getAll);
router.get("/seed", seed);
router.get("/current", getCurrent);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);

module.exports = router;

function authenticate(req, res, next) {
  userService
    .authenticate(req.body)
    .then(user =>
      user
        ? res.json(user)
        : res.status(400).json({ message: "Username or password is incorrect" })
    )
    .catch(err => next(err));
}

function register(req, res, next) {
  userService
    .create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function getAll(req, res, next) {
  userService
    .getAll()
    .then(users => res.json(users))
    .catch(err => next(err));
}

function getCurrent(req, res, next) {
  userService
    .getById(req.user.sub)
    .then(user => (user ? res.json(user) : res.sendStatus(404)))
    .catch(err => next(err));
}

function getById(req, res, next) {
  userService
    .getById(req.params.id)
    .then(user => (user ? res.json(user) : res.sendStatus(404)))
    .catch(err => next(err));
}

function update(req, res, next) {
  userService
    .update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function _delete(req, res, next) {
  userService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}
