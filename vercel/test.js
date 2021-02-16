import http from 'k6/http';
import { check, counter, sleep } from 'k6';
import { Counter } from 'k6/metrics';

let counterErrors = new Counter('Errors');

export let options = {
	vus: 100, //virtual users
	duration: '10s',
};
export default function () {
	let res = http.get('https://next-boletavirtual-com.vercel.app/');
	//let res = http.get('https://dlu5srh3ctx6n.cloudfront.net/');

	//check if footer anchor loaded with the fronji text
	let countOk = res.html('a').text().includes('Fronji.com');

	//add error if HTML tag with text not found
	if (!countOk) {
		counterErrors.add(1);
	}

	check(res, {
		success: (r) => r.status == 200,
	});
}
