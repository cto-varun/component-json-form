import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { optionsList } from 'react-jsonschema-form/lib/utils';
import { camelCase, startCase } from 'lodash';
import styles from './fields/fields.less';

import defaultFields from 'react-jsonschema-form/lib/components/fields';
import defaultWidgets from 'react-jsonschema-form/lib/components/widgets';

import ArrayField from './fields/ArrayField';
import ObjectField from './fields/ObjectField';
import fields from './fields';
import widgets from './widgets';

export const fillDefaults = (schema, oldFormData = {}) => {
    const formData = cloneDeep(oldFormData);

    const handle = (schema, formData) => {
        if (schema.properties) {
            Object.keys(schema.properties).forEach((key) => {
                const value = schema.properties[key];
                if (value && formData[key] === undefined) {
                    if (value.default) {
                        formData[key] = value.default;
                        if (
                            value.maxItems !== undefined &&
                            Array.isArray(formData[key]) &&
                            formData[key].length > value.maxItems
                        )
                            formData[key].splice(value.maxItems);
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

export const getFieldProps = ({
    schema,
    key,
    value,
    uiSchema,
    disabled,
    onChange,
    definitions,
}) => {
    return {
        value,
        key,
        onChange,
        disabled,
        definitions,

        title: schema.title || startCase(camelCase(key)),
        schema: schema,
        options: {
            enumOptions: schema.enum && optionsList(schema),
        },

        registry: getDefaultRegistry(),

        ...(schema.type === 'object' || schema.type === 'array'
            ? {
                  uiSchema,
                  formData: value,
                  fieldKey: key,
              }
            : {}),
    };
};

export const isConstant = (schema) => schema.enum && schema.enum.length === 1;

export const getField = ({
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
    definitions,
}) => {
    const Field = getWidget(schema, uiSchema);

    const props = getFieldProps({
        schema,
        key,
        value,
        uiSchema,
        disabled,
        onChange,
        definitions,
    });

    const isCheckbox = schema.type === 'boolean';
    const wrapperProps = isCheckbox
        ? {
              style: { cursor: 'pointer' },
              onClick: () => props.onChange && props.onChange(!props.value),
          }
        : {};

    const getTitle = () => {
        const displayTitle = props.title && schema.type !== 'object';
        if (!displayTitle) return false;

        return (
            <div className={styles['field-title']}>
                {props.title}
                {required ? '*' : ''}
            </div>
        );
    };

    return (
        <div className={className} key={key} {...wrapperProps}>
            {getTitle()}
            <Field {...props} />
        </div>
    );
};

export const areRequiredFieldsFilled = (schema, oldFormData) => {
    const formData = cloneDeep(oldFormData);

    const checkFields = (schema, formData = {}) => {
        if (schema.properties) {
            return Object.keys(schema.properties).every((key) => {
                if (
                    schema.required !== undefined &&
                    schema.required.length > 0
                ) {
                    return schema.required.every(
                        (
                            key // Are all filled
                        ) =>
                            formData &&
                            formData[key] !== undefined &&
                            formData[key] !== ''
                    );
                }
                return checkFields(schema.properties[key], formData[key]);
            });
        }
        return true;
    };

    return checkFields(schema, formData);
};

/* eslint-disable-next-line */
export const getType = ({ type, items, ...schema }) => {
    if (schema.enum !== undefined) {
        return 'select';
    }

    // if (type === 'object' && (schema.properties || schema.additionalProperties)) {
    //   return 'object';
    // }

    const _type = Array.isArray(type) ? (items ? items.type : type[0]) : type;

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

export const getWidget = (schema = {}, uiSchema = {}) => {
    if (schema.type === 'object') return ObjectField;
    if (schema.type === 'array') return ArrayField;

    const widget = uiSchema['ui:widget'] || getType(schema);

    if (typeof schema === 'string') return () => <span>{widget}</span>;

    return (
        getWidgets()[
            {
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
                colors: 'ColorListWidget',
            }[widget]
        ] || (() => <h1>No widget of type: {widget}</h1>)
    );
};

export function getDefaultRegistry() {
    return {
        fields,
        widgets,
        definitions: {},
        formContext: {},
    };
}

export function getRegistry() {
    return {
        fields: getWidgets(),
        widgets: getFields(),
        definitions: {},
        formContext: {},
    };
}

export function getWidgets() {
    return {
        ...defaultWidgets,
        ...widgets,
    };
}

export function getFields() {
    return {
        ...defaultFields,
        ...fields,
    };
}
