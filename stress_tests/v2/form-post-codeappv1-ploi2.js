import http from 'k6/http';
import { check } from 'k6';

export let options = {
	vus: 200, //virtual users
	duration: '60s',
};

export default function () {

	const url = 'https://ploi2.dftm.pro/codeappv1'; 
	
	// Now, submit form setting/overriding some fields of the form
	let payload = {
        'code': 'testcode',
    };
	
	let res = http.post(url+'/check_customer_code.php', payload);

    let getHtml = http.get(url+'/show.html');

	check(getHtml, {
		success: (r) => r.status == 200,
	});
	
}
