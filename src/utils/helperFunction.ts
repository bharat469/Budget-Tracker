export const normalizePhone = (input: string) => {
  if (!input) return '';
  let clean = input.replace(/[^0-9+]/g, ''); // remove all except digits & +
  if (clean.startsWith('+91') && clean.length === 13) return clean;
  if (clean.startsWith('91') && clean.length === 12) return `+${clean}`;
  if (clean.length === 10) return `+91${clean}`;
  return clean;
};

export const normalizeEmail = (email: string) => {
  if (!email) return '';
  return email.replace(/"/g, '').trim().toLowerCase(); // remove quotes, spaces, lowercase
};
