export async function KeyGen(
  password: string,
  existingSalt?: Uint8Array,
  existingIv?: Uint8Array
): Promise<{ key: CryptoKey; salt: Uint8Array; iv: Uint8Array }> {
  const salt = existingSalt ?? crypto.getRandomValues(new Uint8Array(16));
  const iv = existingIv ?? crypto.getRandomValues(new Uint8Array(12));

  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt:salt.buffer as ArrayBuffer,
      iterations: 100000,
      hash: "SHA-256"
    },
    
    keyMaterial,
    { name: "AES-GCM", length: 256 },
 true ,
    ["encrypt", "decrypt"]
  );
  
    return { key, salt, iv };
}

export function bytesToBase64(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes));
}

export function base64ToBytes(base64: string): Uint8Array {
  const binary = atob(base64);
  return Uint8Array.from(binary, c => c.charCodeAt(0));
}


export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}


export function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}


export async function encryptData(
  plaintext: string,
  key: CryptoKey,
  iv: Uint8Array
): Promise<string> {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(plaintext);

    const encrypted = await crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv as BufferSource,
      },
      key,
      data
    );
    return arrayBufferToBase64(encrypted);

  } catch (error) {
    throw new Error("Encryption failed: " + (error instanceof Error ? error.message : String(error)));
  }
}


export async function decryptData(
  ciphertextBase64: string,
  key: CryptoKey,
  iv: Uint8Array
): Promise<string> {
  try {
    const ciphertext = base64ToArrayBuffer(ciphertextBase64);

    const decrypted = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: iv as BufferSource,
      },
      key,
      ciphertext
    );

    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  } catch (error) {
    throw new Error("Decryption failed: " + (error instanceof Error ? error.message : String(error)));
  }
}


export async function hashPassword(password: string): Promise<Uint8Array> {
  const encoder = new TextEncoder();
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(password));
  return new Uint8Array(hashBuffer);
}
