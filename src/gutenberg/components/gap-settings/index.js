/**
 * External dependencies
 */
import ToggleGroup from '../toggle-group';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { Component } = wp.element;

const { BaseControl, TextControl } = wp.components;

/**
 * Internal dependencies
 */
const GAP_VALUES = {
  no: 0,
  sm: 15,
  md: 30,
  lg: 45,
};

/**
 * Component Class
 */
export default class GapSettings extends Component {
  render() {
    const { gap, gapCustom, gapVerticalCustom, allowVerticalGap, onChange } = this.props;

    return (
      <BaseControl label={__('Gap', '@@text_domain')} className="ghostkit-components-gap-settings">
        <ToggleGroup
          value={gap}
          options={[
            {
              label: __('None', '@@text_domain'),
              value: 'no',
            },
            {
              label: __('S', '@@text_domain'),
              value: 'sm',
            },
            {
              label: __('M', '@@text_domain'),
              value: 'md',
            },
            {
              label: __('L', '@@text_domain'),
              value: 'lg',
            },
            {
              label: (
                <svg
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  role="img"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M14.5 13.8c-1.1 0-2.1.7-2.4 1.8H4V17h8.1c.3 1 1.3 1.8 2.4 1.8s2.1-.7 2.4-1.8H20v-1.5h-3.1c-.3-1-1.3-1.7-2.4-1.7zM11.9 7c-.3-1-1.3-1.8-2.4-1.8S7.4 6 7.1 7H4v1.5h3.1c.3 1 1.3 1.8 2.4 1.8s2.1-.7 2.4-1.8H20V7h-8.1z"
                    fill="currentColor"
                  />
                </svg>
              ),
              value: 'custom',
            },
          ]}
          onChange={(value) => {
            const result = {
              gap: value,
            };

            // Add current predefined gap to custom value.
            if ('custom' === value && 'custom' !== gap && 'undefined' !== typeof GAP_VALUES[gap]) {
              result.gapCustom = GAP_VALUES[gap];
            }

            // Reset vertical gap when use predefined value.
            if ('custom' !== value) {
              result.gapVerticalCustom = undefined;
            }

            onChange(result);
          }}
          isBlock
        />
        {'custom' === gap ? (
          <div className="ghostkit-components-gap-settings-custom">
            <TextControl
              type="number"
              help={allowVerticalGap ? __('Horizontal', '@@text_domain') : ''}
              value={gapCustom}
              onChange={(value) =>
                onChange({ gapCustom: '' === value ? undefined : parseFloat(value) })
              }
              min={0}
            />
            {allowVerticalGap ? (
              <TextControl
                type="number"
                help={__('Vertical', '@@text_domain')}
                placeholder={gapCustom}
                value={gapVerticalCustom}
                onChange={(value) =>
                  onChange({ gapVerticalCustom: '' === value ? undefined : parseFloat(value) })
                }
                min={0}
              />
            ) : null}
          </div>
        ) : null}
      </BaseControl>
    );
  }
}
