import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import SweetCard from "../components/SweetCard";
import CartSidebar from "../components/CartSidebar";

export default function Dashboard() {
  const [sweets, setSweets] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [cart, setCart] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchSweets();
    const email = localStorage.getItem("userEmail");
    if (email === "admin@example.com") setIsAdmin(true);
  }, []);

  const fetchSweets = async () => {
    const res = await API.get("/sweets");
    setSweets(res.data);
    setFiltered(res.data);
  };

  const handleSearch = (query) => {
    setFiltered(
      sweets.filter((s) =>
        s.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleCategoryChange = (category) => {
    if (category === "All") setFiltered(sweets);
    else setFiltered(sweets.filter((s) => s.category === category));
  };

  const handlePurchase = async (id) => {
    await API.post(`/sweets/${id}/purchase`);
    const sweet = sweets.find((s) => s.id === id);
    const existing = cart.find((c) => c.id === id);
    if (existing)
      setCart(
        cart.map((c) =>
          c.id === id ? { ...c, qty: c.qty + 1 } : c
        )
      );
    else setCart([...cart, { ...sweet, qty: 1 }]);
    fetchSweets();
  };

  const handleRemove = (id) =>
    setCart(cart.filter((c) => c.id !== id));

  const handleDeleteSweet = async (id) => {
    await API.delete(`/sweets/${id}`);
    fetchSweets();
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-1 min-h-screen bg-gray-50">
        <Navbar onSearch={handleSearch} onCategoryChange={handleCategoryChange} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {filtered.map((sweet) => (
            <SweetCard
              key={sweet.id}
              sweet={sweet}
              isAdmin={isAdmin}
              onPurchase={handlePurchase}
              onDelete={handleDeleteSweet}
            />
          ))}
        </div>
      </div>

      <CartSidebar cartItems={cart}
  onRemove={handleRemove}
  onClear={() => setCart([])} />
    </div>
  );
}
