"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _antd = require("antd");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function BaseInput(props) {
  // Note: since React 15.2.0 we can't forward unknown element attributes, so we
  // exclude the "options" and "schema" ones here.
  // if (!props.id) {
  //   throw new Error(`no id for props ${JSON.stringify(props)}`);
  // }

  const {
    value,
    readonly,
    disabled,
    autofocus,
    onBlur,
    onFocus,
    options = {},
    schema,
    formContext,
    registry,
    rawErrors,
    ...inputProps
  } = props;
  inputProps.type = options.inputType || inputProps.type || 'text';
  const onChange = _ref => {
    let {
      target: {
        value
      }
    } = _ref;
    return props.onChange && props.onChange(value === '' ? options.emptyValue : value);
  };
  return /*#__PURE__*/_react.default.createElement(_antd.Input, _extends({
    id: inputProps.id,
    className: "form-control",
    readOnly: readonly,
    disabled: disabled,
    autoFocus: autofocus,
    value: value == null ? '' : value
  }, inputProps, {
    onChange: onChange,
    onBlur: onBlur && (event => onBlur(inputProps.id, event.target.value)),
    onFocus: onFocus && (event => onFocus(inputProps.id, event.target.value))
  }));
}
BaseInput.defaultProps = {
  type: 'text',
  required: false,
  disabled: false,
  readonly: false,
  autofocus: false
};
if (process.env.NODE_ENV !== 'production') {
  BaseInput.propTypes = {
    placeholder: _propTypes.default.string,
    value: _propTypes.default.any,
    required: _propTypes.default.bool,
    disabled: _propTypes.default.bool,
    readonly: _propTypes.default.bool,
    autofocus: _propTypes.default.bool,
    onChange: _propTypes.default.func,
    onBlur: _propTypes.default.func,
    onFocus: _propTypes.default.func
  };
}
var _default = BaseInput;
exports.default = _default;
module.exports = exports.default;