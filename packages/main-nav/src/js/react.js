/*! [replace-name] v[replace-version] */
/***************************************************************************************************************************************************************
 *
 * mainNav function
 *
 * Horizontal list of links to key areas on the website. Usually located in the header.
 *
 **************************************************************************************************************************************************************/

import React from 'react';
import PropTypes from 'prop-types';

import AU from '@gov.au/animate'; // interdependency with our animate lib


// ES5 dependency: import AUlinkList from '@gov.au/link-list';
// ES6 dependency: import AUlinkList from './link-list';


// The following line will be replaced automatically with generic imports for the ES5 pipeline.
// You can safely ignore this bit if you use this module with pancake
//
// [replace-imports]


/**
 * A menu inside the AUsideNav
 *
 * @param  {array}  items            - The links in an array containing text, location and active status
 * @param  {string} linkComponent    - The component used for the link
 */
const AUmainNavMenu = ({ items, linkComponent }) => {
	// Generate the menu
	const GenerateMenu = ( items ) => {
		const menu = items.map( item => {
			const link = {
				link: item.link,
				text: item.text,
				li: {
					className: item.active ? 'active' : '',
				},
			};

			// return the link, maybe with children
			return link;
		});

		return menu;
	}

	// Create the menu with children
	return (
		<AUlinkList items={ GenerateMenu( items ) } linkComponent={ linkComponent } />
	);
}


// This value gets increased for each navigation component
let IDvalue = 0;


export class AUmainNavContent extends React.PureComponent {
	constructor( props ) {
		super( props );

		const { items, className = '', children, ...attributeOptions } = props;

		// Functions
		this.toggleClasses    = this.toggleClasses.bind( this );
		this.removeClass      = this.removeClass.bind( this );
		this.addClass         = this.addClass.bind( this );
		this.mainNavToggle    = this.mainNavToggle.bind( this );
		this.toggle           = this.toggle.bind( this );


		// Event listeners
		this.auFocusTrapListenerTop    = this.auFocusTrapListenerTop.bind( this );
		this.auFocusTrapListenerBottom = this.auFocusTrapListenerBottom.bind( this );
		this.auKeyListener             = this.auKeyListener.bind( this );


		// Variables
		this.state = { closed: true };

		// Increase the ID so it's unique for each instance
		IDvalue += 1;
		this.id = `au-main-nav-${ IDvalue }`;
	}


	componentDidUpdate(){
		this.mainNavToggle( this.mainNavContent, this.props.speed, {
			onOpen: this.props.onOpen,
			afterOpen: this.props.afterOpen,
			onClose: this.props.onClose,
			afterClose: this.props.afterClose,
		});
	}


	/**
	 * IE8 compatible function for replacing classes on a DOM node
	 *
	 * @param  {object} element       - The DOM element we want to toggle classes on
	 * @param  {string} openingClass  - The firstClass you want to toggle on the DOM node
	 * @param  {string} closingClass  - The secondClass you want to toggle on the DOM node
	 */
	toggleClasses( element, openingClass, closingClass ) {
		var state = !this.state.closed ? 'opening' : '';

		if( state === 'opening' || state === 'open' ) {
			var oldClass = openingClass || 'au-main-nav__content--closed';
			var newClass = closingClass || 'au-main-nav__content--open';
		}
		else {
			var oldClass = closingClass || 'au-main-nav__content--open';
			var newClass = openingClass || 'au-main-nav__content--closed';
		}

		this.removeClass( element, oldClass );
		this.addClass( element, newClass );
	}


	/**
	 * IE8 compatible function for removing a class
	 *
	 * @param  {object} element   - The DOM element we want to manipulate
	 * @param  {object} className - The name of the class to be removed
	 */
	removeClass( element, className ) {
		if( element.classList ) {
			element.classList.remove( className );
		}
		else {
			element.className = element.className.replace( new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " " );
		}
	}


	/**
	 * IE8 compatible function for adding a class
	 *
	 * @param  {object} element   - The DOM element we want to manipulate
	 * @param  {object} className - The name of the class to be added
	 */
	addClass( element, className ) {
		if( element.classList ) {
			element.classList.add( className );
		}
		else {
			element.className = element.className + " " + className;
		}
	}


	// Event listeners
	auFocusTrapListenerTop( event ) {
		var focusContent = this.mainNavMenu.querySelectorAll( 'a, .au-main-nav__toggle' );
		focusContent[ focusContent.length - 1 ].focus();
	}

	auFocusTrapListenerBottom( event ) {
		var focusContent = this.mainNavMenu.querySelectorAll( 'a, .au-main-nav__toggle' );
		focusContent[ 0 ].focus();
	}

	auKeyListener( event ) {
		event = event || window.event;

		// This should only close the menu when the menu is visibly open
		var overlayOpen = window.getComputedStyle( this.mainNavOverlay ).getPropertyValue( 'display' );

		// Check the menu is open and visible and the escape key is pressed
		if( event.keyCode === 27 && overlayOpen === 'block' ) {
			this.toggle( event );
		}
	}



	/**
	 * Toggle a mainNav element
	 *
	 * @param  {string}  element  - The toggle for the main nav
	 * @param  {integer} speed    - The speed in ms for the animation
	 *
	 */
	mainNavToggle( element, speed, callbacks ) {

		// stop event propagation
		try {
			window.event.cancelBubble = true;
			event.stopPropagation();
		}
		catch( error ) {}

		// check this once
		if( typeof callbacks != 'object' ) {
			callbacks = {};
		}


		// Elements we modify
		var menu            = this.mainNavMenu;
		var overlay         = this.mainNavOverlay;
		var closeButton     = element.querySelector( '.au-main-nav__toggle--close' );
		var openButton      = element.querySelector( '.au-main-nav__toggle--open' );
		var focustrapTop    = element.querySelector( '.au-main-nav__focus-trap-top' );
		var focustrapBottom = element.querySelector( '.au-main-nav__focus-trap-bottom' );

		var closed          = !this.state.closed;

		// Functions
		var ToggleClasses       = this.toggleClasses;
		var Toggle              = this.toggle;

		var ToggleClasses       = this.toggleClasses;
		var Toggle              = this.toggle;
		var AUkeyListener       = this.auKeyListener;
		var AUfocusTrapListenerTop    = this.auFocusTrapListenerTop;
		var AUfocusTrapListenerBottom = this.auFocusTrapListenerBottom;


		// Set these value immediately for transitions
		if( closed ) {
			menu.style.display = 'block';
			overlay.style.display = 'block';
			overlay.style.left    = 0;
			overlay.style.opacity = 1;
		}
		else {
			overlay.style.opacity = '0';
		}


		(function( menu ) {
			AU.animate.Run({
				element: menu,
				property: 'left',
				endSize: closed ? 0 : -300,
				speed: speed || 250,
				callback: function(){
					if ( closed ){

						// Move the focus to the close button
						closeButton.focus();


						// Focus trap enabled
						focustrapTop.setAttribute( "tabindex", 0 );
						focustrapBottom.setAttribute( "tabindex", 0 );


						focustrapTop.addEventListener( 'focus', AUfocusTrapListenerTop );
						focustrapBottom.addEventListener( 'focus', AUfocusTrapListenerBottom );

						// Add key listener
						document.addEventListener( 'keyup', AUkeyListener );
					}
					else {
						// Move the focus back to the menu button
						openButton.focus();

						// Remove the focus trap
						focustrapTop.removeAttribute( "tabindex" );
						focustrapBottom.removeAttribute( "tabindex" );


						// Remove the event listeners
						focustrapTop.removeEventListener( 'focus', AUfocusTrapListenerTop );
						focustrapBottom.removeEventListener( 'focus', AUfocusTrapListenerBottom );


						// Remove the event listener for the keypress
						document.removeEventListener( 'keyup', AUkeyListener );
					}


					// Toggle classes
					ToggleClasses( element );
					ToggleClasses(
						document.body,
						'au-main-nav__scroll--unlocked',
						'au-main-nav__scroll--locked',
					);


					// Reset inline styles
					menu.style.display    = '';
					menu.style.left       = '';
					overlay.style.display = '';
					overlay.style.left    = '';
					overlay.style.opacity = '';
				},
			});
		})( menu );
	}


	/**
	 * Toggle an main navigation on click
	 *
	 * @param  {event object} event - The event object of the click
	 */
	toggle( event ) {
		event.preventDefault();

		// Change the menu closed state
		this.setState({ closed: !this.state.closed });
	}


	render(){
		return (
			<div
				id={ this.id }
				className="au-main-nav__content"
				ref={ mainNavContent => { this.mainNavContent = mainNavContent }}>
				<button
					aria-controls={ this.id }
					onClick={ ( event ) => this.toggle( event ) }
					className="au-main-nav__toggle au-main-nav__toggle--open">
					Menu
				</button>
				<div
					className="au-main-nav__menu"
					ref={ mainNavMenu => { this.mainNavMenu = mainNavMenu }}
					>
					<div className="au-main-nav__menu-inner">
						<div className="au-main-nav__focus-trap-top"></div>
						<button
							aria-controls={ this.id }
							onClick={ ( event ) => this.toggle( event ) }
							className="au-main-nav__toggle au-main-nav__toggle--close">
							Close
						</button>
						<AUmainNavMenu items={ this.props.items } />
						<div className="au-main-nav__focus-trap-bottom"></div>
					</div>
				</div>
				<div
					ref={ mainNavOverlay => { this.mainNavOverlay = mainNavOverlay }}
					onClick={ ( event ) => this.toggle( event ) }
					className="au-main-nav__overlay"></div>
			</div>
		);
	}
};


const AUmainNav = ({ dark, alt, className, attributeOptions, children }) => (
	<nav
		className={
			'au-main-nav ' +
			`${ dark ? ' au-main-nav--dark' : '' }` +
			`${ alt ? ' au-main-nav--alt' : '' }` +
			`${ className ? ' ' + className : '' }`
		}
		{ ...attributeOptions }
	>
		{ children }
	</nav>
);

AUmainNav.propTypes = {
	dark: PropTypes.bool
};

AUmainNav.defaultProps = {};

export default AUmainNav;
