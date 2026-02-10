import { Link } from "react-router-dom";
import Header from "../components/sections/Header";
import Footer from "../components/sections/Footer";
import { FiTrash2, FiPlus, FiMinus, FiShoppingCart } from "react-icons/fi";
import { useCart } from "../context/CartContext"; // Importa o hook

const CartPage = () => {
  // Usa o contexto para obter o estado e as ações do carrinho
  const { cartItems, loading, error, updateQuantity, removeFromCart } =
    useCart();

  // Calcula o subtotal, frete e total a partir dos itens do carrinho do contexto
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 100 ? 0 : 15.0;
  const total = subtotal + shipping;

  // O estado de carregamento agora vem do contexto
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-stone-50 dark:bg-stone-900 justify-center items-center">
        <p className="text-stone-700 dark:text-stone-300">
          Carregando carrinho...
        </p>
      </div>
    );
  }

  // O estado de erro também vem do contexto
  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-stone-50 dark:bg-stone-900 justify-center items-center">
        <p className="text-red-600 dark:text-red-500">{error}</p>
        <Link
          to="/login"
          className="mt-4 text-amber-800 dark:text-amber-500 hover:underline"
        >
          Fazer Login
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-stone-50 dark:bg-stone-900 font-serif">
      {/* O Header ainda recebe a contagem, mas agora calculada dos itens do contexto */}
      <Header />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-stone-800 dark:text-stone-200 mb-8">
          Meu Carrinho
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center bg-white dark:bg-stone-800 p-12 rounded-sm shadow-elegant">
            <FiShoppingCart
              size={48}
              className="mx-auto text-stone-400 dark:text-stone-500 mb-4"
            />
            <h2 className="text-2xl font-semibold text-stone-700 dark:text-stone-300 mb-2">
              Seu carrinho está vazio
            </h2>
            <p className="text-stone-500 dark:text-stone-400 mb-6">
              Adicione produtos para vê-los aqui.
            </p>
            <Link
              to="/products"
              className="bg-amber-800 text-white px-6 py-3 font-sans font-medium rounded-sm hover:bg-amber-900 dark:bg-amber-700 dark:hover:bg-amber-600 transition-colors"
            >
              Ver produtos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Coluna dos Itens do Carrinho */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-stone-800 shadow-elegant rounded-sm">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center p-4 border-b border-stone-200 dark:border-stone-700 last:border-b-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-sm mr-4"
                    />
                    <div className="flex-grow">
                      <h3 className="font-semibold text-stone-800 dark:text-stone-200">
                        {item.name}
                      </h3>
                      <p className="text-sm text-stone-600 dark:text-stone-400">
                        R$ {item.price.toFixed(2).replace(".", ",")}
                      </p>
                    </div>
                    <div className="flex items-center mx-4">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="p-1 text-stone-600 dark:text-stone-400 hover:text-amber-800 dark:hover:text-amber-500"
                      >
                        <FiMinus />
                      </button>
                      <span className="mx-3 font-medium text-stone-800 dark:text-stone-200">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-1 text-stone-600 dark:text-stone-400 hover:text-amber-800 dark:hover:text-amber-500"
                      >
                        <FiPlus />
                      </button>
                    </div>
                    <div className="text-right w-24">
                      <p className="font-semibold text-stone-800 dark:text-stone-200">
                        R${" "}
                        {(item.price * item.quantity)
                          .toFixed(2)
                          .replace(".", ",")}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)} // Usa a função de remover do contexto
                      className="ml-4 text-stone-500 hover:text-red-600 dark:text-stone-400 dark:hover:text-red-500"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Coluna do Resumo do Pedido */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-stone-800 shadow-elegant rounded-sm p-6">
                <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-200 mb-6">
                  Resumo do Pedido
                </h2>
                <div className="space-y-4 font-sans">
                  <div className="flex justify-between">
                    <span className="text-stone-600 dark:text-stone-400">
                      Subtotal
                    </span>
                    <span className="font-medium text-stone-800 dark:text-stone-200">
                      R$ {subtotal.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600 dark:text-stone-400">
                      Frete
                    </span>
                    <span className="font-medium text-stone-800 dark:text-stone-200">
                      {shipping === 0
                        ? "Grátis"
                        : `R$ ${shipping.toFixed(2).replace(".", ",")}`}
                    </span>
                  </div>
                  <div className="border-t border-stone-200 dark:border-stone-700 my-4"></div>
                  <div className="flex justify-between text-lg">
                    <span className="font-bold text-stone-800 dark:text-stone-200">
                      Total
                    </span>
                    <span className="font-bold text-amber-800 dark:text-amber-500">
                      R$ {total.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                </div>
                <Link to="/payment" className="w-full">
                  <button className="mt-6 w-full bg-amber-800 text-white px-6 py-3 font-sans font-medium rounded-sm hover:bg-amber-900 dark:bg-amber-700 dark:hover:bg-amber-600 transition-colors">
                    Finalizar Compra
                  </button>
                </Link>
                <Link
                  to="/products"
                  className="block text-center mt-4 text-amber-800 dark:text-amber-500 hover:underline font-sans"
                >
                  Continuar comprando
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
