import anime from 'animejs';

export const animateIn = (e, color) => {
	let name = e.target.getAttribute('name');
	anime({
		targets: `.icon-wrapper .${name}`,
		color: color,
		easing: 'easeInQuad',
		scale: 1.1,
		duration: 50,
	});
};

export const animateOut = (e, color) => {
	let name = e.target.getAttribute('name');
	anime({
		targets: `.icon-wrapper .${name}`,
		color: color,
		easing: 'easeOutQuad',
		scale: 1,
		duration: 100,
	});
};

export const bounceUp = name =>
	anime({
		targets: name,
		translateY: -5,
		direction: 'alternate',
		loop: true,
		duration: 200,
		autoplay: false,
		easing: 'easeInOutSine',
	});

export const bounceDown = name =>
	anime({
		targets: name,
		translateY: 5,
		direction: 'alternate',
		loop: true,
		duration: 200,
		easing: 'easeInOutSine',
	});
