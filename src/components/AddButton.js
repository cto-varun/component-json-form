import React from 'react';
import classNames from 'classnames';
import { Icon } from '@ant-design/compatible';
import IconButton from './IconButton';

export default function AddButton({ className, onClick, disabled }) {
    return (
        <IconButton
            type="info"
            icon={<Icon type="plus" />}
            className={classNames('btn-add', className)}
            onClick={onClick}
            disabled={disabled}
        />
    );
}
