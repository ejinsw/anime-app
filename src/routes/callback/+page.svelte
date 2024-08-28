<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(async () => {
		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get('code');
		const returnedState = urlParams.get('state');

		if (!code || !returnedState) {
			console.error('Invalid OAuth response');
			return;
		}

		const storedState = sessionStorage.getItem('state');
		const codeVerifier = sessionStorage.getItem('code_verifier');

		if (storedState !== returnedState) {
			console.error('Invalid state, possible CSRF attack detected');
			return;
		}

		// Send the code and codeVerifier to the server-side endpoint
		const response = await fetch('/callback', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ code, codeVerifier })
		});

		if (!response.ok) {
			console.error('Token exchange failed', response);
			return;
		}
	});
</script>
