import axios from 'axios'

export async function postRequest(
  path: string,
  payload: object,
  username: string | undefined = undefined
) {
  const config = {
    headers: {
      username: username
    }
  }
  try {
    const response = await axios.post(path, payload, config)
    return response.data
  } catch (error) {
    console.error(error)
  }
}
