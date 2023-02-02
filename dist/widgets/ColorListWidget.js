"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _camelCase2 = _interopRequireDefault(require("lodash/camelCase"));
var _startCase2 = _interopRequireDefault(require("lodash/startCase"));
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _widgets = _interopRequireDefault(require("./widgets.less"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ColorListWidget = props => {
  const colors = ['black', 'blue', 'brown', 'cyan', 'green', 'magenta', 'purple', 'orange', 'red', 'yellow', 'white'];
  return /*#__PURE__*/_react.default.createElement(_antd.Select, props, colors.map(color => /*#__PURE__*/_react.default.createElement(_antd.Select.Option, {
    key: color,
    value: color
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: _widgets.default.option
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: _widgets.default.color,
    style: {
      backgroundColor: color
    }
  }), (0, _startCase2.default)((0, _camelCase2.default)(color))))));
};
var _default = ColorListWidget;
exports.default = _default;
module.exports = exports.default;