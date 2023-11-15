export const setLocationData = (data) => ({
    type: 'SET_LOCATION_DATA',
    payload: data,
  });
  
  export const setLoading = (isLoading) => ({
    type: 'SET_LOADING',
    payload: isLoading,
  });
  
  export const setError = (error) => ({
    type: 'SET_ERROR',
    payload: error,
  });
  