"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _jsonForm = _interopRequireDefault(require("./jsonForm"));
var _jsonForm2 = require("./jsonForm.schema");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = {
  component: _jsonForm.default,
  schema: _jsonForm2.schema,
  ui: _jsonForm2.ui
};
exports.default = _default;
module.exports = exports.default;