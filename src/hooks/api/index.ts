/**
 * API Hooks - Central Export
 */

export { useApiStatus, useMultiApiStatus, usePaginatedApiStatus } from './useApiStatus';
export type { ApiStatus, UseApiStatusOptions, ApiStatusState, ApiStatusActions } from './useApiStatus';

export { useTextract } from './useTextract';
export type { UseTextractOptions } from './useTextract';

// Future hooks will be exported here:
// export { useJDUpload } from './useJDUpload';
// export { useFeedback } from './useFeedback';
// export { useAdmin } from './useAdmin';
// export { useCVAdmin } from './useCVAdmin';
