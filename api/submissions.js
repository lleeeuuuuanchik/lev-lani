import { useRequest } from '~/composables/useRequest';

export const submissionsApi = {
	/**
	 * Get all submissions (admin, requires session)
	 * @returns {ReturnType<useRequest>}
	 */
	getSubmissions()
	{
		return useRequest('/api/submissions');
	},
};
