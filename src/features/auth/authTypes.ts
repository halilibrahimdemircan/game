export type User = {
  user: string
  token: string
}

export type GetUserResponse = {
  data: User
}
export interface SignStartInput {
  address: string
}
export type SignStartResponse = {
  success: boolean
  address: string
  temp_password: number
}
export type SignCompleteInput = {
  address: string
  signature: string
  temp_password: number
}
export interface AuthState {
  value: User | null
  status: 'idle' | 'loading' | 'failed'
}
