import axios from 'axios'

export async function postRequest(path: string, payload: object) {
  try {
    await axios.post(path, payload)
  } catch (error) {
    console.error(error)
  }
}
