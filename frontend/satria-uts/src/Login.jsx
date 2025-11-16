import { useState } from "react";

export default function Login({ onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false); // true = Sign Up, false = Login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Bisa simpan akun sementara di state
  const [accounts, setAccounts] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.trim() === "" || password.trim() === "") {
      alert("Username dan password tidak boleh kosong!");
      return;
    }

    if (isRegister) {
      // Tambahkan akun baru
      setAccounts([...accounts, { username, password }]);
      alert("Akun berhasil dibuat!");
      setUsername("");
      setPassword("");
      setIsRegister(false); // kembali ke login
    } else {
      // Cek login
      const user = accounts.find(
        (acc) => acc.username === username && acc.password === password
      );
      if (user) {
        onLoginSuccess();
      } else {
        alert("Username atau password salah!");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-600">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-96 max-w-full">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="bg-blue-600 text-white w-16 h-16 flex items-center justify-center rounded-full text-3xl font-bold">
            
          </div>
        </div>

        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          {isRegister ? "Create Account" : "Selamat Datang!"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition transform hover:-translate-y-1"
          >
            {isRegister ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          {isRegister ? "Already have an account?" : "Don’t have an account?"}{" "}
          <button
            className="text-blue-600 font-semibold hover:underline"
            onClick={() => {
              setIsRegister(!isRegister);
              setUsername("");
              setPassword("");
            }}
          >
            {isRegister ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
