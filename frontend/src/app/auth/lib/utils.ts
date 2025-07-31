import type { Journal ,JournalCardInterface, JournalContent} from "./types";
import { decryptData ,KeyGen ,base64ToBytes} from "../../lib/crypt";
import { getPasswordHash } from "../../lib/keystore";


/**
 * async function that takes journals as params of type Journal[]
 * 
 * @throw Error  if password not found 
 * @return decrypted journal list of type JournalCardInterface 
 */

export async function handleJournals(journals: Journal[]): Promise<JournalCardInterface[]> {
  const password = getPasswordHash();
  
  if (!password) {

    throw new Error("Missing password for decryption.");
  }

  let lastSalt: string | null = null;
  let lastIv: string | null = null;
  let cachedKey: CryptoKey | null = null;

  const decrypted: JournalCardInterface[] = [];

  for (const journal of journals) {
    try {
      const saltStr = journal.salt.salt;
      const ivStr = journal.salt.iv;

      const useCachedKey = saltStr === lastSalt && ivStr === lastIv;

      const ivBytes = base64ToBytes(ivStr);
      const saltBytes = base64ToBytes(saltStr);

      let key: CryptoKey;

      if (useCachedKey && cachedKey) {
        key = cachedKey;
      } else {
        const derived = await KeyGen(password, saltBytes, ivBytes);
        key = derived.key;
        cachedKey = key;
        lastSalt = saltStr;
        lastIv = ivStr;
      }

      const title = await decryptData(journal.title, key, ivBytes);

      decrypted.push({
        title,
        created_at: journal.created_at,
        updated_at: journal.updated_at,
        id: journal.id,
      });
    } catch (error) {
      console.error(`Decryption failed for journal ${journal.id}:`, error);
      
    }
  }

  return decrypted;
}



export async function handleJournalContent(journal: JournalContent): Promise<string> {
  const password = getPasswordHash();
  if (!password) {
    throw new Error("Missing password for decryption.");
  }

  try {
    const iv = base64ToBytes(journal.iv);
    const salt = base64ToBytes(journal.salt);
    console.log({salt , iv})
    const { key } = await KeyGen(password, salt, iv);

    const decryptedData = await decryptData(journal.content, key, iv);
    return decryptedData;
  } catch (error) {
    throw error;
  }
}