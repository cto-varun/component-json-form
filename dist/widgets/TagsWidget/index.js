"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _antd = require("antd");
var _compatible = require("@ant-design/compatible");
var _tagsWidget = _interopRequireDefault(require("./tags-widget.less"));
var _TagsList = require("./TagsList");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
class TagsWidget extends _react.Component {
  constructor() {
    return super(...arguments), this.getValues = () => {
      const {
        value,
        isColorful,
        getTagTitle,
        confirmDelete
      } = this.props;
      const getColor = v => isColorful ? (0, _TagsList.colorFromString)(v) : undefined;
      return value.map((v, index) => /*#__PURE__*/_react.default.createElement("div", {
        key: v,
        className: _tagsWidget.default.tag
      }, /*#__PURE__*/_react.default.createElement(_antd.Tag, {
        color: getColor(v)
      }, getTagTitle ? getTagTitle(v) : v), confirmDelete ? /*#__PURE__*/_react.default.createElement(_antd.Popconfirm, {
        title: `Are you sure you want to delete?`,
        okText: "Yes",
        cancelText: "No",
        className: _tagsWidget.default.delete,
        type: "danger",
        onConfirm: () => this.onDelete(index),
        icon: /*#__PURE__*/_react.default.createElement(_compatible.Icon, {
          type: "exclamation-circle",
          theme: "filled",
          style: {
            color: 'red'
          }
        })
      }, /*#__PURE__*/_react.default.createElement(_compatible.Icon, {
        className: _tagsWidget.default['delete-tag'],
        type: "close"
      })) : /*#__PURE__*/_react.default.createElement(_compatible.Icon, {
        className: _tagsWidget.default['delete-tag'],
        type: "close",
        onClick: () => this.onDelete(index)
      })));
    }, this.onDelete = index => {
      const values = this.props.value;
      delete values[index];
      this.props.onChange(values.filter(x => !!x));
    }, this.onChange = _ref => {
      let [newVal] = _ref;
      if (this.props.onChange) {
        const index = this.props.value.indexOf(newVal);
        if (index > -1 && this.props.showDropdown) {
          this.onDelete(index);
        } else if (newVal) {
          this.props.onChange([...this.props.value, newVal]);
        }
      }
    }, this.getSelect = () => {
      const {
        className,
        showDropdown,
        children,
        ...rest
      } = this.props;
      return /*#__PURE__*/_react.default.createElement(_antd.Select, _extends({
        className: className,
        mode: "tags"
        // style={{ width: '512px' }}
        ,
        autoClearSearchValue: true,
        showArrow: false,
        dropdownStyle: showDropdown ? undefined : {
          display: 'none'
        }
      }, rest, {
        dropdownMatchSelectWidth: false,
        filterOption: false,
        notFoundContent: false,
        onChange: this.onChange,
        value: [],
        ref: ref => this.input = ref
      }), children);
    }, this.render = () => {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: _tagsWidget.default['tags-widget'],
        onClick: () => this.input.focus()
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: _tagsWidget.default.tags
      }, this.getValues()), this.getSelect());
    }, this;
  }
}
TagsWidget.defaultProps = {
  value: [],
  isColorful: false,
  getTagTitle: false,
  confirmDelete: false
};
var _default = TagsWidget;
exports.default = _default;
module.exports = exports.default;