/*! [replace-name] v[replace-version] */
/***************************************************************************************************************************************************************
 *
 * text-input function
 *
 * Text inputs include text inputs, labels, hints and textareas. They allow users to input data into a field.
 *
 **************************************************************************************************************************************************************/

import React from 'react';
import PropTypes from 'prop-types';


// The following line will be replaced automatically with generic imports for the ES5 pipeline.
// You can safely ignore this bit if you use this module with pancake
//
// [replace-imports]


/**
 * DEFAULT
 * The AUtextInput component
 *
 * @param  {string}  as               - The kind of input, can be either 'input' or 'textarea', default: 'input'
 * @param  {boolean} dark             - Add the dark variation class, optional
 * @param  {boolean} block            - Add the block variation class, optional
 * @param  {string}  status           - Mark this field as either 'valid' or 'invalid', optional
 * @param  {string}  type             - The type of the field, optional, default: text
 * @param  {string}  className        - An additional class, optional
 * @param  {object}  attributeOptions - Any other attribute options
 */
const AUtextInput = ({ as, dark, block, status, width, type = 'text', className = '', ...attributeOptions }) => (
	as === 'textarea'
		? <textarea
				className={
					`au-text-input ${ className }` +
					`${ block ? ' au-text-input--block' : '' }` +
					`${ dark ? ' au-text-input--dark' : '' }` +
					`${ status === 'valid' ? ' au-text-input--valid' : '' }` +
					`${ status === 'invalid' ? ' au-text-input--invalid' : '' }` + 
					`${ width ? ' au-text-input--width-' + width : '' }`					
				}
				{ ...attributeOptions } >
			</textarea>
		: <input className={
					`au-text-input ${ className }` +
					`${ dark ? ' au-text-input--dark' : '' }` +
					`${ block ? ' au-text-input--block' : '' }` +
					`${ status === 'valid' ? ' au-text-input--valid' : '' }` +
					`${ status === 'invalid' ? ' au-text-input--invalid' : '' }` +
					`${ width ? ' au-text-input--width-' + width : '' }`
				}
				type={ type } { ...attributeOptions }
			/>
);

AUtextInput.propTypes = {
	/**
	 * The kind of input, can be either 'input' or 'textarea', default: 'input'.
	 */
	as: PropTypes.oneOf([ 'input', 'textarea' ]),
	/**
	 * A dark variation of the component.
	 */
	dark: PropTypes.bool,
	/**
	 * Add the block variation class.
	 */
	block: PropTypes.bool,
	/**
	 * Mark this field as either 'valid' or 'invalid'.
	 */
	status: PropTypes.oneOf([ 'valid', 'invalid' ]),
	/**
	 * The class name for the element, optional.
	 */
	className: PropTypes.string,
	/**
	 * 
	 */
	width: PropTypes.oneOf([ 'xs', 'sm', 'md', 'lg', 'xl' ])
};

AUtextInput.defaultProps = {
	as: 'input',
};

export default AUtextInput;
