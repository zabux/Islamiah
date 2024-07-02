import React from 'react';

const QuotesCard = ({ quote }) => (
  <div className="mt-4 p-6 bg-white rounded-lg shadow-lg">
    <p className="text-lg text-gray-800">{quote}</p>
  </div>
);

export default QuotesCard;