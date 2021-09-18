addEventListener('fetch', event => {
	event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
	const url = new URL(request.url);
	if (url.hostname == 'mta-sts.mushroomcloud.moe') {
		if (url.pathname == '/.well-known/mta-sts.txt') {
			request = new Request(request.url.replace('mta-sts.', ''), request);
		} else {
			return new Response('404', {status: 404});
		}
	}
	response = await fetch(request);
	response = new Response(response.body, response);
	response.headers.append('Content-Security-Policy', "default-src 'self'");
	response.headers.append('Permissions-Policy', 'interest-cohort=()');
	response.headers.append('X-Content-Type-Options', 'nosniff');
	response.headers.append('X-Frame-Options', 'DENY');
	response.headers.append('X-XSS-Protection', '1; mode=block');
	response.headers.append('Referrer-Policy', 'strict-origin-when-cross-origin');
	return response;
}