import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Upload, Button } from 'antd';
import { Icon } from '@ant-design/compatible';

import {
    dataURItoBlob,
    shouldRender,
    setState,
} from 'react-jsonschema-form/lib/utils';

function addNameToDataURL(dataURL, name) {
    return dataURL.replace(
        ';base64',
        `;name=${encodeURIComponent(name)};base64`
    );
}

function processFile(file) {
    const { name, size, type } = file;
    return new Promise((resolve, reject) => {
        const reader = new window.FileReader();
        reader.onerror = reject;
        reader.onload = (event) => {
            resolve({
                dataURL: addNameToDataURL(event.target.result, name),
                name,
                size,
                type,
            });
        };
        reader.readAsDataURL(file);
    });
}

function processFiles(files) {
    return Promise.all([].map.call(files, processFile));
}

function FilesInfo(props) {
    const { filesInfo } = props;
    if (filesInfo.length === 0) {
        return null;
    }

    return (
        <ul className="file-info">
            {filesInfo.map((fileInfo, key) => {
                const { name, size, type } = fileInfo;
                return (
                    <li key={key}>
                        <strong>{name}</strong> ({type}, {size} bytes)
                    </li>
                );
            })}
        </ul>
    );
}

function extractFileInfo(dataURLs) {
    return dataURLs
        .filter((dataURL) => typeof dataURL !== 'undefined')
        .map((dataURL) => {
            const { blob, name } = dataURItoBlob(dataURL);
            return {
                name: name,
                size: blob.size,
                type: blob.type,
            };
        });
}

class FileWidget extends Component {
    constructor(props) {
        super(props);
        const { value } = props;
        const values = Array.isArray(value) ? value : [value];
        this.state = { values, filesInfo: extractFileInfo(values) };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shouldRender(this, nextProps, nextState);
    }

    onChange = (event) => {
        const { multiple, onChange } = this.props;
        processFiles(event.fileList).then((filesInfo) => {
            const state = {
                values: filesInfo.map((fileInfo) => fileInfo.dataURL),
                filesInfo,
            };

            setState(this, state, () => {
                if (multiple) {
                    onChange(state.values);
                } else {
                    onChange(state.values[0]);
                }
            });
        });
    };

    render() {
        const { multiple, id, readonly, disabled, autofocus } = this.props;
        const { filesInfo } = this.state;
        return (
            <div>
                <Upload
                    ref={(ref) => (this.inputRef = ref)}
                    id={id}
                    disabled={readonly || disabled}
                    onChange={this.onChange}
                    defaultValue=""
                    autoFocus={autofocus}
                    multiple={multiple}
                >
                    <Button>
                        <Icon type="upload" /> Click to Upload
                    </Button>
                </Upload>
                <FilesInfo filesInfo={filesInfo} />
            </div>
        );
    }
}

FileWidget.defaultProps = {
    autofocus: false,
};

if (process.env.NODE_ENV !== 'production') {
    FileWidget.propTypes = {
        multiple: PropTypes.bool,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string),
        ]),
        autofocus: PropTypes.bool,
    };
}

export default FileWidget;
