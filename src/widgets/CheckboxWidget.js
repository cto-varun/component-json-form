import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';
import DescriptionField from 'react-jsonschema-form/lib/components/fields/DescriptionField';

function CheckboxWidget(props) {
    const {
        schema,
        value,
        required,
        disabled,
        readonly,
        label,
        autofocus,
        onBlur,
        onFocus,
        onChange,
    } = props;

    return (
        <div className={`checkbox ${disabled || readonly ? 'disabled' : ''}`}>
            {schema.description && (
                <DescriptionField description={schema.description} />
            )}
            <label>
                <Checkbox
                    checked={!!value}
                    required={required}
                    disabled={disabled || readonly}
                    autoFocus={autofocus}
                    onChange={(event) => onChange(event.target.checked)}
                    onBlur={onBlur && ((event) => onBlur(event.target.checked))}
                    onFocus={
                        onFocus && ((event) => onFocus(event.target.checked))
                    }
                />
            </label>
        </div>
    );
}

CheckboxWidget.defaultProps = {
    autofocus: false,
};

if (process.env.NODE_ENV !== 'production') {
    CheckboxWidget.propTypes = {
        schema: PropTypes.object.isRequired,
        value: PropTypes.bool,
        required: PropTypes.bool,
        disabled: PropTypes.bool,
        readonly: PropTypes.bool,
        autofocus: PropTypes.bool,
        onChange: PropTypes.func,
    };
}

export default CheckboxWidget;
