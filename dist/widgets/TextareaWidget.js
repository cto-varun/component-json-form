"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _antd = require("antd");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function TextareaWidget(props) {
  const {
    id,
    options,
    placeholder,
    value,
    required,
    disabled,
    readonly,
    autofocus,
    onChange,
    onBlur,
    onFocus
  } = props;
  const _onChange = _ref => {
    let {
      target: {
        value
      }
    } = _ref;
    return onChange(value === '' ? options.emptyValue : value);
  };
  return /*#__PURE__*/_react.default.createElement(_antd.Input.TextArea, {
    id: id,
    className: "form-control",
    value: typeof value === 'undefined' ? '' : value,
    placeholder: placeholder,
    required: required,
    disabled: disabled,
    readOnly: readonly,
    autoFocus: autofocus,
    rows: options.rows,
    onBlur: onBlur && (event => onBlur(id, event.target.value)),
    onFocus: onFocus && (event => onFocus(id, event.target.value)),
    onChange: _onChange
  });
}
TextareaWidget.defaultProps = {
  autofocus: false,
  options: {}
};
if (process.env.NODE_ENV !== 'production') {
  TextareaWidget.propTypes = {
    schema: _propTypes.default.object.isRequired,
    placeholder: _propTypes.default.string,
    options: _propTypes.default.shape({
      rows: _propTypes.default.number
    }),
    value: _propTypes.default.string,
    required: _propTypes.default.bool,
    disabled: _propTypes.default.bool,
    readonly: _propTypes.default.bool,
    autofocus: _propTypes.default.bool,
    onChange: _propTypes.default.func,
    onBlur: _propTypes.default.func,
    onFocus: _propTypes.default.func
  };
}
var _default = TextareaWidget;
exports.default = _default;
module.exports = exports.default;