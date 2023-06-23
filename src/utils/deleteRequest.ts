import axios from 'axios'

export async function deleteRequest(path: string) {
  try {
    await axios.delete(path)
  } catch (error) {
    console.error(error)
  }
}
