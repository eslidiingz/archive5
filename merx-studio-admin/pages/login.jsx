import { useEffect, useState } from "react";
import bcrypt from "bcryptjs";
import { getAdmins } from "/models/Admin";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { useAdminContext } from "../context/AdminContext";
import { useSession, signIn, signOut } from "next-auth/react";

function Login() {
  const { session } = useSession();

  // const { admin, adminAction } = useAdminContext()

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(null);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    /** Validated */
    if (!form.username.trim() || !form.password.trim()) {
      setTimeout(() => {
        Swal.fire("Failed", "Username or Password is invalid.", "error");
        setIsLoading(false);
      }, 500);
      return;
    }

    /** User data is exist check */
    let admin = (await getAdmins(`{username: {_eq: "${form.username}"}}`)).data;

    if (admin.length < 1) {
      Swal.fire("Failed", "Username not found.", "error");
      setIsLoading(false);
      return;
    }

    /** Authorization check */
    const isAuthenSuccess = await bcrypt.compare(
      form.password,
      admin[0].password
    );

    if (!isAuthenSuccess) {
      Swal.fire("Failed", "Password is invalid.", "error");
      setIsLoading(false);
      return;
    }

    setIsLoading(false);

    /** Call to next auth signin */
    signIn("Merx", form);
  };

  useEffect(() => {
    console.log("session", session);
  }, [session]);

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-800">
        <form
          onSubmit={handleSubmit}
          className="border rounded-lg p-6 w-full max-w-sm bg-white"
        >
          <div className="text-center text-2xl mb-4">Login Form</div>

          <div className="space-y-3 ">
            <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
              <label
                htmlFor="name"
                className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-400"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                placeholder="Enter your username"
                onChange={handleInputChange}
              />
            </div>

            <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
              <label
                htmlFor="name"
                className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-400"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                placeholder="Enter your password"
                onChange={handleInputChange}
              />
            </div>

            <button
              disabled={isLoading}
              className="w-full inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 justify-center"
            >
              {isLoading ? "Login..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
