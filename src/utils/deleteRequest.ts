import axios from 'axios'

export async function deleteRequest(path: string, username: string) {
  const config = {
    headers: {
      username: username
    }
  }
  try {
    await axios.delete(path, config)
  } catch (error) {
    console.error(error)
  }
}
