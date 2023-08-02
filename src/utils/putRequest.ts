import axios from 'axios'

export async function putRequest(path: string, payload: object, username: string) {
  const config = {
    headers: {
      username: username
    }
  }
  try {
    const response = await axios.put(path, payload, config)
  } catch (error) {
    console.error(error)
  }
}
