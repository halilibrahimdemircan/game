import axios from 'axios'
import { User, SignStartInput, SignStartResponse } from './authTypes'
// const baseURL = 'http://localhost:8000/api'
const baseURL = 'https://api.nftinit.io/api'

export async function signStartWithWallet(signData: SignStartInput) {
  const { data, status } = await axios.post<SignStartResponse>(
    baseURL + '/mushboomers/sign_start/',
    signData,
    {
      headers: {
        Accept: 'application/json',
      },
    }
  )

  if (status !== 200) {
    throw new Error('Something went wrong!')
  }
  if (!data.success) {
    throw new Error('Something went wrong!')
  }

  return data
}
export async function signCompleteWithWallet(signData: any) {
  const { data, status } = await axios.post<any>(
    baseURL + '/mushboomers/sign_complete/',
    signData,
    {
      headers: {
        Accept: 'application/json',
      },
    }
  )

  if (status !== 200) {
    throw new Error('Something went wrong!')
  }
  if (!data.success) {
    throw new Error('Something went wrong!')
  }

  return data
}

export async function checkUser(user: User) {
  const { data, status } = await axios.post<boolean>(
    baseURL + '/mushboomers/check_user/',
    user,
    {
      headers: {
        Accept: 'application/json',
      },
    }
  )

  if (status !== 200) {
    throw new Error('Something went wrong!')
  }

  return true
}
