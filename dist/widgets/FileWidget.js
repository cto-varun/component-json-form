"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _antd = require("antd");
var _compatible = require("@ant-design/compatible");
var _utils = require("react-jsonschema-form/lib/utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function addNameToDataURL(dataURL, name) {
  return dataURL.replace(';base64', `;name=${encodeURIComponent(name)};base64`);
}
function processFile(file) {
  const {
    name,
    size,
    type
  } = file;
  return new Promise((resolve, reject) => {
    const reader = new window.FileReader();
    reader.onerror = reject;
    reader.onload = event => {
      resolve({
        dataURL: addNameToDataURL(event.target.result, name),
        name,
        size,
        type
      });
    };
    reader.readAsDataURL(file);
  });
}
function processFiles(files) {
  return Promise.all([].map.call(files, processFile));
}
function FilesInfo(props) {
  const {
    filesInfo
  } = props;
  if (filesInfo.length === 0) {
    return null;
  }
  return /*#__PURE__*/_react.default.createElement("ul", {
    className: "file-info"
  }, filesInfo.map((fileInfo, key) => {
    const {
      name,
      size,
      type
    } = fileInfo;
    return /*#__PURE__*/_react.default.createElement("li", {
      key: key
    }, /*#__PURE__*/_react.default.createElement("strong", null, name), " (", type, ", ", size, " bytes)");
  }));
}
function extractFileInfo(dataURLs) {
  return dataURLs.filter(dataURL => typeof dataURL !== 'undefined').map(dataURL => {
    const {
      blob,
      name
    } = (0, _utils.dataURItoBlob)(dataURL);
    return {
      name: name,
      size: blob.size,
      type: blob.type
    };
  });
}
class FileWidget extends _react.Component {
  constructor(props) {
    super(props);
    this.onChange = event => {
      const {
        multiple,
        onChange
      } = this.props;
      processFiles(event.fileList).then(filesInfo => {
        const state = {
          values: filesInfo.map(fileInfo => fileInfo.dataURL),
          filesInfo
        };
        (0, _utils.setState)(this, state, () => {
          if (multiple) {
            onChange(state.values);
          } else {
            onChange(state.values[0]);
          }
        });
      });
    };
    const {
      value
    } = props;
    const values = Array.isArray(value) ? value : [value];
    this.state = {
      values,
      filesInfo: extractFileInfo(values)
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (0, _utils.shouldRender)(this, nextProps, nextState);
  }
  render() {
    const {
      multiple,
      id,
      readonly,
      disabled,
      autofocus
    } = this.props;
    const {
      filesInfo
    } = this.state;
    return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_antd.Upload, {
      ref: ref => this.inputRef = ref,
      id: id,
      disabled: readonly || disabled,
      onChange: this.onChange,
      defaultValue: "",
      autoFocus: autofocus,
      multiple: multiple
    }, /*#__PURE__*/_react.default.createElement(_antd.Button, null, /*#__PURE__*/_react.default.createElement(_compatible.Icon, {
      type: "upload"
    }), " Click to Upload")), /*#__PURE__*/_react.default.createElement(FilesInfo, {
      filesInfo: filesInfo
    }));
  }
}
FileWidget.defaultProps = {
  autofocus: false
};
if (process.env.NODE_ENV !== 'production') {
  FileWidget.propTypes = {
    multiple: _propTypes.default.bool,
    value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.arrayOf(_propTypes.default.string)]),
    autofocus: _propTypes.default.bool
  };
}
var _default = FileWidget;
exports.default = _default;
module.exports = exports.default;