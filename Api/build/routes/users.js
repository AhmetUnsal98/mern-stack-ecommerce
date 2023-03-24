"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _users = _interopRequireDefault(require("../db/users"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = router => {
  router.get("/users", async (req, res) => {
    try {
      const users = await _users.default.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  router.get("/users/delete/:id", async (req, res) => {
    try {
      await _users.default.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  });
};
exports.default = _default;