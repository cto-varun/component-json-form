"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _antd = require("antd");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function RadioWidget(props) {
  const {
    options,
    value,
    required,
    disabled,
    readonly,
    autofocus,
    onBlur,
    onFocus,
    onChange,
    id
  } = props;
  // Generating a unique field name to identify this set of radio buttons
  const name = Math.random().toString();
  const {
    enumOptions,
    enumDisabled,
    inline
  } = options;
  // checked={checked} has been moved above name={name}, As mentioned in #349;
  // this is a temporary fix for radio button rendering bug in React, facebook/react#7630.
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "field-radio-group",
    id: id
  }, enumOptions.map((option, i) => {
    const checked = option.value === value;
    const itemDisabled = enumDisabled && enumDisabled.indexOf(option.value) !== -1;
    const isDisabled = disabled || itemDisabled || readonly;
    const disabledCls = isDisabled ? 'disabled' : '';
    const radio = /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(_antd.Radio, {
      checked: checked,
      name: name,
      required: required,
      value: option.value,
      disabled: isDisabled,
      autoFocus: autofocus && i === 0,
      onChange: _ => onChange(option.value),
      onBlur: onBlur && (event => onBlur(id, event.target.value)),
      onFocus: onFocus && (event => onFocus(id, event.target.value))
    }), /*#__PURE__*/_react.default.createElement("span", null, option.label));
    return inline ? /*#__PURE__*/_react.default.createElement("label", {
      key: i,
      className: `radio-inline ${disabledCls}`
    }, radio) : /*#__PURE__*/_react.default.createElement("div", {
      key: i,
      className: `radio ${disabledCls}`
    }, /*#__PURE__*/_react.default.createElement("label", null, radio));
  }));
}
RadioWidget.defaultProps = {
  autofocus: false
};
if (process.env.NODE_ENV !== 'production') {
  RadioWidget.propTypes = {
    schema: _propTypes.default.object.isRequired,
    id: _propTypes.default.string.isRequired,
    options: _propTypes.default.shape({
      enumOptions: _propTypes.default.array,
      inline: _propTypes.default.bool
    }).isRequired,
    value: _propTypes.default.any,
    required: _propTypes.default.bool,
    disabled: _propTypes.default.bool,
    readonly: _propTypes.default.bool,
    autofocus: _propTypes.default.bool,
    onChange: _propTypes.default.func
  };
}
var _default = RadioWidget;
exports.default = _default;
module.exports = exports.default;