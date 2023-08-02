import React, { useRef, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { selectUser } from '../../features/auth/authSlice'
type Props = {
  isRegister: Boolean
}

export default function LoginPage({ isRegister }: Props) {
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()

  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const passwordRef2 = useRef<HTMLInputElement>(null)

  const inputClasses =
    'block bg-gray-800 rounded py-0.5 my-2 focus:border-d-green-100'
  const btnClasses =
    'bg-gray-200 text-gray-900 w-full rounded py-0.5 my-2 cursor-pointer'

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   if (!isRegister) {
  //     if (emailRef.current?.value && passwordRef.current?.value) {
  //       dispatch(
  //         signWithEmailAsync({
  //           email: emailRef.current?.value,
  //           password: passwordRef.current?.value,
  //         })
  //       )
  //     } else {
  //       alert('12313')
  //     }
  //   } else {
  //     if (
  //       emailRef.current?.value &&
  //       passwordRef.current?.value &&
  //       passwordRef2.current?.value &&
  //       passwordRef.current?.value === passwordRef2.current?.value
  //     ) {
  //       dispatch(
  //         registerWithEmailAsync({
  //           email: emailRef.current?.value,
  //           password: passwordRef.current?.value,
  //           password2: passwordRef2.current?.value,
  //         })
  //       )
  //     } else {
  //       alert('12313')
  //     }
  //   }
  // }
  console.log('user => ', user)
  return (
    <div className="flex items-center justify-center h-full">
      {user.value?.user && <p className="text-red-500">{user.value?.user}</p>}
      <div className="p-2 rounded-md border">
        {/* <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            ref={emailRef}
            className={inputClasses}
            required
          />
          <input
            type="password"
            placeholder="Password"
            ref={passwordRef}
            className={inputClasses}
            required
          />
          {isRegister && (
            <input
              type="password"
              placeholder="Password Again"
              ref={passwordRef2}
              className={inputClasses}
              required
            />
          )}
          <input
            type="submit"
            className={btnClasses}
            value={isRegister ? 'REGISTER' : 'LOGIN'}
          />
          <p className="text-center">or</p>
        </form> */}
        <button className={btnClasses}>Login with MM</button>
        <button className={btnClasses}>Login with CB</button>
      </div>
    </div>
  )
}
