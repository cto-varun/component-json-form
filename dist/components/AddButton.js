"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AddButton;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _compatible = require("@ant-design/compatible");
var _IconButton = _interopRequireDefault(require("./IconButton"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function AddButton(_ref) {
  let {
    className,
    onClick,
    disabled
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    type: "info",
    icon: /*#__PURE__*/_react.default.createElement(_compatible.Icon, {
      type: "plus"
    }),
    className: (0, _classnames.default)('btn-add', className),
    onClick: onClick,
    disabled: disabled
  });
}
module.exports = exports.default;