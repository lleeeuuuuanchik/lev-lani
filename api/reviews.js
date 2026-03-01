import { useRequest } from '~/composables/useRequest';
import { useClientRequest } from '~/composables/useClientRequest';

export const reviewsApi = {
	/**
	 * Get approved reviews (public)
	 * @returns {ReturnType<useRequest>}
	 */
	getReviews()
	{
		return useRequest('/api/reviews');
	},

	/**
	 * Submit new review (approved=0)
	 * @param {Object} body - { author, service, text, rating? }
	 * @returns {Promise<Object>}
	 */
	async submitReview(body)
	{
		return await useClientRequest('/api/reviews', { method: 'POST', body });
	},

	/**
	 * Get all reviews (admin)
	 * @returns {ReturnType<useRequest>}
	 */
	getAdminReviews()
	{
		return useRequest('/api/admin/reviews');
	},

	/**
	 * Update review (e.g. toggle approved)
	 * @param {number|string} id - Review id
	 * @param {Object} body - { approved? }
	 * @returns {Promise<Object>}
	 */
	async patchReview(id, body)
	{
		return await useClientRequest(`/api/admin/reviews/${id}`, { method: 'PATCH', body });
	},

	/**
	 * Delete review
	 * @param {number|string} id - Review id
	 * @returns {Promise<void>}
	 */
	async deleteReview(id)
	{
		return await useClientRequest(`/api/admin/reviews/${id}`, { method: 'DELETE' });
	},
};
