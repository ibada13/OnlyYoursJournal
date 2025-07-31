import React from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  parseISO,
} from 'date-fns';

type ColoredDate = {
  date: string;
  color: string;
};

type CalendarProps = {
  month: Date;
  coloredDates?: ColoredDate[];
};

const Calendar: React.FC<CalendarProps> = ({ month, coloredDates = [] }) => {
  const startDate = startOfWeek(startOfMonth(month));
  const endDate = endOfWeek(endOfMonth(month));

  const days: Date[] = [];
  let current = startDate;
  while (current <= endDate) {
    days.push(current);
    current = addDays(current, 1);
  }

  const getColor = (date: Date) => {
    const match = coloredDates.find(d => isSameDay(parseISO(d.date), date));
    return match?.color || '';
  };

  return (
    <div className="grid grid-cols-7 gap-1">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
        <div key={day} className="text-center font-medium">{day}</div>
      ))}
      {days.map((day, i) => {
        const color = getColor(day);
        const faded = !isSameMonth(day, month) ? 'text-gray-400' : '';
        return (
          <div
            key={i}
            className={`p-2 text-center rounded-full ${faded} ${color || 'hover:bg-gray-100'}`}
          >
            {format(day, 'd')}
          </div>
        );
      })}
    </div>
  );
};

export default Calendar;
