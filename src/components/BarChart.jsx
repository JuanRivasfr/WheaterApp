import React from 'react';

const BarChart = ({ data }) => {
  return (
    <div className="rounded-lg">
      {data.map((item, index) => (
        <div key={index} className="flex items-center mb-2">
          <span className="w-12">{item.hora}</span>
          <div className="flex-1 h-4 bg-white rounded-full mx-2">
            <div
              className="h-full bg-purple-600 rounded-full"
              style={{ width: `${item.chance}%` }}
            ></div>
          </div>
          <span className="w-12 text-right">{item.chance}%</span>
        </div>
      ))}
    </div>
  );
};

export default BarChart;