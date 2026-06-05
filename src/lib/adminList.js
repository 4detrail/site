// Admin emails - mirrors admin.txt
export const ADMIN_EMAILS = [
  "yigittr1922@gmail.com"
];

export function isAdmin(email) {
  return email && ADMIN_EMAILS.includes(email.toLowerCase());
}