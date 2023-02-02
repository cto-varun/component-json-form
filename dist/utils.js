"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fillDefaults = exports.areRequiredFieldsFilled = void 0;
exports.getDefaultRegistry = getDefaultRegistry;
exports.getFieldProps = exports.getField = void 0;
exports.getFields = getFields;
exports.getRegistry = getRegistry;
exports.getWidget = exports.getType = void 0;
exports.getWidgets = getWidgets;
exports.isConstant = void 0;
var _startCase2 = _interopRequireDefault(require("lodash/startCase"));
var _camelCase2 = _interopRequireDefault(require("lodash/camelCase"));
var _react = _interopRequireDefault(require("react"));
var _cloneDeep = _interopRequireDefault(require("lodash/cloneDeep"));
var _utils = require("react-jsonschema-form/lib/utils");
var _fields = _interopRequireDefault(require("./fields/fields.less"));
var _fields2 = _interopRequireDefault(require("react-jsonschema-form/lib/components/fields"));
var _widgets = _interopRequireDefault(require("react-jsonschema-form/lib/components/widgets"));
var _ArrayField = _interopRequireDefault(require("./fields/ArrayField"));
var _ObjectField = _interopRequireDefault(require("./fields/ObjectField"));
var _fields3 = _interopRequireDefault(require("./fields"));
var _widgets2 = _interopRequireDefault(require("./widgets"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const fillDefaults = function (schema) {
  let oldFormData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const formData = (0, _cloneDeep.default)(oldFormData);
  const handle = (schema, formData) => {
    if (schema.properties) {
      Object.keys(schema.properties).forEach(key => {
        const value = schema.properties[key];
        if (value && formData[key] === undefined) {
          if (value.default) {
            formData[key] = value.default;
            if (value.maxItems !== undefined && Array.isArray(formData[key]) && formData[key].length > value.maxItems) formData[key].splice(value.maxItems);
            return;
          }
          if (value.type === 'object') {
            // if object
            formData[key] = {};
            handle(value, formData[key]);
          }
          if (value.items !== undefined) {
            // if array
            formData[key] = [];
          }
        }
      });
    }
  };
  handle(schema, formData);
  return formData;
};
exports.fillDefaults = fillDefaults;
const getFieldProps = _ref => {
  let {
    schema,
    key,
    value,
    uiSchema,
    disabled,
    onChange,
    definitions
  } = _ref;
  return {
    value,
    key,
    onChange,
    disabled,
    definitions,
    title: schema.title || (0, _startCase2.default)((0, _camelCase2.default)(key)),
    schema: schema,
    options: {
      enumOptions: schema.enum && (0, _utils.optionsList)(schema)
    },
    registry: getDefaultRegistry(),
    ...(schema.type === 'object' || schema.type === 'array' ? {
      uiSchema,
      formData: value,
      fieldKey: key
    } : {})
  };
};
exports.getFieldProps = getFieldProps;
const isConstant = schema => schema.enum && schema.enum.length === 1;
exports.isConstant = isConstant;
const getField = _ref2 => {
  let {
    schema,
    uiSchema,
    key,
    formData,
    requiredList,
    className,
    disabled,
    onChange,
    required,
    value,
    definitions
  } = _ref2;
  const Field = getWidget(schema, uiSchema);
  const props = getFieldProps({
    schema,
    key,
    value,
    uiSchema,
    disabled,
    onChange,
    definitions
  });
  const isCheckbox = schema.type === 'boolean';
  const wrapperProps = isCheckbox ? {
    style: {
      cursor: 'pointer'
    },
    onClick: () => props.onChange && props.onChange(!props.value)
  } : {};
  const getTitle = () => {
    const displayTitle = props.title && schema.type !== 'object';
    if (!displayTitle) return false;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: _fields.default['field-title']
    }, props.title, required ? '*' : '');
  };
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: className,
    key: key
  }, wrapperProps), getTitle(), /*#__PURE__*/_react.default.createElement(Field, props));
};
exports.getField = getField;
const areRequiredFieldsFilled = (schema, oldFormData) => {
  const formData = (0, _cloneDeep.default)(oldFormData);
  const checkFields = function (schema) {
    let formData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (schema.properties) {
      return Object.keys(schema.properties).every(key => {
        if (schema.required !== undefined && schema.required.length > 0) {
          return schema.required.every((key // Are all filled
          ) => formData && formData[key] !== undefined && formData[key] !== '');
        }
        return checkFields(schema.properties[key], formData[key]);
      });
    }
    return true;
  };
  return checkFields(schema, formData);
};

/* eslint-disable-next-line */
exports.areRequiredFieldsFilled = areRequiredFieldsFilled;
const getType = _ref3 => {
  let {
    type,
    items,
    ...schema
  } = _ref3;
  if (schema.enum !== undefined) {
    return 'select';
  }

  // if (type === 'object' && (schema.properties || schema.additionalProperties)) {
  //   return 'object';
  // }

  const _type = Array.isArray(type) ? items ? items.type : type[0] : type;

  /* eslint-disable */
  switch (_type) {
    case 'string':
    case 'number':
    case 'integer':
      return 'text';
    case 'boolean':
      return 'checkbox';
    default:
      return _type || type;
  }
  /* eslint-enable */
};
exports.getType = getType;
const getWidget = function () {
  let schema = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let uiSchema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (schema.type === 'object') return _ObjectField.default;
  if (schema.type === 'array') return _ArrayField.default;
  const widget = uiSchema['ui:widget'] || getType(schema);
  if (typeof schema === 'string') return () => /*#__PURE__*/_react.default.createElement("span", null, widget);
  return getWidgets()[{
    checkbox: 'CheckboxWidget',
    password: 'PasswordWidget',
    email: 'EmailWidget',
    hostname: 'TextWidget',
    ipv4: 'TextWidget',
    ipv6: 'TextWidget',
    uri: 'URLWidget',
    'data-url': 'FileWidget',
    textarea: 'TextareaWidget',
    date: 'DateWidget',
    datetime: 'DateTimeWidget',
    'date-time': 'DateTimeWidget',
    'alt-date': 'AltDateWidget',
    'alt-datetime': 'AltDateTimeWidget',
    color: 'ColorWidget',
    file: 'FileWidget',
    text: 'TextWidget',
    select: 'SelectWidget',
    updown: 'UpDownWidget',
    range: 'RangeWidget',
    radio: 'RadioWidget',
    hidden: 'HiddenWidget',
    checkboxes: 'CheckboxesWidget',
    files: 'FileWidget',
    tags: 'TagsWidget',
    colors: 'ColorListWidget'
  }[widget]] || (() => /*#__PURE__*/_react.default.createElement("h1", null, "No widget of type: ", widget));
};
exports.getWidget = getWidget;
function getDefaultRegistry() {
  return {
    fields: _fields3.default,
    widgets: _widgets2.default,
    definitions: {},
    formContext: {}
  };
}
function getRegistry() {
  return {
    fields: getWidgets(),
    widgets: getFields(),
    definitions: {},
    formContext: {}
  };
}
function getWidgets() {
  return {
    ..._widgets.default,
    ..._widgets2.default
  };
}
function getFields() {
  return {
    ..._fields2.default,
    ..._fields3.default
  };
}