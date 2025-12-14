export default function SweetCard({ sweet, onPurchase, isAdmin, onDelete }) {
  const sweetImages = {
    Rasgulla:
      "https://upload.wikimedia.org/wikipedia/commons/4/47/Rasgulla_-_Indian_Sweet.jpg",
    "Gulab Jamun":
      "https://upload.wikimedia.org/wikipedia/commons/0/0e/Gulab_Jamun_%28homemade%29.jpg",
    "Kaju Katli":
      "https://upload.wikimedia.org/wikipedia/commons/8/8f/Kaju_katli_-_Indian_sweet.jpg",
    "Chocolate Cake":
      "https://images.unsplash.com/photo-1599785209707-28c6d8a61926?w=800&auto=format&fit=crop&q=80",
    "Butter Cookies":
      "https://images.unsplash.com/photo-1617196034796-73e0c1b0b58a?w=800&auto=format&fit=crop&q=80",
    Samosa:
      "https://upload.wikimedia.org/wikipedia/commons/b/b9/Samosachutney.jpg",
    Brownie:
      "https://images.unsplash.com/photo-1625910154205-19847c7801d6?w=800&auto=format&fit=crop&q=80",
    Barfi:
      "https://upload.wikimedia.org/wikipedia/commons/f/f2/Kesar_Barfi_Burfi.jpg",
  };

  const image =
    sweet.image ||
    sweetImages[sweet.name] ||
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800";

  return (
    <div className="relative bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] p-4 transition-all border flex flex-col justify-between">
      {/* Image Section */}
      <div className="relative">
        <img
          src={image}
          alt={sweet.name}
          className="rounded-lg w-full h-40 object-cover mb-3 transition-all duration-300"
          onError={(e) => {
            e.target.src =
              "https://stock-apex-images-prod-ew1.s3.eu-west-1.amazonaws.com/8f6eac3bcd4ae3dfe49d1b6b4f270a0042c6109ce9c0f3f93bcb8a99570a49d7.jpg?response-content-disposition=attachment%3B%20filename%3D%22AdobeStock_773902918_Preview.jpeg%22&response-content-type=image%2Fjpeg&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUMGGMQGEYVDZ7UWU%2F20251214%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20251214T152416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Signature=c0d1453a91fdb477b1bb52c47c5640b8423b848b0c430fcd152f257c8cb2e294";
          }}
        />

        {/* Out of Stock Overlay */}
        {sweet.quantity === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg">
            <span className="text-white font-semibold text-lg">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div>
        <h3 className="text-lg font-bold text-gray-900">{sweet.name}</h3>
        <p className="text-sm text-gray-500">{sweet.category}</p>
        <p className="text-sm text-gray-500">
          {sweet.quantity > 0
            ? `${sweet.quantity} available`
            : "Currently unavailable"}
        </p>
        <p className="text-xl font-semibold text-pink-600 mt-2">
          ₹{sweet.price}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-4">
        <button
          disabled={sweet.quantity === 0}
          onClick={() => onPurchase(sweet.id)}
          className={`px-4 py-2 rounded-lg text-white font-medium transition-all ${
            sweet.quantity === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 active:scale-95"
          }`}
        >
          {sweet.quantity === 0 ? "Unavailable" : "Add to Cart 🛒"}
        </button>

        {isAdmin && (
          <button
            onClick={() => onDelete(sweet.id)}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium active:scale-95"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
