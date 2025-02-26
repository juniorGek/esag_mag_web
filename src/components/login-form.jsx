
const LoginForm = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="overflow-hidden border rounded-lg shadow-md">
        <div className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-gray-500">
                  Login to your Acme Inc account
                </p>
              </div>
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <a
                    href="#"
                    className="ml-auto text-sm text-blue-600 underline hover:no-underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-blue-600 px-4 py-2 text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
              >
                Login
              </button>
              <div className="relative text-center text-sm">
                <span className="relative bg-white px-2 text-gray-500">
                  Or continue with
                </span>
                <div className="absolute inset-0 top-1/2 border-t border-gray-300" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <button
                  type="button"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-500 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-200"
                >
                  <span className="sr-only">Login with Apple</span>
                  {/* Replace with your Apple logo */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.152 6.896c-.948..."
                      fill="currentColor"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-500 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-200"
                >
                  <span className="sr-only">Login with Google</span>
                  {/* Replace with your Google logo */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h..."
                      fill="currentColor"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-500 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-200"
                >
                  <span className="sr-only">Login with Meta</span>
                  {/* Replace with your Meta logo */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M6.915 4.03c-1.968..."
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a
                  href="#"
                  className="text-blue-600 underline hover:no-underline"
                >
                  Sign up
                </a>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-gray-100 md:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500">
        By clicking continue, you agree to our{" "}
        <a href="#" className="text-blue-600 underline hover:no-underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="text-blue-600 underline hover:no-underline">
          Privacy Policy
        </a>
        .
      </div>
    </div>
  )
}

export default LoginForm
