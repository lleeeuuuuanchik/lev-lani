import { useRequest } from '~/composables/useRequest';
import { useClientRequest } from '~/composables/useClientRequest';

export const servicesApi = {
	/**
	 * Get active services (public).
	 * Key and default фиксированы, чтобы все вызовы (index, AppFooter, ServicesSection) разделяли один кеш и не ломали гидрацию.
	 * @returns {ReturnType<useRequest>}
	 */
	getServices()
	{
		return useRequest('/api/services', {
			key: 'api-services',
			default: () => [],
		});
	},

	/**
	 * Get all services (admin)
	 * @returns {ReturnType<useRequest>}
	 */
	getAdminServices()
	{
		return useRequest('/api/admin/services');
	},

	/**
	 * Create service
	 * @param {Object} body - Service data
	 * @returns {Promise<Object>}
	 */
	async createService(body)
	{
		return await useClientRequest('/api/admin/services', { method: 'POST', body });
	},

	/**
	 * Update service
	 * @param {number|string} id - Service id
	 * @param {Object} body - Service data
	 * @returns {Promise<Object>}
	 */
	async updateService(id, body)
	{
		return await useClientRequest(`/api/admin/services/${id}`, { method: 'PUT', body });
	},

	/**
	 * Toggle service active flag
	 * @param {Object} service - Service object with id and active
	 * @returns {Promise<Object>}
	 */
	async toggleServiceActive(service)
	{
		return await useClientRequest(`/api/admin/services/${service.id}`, {
			method: 'PUT',
			body: { active: service.active ? 0 : 1 },
		});
	},

	/**
	 * Delete service
	 * @param {number|string} id - Service id
	 * @returns {Promise<void>}
	 */
	async deleteService(id)
	{
		return await useClientRequest(`/api/admin/services/${id}`, { method: 'DELETE' });
	},
};
