let voterBars = document.querySelectorAll('.voter-bar');
let summaryBars = document.querySelectorAll('.summary-bar');

function lerp(start, end, amt) {
	return (1-amt)*start+amt*end
}

(function() {
	setInterval(function() {
		let barVotes = [1, 1, 1, 1, 1, 1];
		/*for(let i = 0; i < barVotes.length; i++) {
			barVotes[i] = Math.random() * 100000;
		} // for testing*/
		let sum = barVotes.reduce((a, b) => a + b, 0);
		let i = 0;
		voterBars.forEach(function(bar) {
			bar.style.setProperty('--data-width-to',  (sum === 0 ? 0 : barVotes[i] / sum * 100.0) + '%');
			i++;
		});
	}, 1000);

	setInterval(function() {
		let i = 0;
		voterBars.forEach(function(bar) {
			let actual = bar.style.getPropertyValue('--data-width').replace('%', '');
			let to = bar.style.getPropertyValue('--data-width-to').replace('%', '');
			let result = lerp(actual, to, 0.1);

			bar.style.setProperty('--data-width', result + '%');
			bar.setAttribute('data-content', Math.round(result) + '%');
			summaryBars[i].style.setProperty('--data-width', Math.max(0, result) + '%');
			i++;
		});
	}, 13);
})();