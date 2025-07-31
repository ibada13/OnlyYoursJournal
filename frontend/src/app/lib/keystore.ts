import { hashPassword } from "./crypt";
export async function saveKey(key: CryptoKey) {
  
  const rawKey = await crypto.subtle.exportKey("raw", key); 
  
  const db = await openDB();
  const tx = db.transaction("keys", "readwrite");
  const store = tx.objectStore("keys");
  store.put(rawKey, "user-key");

  await new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
}

export async function getKey(): Promise<CryptoKey | null> {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction("keys", "readonly");
    const store = tx.objectStore("keys");
    const request = store.get("user-key");

    request.onsuccess = async () => {
      const rawKey = request.result;
      if (!rawKey) return resolve(null);

      try {
        const key = await crypto.subtle.importKey(
          "raw",
          rawKey,
          { name: "AES-GCM" },
          false,
          ["encrypt", "decrypt"]
        );
        resolve(key);
      } catch (err) {
        reject(err);
      }
    };

    request.onerror = () => reject(request.error);
  });
}


export async function saveIv(iv: Uint8Array) {
  const db = await openDB();
  const tx = db.transaction("keys", "readwrite");
  const store = tx.objectStore("keys");
  store.put(iv, "user-iv");

  await new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
}

export async function getIv(): Promise<Uint8Array | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("keys", "readonly");
    const store = tx.objectStore("keys");
    const request = store.get("user-iv");

    request.onsuccess = () => resolve(request.result ?? null);
    request.onerror = () => reject(request.error);
  });
}
export async function saveSalt(salt: Uint8Array) {
  const db = await openDB();
  const tx = db.transaction("keys", "readwrite");
  const store = tx.objectStore("keys");
  store.put(salt, "user-salt");
  await new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getSalt(): Promise<Uint8Array | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("keys", "readonly");
    const store = tx.objectStore("keys");
    const request = store.get("user-salt");
    request.onsuccess = () => resolve(request.result ?? null);
    request.onerror = () => reject(request.error);
  });
}


export async function setPassword(password: string): Promise<string> {
  const hash = await hashPassword(password);
  const base64 = btoa(String.fromCharCode(...hash));
  sessionStorage.setItem("pw_hash", base64);
  return base64
}

export function getPasswordHash(): string | null {
  return sessionStorage.getItem("pw_hash");
}
export function clearPassword(): void {
  sessionStorage.removeItem("pw_hash");
}


async function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("AuthKeyDB", 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("keys")) {
        db.createObjectStore("keys");
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function clearDB(): Promise<void> {
  return new Promise((resolve, reject) => {
    const deleteRequest = indexedDB.deleteDatabase("AuthKeyDB");

    deleteRequest.onsuccess = () => resolve();
    deleteRequest.onerror = () => reject(deleteRequest.error);
    deleteRequest.onblocked = () => {
      console.warn("Database deletion is blocked. Close other tabs.");
    };
  });
}
