import React, { Component } from 'react';
import classNames from 'classnames';

import { Icon } from '@ant-design/compatible';
import { getField } from '../utils';
import AddButton from '../components/AddButton';
import IconButton from '../components/IconButton';
import styles from './fields.less';

class ArrayField extends Component {
    get formData() {
        const { formData } = this.props;
        return typeof formData === 'string' ? formData.split(',') : formData;
    }

    getToolbar = ({ index, maxIndex, ...props }) => {
        return (
            <div className="col-xs-3 array-item-toolbox">
                <div className={styles['button-group']}>
                    {index > 0 && (
                        <IconButton
                            icon={<Icon type="up" />}
                            className={classNames(
                                'array-item-move-up',
                                styles.button
                            )}
                            disabled={props.disabled || props.readonly}
                            onClick={() => props.onReorder(index, index - 1)}
                        />
                    )}

                    {index < maxIndex && (
                        <IconButton
                            icon={<Icon type="down" />}
                            className={classNames(
                                'array-item-move-down',
                                styles.button
                            )}
                            disabled={props.disabled || props.readonly}
                            onClick={() => props.onReorder(index, index + 1)}
                        />
                    )}

                    {(props.minItems === undefined ||
                        maxIndex + 1 > props.minItems) && (
                        <IconButton
                            type="danger"
                            icon={<Icon type="close" />}
                            className={classNames(
                                'array-item-remove',
                                styles.button
                            )}
                            disabled={props.disabled || props.readonly}
                            onClick={() => props.onRemove(index)}
                        />
                    )}
                </div>
            </div>
        );
    };

    onChange = (index) => (value = '') => {
        const newFormData = [...this.formData];
        newFormData[index] = value;

        this.props.onChange && this.props.onChange(newFormData);
    };

    onAdd = () => {
        this.onChange(this.formData.length)();
    };

    onRemove = (index) => {
        const newFormData = [...this.formData].filter((_, i) => i !== index);

        this.props.onChange && this.props.onChange(newFormData);
    };

    onReorder = (index, newIndex) => {
        const newFormData = [...this.formData];

        const temp = newFormData[index];
        newFormData[index] = newFormData[newIndex];
        newFormData[newIndex] = temp;

        this.props.onChange && this.props.onChange(newFormData);
    };

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

    render = () => {
        const {
            schema,
            uiSchema,
            disabled,
            definitions,
            ...props
        } = this.props;

        const { onChange, onReorder, onRemove, onAdd } = this;

        const { formData } = this;

        return (
            <div>
                {formData &&
                    formData.map((value, key) => (
                        <div key={key}>
                            {getField({
                                value,
                                schema: this.schema,
                                uiSchema,
                                formData,
                                definitions,
                                disabled,
                                onChange: onChange(key),
                            })}
                            {this.getToolbar({
                                index: key,
                                maxIndex: formData.length - 1,
                                onReorder,
                                onRemove,
                                disabled,
                                ...schema,
                            })}
                        </div>
                    ))}
                {(formData === undefined ||
                    schema.maxItems === undefined ||
                    formData.length < schema.maxItems) && (
                    <AddButton
                        className="array-item-add"
                        onClick={onAdd}
                        disabled={disabled || props.readonly}
                    />
                )}
            </div>
        );
    };
}

export default ArrayField;
