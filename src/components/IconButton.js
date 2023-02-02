import React from 'react';
import { Button } from 'antd';

export default function IconButton(props) {
    const { type = 'default', icon, className, ...otherProps } = props;
    return (
        <Button
            icon={icon}
            type={type}
            className={`btn btn-${type} ${className}`}
            {...otherProps}
        />
    );
}
