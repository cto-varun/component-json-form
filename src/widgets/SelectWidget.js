import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

import { asNumber } from 'react-jsonschema-form/lib/utils';

const nums = new Set(['number', 'integer']);

/**
 * This is a silly limitation in the DOM where option change event values are
 * always retrieved as strings.
 */
function processValue(schema, value) {
    // 'enum' is a reserved word, so only 'type' and 'items' can be destructed
    const { type, items } = schema;
    if (value === '') {
        return undefined;
    } else if (type === 'array' && items && nums.has(items.type)) {
        return value.map(asNumber);
    } else if (type === 'boolean') {
        return value === 'true';
    } else if (type === 'number') {
        return asNumber(value);
    }

    // If type is undefined, but an enum is present, try and infer the type from
    // the enum values
    if (schema.enum) {
        if (schema.enum.every((x) => typeof x === 'number')) {
            return value;
        } else if (schema.enum.every((x) => typeof x === 'boolean')) {
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
        placeholder,
    } = props;

    const { enumOptions, enumDisabled } = options;
    const emptyValue = multiple ? [] : '';

    return (
        <Select
            id={id}
            size="default"
            className="form-control"
            value={typeof value === 'undefined' ? emptyValue : value}
            required={required}
            disabled={disabled || readonly}
            autoFocus={autofocus}
            mode={multiple ? 'multiple' : 'default'}
            onBlur={
                onBlur && ((value) => onBlur(id, processValue(schema, value)))
            }
            onFocus={
                onFocus && ((value) => onFocus(id, processValue(schema, value)))
            }
            onChange={
                onChange && ((value) => onChange(processValue(schema, value)))
            }
        >
            {!multiple && !schema.default && (
                <Select.Option value="">{placeholder}</Select.Option>
            )}
            {enumOptions.map(({ value, label }, i) => (
                <Select.Option
                    key={i}
                    value={value}
                    disabled={
                        enumDisabled && enumDisabled.indexOf(value) !== -1
                    }
                >
                    {label}
                </Select.Option>
            ))}
        </Select>
    );
}

SelectWidget.defaultProps = {
    autofocus: false,
};

if (process.env.NODE_ENV !== 'production') {
    SelectWidget.propTypes = {
        schema: PropTypes.object.isRequired,
        options: PropTypes.shape({
            enumOptions: PropTypes.array,
        }).isRequired,
        value: PropTypes.any,
        required: PropTypes.bool,
        disabled: PropTypes.bool,
        readonly: PropTypes.bool,
        multiple: PropTypes.bool,
        autofocus: PropTypes.bool,
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
        onFocus: PropTypes.func,
    };
}

export default SelectWidget;
