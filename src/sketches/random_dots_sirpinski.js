export const params = {
  lp: { label: 'Exponent', value: 10, min: 0, max: 20, step: 1 },
  corners: { label: 'Number of Corners', value: 3, min: 2, max: 20, step: 1 },
  g: { label: 'Weight', value: 0.5, min: 0, max: 1, step: 0.01 },
};

export default function draw(ctx, { width, height, dpr }, { lp, corners, g }) {

var n = Math.pow(2,lp);
var g = 1 / g;

var ecke = poly(corners);
/*ecke[0] = {x:500, y:100};
ecke[1] = {x:100, y:600};
ecke[2] = {x:900, y:800};*/

var dot = {x:width/2, y:width/2};
var rand;

for (var i = 0; i < n; i++) {
	ctx.fillRect(dot.x, dot.y, 1, 1);
	rand = Math.floor(Math.random() * ecke.length);
	/*if (rand == ecke.length) {
		rand = ecke.length - 1;
	}*/
		dot.x = (dot.x + (g-1)*ecke[rand].x) / g;
	dot.y = (dot.y + (g-1)*ecke[rand].y) / g;
}

function poly(k) {
	var ecke = [];
	for (var i = 0; i < k; i++) {
		ecke[i] = {x: width / 2 + Math.sin((i+0.5) / k * 2 * Math.PI) * width * 2 / 5, y: height / 2 + Math.cos((i+0.5) / k * 2 * Math.PI) * height * 2 / 5};
	}
	return ecke;
}

}