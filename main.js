addEventListener('fetch', event => {
	event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
	let response = await fetch(request);
	response = new Response(response.body, response);
	response.headers.append('Content-Security-Policy', "default-src 'self'");
	response.headers.append('Permissions-Policy', 'interest-cohort=()');
	response.headers.append('X-Content-Type-Options', 'nosniff');
	response.headers.append('X-Frame-Options', 'DENY');
	response.headers.append('X-XSS-Protection', '1; mode=block');
	return response;
}
