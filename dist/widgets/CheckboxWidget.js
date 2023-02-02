"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _antd = require("antd");
var _DescriptionField = _interopRequireDefault(require("react-jsonschema-form/lib/components/fields/DescriptionField"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function CheckboxWidget(props) {
  const {
    schema,
    value,
    required,
    disabled,
    readonly,
    label,
    autofocus,
    onBlur,
    onFocus,
    onChange
  } = props;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: `checkbox ${disabled || readonly ? 'disabled' : ''}`
  }, schema.description && /*#__PURE__*/_react.default.createElement(_DescriptionField.default, {
    description: schema.description
  }), /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement(_antd.Checkbox, {
    checked: !!value,
    required: required,
    disabled: disabled || readonly,
    autoFocus: autofocus,
    onChange: event => onChange(event.target.checked),
    onBlur: onBlur && (event => onBlur(event.target.checked)),
    onFocus: onFocus && (event => onFocus(event.target.checked))
  })));
}
CheckboxWidget.defaultProps = {
  autofocus: false
};
if (process.env.NODE_ENV !== 'production') {
  CheckboxWidget.propTypes = {
    schema: _propTypes.default.object.isRequired,
    value: _propTypes.default.bool,
    required: _propTypes.default.bool,
    disabled: _propTypes.default.bool,
    readonly: _propTypes.default.bool,
    autofocus: _propTypes.default.bool,
    onChange: _propTypes.default.func
  };
}
var _default = CheckboxWidget;
exports.default = _default;
module.exports = exports.default;