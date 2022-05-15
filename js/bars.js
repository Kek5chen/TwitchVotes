/*==================================================== CONFIG ========================================================*/

let 								   	TWITCH_USERNAME = 'your_twitch_username';

/*===================================================================================================================*/

let voterBars = document.querySelectorAll('.voter-bar');
let summaryBars = document.querySelectorAll('.summary-bar');

let votes = [];

const client = new tmi.Client({
	options: {debug: false, messagesLogLevel: "info"},
	connection: {
		secure: true,
		reconnect: true
	},
	channels: [TWITCH_USERNAME]
});

function lerp(start, end, amt) {
	return (1 - amt) * start + amt * end
}

function voteToIndex(message) {
	let i = message.toLowerCase().charCodeAt(0) - 97;
	return i < 0 || i > 5 ? -1 : i;
}

function filterVotes(i) {
	let result = 0;
	Object.keys(votes).forEach(username => {
		if (votes[username] === i) result++;
	});
	return result;
}

(function () {
	client.connect().catch(console.error);
	client.on('message', (channel, tags, message, self) => {
		if (self) return;
		let i = voteToIndex(message);
		if (i === -1) return;
		votes[tags.username] = i;
	});

	setInterval(function () {
		/*for(let i = 0; i < barVotes.length; i++) {
			barVotes[i] = Math.random() * 100000;
		} // for testing*/
		let sum = Object.keys(votes).length;
		let i = 0;
		voterBars.forEach(function (bar) {
			let partAmount = sum === 0 ? 0 : filterVotes(i) / sum * 100.0;
			bar.style.setProperty('--data-width-to', partAmount + '%');
			i++;
		});
	}, 1000);

	setInterval(function () {
		let i = 0;
		voterBars.forEach(function (bar) {
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