import { useRequest } from '~/composables/useRequest';
import { useClientRequest } from '~/composables/useClientRequest';

export const mastersApi = {
	/**
	 * Get active masters (public)
	 * @returns {ReturnType<useRequest>}
	 */
	getMasters()
	{
		return useRequest('/api/masters');
	},

	/**
	 * Get all masters (admin)
	 * @returns {ReturnType<useRequest>}
	 */
	getAdminMasters()
	{
		return useRequest('/api/admin/masters');
	},

	/**
	 * Create master
	 * @param {Object} body - Master data
	 * @returns {Promise<Object>}
	 */
	async createMaster(body)
	{
		return await useClientRequest('/api/admin/masters', { method: 'POST', body });
	},

	/**
	 * Update master
	 * @param {number|string} id - Master id
	 * @param {Object} body - Master data
	 * @returns {Promise<Object>}
	 */
	async updateMaster(id, body)
	{
		return await useClientRequest(`/api/admin/masters/${id}`, { method: 'PUT', body });
	},

	/**
	 * Toggle master active flag
	 * @param {Object} master - Master object with id and active
	 * @returns {Promise<Object>}
	 */
	async toggleMasterActive(master)
	{
		return await useClientRequest(`/api/admin/masters/${master.id}`, {
			method: 'PUT',
			body: { active: master.active ? 0 : 1 },
		});
	},

	/**
	 * Delete master
	 * @param {number|string} id - Master id
	 * @returns {Promise<void>}
	 */
	async deleteMaster(id)
	{
		return await useClientRequest(`/api/admin/masters/${id}`, { method: 'DELETE' });
	},
};
