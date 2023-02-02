import CheckboxWidget from './CheckboxWidget';
import BaseInput from './BaseInput';
import SelectWidget from './SelectWidget.js';
import RadioWidget from './RadioWidget.js';
// import FileWidget from './FileWidget.js';
import RangeWidget from './RangeWidget.js';
import TextareaWidget from './TextareaWidget';
import TagsWidget from './TagsWidget';
import ColorListWidget from './ColorListWidget';

export default {
    CheckboxWidget,
    BaseInput,
    SelectWidget,
    RadioWidget,
    // FileWidget, // Needs testing endpoint
    RangeWidget,
    // DateWidget, // BaseInput's event 'onChange' passes SyntheticEvent as argument, but antd's DatePicker passes Moment.js object. 'react-jsonschema-form' can't handle it properly
    TextareaWidget,
    TagsWidget,
    ColorListWidget,
};
