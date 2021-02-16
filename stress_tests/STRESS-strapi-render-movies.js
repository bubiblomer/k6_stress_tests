import http from 'k6/http';
import { check, counter, sleep } from 'k6';
import { Counter } from 'k6/metrics';

let counterErrors = new Counter('Errors');

// export let options = {
// 	vus: 1, //virtual users
// 	duration: '5s',
// };

export let options = {
	stages: [{ duration: '5s', target: '10' }],
};

export default function () {
	let res = http.get('https://strapi-ri2l.onrender.com/movies');

	//check if footer anchor loaded with the fronji text
	let countOk = res.json()[4].id;

	//add error if HTML tag with text not found
	if (countOk === 5) {
		counterErrors.add(1);
	}

	check(res, {
		success: (r) => r.status == 200,
	});
}
