"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ui = exports.schema = void 0;
// TODO Delete file after finishing
const schema = {
  title: 'Kpi settings',
  type: 'object',
  required: [],
  properties: {
    label: {
      title: 'Label displayed at top',
      type: 'string'
      // default: 'Total Sales',
    },

    tooltip: {
      title: 'Text while hovering tooltip in right top corner',
      type: 'string'
      // default: 'Tooltip Description',
    },

    body: {
      title: 'Body',
      type: 'object',
      required: ['functionName', 'postfix'],
      properties: {
        field: {
          title: 'Key of field to use as label in body',
          type: 'string'
          // default: 'ram',
        },

        functionName: {
          title: 'The way to process data',
          type: 'string',
          enum: ['sum', 'average', 'min', 'max', 'last', 'first', 'last-but-one', 'count']
          // default: 'sum',
        },

        prefix: {
          title: 'Put this before label',
          type: 'string'
        },
        postfix: {
          title: 'Put this after label',
          type: 'string'
        }
      }
    },
    footer: {
      title: 'Footer',
      type: 'object',
      properties: {
        label: {
          title: 'Label of footer int bottom left corner',
          type: 'string'
          // default: 'Daily Sales',
        },

        field: {
          title: 'Key of field to use as label in footer',
          type: 'string'
          // default: 'timestamp'
        },

        functionName: {
          title: 'The way to process data',
          type: 'string',
          enum: ['sum', 'average', 'min', 'max', 'last', 'first', 'last-but-one', 'count']
          // default: 'min',
        },

        prefix: {
          title: 'Put this before label',
          type: 'string'
        },
        postfix: {
          title: 'Put this after label',
          type: 'string'
        }
      }
    },
    histogram: {
      title: 'Histogram',
      required: ['color'],
      type: 'object',
      properties: {
        enabled: {
          title: 'Is histogram displayed',
          type: 'boolean'
          // default: true,
        },

        tooltip: {
          // TODO Find the way to hide tooltip
          title: 'Display tooltip on hover',
          type: 'boolean'
          // default: false,
        },

        type: {
          title: 'Histogram type',
          type: 'string',
          enum: ['area', 'bars']
          // default: 'area',
        },

        color: {
          title: 'Histogram color',
          type: 'string',
          widget: 'color'
        },
        fields: {
          title: 'Keys of fields to use as X,Y axis on histogram',
          type: ['string'],
          items: {
            type: 'string'
          }
          // default: ['version', 'ram'],
        }
      }
    }
  }
};
exports.schema = schema;
const ui = {
  histogram: {
    color: {
      'ui:widget': 'colors'
    }
  }
};
exports.ui = ui;