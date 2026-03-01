import { useClientRequest } from '~/composables/useClientRequest';

export const contactApi = {
	/**
	 * Submit contact/booking form
	 * @param {Object} body - { name, phone, service, message? }
	 * @returns {Promise<Object>}
	 */
	async submitContact(body)
	{
		return await useClientRequest('/api/contact', { method: 'POST', body });
	},
};
