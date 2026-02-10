import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/sections/Header";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Salva o token no localStorage para futuras requisições autenticadas
        localStorage.setItem("token", data.token);
        navigate("/"); // Redireciona para a home page após o login
      } else {
        setError(data.message || "Credenciais inválidas. Tente novamente.");
      }
    } catch (err) {
      setError("Não foi possível conectar ao servidor. Tente novamente.");
    }
  };

  return (
    <>
      <Header showCartIcon={false} showUserIcon={false} />
      <main className="min-h-screen bg-stone-50 dark:bg-stone-900 font-serif p-8 flex items-center justify-center">
        <div className="max-w-md w-full">
          <h1 className="text-4xl font-bold text-stone-800 dark:text-stone-200 mb-8 text-center">
            Login
          </h1>
          <div className="bg-white dark:bg-stone-800 shadow-elegant rounded-sm p-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-stone-700 dark:text-stone-300 mb-2 font-sans text-sm"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-sm border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-stone-700 dark:text-stone-300 mb-2 font-sans text-sm"
                >
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-3 rounded-sm border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="sua senha"
                  required
                />
              </div>

              {error && (
                <p className="text-red-600 dark:text-red-500 text-sm mb-4 font-sans">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-amber-800 text-white px-10 py-3 font-sans font-medium rounded-sm hover:bg-amber-900 dark:bg-amber-700 dark:hover:bg-amber-600 transition-colors"
              >
                Entrar
              </button>
            </form>
            <p className="text-center text-sm font-sans text-stone-600 dark:text-stone-400 mt-6">
              Não tem uma conta?{" "}
              <Link
                to="/register"
                className="text-amber-800 dark:text-amber-500 hover:underline"
              >
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
