import { mockDemoAccounts } from "../data/mockData";

const STORAGE_KEY = "dashboard.demo_accounts";

function safeParse(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

export function getDemoAccounts() {
  const stored = safeParse(localStorage.getItem(STORAGE_KEY));
  if (Array.isArray(stored) && stored.length) return stored;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockDemoAccounts));
  return mockDemoAccounts;
}

export function saveDemoAccounts(accounts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
}

export function authenticateDemo(email, password) {
  const accounts = getDemoAccounts();
  return (
    accounts.find(
      (acct) =>
        acct.email.toLowerCase() === email.trim().toLowerCase() &&
        acct.password === password
    ) || null
  );
}

export function updateDemoAccount(id, patch) {
  const accounts = getDemoAccounts();
  const next = accounts.map((acct) =>
    acct.id === id ? { ...acct, ...patch } : acct
  );
  saveDemoAccounts(next);
  return next.find((acct) => acct.id === id) || null;
}

