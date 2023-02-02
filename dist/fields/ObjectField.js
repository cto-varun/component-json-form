"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _fields = _interopRequireDefault(require("./fields.less"));
var _utils = require("../utils");
var _CheckboxWidget = _interopRequireDefault(require("../widgets/CheckboxWidget"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
class ObjectField extends _react.Component {
  constructor() {
    return super(...arguments), this.getClassName = type => {
      return {
        boolean: _fields.default.boolean
      }[type] || '';
    }, this;
  }
  get schema() {
    const schema = this.props.schema.properties;
    if (schema['$ref']) {
      const ref = schema['$ref'].split('/').pop();
      if (ref) {
        return this.props.definitions[ref];
      }
    }
    return schema;
  }
  get fields() {
    var _this = this;
    const keys = Object.keys(this.schema);
    const formData = this.props.formData || {};
    const propertyEnabledUndefined = this.schema === undefined || this.schema.enabled === undefined;
    const formsEnabled = propertyEnabledUndefined || formData.enabled;
    const onChange = key => function () {
      let value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      _this.props.onChange && _this.props.onChange({
        ...formData,
        [key]: value
      });
    };
    const notNestedElements = [];
    const nestedElements = [];
    const requiredList = this.props.schema.required;
    /* eslint-disable-next-line */
    keys.forEach(key => {
      if (!propertyEnabledUndefined && key === 'enabled') return false;
      const schema = this.schema[key];
      if ((0, _utils.isConstant)(schema) || schema.hidden) {
        return;
      }
      const uiSchema = (this.props.uiSchema || {})[key] || {};
      const value = formData[key];
      const required = (schema.required || requiredList && requiredList.includes(key)) && !value;
      const additionalClassName = this.getClassName(schema.type);
      const element = (0, _utils.getField)({
        value,
        schema,
        uiSchema,
        key,
        formData,
        required,
        definitions: this.props.definitions,
        disabled: !formsEnabled,
        onChange: onChange(key),
        className: (0, _classnames.default)(_fields.default.field, required ? _fields.default.required : '', additionalClassName)
      });
      if (schema.type === 'object') {
        nestedElements.push(element);
      } else {
        notNestedElements.push(element);
      }
    });
    return [/*#__PURE__*/_react.default.createElement("div", {
      className: _fields.default['lowest-fields'],
      key: "wrapper"
    }, notNestedElements)].concat(nestedElements);
  }
  get title() {
    const {
      title,
      schema,
      formData,
      onChange
    } = this.props;
    if (!title) return false;
    const togglable = schema.properties.enabled !== undefined;
    const _onChange = value => {
      const newFormData = {
        ...(formData || {}),
        enabled: value
      };
      onChange && onChange(newFormData);
    };
    const value = (this.props.formData || {}).enabled;
    if (togglable) {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: _fields.default['title-wrapper']
      }, /*#__PURE__*/_react.default.createElement(_CheckboxWidget.default, {
        value: value,
        schema: this.props.schema.properties.enabled,
        onChange: _onChange
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)(_fields.default.title, _fields.default.togglable),
        onClick: () => _onChange(!value)
      }, title));
    }
    return /*#__PURE__*/_react.default.createElement("div", {
      className: _fields.default['title-wrapper']
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: _fields.default.title
    }, title));
  }
  render() {
    if (!this.props.schema || !this.props.schema.properties) return false;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)(_fields.default['object-field'], this.props.className)
    }, this.title, /*#__PURE__*/_react.default.createElement("div", {
      className: _fields.default['fields-list']
    }, this.fields));
  }
}
var _default = ObjectField;
exports.default = _default;
module.exports = exports.default;