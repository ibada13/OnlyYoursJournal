import React from 'react';
import Calendar from './Calender';

const CalendarCard: React.FC = () => {
  const today = new Date();
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

  const coloredDates = [
    { date: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-05`, color: 'bg-red-300' },
    { date: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-10`, color: 'bg-green-300' },
    { date: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-15`, color: 'bg-blue-300' },
  ];

  return (
    <div className="p-4 max-w-md h-64 mx-auto">
      <h1 className="text-xl font-bold mb-4">Calendar</h1>
      <Calendar month={monthStart} coloredDates={coloredDates} />
    </div>
  );
};

export default CalendarCard;
