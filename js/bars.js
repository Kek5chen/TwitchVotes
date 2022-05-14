let voterBars = document.querySelectorAll('.voter-bar');
let summaryBars = document.querySelectorAll('.summary-bar');

function lerp (start, end, amt){
	return (1-amt)*start+amt*end
}

(function() {
	// set random tos
	setInterval(function() {
		let barVotes = [0, 0, 0, 0, 0, 0];
		let sum = barVotes.reduce((a, b) => a + b, 0);
		let i = 0;
		voterBars.forEach(function(bar) {
			bar.style.setProperty('--data-width-to',  (sum === 0 ? 0 : barVotes[i] / sum * 100.0) + '%');
			i++;
		});
	}, 1000);

	// near the to value
	setInterval(function() {
		let i = 0;
		voterBars.forEach(function(bar) {
			let actual = bar.style.getPropertyValue('--data-width').replace('%', '');
			let to = bar.style.getPropertyValue('--data-width-to').replace('%', '');
			let result = lerp(actual, to, 0.1);
			bar.style.setProperty('--data-width', result + '%');

			bar.setAttribute('data-content', Math.ceil(result) + '%');
			summaryBars[i].style.setProperty('width', result - (1.18 - window.innerWidth / 1920) < 0 ? 0 : result - (1.18 - window.innerWidth / 1920) + '%');
			i++;
		});
	}, 13);
})();