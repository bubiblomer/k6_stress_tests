import http from 'k6/http';
import { check, counter, sleep } from 'k6';
import { Counter } from 'k6/metrics';
import { Trend } from 'k6/metrics';

let counterErrors = new Counter('Errors');

export let options = {
	vus: 5, //virtual users
	duration: '60s',
};

let myTrend = new Trend('status');

export default function () {
	
	// Now, submit form setting/overriding some fields of the form
	let payload = {
        'billing_first_name': 'test',
        'billing_last_name': "whatever",
        'billing_email': 'bubi@test.com',
        '_wcf_flow_id': 140,
        '_wcf_optin_id': 141,
        '_wcf_submitButtonText': '',
		'woocommerce-process-checkout-nonce': '2e037a99c6',
        '_wp_http_referer': '/',
    };
	
	let res = http.post('https://ploi1.dftm.pro/checkout/', payload);
	
}
