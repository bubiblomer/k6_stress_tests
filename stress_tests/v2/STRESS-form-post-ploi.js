import { parseHTML } from 'k6/html';
import http from 'k6/http';
import { check, counter, sleep } from 'k6';
import { Counter } from 'k6/metrics';
import { Trend } from 'k6/metrics';


let counterErrors = new Counter('Errors');

export let options = {
	vus: 1, //virtual users
	duration: '20s',
};


export default function () {

    const page = http.get('https://ploi1.dftm.pro');

    const doc = parseHTML(page.body); // equivalent to res.html()
    const nonce = doc.find('#woocommerce-process-checkout-nonce').attr('value');
	
	// Now, submit form setting/overriding some fields of the form
	let payload = {
        billing_first_name: "demo",
        billing_last_name: "user",
        billing_email: "bub@lols.com",
        _wcf_flow_id: "140",
        _wcf_optin_id: "141",
        _wcf_submitButtonText: "",
        "woocommerce-process-checkout-nonce": nonce,
        _wp_http_referer: "%2F%3Fwc-ajax%3Dupdate_order_review",
    };

	
	let res = http.post('https://ploi1.dftm.pro/?wc-ajax=checkout', payload);
	
}
