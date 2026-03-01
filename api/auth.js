import { useClientRequest } from '~/composables/useClientRequest';

export const authApi = {
	/**
	 * Login — creates sealed cookie session
	 * @param {Object} body - { email, password }
	 * @returns {Promise<Object>} Session result
	 */
	async login(body)
	{
		return await useClientRequest('/api/auth/login', { method: 'POST', body });
	},

	/**
	 * Logout — removes session
	 * @returns {Promise<void>}
	 */
	async logout()
	{
		return await useClientRequest('/api/auth/logout', { method: 'POST' });
	},
};
