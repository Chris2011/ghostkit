/**
 * External dependencies
 */
import classnames from 'classnames/dedupe';

/**
 * Internal dependencies
 */
import ColorPicker from '../../components/color-picker';
import IconPicker from '../../components/icon-picker';
import URLPicker from '../../components/url-picker';
import ColorIndicator from '../../components/color-indicator';
import ToggleGroup from '../../components/toggle-group';
import RangeControl from '../../components/range-control';
import ApplyFilters from '../../components/apply-filters';
import getIcon from '../../utils/get-icon';

/**
 * WordPress dependencies
 */
const { applyFilters } = wp.hooks;

const { __ } = wp.i18n;

const { Component, Fragment } = wp.element;

const { withSelect } = wp.data;

const { BaseControl, PanelBody, ToggleControl, TabPanel, Toolbar, ToolbarGroup, ToolbarButton } =
  wp.components;

const { InspectorControls, InnerBlocks, BlockControls } = wp.blockEditor;

/**
 * Block Edit Class.
 */
class BlockEdit extends Component {
  render() {
    const { attributes, setAttributes, isSelected, hasChildBlocks } = this.props;

    let { className = '' } = this.props;

    const {
      icon,
      iconPosition,
      iconAlign,
      iconSize,
      showContent,
      iconColor,
      hoverIconColor,
      url,
      ariaLabel,
      target,
      rel,
    } = attributes;

    className = classnames('ghostkit-icon-box', className);
    className = applyFilters('ghostkit.editor.className', className, this.props);

    const classNameIcon = classnames(
      'ghostkit-icon-box-icon',
      `ghostkit-icon-box-icon-align-${iconPosition || 'left'}`,
      'top' === iconPosition ? `ghostkit-icon-box-icon-top-align-${iconAlign || 'center'}` : ''
    );

    return (
      <Fragment>
        <InspectorControls>
          <PanelBody>
            <IconPicker
              label={__('Icon', '@@text_domain')}
              value={icon}
              onChange={(value) => setAttributes({ icon: value })}
            />
            {icon ? (
              <Fragment>
                <RangeControl
                  label={__('Icon Size', '@@text_domain')}
                  value={iconSize}
                  onChange={(value) => setAttributes({ iconSize: value })}
                  min={20}
                  beforeIcon="editor-textcolor"
                  afterIcon="editor-textcolor"
                  allowCustomMin
                  allowCustomMax
                />
                <BaseControl label={__('Icon Position', '@@text_domain')}>
                  <div>
                    <Toolbar label={__('Icon Position', '@@text_domain')}>
                      <ToolbarButton
                        icon="align-center"
                        title={__('Top', '@@text_domain')}
                        onClick={() => setAttributes({ iconPosition: 'top' })}
                        isActive={'top' === iconPosition}
                      />
                      <ToolbarButton
                        icon="align-left"
                        title={__('Left', '@@text_domain')}
                        onClick={() => setAttributes({ iconPosition: 'left' })}
                        isActive={'left' === iconPosition}
                      />
                      <ToolbarButton
                        icon="align-right"
                        title={__('Right', '@@text_domain')}
                        onClick={() => setAttributes({ iconPosition: 'right' })}
                        isActive={'right' === iconPosition}
                      />
                    </Toolbar>
                  </div>
                </BaseControl>
                {'top' === iconPosition ? (
                  <ToggleGroup
                    label={__('Icon Alignment', '@@text_domain')}
                    value={iconAlign || 'center'}
                    options={[
                      {
                        label: getIcon('icon-horizontal-start'),
                        value: 'left',
                      },
                      {
                        label: getIcon('icon-horizontal-center'),
                        value: 'center',
                      },
                      {
                        label: getIcon('icon-horizontal-end'),
                        value: 'right',
                      },
                    ]}
                    onChange={(value) => {
                      setAttributes({ iconAlign: value });
                    }}
                  />
                ) : null}
              </Fragment>
            ) : null}
          </PanelBody>
          {!showContent || icon ? (
            <PanelBody>
              <ToggleControl
                label={__('Show Content', '@@text_domain')}
                checked={!!showContent}
                onChange={(val) => setAttributes({ showContent: val })}
              />
            </PanelBody>
          ) : null}
          <PanelBody
            title={
              <Fragment>
                {__('Colors', '@@text_domain')}
                <ColorIndicator colorValue={iconColor} />
              </Fragment>
            }
            initialOpen={false}
          >
            <TabPanel
              className="ghostkit-control-tabs ghostkit-control-tabs-wide"
              tabs={[
                {
                  name: 'normal',
                  title: __('Normal', '@@text_domain'),
                  className: 'ghostkit-control-tabs-tab',
                },
                {
                  name: 'hover',
                  title: __('Hover', '@@text_domain'),
                  className: 'ghostkit-control-tabs-tab',
                },
              ]}
            >
              {(tabData) => {
                const isHover = 'hover' === tabData.name;
                return (
                  <ApplyFilters
                    name="ghostkit.editor.controls"
                    attribute={isHover ? 'hoverIconColor' : 'iconColor'}
                    props={this.props}
                  >
                    <ColorPicker
                      label={__('Icon', '@@text_domain')}
                      value={isHover ? hoverIconColor : iconColor}
                      onChange={(val) =>
                        setAttributes(isHover ? { hoverIconColor: val } : { iconColor: val })
                      }
                      alpha
                    />
                  </ApplyFilters>
                );
              }}
            </TabPanel>
          </PanelBody>
        </InspectorControls>
        <URLPicker
          url={url}
          rel={rel}
          ariaLabel={ariaLabel}
          target={target}
          onChange={(data) => {
            setAttributes(data);
          }}
          isSelected={isSelected}
          toolbarSettings
          inspectorSettings
        />
        {icon ? (
          <BlockControls>
            <ToolbarGroup>
              <ToolbarButton
                icon="align-center"
                title={__('Top', '@@text_domain')}
                onClick={() => setAttributes({ iconPosition: 'top' })}
                isActive={'top' === iconPosition}
              />
              <ToolbarButton
                icon="align-left"
                title={__('Left', '@@text_domain')}
                onClick={() => setAttributes({ iconPosition: 'left' })}
                isActive={'left' === iconPosition}
              />
              <ToolbarButton
                icon="align-right"
                title={__('Right', '@@text_domain')}
                onClick={() => setAttributes({ iconPosition: 'right' })}
                isActive={'right' === iconPosition}
              />
            </ToolbarGroup>
          </BlockControls>
        ) : null}
        <div className={className}>
          {icon ? (
            <div className={classNameIcon}>
              <IconPicker.Dropdown
                onChange={(value) => setAttributes({ icon: value })}
                value={icon}
                renderToggle={({ onToggle }) => (
                  <IconPicker.Preview onClick={onToggle} name={icon} />
                )}
              />
            </div>
          ) : null}
          {showContent ? (
            <div className="ghostkit-icon-box-content">
              <InnerBlocks
                templateLock={false}
                renderAppender={
                  hasChildBlocks ? undefined : () => <InnerBlocks.ButtonBlockAppender />
                }
              />
            </div>
          ) : null}
        </div>
      </Fragment>
    );
  }
}

export default withSelect((select, props) => {
  const { clientId } = props;
  const blockEditor = select('core/block-editor');

  return {
    hasChildBlocks: blockEditor ? 0 < blockEditor.getBlockOrder(clientId).length : false,
  };
})(BlockEdit);
