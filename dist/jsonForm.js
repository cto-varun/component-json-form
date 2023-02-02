"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _ObjectField = _interopRequireDefault(require("./fields/ObjectField"));
var _utils = require("react-jsonschema-form/lib/utils");
var _validate = _interopRequireDefault(require("react-jsonschema-form/lib/validate"));
var _utils2 = require("./utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
class JsonFormComponent extends _react.Component {
  constructor() {
    var _this;
    return (super(...arguments), _this = this), this.state = {
      formData: {},
      valid: undefined
    }, this.validate = function () {
      let formData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props.formData;
      const valid = (0, _validate.default)(formData, _this.props.schema) && (0, _utils2.areRequiredFieldsFilled)(_this.props.schema, formData);
      if (valid === _this.state.valid) return;
      _this.props.setIsDataValid && _this.props.setIsDataValid(valid);
      _this.setState({
        valid
      });
    }, this.componentWillReceiveProps = _ref => {
      let {
        formData
      } = _ref;
      const newFormData = (0, _utils2.fillDefaults)(this.props.schema, formData);
      if ((0, _utils.deepEquals)(this.state.formData, newFormData)) return;
      this.setState({
        formData: newFormData
      });
      this.validate(newFormData);
    }, this.onChange = formData => {
      this.setState({
        formData
      });
      this.validate(formData);
      this.props.onChange && this.props.onChange({
        formData
      });
    }, this.componentDidMount = () => {
      const newFormData = (0, _utils2.fillDefaults)(this.props.schema, this.props.formData);
      this.setState({
        formData: newFormData
      });
      this.validate();
    }, this;
  }
  render() {
    if (this.props.schema.type === 'object') {
      return /*#__PURE__*/_react.default.createElement(_ObjectField.default, _extends({}, this.props, this.state, {
        onChange: this.onChange
      }));
    } else {
      return false;
    }
  }
}
exports.default = JsonFormComponent;
module.exports = exports.default;