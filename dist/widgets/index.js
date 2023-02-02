"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CheckboxWidget = _interopRequireDefault(require("./CheckboxWidget"));
var _BaseInput = _interopRequireDefault(require("./BaseInput"));
var _SelectWidget = _interopRequireDefault(require("./SelectWidget.js"));
var _RadioWidget = _interopRequireDefault(require("./RadioWidget.js"));
var _RangeWidget = _interopRequireDefault(require("./RangeWidget.js"));
var _TextareaWidget = _interopRequireDefault(require("./TextareaWidget"));
var _TagsWidget = _interopRequireDefault(require("./TagsWidget"));
var _ColorListWidget = _interopRequireDefault(require("./ColorListWidget"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import FileWidget from './FileWidget.js';
var _default = {
  CheckboxWidget: _CheckboxWidget.default,
  BaseInput: _BaseInput.default,
  SelectWidget: _SelectWidget.default,
  RadioWidget: _RadioWidget.default,
  // FileWidget, // Needs testing endpoint
  RangeWidget: _RangeWidget.default,
  // DateWidget, // BaseInput's event 'onChange' passes SyntheticEvent as argument, but antd's DatePicker passes Moment.js object. 'react-jsonschema-form' can't handle it properly
  TextareaWidget: _TextareaWidget.default,
  TagsWidget: _TagsWidget.default,
  ColorListWidget: _ColorListWidget.default
};
exports.default = _default;
module.exports = exports.default;