import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
const SearchInput: React.FC = () => {
const [_, setSearchParams] = useSearchParams();

  const [date, setDate] = useState('');
    const { t } = useTranslation()
    
      useEffect(() => {
          setSearchParams({date:date})

 

  }, [date]);

  return (
    <div className="flex items-center gap-4 border p-3 rounded-lg border-accent-hover shadow-sm">
      

      <label className="flex items-center gap-2 text-sm text-accent">
              <span className="font-bold text-xl">{ t("date")} : </span>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="p-2 border rounded text-sm hover:text-accent-hover focus:outline-0 transition-colors duration-300"
        />
      </label>
    </div>
  );
};

export default SearchInput;
