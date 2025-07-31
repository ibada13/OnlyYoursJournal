import { useEffect, useState } from 'react';
import {  useSearchParams } from 'react-router-dom';
import useSWR from 'swr';

import { get } from '../lib/utils';
import { handleJournals } from './lib/utils';
import type { JournalApiResponse, JournalCardInterface } from './lib/types';

import { useTranslation } from 'react-i18next';
import Middleware from '../../components/auth/Middleware';
import JournalCard from './ui/JournalCard';
import AddCard from './ui/AddCard';
import JournalCardPlaceholder from './ui/JournalCardPlaceholder';
import SearchBar from './ui/SearchBar';
import { useLogout } from '../lib/auth';


export default function Home() {
  const [searchParams] = useSearchParams();
  const date = searchParams.get('date');
  const logout = useLogout()
  const { t } = useTranslation();
  const [journals, setJournals] = useState<JournalCardInterface[] | null>(null);
  // console.log(searchParams)
  const { data, error ,isLoading } = useSWR<JournalApiResponse>(
    date ? `/journals?date=${date}` : "/journals",
    get
  );

  useEffect(() => {
    if (data) {
      const decryptJournals = async () => {
        try {

          const result = await handleJournals(data.data);
          
          
          // console.log(journals)
          setJournals(result);
        } catch (err) { 
                    if (err instanceof Error && err.message === "Missing password for decryption.") {
            await logout()
          }
          console.error(err)
        }
      };
      decryptJournals();
    }
  }, [data]);

  return (
    <Middleware middleware="auth">
      <div className="w-screen min-h-screen flex flex-col items-center py-6">
        <SearchBar />

        <div className="w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
          <AddCard />

          {error && (
            <JournalCardPlaceholder
              className="border-red-800 bg-red-300/50"
              text={t('error_loading')}
            />
          )}

          {isLoading && !error &&(
            <JournalCardPlaceholder
              className="border-teal-800 bg-teal-300/50"
              text={t('loading_journals')}
            />
          )}

          {journals?.length
            ? journals.map((journal) => (
                <JournalCard key={journal.id} journalData={journal} />
              ))
            : journals &&
              journals.length === 0 && (
                <JournalCardPlaceholder
                  className="border-cyan-800 bg-cyan-400/50"
                  text={t('no_journals')}
                />
              )}
        </div>
      </div>
    </Middleware>
  );
}
