/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import type { RequestHandler } from '@sveltejs/kit';

/**
 * Throttle middleware function with request queuing
 * @param limit - Maximum number of requests allowed
 * @param resetInterval - Time interval to reset request count in milliseconds
 */
export function throttle(limit: number, resetInterval: number) {
	let requestCount = 0;
	const queue: Array<{ resolve: (response: Response) => void; event: any }> = [];

	// Helper function to process the next request in the queue
	const processQueue = () => {
		if (queue.length > 0 && requestCount < limit) {
			const { resolve, event } = queue.shift()!; // Dequeue the first request
			requestCount++;

			// Execute the request and resolve it
			event.handler(event).then((response: Response) => {
				resolve(response);
				setTimeout(() => {
					requestCount--; // Decrement the request count after the reset interval
					processQueue(); // Continue processing the next request in the queue
				}, resetInterval);
			});
		}
	};

	return (handler: RequestHandler): RequestHandler => {
		return async (event) => {
			// Modify event to include the handler function
			(event as any).handler = handler;

			// If the request count is within the limit, proceed
			if (requestCount < limit) {
				requestCount++;
				const response = await handler(event);
				setTimeout(() => {
					requestCount--;
					processQueue(); // Process the next request in the queue
				}, resetInterval);
				return response;
			}

			// If request count exceeds limit, enqueue the request
			return new Promise<Response>((resolve) => {
				queue.push({ resolve, event });
			});
		};
	};
}
