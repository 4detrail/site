const BIN_ID = "6a22e834da38895dfe8cee1d";
const MASTER_KEY = "$2a$10$acvRRZVB0w0jZgC48GZcY.ojQfJp0I4nZm4d4yEAnsdPZFJmZpGIu";
const BASE_URL = "https://api.jsonbin.io/v3/b";

const headers = {
  "Content-Type": "application/json",
  "X-Master-Key": MASTER_KEY
};

export async function getTickets() {
  const res = await fetch(`${BASE_URL}/${BIN_ID}/latest`, { headers });
  const data = await res.json();
  return data.record?.tickets || [];
}

export async function saveTicket(ticket) {
  const existing = await getTickets();
  const newTicket = {
    ...ticket,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    status: "open"
  };
  const updated = [...existing, newTicket];
  await fetch(`${BASE_URL}/${BIN_ID}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ tickets: updated })
  });
  return newTicket;
}

export async function updateTicketStatus(ticketId, status, adminReply = null) {
  const existing = await getTickets();
  const updated = existing.map(t =>
    t.id === ticketId
      ? { ...t, status, adminReply, updatedAt: new Date().toISOString() }
      : t
  );
  await fetch(`${BASE_URL}/${BIN_ID}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ tickets: updated })
  });
}