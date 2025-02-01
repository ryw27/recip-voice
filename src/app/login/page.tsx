import { login, signup } from './actions'
import { FaGoogle } from 'react-icons/fa'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen min-w-full justify-center items-center">
      <main className="flex flex-col container mx-auto w-96 border-2 border-gray-500 rounded-md space-y-4">
        <h2 className="text-2x1 font-bold text-center mt-4">
          Login
        </h2>
        <button className="flex items-center justify-center rounded-md bg-gray-700 border-3 border-gray-500 
                          mx-6 px-4 py-2 gap-4 hover:bg-gray">
          <FaGoogle /> Continue with Google
        </button>
        <div className="flex items-center my-8">
          <div className="flex-grow border-t-2 border-gray-500"></div>
          <span className="flex-shrink mx-4 text-gray-600">or</span>
          <div className="flex-grow border-t-2 border-gray-500"></div>
        </div>
      </main>
    </div>
  )
}