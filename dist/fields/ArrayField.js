"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _compatible = require("@ant-design/compatible");
var _utils = require("../utils");
var _AddButton = _interopRequireDefault(require("../components/AddButton"));
var _IconButton = _interopRequireDefault(require("../components/IconButton"));
var _fields = _interopRequireDefault(require("./fields.less"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
class ArrayField extends _react.Component {
  constructor() {
    var _this;
    return (super(...arguments), _this = this), this.getToolbar = _ref => {
      let {
        index,
        maxIndex,
        ...props
      } = _ref;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "col-xs-3 array-item-toolbox"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: _fields.default['button-group']
      }, index > 0 && /*#__PURE__*/_react.default.createElement(_IconButton.default, {
        icon: /*#__PURE__*/_react.default.createElement(_compatible.Icon, {
          type: "up"
        }),
        className: (0, _classnames.default)('array-item-move-up', _fields.default.button),
        disabled: props.disabled || props.readonly,
        onClick: () => props.onReorder(index, index - 1)
      }), index < maxIndex && /*#__PURE__*/_react.default.createElement(_IconButton.default, {
        icon: /*#__PURE__*/_react.default.createElement(_compatible.Icon, {
          type: "down"
        }),
        className: (0, _classnames.default)('array-item-move-down', _fields.default.button),
        disabled: props.disabled || props.readonly,
        onClick: () => props.onReorder(index, index + 1)
      }), (props.minItems === undefined || maxIndex + 1 > props.minItems) && /*#__PURE__*/_react.default.createElement(_IconButton.default, {
        type: "danger",
        icon: /*#__PURE__*/_react.default.createElement(_compatible.Icon, {
          type: "close"
        }),
        className: (0, _classnames.default)('array-item-remove', _fields.default.button),
        disabled: props.disabled || props.readonly,
        onClick: () => props.onRemove(index)
      })));
    }, this.onChange = index => function () {
      let value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      const newFormData = [..._this.formData];
      newFormData[index] = value;
      _this.props.onChange && _this.props.onChange(newFormData);
    }, this.onAdd = () => {
      this.onChange(this.formData.length)();
    }, this.onRemove = index => {
      const newFormData = [...this.formData].filter((_, i) => i !== index);
      this.props.onChange && this.props.onChange(newFormData);
    }, this.onReorder = (index, newIndex) => {
      const newFormData = [...this.formData];
      const temp = newFormData[index];
      newFormData[index] = newFormData[newIndex];
      newFormData[newIndex] = temp;
      this.props.onChange && this.props.onChange(newFormData);
    }, this.render = () => {
      const {
        schema,
        uiSchema,
        disabled,
        definitions,
        ...props
      } = this.props;
      const {
        onChange,
        onReorder,
        onRemove,
        onAdd
      } = this;
      const {
        formData
      } = this;
      return /*#__PURE__*/_react.default.createElement("div", null, formData && formData.map((value, key) => /*#__PURE__*/_react.default.createElement("div", {
        key: key
      }, (0, _utils.getField)({
        value,
        schema: this.schema,
        uiSchema,
        formData,
        definitions,
        disabled,
        onChange: onChange(key)
      }), this.getToolbar({
        index: key,
        maxIndex: formData.length - 1,
        onReorder,
        onRemove,
        disabled,
        ...schema
      }))), (formData === undefined || schema.maxItems === undefined || formData.length < schema.maxItems) && /*#__PURE__*/_react.default.createElement(_AddButton.default, {
        className: "array-item-add",
        onClick: onAdd,
        disabled: disabled || props.readonly
      }));
    }, this;
  }
  get formData() {
    const {
      formData
    } = this.props;
    return typeof formData === 'string' ? formData.split(',') : formData;
  }
  get schema() {
    const schema = this.props.schema.items;
    if (schema.$ref) {
      const ref = schema.$ref.split('/').pop();
      if (ref) {
        return this.props.definitions[ref];
      }
    }
    return schema;
  }
}
var _default = ArrayField;
exports.default = _default;
module.exports = exports.default;