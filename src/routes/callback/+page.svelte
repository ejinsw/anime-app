<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	onMount(async () => {
		console.log('Component mounted, sending POST request...');

		const storedState = sessionStorage.getItem('state');
		const returnedState = $page.url.searchParams.get('state');

		if (storedState !== returnedState) {
			console.error(
				'Invalid state, possible CSRF attack detected',
				`State stored: ${storedState}`,
				`State returned: ${returnedState}`
			);
			return;
		}

		const codeVerifier = sessionStorage.getItem('code_verifier');
		const code = $page.url.searchParams.get('code');

		// Send the code and codeVerifier to the server-side endpoint
		goto(`/callback/complete?code_verifier=${codeVerifier}&code=${code}`);
	});
</script>
