"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.colorFromString = exports.Tag = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const colorFromString = str => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    let value = hash >> i * 8 & 0xff;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
};
exports.colorFromString = colorFromString;
const Tag = props => /*#__PURE__*/_react.default.createElement(_antd.Tag, _extends({
  color: colorFromString(props.id)
}, props), props.title);
exports.Tag = Tag;
const TagsList = props => {
  const {
    tags = []
  } = props;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "tag-list"
  }, tags.map(tag => /*#__PURE__*/_react.default.createElement(Tag, {
    key: tag.id,
    id: tag.id,
    title: tag.title
  })));
};
var _default = TagsList;
exports.default = _default;