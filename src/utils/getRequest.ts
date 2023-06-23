import axios from 'axios'
export async function getRequest(path: string) {
  try {
    const response = await axios.get(path)
    return response.data
  } catch (error: any) {
    console.error({ ...error })
  }
}
