import { useState, useEffect } from 'react';

const useGeo = options => {
  const [isGeoLoading, setIsGeoLoading] = useState(true);
  const [geoError, setGeoError] = useState(null);
  const [geo, setGeo] = useState({});

  let isloaded = false;
  let id;

  const onSuccess = event => {
    if (isloaded) {
      setIsGeoLoading(false);
      setGeo(event.coords);
    }
  };
  const onFailure = error => {
    if (isloaded) {
      setIsGeoLoading(false);
      setGeoError(error);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess, onFailure, options);
    id = navigator.geolocation.watchPosition(onSuccess, onFailure, options);

    return () => {
      isloaded = false;
      navigator.geolocation.clearWatch(id);
    };
  }, [options]);

  return { geo, isGeoLoading, geoError };
};

export default useGeo;
