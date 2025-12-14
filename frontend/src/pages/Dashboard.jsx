// import { useEffect, useState } from "react";
// import API from "../api/axios";
// import Navbar from "../components/Navbar";

// export default function Dashboard() {
//   const [sweets, setSweets] = useState([]);
//   const [message, setMessage] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("");
//   const [newSweet, setNewSweet] = useState({ name: "", category: "", price: "", quantity: "" });
//   const [isAdmin, setIsAdmin] = useState(false);

//   // ✅ Fetch sweets
//   const fetchSweets = async () => {
//     try {
//       const res = await API.get("/sweets");
//       setSweets(res.data);
//     } catch (err) {
//       console.error(err);
//       setMessage("Failed to fetch sweets");
//     }
//   };

//   useEffect(() => {
//     fetchSweets();

//     // Simulate admin check
//     const userEmail = localStorage.getItem("userEmail");
//     if (userEmail === "admin@example.com") setIsAdmin(true);
//   }, []);

//   // ✅ Purchase sweet
//   const handlePurchase = async (id) => {
//     try {
//       const res = await API.post(`/sweets/${id}/purchase`);
//       setMessage(res.data.message);
//       fetchSweets();
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Purchase failed");
//     }
//   };

//   // ✅ Add new sweet (Admin only)
//   const handleAddSweet = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post("/sweets", newSweet);
//       setMessage(res.data.message || "Sweet added!");
//       setNewSweet({ name: "", category: "", price: "", quantity: "" });
//       fetchSweets();
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Add failed");
//     }
//   };

//   // ✅ Delete sweet (Admin only)
//   const handleDeleteSweet = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this sweet?")) return;
//     try {
//       await API.delete(`/sweets/${id}`);
//       setMessage("Sweet deleted!");
//       fetchSweets();
//     } catch (err) {
//       setMessage("Delete failed");
//     }
//   };

//   // ✅ Filter sweets by search term and category
//   const filteredSweets = sweets.filter(
//     (s) =>
//       s.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
//       (categoryFilter === "" || s.category === categoryFilter)
//   );

//   return (
//     <>
//       <Navbar />

//       <div className="min-h-screen bg-pink-50 p-6">
//         <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">
//           🍭 Sweet Dashboard
//         </h1>

//         {message && (
//           <p className="text-center mb-4 text-gray-700 font-medium">{message}</p>
//         )}

//         {/* Search and Filter */}
//         <div className="flex flex-wrap justify-center gap-4 mb-6">
//           <input
//             type="text"
//             placeholder="Search sweets..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="border p-2 rounded-lg focus:outline-pink-400"
//           />
//           <select
//             value={categoryFilter}
//             onChange={(e) => setCategoryFilter(e.target.value)}
//             className="border p-2 rounded-lg focus:outline-pink-400"
//           >
//             <option value="">All Categories</option>
//             <option value="Dessert">Dessert</option>
//             <option value="Snack">Snack</option>
//             <option value="Chocolate">Chocolate</option>
//           </select>
//         </div>

//         {/* Admin Add Form */}
//         {isAdmin && (
//           <form
//             onSubmit={handleAddSweet}
//             className="bg-white rounded-xl shadow-lg p-4 mb-6 max-w-lg mx-auto"
//           >
//             <h3 className="text-xl font-semibold text-pink-600 mb-3">
//               ➕ Add New Sweet
//             </h3>
//             <div className="grid grid-cols-2 gap-3">
//               <input
//                 type="text"
//                 placeholder="Name"
//                 value={newSweet.name}
//                 onChange={(e) => setNewSweet({ ...newSweet, name: e.target.value })}
//                 className="border p-2 rounded-lg"
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Category"
//                 value={newSweet.category}
//                 onChange={(e) => setNewSweet({ ...newSweet, category: e.target.value })}
//                 className="border p-2 rounded-lg"
//                 required
//               />
//               <input
//                 type="number"
//                 placeholder="Price"
//                 value={newSweet.price}
//                 onChange={(e) => setNewSweet({ ...newSweet, price: e.target.value })}
//                 className="border p-2 rounded-lg"
//                 required
//               />
//               <input
//                 type="number"
//                 placeholder="Quantity"
//                 value={newSweet.quantity}
//                 onChange={(e) => setNewSweet({ ...newSweet, quantity: e.target.value })}
//                 className="border p-2 rounded-lg"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="mt-4 w-full bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-lg"
//             >
//               Add Sweet
//             </button>
//           </form>
//         )}

//         {/* Sweets List */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredSweets.length === 0 ? (
//             <p className="text-center text-gray-500 col-span-full">
//               No sweets found.
//             </p>
//           ) : (
//             filteredSweets.map((sweet) => (
//               <div
//                 key={sweet.id}
//                 className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
//               >
//                 <div>
//                   <h3 className="text-xl font-bold text-pink-600">{sweet.name}</h3>
//                   <p className="text-gray-700">{sweet.category}</p>
//                   <p className="mt-2 text-lg font-semibold text-gray-800">
//                     ₹{sweet.price}
//                   </p>
//                   <p className="text-sm text-gray-500">Qty: {sweet.quantity}</p>
//                 </div>

//                 <div className="mt-4 flex justify-between">
//                   <button
//                     onClick={() => handlePurchase(sweet.id)}
//                     disabled={sweet.quantity === 0}
//                     className={`px-3 py-1 rounded-lg text-white font-medium ${
//                       sweet.quantity === 0
//                         ? "bg-gray-400 cursor-not-allowed"
//                         : "bg-green-500 hover:bg-green-600"
//                     }`}
//                   >
//                     Purchase
//                   </button>
//                   {isAdmin && (
//                     <button
//                       onClick={() => handleDeleteSweet(sweet.id)}
//                       className="px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white"
//                     >
//                       Delete
//                     </button>
//                   )}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </>
//   );
// }


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
