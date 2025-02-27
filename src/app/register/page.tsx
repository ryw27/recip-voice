import { register } from '../actions'
import Link from 'next/link';
import { FaGoogle } from 'react-icons/fa'

export default function LoginPage() {
  
  return (
    <div className="flex min-h-screen min-w-full justify-center items-center flex-col">
      <div className="container mx-auto font-bold text-2xl text-center mb-6">
        Logo
      </div>
      <main className="flex flex-col container mx-auto w-[450px] border border-gray-500 rounded-md space-y-4">
        <h2 className="text-2x1 font-bold text-center mt-4 py-2">
          Register  
        </h2>
        <button className="flex items-center justify-center rounded-md bg-gray-800 border-3 border-gray-500 
                          mx-6 my-8 px-4 py-2 gap-4 hover:bg-gray">
          <FaGoogle /> Continue with Google
        </button>
        <div className="flex items-center my-16 mx-2">
          <div className="flex-grow border-t-2 border-gray-500"></div>
          <span className="flex-shrink mx-4 text-gray-600">or</span>
          <div className="flex-grow border-t-2 border-gray-500"></div>
        </div>
        <form>
          <div className="my-4 mx-6 ">
            <label htmlFor="email" className="block mb-2">Email</label>
            <input 
              id="email"
              name="email"
              type="text"
              placeholder="Enter your email"
              className="shadow bg-inherit rounded-md border border-gray-700 py-2 px-3 w-full"
            ></input> 
          </div>
          <div className="my-4 mx-6 ">
            <label htmlFor="password" className="block mb-2">Password</label>
            <input 
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              className="shadow bg-inherit rounded-md border border-gray-700 py-2 px-3 w-full"
            ></input> 
          </div>
          <div className="my-8 mx-6 flex justify-end items-center">
            <div className="flex items-center">
              <p className="text-sm block text-gray-600 mr-1">
                Already have an account?
              </p>
              <Link href="/login" className="font-normal text-sm hover:underline">Log in </Link>
            </div>
          </div>
          <div className="my-4 mx-6 ">
            <button
              id="Submit"
              type="submit"
              className="text-white shadow bg-gray-500 rounded-md border border-gray-700 py-2 px-3 w-full"
              formAction={register}
            >Sign up</button> 
          </div>
 
        </form>
      </main>
    </div>
  )
}