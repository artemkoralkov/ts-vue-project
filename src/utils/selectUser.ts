const users: { [name: string]: string } = {
  MASTER: import.meta.env.VITE_MASTER_PASSWORD
}

export function selectUser(passwordHash: string) {
  return Object.keys(users).find((key) => users[key] === passwordHash)
}
