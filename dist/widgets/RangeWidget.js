"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _antd = require("antd");
var _utils = require("react-jsonschema-form/lib/utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function RangeWidget(props) {
  const {
    schema
  } = props;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "field-range-wrapper"
  }, /*#__PURE__*/_react.default.createElement(_antd.Slider, _extends({
    type: "range"
  }, props, (0, _utils.rangeSpec)(schema))));
}
if (process.env.NODE_ENV !== 'production') {
  RangeWidget.propTypes = {
    value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])
  };
}
var _default = RangeWidget;
exports.default = _default;
module.exports = exports.default;