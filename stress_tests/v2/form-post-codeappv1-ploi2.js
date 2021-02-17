import http from 'k6/http';
import { check, counter, sleep } from 'k6';
import { Counter } from 'k6/metrics';
import { Trend } from 'k6/metrics';

let counterErrors = new Counter('Errors');

export let options = {
	vus: 200, //virtual users
	duration: '20s',
};

let myTrend = new Trend('status');

export default function () {
	
	// Now, submit form setting/overriding some fields of the form
	let payload = {
        'code': 'testcode',
    };
	
	let res = http.post('https://ploi2.dftm.pro/codeappv1/check_customer_code.php', payload);

    let getHtml = http.get('https://ploi2.dftm.pro/codeappv1/show.html');

	check(getHtml, {
		success: (r) => r.status == 200,
	});
	
}
