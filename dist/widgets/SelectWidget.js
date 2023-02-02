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
const nums = new Set(['number', 'integer']);

/**
 * This is a silly limitation in the DOM where option change event values are
 * always retrieved as strings.
 */
function processValue(schema, value) {
  // 'enum' is a reserved word, so only 'type' and 'items' can be destructed
  const {
    type,
    items
  } = schema;
  if (value === '') {
    return undefined;
  } else if (type === 'array' && items && nums.has(items.type)) {
    return value.map(_utils.asNumber);
  } else if (type === 'boolean') {
    return value === 'true';
  } else if (type === 'number') {
    return (0, _utils.asNumber)(value);
  }

  // If type is undefined, but an enum is present, try and infer the type from
  // the enum values
  if (schema.enum) {
    if (schema.enum.every(x => typeof x === 'number')) {
      return value;
    } else if (schema.enum.every(x => typeof x === 'boolean')) {
      return value === 'true';
    }
  }
  return value;
}
function SelectWidget(props) {
  const {
    schema,
    id,
    options,
    value,
    required,
    disabled,
    readonly,
    multiple,
    autofocus,
    onChange,
    onBlur,
    onFocus,
    placeholder
  } = props;
  const {
    enumOptions,
    enumDisabled
  } = options;
  const emptyValue = multiple ? [] : '';
  return /*#__PURE__*/_react.default.createElement(_antd.Select, {
    id: id,
    size: "default",
    className: "form-control",
    value: typeof value === 'undefined' ? emptyValue : value,
    required: required,
    disabled: disabled || readonly,
    autoFocus: autofocus,
    mode: multiple ? 'multiple' : 'default',
    onBlur: onBlur && (value => onBlur(id, processValue(schema, value))),
    onFocus: onFocus && (value => onFocus(id, processValue(schema, value))),
    onChange: onChange && (value => onChange(processValue(schema, value)))
  }, !multiple && !schema.default && /*#__PURE__*/_react.default.createElement(_antd.Select.Option, {
    value: ""
  }, placeholder), enumOptions.map((_ref, i) => {
    let {
      value,
      label
    } = _ref;
    return /*#__PURE__*/_react.default.createElement(_antd.Select.Option, {
      key: i,
      value: value,
      disabled: enumDisabled && enumDisabled.indexOf(value) !== -1
    }, label);
  }));
}
SelectWidget.defaultProps = {
  autofocus: false
};
if (process.env.NODE_ENV !== 'production') {
  SelectWidget.propTypes = {
    schema: _propTypes.default.object.isRequired,
    options: _propTypes.default.shape({
      enumOptions: _propTypes.default.array
    }).isRequired,
    value: _propTypes.default.any,
    required: _propTypes.default.bool,
    disabled: _propTypes.default.bool,
    readonly: _propTypes.default.bool,
    multiple: _propTypes.default.bool,
    autofocus: _propTypes.default.bool,
    onChange: _propTypes.default.func,
    onBlur: _propTypes.default.func,
    onFocus: _propTypes.default.func
  };
}
var _default = SelectWidget;
exports.default = _default;
module.exports = exports.default;