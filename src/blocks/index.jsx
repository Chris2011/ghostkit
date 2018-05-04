/**
 * Gutenberg Blocks
 */
import * as button from './button/index.jsx';
import * as progress from './progress/index.jsx';
import * as iconBox from './icon-box/index.jsx';
import * as counterBox from './counter-box/index.jsx';
import * as alert from './alert/index.jsx';

/**
 * Internal dependencies
 */
const { registerBlockType } = wp.blocks;

/**
 * Register blocks
 */
[
    button,
    progress,
    iconBox,
    counterBox,
    alert,
].forEach( ( { name, settings } ) => {
    registerBlockType( name, settings );
} );
