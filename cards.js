
/**
 * shuffle()
 * Shuffle the contents of an array depending on the datatype of the source
 * Makes a copy. Does NOT shuffle the original.

 * @Parameters: Array or string
 * @Return: Scrambled Array or string, based on the provided parameter
 */
function shuffle(src) {
	const copy = [...src]

	const length = copy.length
	for (let i = 0; i < length; i++) {
		const x = copy[i]
		const y = Math.floor(Math.random() * length)
		const z = copy[y]
		copy[i] = z
		copy[y] = x
	}

	if (typeof src === 'string') {
		return copy.join('')
	}

	return copy
}
let last = null
let wait = false
let score = 0
let N = 0
function showOptions() {
	document.querySelector("#cards").style.display = "none"
	document.querySelector("#win").style.display = "none"
	document.querySelector("#options").style.display = "block"
}

function start(images) {
	N = images
	document.querySelector("#cards").style.width = 250 * N +  "px"
	document.querySelector("#options").style.display = "none"
	document.querySelector("#cards").style.display = "block"
	let cards = []
	for (let i = 1; i <= images; i++) {
		cards.push(i)
		cards.push(i)
	}
	cards = shuffle(cards)
	for (let i = 0; i < images; i++) {
		let row1 = document.querySelector("#row1")
		let row2 = document.querySelector("#row2")
		let block = `	<div class="block" onclick="flip(this)">
		<input type="checkbox" />
		<div class="card">
			<div class="front"><img src="${cards[i * 2]}.svg"/></div>
			<div class="back"></div>
		</div>
	</div>`
		row1.insertAdjacentHTML('beforeend', block)
		block = `	<div class="block"  onclick="flip(this)" >
		<input type="checkbox" />
		<div class="card">
			<div class="front"><img src="${cards[i * 2 + 1]}.svg"/></div>
			<div class="back"></div>
		</div>
	</label>`
		row2.insertAdjacentHTML('beforeend', block)
	}
}

function easy() {
	start(3)
}

function flip(block) {
	if (wait) {
		return
	}
	block.querySelector("input").checked = "checked"
	if (last == null) {
		last = block
	} else {
		wait = true
		setTimeout(function() {
			if (block.querySelector("img").src == last.querySelector("img").src) {
				block.querySelector("img").style.backgroundColor = "#ccf"
				last.querySelector("img").style.backgroundColor = "#ccf"
				score++
				if (score == N) {
					win()
				}
			} else {
				block.querySelector("input").checked = ""
				last.querySelector("input").checked = ""
			}
			last = null
			wait = false
		}, 1000);
	}
}

function normal() {
	start(4)
}

function hard() {
	start(5)
}

function win() {
	score = 0
	document.querySelector("#win").style.left = (document.body.offsetWidth / 2 - 200) + "px"
	document.querySelector("#win").style.display = "block"
	setTimeout(function() {
		document.querySelectorAll(".block").forEach(function(block) {
			block.className += " move"
		})
		setTimeout(function() {
			let block = document.querySelector(".block")
			while (block) {
				block.parentNode.removeChild(block)
				block = document.querySelector(".block")
			}
			showOptions()
		}, 2000)
	}, 2000)
}
