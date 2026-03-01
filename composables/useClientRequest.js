/**
 * Client-side request (based on $fetch).
 * Used for user interactions and dynamic content (form submit, toggle, delete).
 * @param {string} url - Request URL
 * @param {Object} [options] - $fetch options (method, body, headers, etc.)
 * @returns {Promise<*>} Response data
 */
export function useClientRequest(url, options = {})
{
	return $fetch(url, options);
}
