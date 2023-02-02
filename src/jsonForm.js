import React, { Component } from 'react';

import ObjectField from './fields/ObjectField';
import { deepEquals } from 'react-jsonschema-form/lib/utils';
import validateFormData from 'react-jsonschema-form/lib/validate';
import { areRequiredFieldsFilled, fillDefaults } from './utils';

export default class JsonFormComponent extends Component {
    state = {
        formData: {},
        valid: undefined,
    };

    validate = (formData = this.props.formData) => {
        const valid =
            validateFormData(formData, this.props.schema) &&
            areRequiredFieldsFilled(this.props.schema, formData);
        if (valid === this.state.valid) return;

        this.props.setIsDataValid && this.props.setIsDataValid(valid);
        this.setState({ valid });
    };

    componentWillReceiveProps = ({ formData }) => {
        const newFormData = fillDefaults(this.props.schema, formData);

        if (deepEquals(this.state.formData, newFormData)) return;

        this.setState({ formData: newFormData });
        this.validate(newFormData);
    };

    onChange = (formData) => {
        this.setState({ formData });
        this.validate(formData);

        this.props.onChange && this.props.onChange({ formData });
    };

    componentDidMount = () => {
        const newFormData = fillDefaults(
            this.props.schema,
            this.props.formData
        );

        this.setState({ formData: newFormData });
        this.validate();
    };

    render() {
        if (this.props.schema.type === 'object') {
            return (
                <ObjectField
                    {...this.props}
                    {...this.state}
                    onChange={this.onChange}
                />
            );
        } else {
            return false;
        }
    }
}
