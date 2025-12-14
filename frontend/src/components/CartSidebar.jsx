export default function CartSidebar({ cartItems, onRemove, onClear }) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handlePayment = () => {
    if (cartItems.length === 0) {
      alert("🛒 Your cart is empty!");
      return;
    }

    // Simulated payment flow
    alert(`💳 Payment Successful! You paid ₹${total}`);
    if (onClear) onClear(); // clear cart after payment
  };

  return (
    <aside className="bg-white shadow-lg border-l p-5 w-full md:w-1/4 lg:w-1/5 flex flex-col justify-between min-h-screen">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🧾 Order Summary</h3>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">No items in your cart yet.</p>
        ) : (
          <ul className="space-y-3 overflow-y-auto max-h-[60vh] pr-2">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg shadow-sm"
              >
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    ₹{item.price} × {item.qty}
                  </p>
                </div>
                <button
                  onClick={() => onRemove(item.id)}
                  className="text-red-500 hover:text-red-700 text-xl"
                  title="Remove item"
                >
                  🗑
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Total + Buttons */}
      {cartItems.length > 0 && (
        <div className="mt-6 border-t pt-4 space-y-3">
          <p className="text-gray-800 font-semibold text-lg">
            Total: <span className="text-pink-600">₹{total}</span>
          </p>

          <button
            onClick={handlePayment}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded-lg transition-all"
          >
            Proceed to Payment 💳
          </button>

          <button
            onClick={onClear}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 rounded-lg transition-all"
          >
            Clear Cart
          </button>
        </div>
      )}
    </aside>
  );
}
