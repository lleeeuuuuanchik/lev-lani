import { authApi } from '~/api/auth';
import { servicesApi } from '~/api/services';
import { mastersApi } from '~/api/masters';
import { reviewsApi } from '~/api/reviews';
import { contactApi } from '~/api/contact';
import { submissionsApi } from '~/api/submissions';

/**
 * Composable that returns all API modules for server/client requests.
 * Use servicesApi.getServices() for server-side data, servicesApi.createService(body) for client-side mutations.
 * @returns {{ authApi, servicesApi, mastersApi, reviewsApi, contactApi, submissionsApi }}
 */
export function useApi()
{
	return {
		authApi,
		servicesApi,
		mastersApi,
		reviewsApi,
		contactApi,
		submissionsApi,
	};
}
