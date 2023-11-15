import React from 'react';

const LocationInfo = ({ data, loading, error }) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data) {
    return null;
  }

  return (
    <div>
      <h2>Location Information</h2>
      <p>Country: {data.country}</p>
      <p>State: {data.state}</p>
      <p>Place Name: {data.placeName}</p>
    </div>
  );
};

export default LocationInfo;
