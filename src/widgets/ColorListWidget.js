import React from 'react';
import { Select } from 'antd';
import { startCase, camelCase } from 'lodash';
import styles from './widgets.less';

const ColorListWidget = (props) => {
    const colors = [
        'black',
        'blue',
        'brown',
        'cyan',
        'green',
        'magenta',
        'purple',
        'orange',
        'red',
        'yellow',
        'white',
    ];

    return (
        <Select {...props}>
            {colors.map((color) => (
                <Select.Option key={color} value={color}>
                    <div className={styles.option}>
                        <div
                            className={styles.color}
                            style={{ backgroundColor: color }}
                        />
                        {startCase(camelCase(color))}
                    </div>
                </Select.Option>
            ))}
        </Select>
    );
};

export default ColorListWidget;
