import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

// Carregamento preguiçoso (Lazy Loading) dos componentes de página
const EmbroideryEcommerce = lazy(() => import("./components/Ecommerce"));
const CheckoutPage = lazy(() => import("./pages/Checkout"));
const PaymentPage = lazy(() => import("./pages/Payment"));
const LoginPage = lazy(() => import("./pages/Login"));
const RegisterPage = lazy(() => import("./pages/Register"));
const AllProductsPage = lazy(() => import("./pages/AllProducts"));
const CartPage = lazy(() => import("./pages/CartPage"));
const AdminProductsPage = lazy(() => import("./pages/admin/AdminProductsPage"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-stone-50 dark:bg-stone-900">
          <p className="text-lg text-stone-600 dark:text-stone-400">
            Carregando...
          </p>
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<EmbroideryEcommerce />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/products" element={<AllProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute adminOnly>
              <AdminProductsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;
