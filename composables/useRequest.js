/**
 * Server-side request (based on useFetch).
 * Executed on server before page mounting, data available during hydration.
 * Use for initial data loading to prevent loading states.
 * @param {string} url - Request URL
 * @param {Object} [options] - useFetch options (key, default, watch, etc.)
 * @returns {ReturnType<useFetch>} useFetch return value (data, error, refresh, pending, status)
 */
export function useRequest(url, options = {})
{
	return useFetch(url, options);
}
