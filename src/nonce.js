export function generateNonce() {
  const nonceArray = new Uint8Array(10);
  crypto.getRandomValues(nonceArray);
  return Array.from(nonceArray)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}
