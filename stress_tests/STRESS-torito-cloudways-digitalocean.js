import http from 'k6/http';
import { check, counter, sleep } from 'k6';
import { Counter } from 'k6/metrics';

let counterErrors = new Counter('Errors');

export let options = {
	vus: 50, //virtual users
	duration: '60s',
};
export default function () {
	let res = http.get('https://cw1.dftm.pro/');

	check(res, {
		success: (r) => r.status == 200,
	});
}
