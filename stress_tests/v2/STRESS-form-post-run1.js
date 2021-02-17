import { parseHTML } from 'k6/html';
import http from 'k6/http';
import { Counter } from 'k6/metrics';


let counterErrors = new Counter('Errors');

export let options = {
	vus: 100, //virtual users
	duration: '60s',
};

export default function () {

    const url = 'https://run1.dftm.pro'

    const page = http.get(url);

    const doc = parseHTML(page.body); // equivalent to res.html()
    const nonce = doc.find('#woocommerce-process-checkout-nonce').attr('value');
	
	// Now, submit form setting/overriding some fields of the form
	let payload = {
        billing_first_name: "demo",
        billing_last_name: "user",
        billing_email: "test@fronji.com",
        _wcf_flow_id: "140",
        _wcf_optin_id: "141",
        _wcf_submitButtonText: "",
        "woocommerce-process-checkout-nonce": nonce,
        _wp_http_referer: "%2F%3Fwc-ajax%3Dupdate_order_review",
    };

	let res = http.post(url+'?wc-ajax=checkout', payload);
	
}
