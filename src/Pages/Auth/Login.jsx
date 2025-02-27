import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMessage } from "../../utils/messageContext";
import { API_URL } from "../../../config/ApiUrl";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setMessage } = useMessage();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      setLoading(true);
      const reponse = await fetch(`${API_URL}/AdminLogin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await reponse.json();
      if (reponse.status === 200) {
        localStorage.setItem("token", data.token);
        setMessage({ type: "success", text: data.message });
        navigate("/admin/dashboard");
      } else if (reponse.status === 400) {
        toast.error(data.message, { position: "top-right" });
      } else {
        toast.error("Verifier vos informations", { position: "top-right" });
      }
    } catch (error) {
      toast.error("erreur de connexion", {
        position: "top-right",
        autoClose: 5000,
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Bienvenue !</h1>
          <p className="text-gray-600">
            Renseignez vos informations pour vous connectez
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="At least 8 characters"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      showPassword
                        ? "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        : "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    }
                  />
                </svg>
              </button>
            </div>
            <div className="flex justify-end mt-2">
              <Link
                to="/login/forgetPassword"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Mot de passe oublié?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                {/* Spinner SVG */}
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                <span className="ml-2">Chargement...</span>
              </div>
            ) : (
              "Se connecter"
            )}
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
