import React, { Component } from 'react';
import classNames from 'classnames';

import styles from './fields.less';
import { getField, isConstant } from '../utils';
import CheckboxWidget from '../widgets/CheckboxWidget';

class ObjectField extends Component {
    getClassName = (type) => {
        return (
            {
                boolean: styles.boolean,
            }[type] || ''
        );
    };

    get schema() {
        const schema = this.props.schema.properties;
        if (schema['$ref']) {
            const ref = schema['$ref'].split('/').pop();
            if (ref) {
                return this.props.definitions[ref];
            }
        }
        return schema;
    }

    get fields() {
        const keys = Object.keys(this.schema);

        const formData = this.props.formData || {};
        const propertyEnabledUndefined =
            this.schema === undefined || this.schema.enabled === undefined;
        const formsEnabled = propertyEnabledUndefined || formData.enabled;

        const onChange = (key) => (value = '') => {
            this.props.onChange &&
                this.props.onChange({
                    ...formData,
                    [key]: value,
                });
        };

        const notNestedElements = [];
        const nestedElements = [];

        const requiredList = this.props.schema.required;
        /* eslint-disable-next-line */
        keys.forEach((key) => {
            if (!propertyEnabledUndefined && key === 'enabled') return false;

            const schema = this.schema[key];
            if (isConstant(schema) || schema.hidden) {
                return;
            }

            const uiSchema = (this.props.uiSchema || {})[key] || {};
            const value = formData[key];
            const required =
                (schema.required ||
                    (requiredList && requiredList.includes(key))) &&
                !value;

            const additionalClassName = this.getClassName(schema.type);
            const element = getField({
                value,
                schema,
                uiSchema,
                key,
                formData,
                required,
                definitions: this.props.definitions,
                disabled: !formsEnabled,
                onChange: onChange(key),
                className: classNames(
                    styles.field,
                    required ? styles.required : '',
                    additionalClassName
                ),
            });

            if (schema.type === 'object') {
                nestedElements.push(element);
            } else {
                notNestedElements.push(element);
            }
        });

        return [
            <div className={styles['lowest-fields']} key="wrapper">
                {notNestedElements}
            </div>,
        ].concat(nestedElements);
    }

    get title() {
        const { title, schema, formData, onChange } = this.props;
        if (!title) return false;

        const togglable = schema.properties.enabled !== undefined;

        const _onChange = (value) => {
            const newFormData = {
                ...(formData || {}),
                enabled: value,
            };
            onChange && onChange(newFormData);
        };

        const value = (this.props.formData || {}).enabled;

        if (togglable) {
            return (
                <div className={styles['title-wrapper']}>
                    <CheckboxWidget
                        value={value}
                        schema={this.props.schema.properties.enabled}
                        onChange={_onChange}
                    />
                    <div
                        className={classNames(styles.title, styles.togglable)}
                        onClick={() => _onChange(!value)}
                    >
                        {title}
                    </div>
                </div>
            );
        }

        return (
            <div className={styles['title-wrapper']}>
                <div className={styles.title}>{title}</div>
            </div>
        );
    }

    render() {
        if (!this.props.schema || !this.props.schema.properties) return false;

        return (
            <div
                className={classNames(
                    styles['object-field'],
                    this.props.className
                )}
            >
                {this.title}
                <div className={styles['fields-list']}>{this.fields}</div>
            </div>
        );
    }
}

export default ObjectField;
