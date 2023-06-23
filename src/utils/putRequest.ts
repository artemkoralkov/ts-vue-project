import axios from 'axios'

export async function putRequest(path: string, payload: object) {
  try {
    await axios.put(path, payload)
  } catch (error) {
    console.error(error)
  }
}
