'use client'
import { useState, useCallback, useEffect } from 'react';

interface Location {
  latitude: number;
  longitude: number;
}

interface UseLocationOptions {
  defaultLocation?: Location;
  timeout?: number;
}

const DEFAULT_LOCATION: Location = {
  latitude: 37.5665,  // 신촌 좌표
  longitude: 126.978,
};

export const useLocation = (options: UseLocationOptions = {}) => {
  const {
    defaultLocation = DEFAULT_LOCATION,
    timeout = 5000
  } = options;

  const [location, setLocation] = useState<Location>(defaultLocation);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleSuccess = useCallback((position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    setLocation({ latitude, longitude });
    setError(null);
    setIsLoading(false);
  }, []);

  const handleError = useCallback((error: GeolocationPositionError) => {
    setError(error.message);
    setLocation(defaultLocation);
    setIsLoading(false);
  }, [defaultLocation]);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      setLocation(defaultLocation);
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
      timeout,
      enableHighAccuracy: true,
    });
  }, [defaultLocation, handleError, handleSuccess, timeout]);

  return { location, error, isLoading };
};
