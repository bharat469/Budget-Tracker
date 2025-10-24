import { DEFAULT_CURRENCIES } from './staticArray';

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

export const getGreeting = () => {
  const currentHour = new Date().getHours();

  if (currentHour < 12) {
    return 'Good Morning 🌅';
  } else if (currentHour < 18) {
    return 'Good Afternoon 🌞';
  } else {
    return 'Good Evening 🌙';
  }
};

export const formatCurrency = (text: string, countryCode: string) => {
  const cleanValue = text.replace(/,/g, '');
  if (isNaN(Number(cleanValue))) return text;
  if (countryCode === 'INR') {
    const lastThree = cleanValue.slice(-3);
    const otherNumbers = cleanValue.slice(0, -3);
    return (
      otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') +
      (otherNumbers ? ',' : '') +
      lastThree
    );
  } else {
    return Number(cleanValue).toLocaleString('en-US');
  }
};

export const setCurrencySigin = (currencyType: string) => {
  let fetchSymbol = DEFAULT_CURRENCIES.filter(item => {
    return item.code === currencyType;
  });
  return fetchSymbol[0].symbol;
};

export const expenseTypeSigin = (type: string) => {
  if (type === 'income') {
    return '+';
  } else {
    return '-';
  }
};