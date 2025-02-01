import { login, signup } from './actions'
import Link from 'next/link';
import { FaGoogle } from 'react-icons/fa'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen min-w-full justify-center items-center">
      <main className="flex flex-col container mx-auto w-[450px] border border-gray-500 rounded-md space-y-4">
        <h2 className="text-2x1 font-bold text-center mt-4 py-2">
          Log in
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
              type="text"
              placeholder="Enter your email"
              className="shadow bg-inherit rounded-md border border-gray-700 py-2 px-3 w-full"
            ></input>
            
          </div>
          <div className="my-4 mx-6 ">
            <label htmlFor="password" className="block mb-2">Password</label>
            <input 
              id="email"
              type="password"
              placeholder="Enter your password"
              className="shadow bg-inherit rounded-md border border-gray-700 py-2 px-3 w-full"
            ></input> 
          </div>
          <div className="my-8 mx-6 flex justify-between items-center">
            <div className="flex items-center">
              <p className="text-sm block text-gray-600 mr-1">
                Need an account?
              </p>
              <Link href="/signup" className="font-normal text-sm hover:underline">Sign up</Link>
            </div>
            <p className="text-sm block text-white hover:underline">Forgot password?</p>
          </div>
          <div className="my-4 mx-6 ">
            <button
              id="Submit"
              type="button"
              className="text-white shadow bg-gray-500 rounded-md border border-gray-700 py-2 px-3 w-full"
            >Submit</button> 
          </div>
 
        </form>
      </main>
    </div>
  )
}