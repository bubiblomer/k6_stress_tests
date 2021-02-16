import http from 'k6/http';
import { check, counter, sleep } from 'k6';
import { Counter } from 'k6/metrics';

let counterErrors = new Counter('Errors');

// export let options = {
// 	vus: 1, //virtual users
// 	duration: '5s',
// };

export let options = {
	stages: [{ duration: '1m', target: '1' }],
};

export default function () {
	let res = http.get('https://next-strapi-corporate.vercel.app/');

	//check if footer anchor loaded with the fronji text
	let countOk = res.html('h3').text().includes('Bubi');

	//add error if HTML tag with text not found
	if (countOk) {
		counterErrors.add(1);
	}

	check(res, {
		success: (r) => r.status == 200,
	});
}
