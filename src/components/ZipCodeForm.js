import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { setLoading, setLocationData, setError } from '../redux/actions';

const ZipCodeForm = () => {
  const [zipCode, setZipCode] = useState('');
  const dispatch = useDispatch();
  const { locationData, loading, error } = useSelector((state) => state);

  const handleChange = (e) => {
    setZipCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!zipCode) {
      setZipCodeError('Postal code cannot be empty');
      return;
    }

    dispatch(setLoading(true));

    try {
      const response = await axios.get(`https://api.zippopotam.us/in/${zipCode}`);
      const countryData = response.data;
      const placeData = response.data.places;

      const stateInfo = placeData.length > 0 ? placeData[0].state : 'N/A';

      dispatch(setLocationData({ country: countryData.country, state: stateInfo, places: placeData }));
      dispatch(setError(null));
      setZipCodeError(null);
    } catch (err) {
      dispatch(setLocationData(null));
      dispatch(setError(null));
      setZipCodeError('No information available for the provided postal code.');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleClear = () => {
    setZipCode('');
    dispatch(setLocationData(null));
    dispatch(setError(null));
    setZipCodeError(null);
  };

  const [zipCodeError, setZipCodeError] = useState(null);

  return (
    <div className="container mt-5 text-center">
      <form onSubmit={handleSubmit} className="mb-4 needs-validation" noValidate>
        <div className="row justify-content-center">
          <div className="col-md-6 col-sm-8">
            <div className="input-group">
              <input
                type="text"
                className={`form-control ${zipCodeError ? 'is-invalid' : ''}`}
                id="zipCode"
                value={zipCode}
                onChange={handleChange}
                placeholder="Enter Postal Code"
                required
              />
              <div className="invalid-feedback">
                {zipCodeError}
              </div>
            </div>
          </div>
          <div className="col-md-2 col-sm-4">
            <button type="submit" className="btn btn-primary btn-block">Submit</button>
          </div>
        </div>
      </form>

      {loading && <p className="mt-3">Loading...</p>}

      {error && <p className="mt-3 text-danger">Error: {error.message}</p>}

      {locationData && locationData.places.length > 0 && (
        <div className="mt-3">
          <h2 className="mb-3">Location Information</h2>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Country</h5>
              <p className="card-text">{locationData.country || 'N/A'}</p>
              <h5 className="card-title">State</h5>
              <p className="card-text">{locationData.state || 'N/A'}</p>
              <h5 className="card-title">Place Names</h5>
              <ul className="list-group">
                {locationData.places.map((place, index) => (
                  <li key={index} className="list-group-item">{place['place name']}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {locationData && (
        <button type="button" className="btn btn-secondary mt-3" onClick={handleClear}>Clear</button>
      )}
    </div>
  );
};

export default ZipCodeForm;