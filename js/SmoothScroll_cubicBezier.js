class SmoothScroll {
	constructor(_containerSelector, _params = { duration: 500, timingFunction: 'easeOutQuart' }) {
		// Init DOM elements
		this.$ = {
			container: document.querySelector(_containerSelector),
			containerBody: document.querySelector(_containerSelector + '-body'),
			hitbox: document.querySelector(_containerSelector + '-hitbox')
		};

		// Init params
		this.params = {
			containerHeight: this.$.containerBody.offsetHeight,
			duration: _params.duration,
			timingFunction: _params.timingFunction
		};

		this.scrollType = {
			easeOutExpo: 'cubic-bezier(0.19, 1, 0.22, 1)',
			easeOutQuint: 'cubic-bezier(0.23, 1, 0.32, 1)',
			easeOutQuart: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
			easeOutCubic: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
			easeOutQuad: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
			easeOutBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
		};

		// Launch init functions
		document.addEventListener('DOMContentLoaded', () => {
			this._initStyle();
			this._initListeners();
		});
	}

	_initStyle() {
		const currentScrollY = window.scrollY;

		// Set container style
		this.$.container.style.overflow = `hidden`;
		this.$.container.style.position = `fixed`;
		this.$.container.style.height = `100vh`;

		// Set containerBody style
		this.$.containerBody.style.transform = `translateY(${-window.scrollY}px)`; // Scroll to current scroll

		// Add transition after scroll to
		const addTransition = () => {
			// Set currentTranslateY
			const regex = /\s?([,])\s?/;
			const splitTransform = getComputedStyle(this.$.containerBody).transform.split(regex);
			const currentTranslateY = parseInt(splitTransform[splitTransform.length - 1]);

			if (-currentTranslateY !== currentScrollY) {
				setTimeout(() => {
					addTransition(currentTranslateY);
				}, 10);
			}
			// Add transition
			return (this.$.containerBody.style.transition = `transform ${this.params.duration}ms ${this.params.timingFunction}`);
		};
		// Run addTransition
		addTransition();

		// Set hitox style
		this.$.hitbox.style.height = `${this.params.containerHeight}px`;
	}

	_initListeners() {
		window.addEventListener('scroll', (event) => {
			this._handleScroll(event);
		});
		window.addEventListener('resize', () => {
			this._handleResize();
		});
		window.addEventListener('load', () => {
			this._handleEasing(this.scrollType[this.params.timingFunction]);
		});
	}

	_handleScroll(_event) {
		this.$.containerBody.style.transform = `translateY(${-window.scrollY}px)`;
	}

	_handleResize() {
		// Update useful params
		this.params.containerHeight = this.$.containerBody.offsetHeight;

		// Update useful style
		this.$.hitbox.style.height = `${this.params.containerHeight}px`;
	}

	_handleDuration() {
		// Update duration value
		this.$.duration.innerText = `${this.$.controlsDuration.value}ms`;

		// Update duration variable
		this.params.duration = this.$.controlsDuration.value;

		// Update duration
		this.$.containerBody.style.transition = `transform ${this.params.duration}ms ${this.params.timingFunction}`;
	}

	_handleEasing(_value) {
		// Update timing function variable
		this.params.timingFunction = _value;

		// Update duration
		this.$.containerBody.style.transition = `transform ${this.params.duration}ms ${this.params.timingFunction}`;
	}
}

new SmoothScroll('.container');