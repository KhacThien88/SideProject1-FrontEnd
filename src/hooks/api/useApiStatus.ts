import { useState, useCallback } from 'react';

export type ApiStatus = 'idle' | 'loading' | 'success' | 'error';

export interface UseApiStatusOptions {
  initialStatus?: ApiStatus;
  successMessage?: string;
  errorHandler?: (error: any) => void;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export interface ApiStatusState<T = any> {
  status: ApiStatus;
  data: T | null;
  error: any;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  isIdle: boolean;
}

export interface ApiStatusActions {
  setLoading: () => void;
  setSuccess: (data?: any) => void;
  setError: (error: any) => void;
  reset: () => void;
  execute: <T>(apiCall: () => Promise<T>) => Promise<T | null>;
}

export const useApiStatus = <T = any>(
  options: UseApiStatusOptions = {}
): ApiStatusState<T> & ApiStatusActions => {
  const {
    initialStatus = 'idle',
    successMessage,
    errorHandler,
    onSuccess,
    onError,
  } = options;

  const [status, setStatus] = useState<ApiStatus>(initialStatus);
  const [data, setData] = useState<T | null>(null);
  const [error, setErrorState] = useState<any>(null);

  // Computed states
  const isLoading = status === 'loading';
  const isSuccess = status === 'success';
  const isError = status === 'error';
  const isIdle = status === 'idle';

  // Actions
  const setLoading = useCallback(() => {
    setStatus('loading');
    setErrorState(null);
  }, []);

  const setSuccess = useCallback((newData?: any) => {
    setStatus('success');
    setErrorState(null);
    if (newData !== undefined) {
      setData(newData);
    }
    if (successMessage) {
      console.log(successMessage);
    }
    if (onSuccess) {
      onSuccess(newData);
    }
  }, [successMessage, onSuccess]);

  const setError = useCallback((newError: any) => {
    setStatus('error');
    setErrorState(newError);
    setData(null);
    
    if (errorHandler) {
      errorHandler(newError);
    } else {
      console.error('API Error:', newError);
    }
    
    if (onError) {
      onError(newError);
    }
  }, [errorHandler, onError]);

  const reset = useCallback(() => {
    setStatus('idle');
    setData(null);
    setErrorState(null);
  }, []);

  // Execute API call with automatic status management
  const execute = useCallback(async <U>(apiCall: () => Promise<U>): Promise<U | null> => {
    try {
      setLoading();
      const result = await apiCall();
      setSuccess(result);
      return result;
    } catch (err) {
      setError(err);
      return null;
    }
  }, [setLoading, setSuccess, setError]);

  return {
    // State
    status,
    data,
    error,
    isLoading,
    isSuccess,
    isError,
    isIdle,
    
    // Actions
    setLoading,
    setSuccess,
    setError,
    reset,
    execute,
  };
};

// Hook for managing multiple API calls
export const useMultiApiStatus = () => {
  const [statuses, setStatuses] = useState<Record<string, ApiStatusState>>({});

  const getStatus = useCallback((key: string): ApiStatusState => {
    return statuses[key] || {
      status: 'idle',
      data: null,
      error: null,
      isLoading: false,
      isSuccess: false,
      isError: false,
      isIdle: true,
    };
  }, [statuses]);

  const setStatus = useCallback((key: string, newStatus: Partial<ApiStatusState>) => {
    setStatuses(prev => ({
      ...prev,
      [key]: {
        ...getStatus(key),
        ...newStatus,
      }
    }));
  }, [getStatus]);

  const execute = useCallback(async <T>(
    key: string,
    apiCall: () => Promise<T>
  ): Promise<T | null> => {
    try {
      setStatus(key, { 
        status: 'loading', 
        isLoading: true, 
        isSuccess: false, 
        isError: false, 
        isIdle: false,
        error: null 
      });
      
      const result = await apiCall();
      
      setStatus(key, { 
        status: 'success', 
        data: result, 
        isLoading: false, 
        isSuccess: true, 
        isError: false, 
        isIdle: false 
      });
      
      return result;
    } catch (err) {
      setStatus(key, { 
        status: 'error', 
        error: err, 
        isLoading: false, 
        isSuccess: false, 
        isError: true, 
        isIdle: false,
        data: null 
      });
      
      return null;
    }
  }, [setStatus]);

  const reset = useCallback((key?: string) => {
    if (key) {
      setStatus(key, {
        status: 'idle',
        data: null,
        error: null,
        isLoading: false,
        isSuccess: false,
        isError: false,
        isIdle: true,
      });
    } else {
      setStatuses({});
    }
  }, [setStatus]);

  return {
    getStatus,
    execute,
    reset,
    allStatuses: statuses,
  };
};

// Hook for pagination with API status
export const usePaginatedApiStatus = <T = any>(initialPage: number = 1, initialLimit: number = 20) => {
  const apiStatus = useApiStatus<{
    items: T[];
    total: number;
    page: number;
    limit: number;
    hasNext: boolean;
    hasPrev: boolean;
  }>();

  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [currentApiCall, setCurrentApiCall] = useState<((page: number, limit: number) => Promise<any>) | null>(null);

  const loadPage = useCallback(async (
    apiCall: (page: number, limit: number) => Promise<any>,
    newPage?: number,
    newLimit?: number
  ) => {
    const currentPage = newPage ?? page;
    const currentLimit = newLimit ?? limit;
    
    if (newPage !== undefined) setPage(newPage);
    if (newLimit !== undefined) setLimit(newLimit);
    
    // Store the API call for nextPage/prevPage
    setCurrentApiCall(() => apiCall);

    return apiStatus.execute(() => apiCall(currentPage, currentLimit));
  }, [page, limit, apiStatus]);

  const nextPage = useCallback(async () => {
    if (apiStatus.data?.hasNext && currentApiCall) {
      return loadPage(currentApiCall, page + 1);
    }
  }, [apiStatus.data?.hasNext, currentApiCall, loadPage, page]);

  const prevPage = useCallback(async () => {
    if (apiStatus.data?.hasPrev && currentApiCall) {
      return loadPage(currentApiCall, page - 1);
    }
  }, [apiStatus.data?.hasPrev, currentApiCall, loadPage, page]);

  const goToPage = useCallback(async (
    apiCall: (page: number, limit: number) => Promise<any>,
    targetPage: number
  ) => {
    return loadPage(apiCall, targetPage);
  }, [loadPage]);

  return {
    ...apiStatus,
    page,
    limit,
    setLimit,
    loadPage,
    nextPage,
    prevPage,
    goToPage,
    items: apiStatus.data?.items || [],
    total: apiStatus.data?.total || 0,
    hasNext: apiStatus.data?.hasNext || false,
    hasPrev: apiStatus.data?.hasPrev || false,
  };
};

export default useApiStatus;
