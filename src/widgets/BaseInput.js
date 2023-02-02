import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

function BaseInput(props) {
    // Note: since React 15.2.0 we can't forward unknown element attributes, so we
    // exclude the "options" and "schema" ones here.
    // if (!props.id) {
    //   throw new Error(`no id for props ${JSON.stringify(props)}`);
    // }

    const {
        value,
        readonly,
        disabled,
        autofocus,
        onBlur,
        onFocus,
        options = {},
        schema,
        formContext,
        registry,
        rawErrors,
        ...inputProps
    } = props;

    inputProps.type = options.inputType || inputProps.type || 'text';
    const onChange = ({ target: { value } }) => {
        return (
            props.onChange &&
            props.onChange(value === '' ? options.emptyValue : value)
        );
    };

    return (
        <Input
            id={inputProps.id}
            className="form-control"
            readOnly={readonly}
            disabled={disabled}
            autoFocus={autofocus}
            value={value == null ? '' : value}
            {...inputProps}
            onChange={onChange}
            onBlur={
                onBlur && ((event) => onBlur(inputProps.id, event.target.value))
            }
            onFocus={
                onFocus &&
                ((event) => onFocus(inputProps.id, event.target.value))
            }
        />
    );
}

BaseInput.defaultProps = {
    type: 'text',
    required: false,
    disabled: false,
    readonly: false,
    autofocus: false,
};

if (process.env.NODE_ENV !== 'production') {
    BaseInput.propTypes = {
        placeholder: PropTypes.string,
        value: PropTypes.any,
        required: PropTypes.bool,
        disabled: PropTypes.bool,
        readonly: PropTypes.bool,
        autofocus: PropTypes.bool,
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
        onFocus: PropTypes.func,
    };
}

export default BaseInput;
