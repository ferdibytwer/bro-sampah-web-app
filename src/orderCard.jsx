import { MapPin, Upload, Star } from "lucide-react";
import api from "./Api";
import { useNavigate } from "react-router-dom";

export function OrderCardAktivitas({ order }) {
  const title = order.isCampuran
    ? "Sampah Campuran"
    : "Sampah Non-Organik";
  const navigate = useNavigate()

  return (
    <div className="bg-white p-5 rounded-2xl shadow-[0_5px_15px_rgba(0,0,0,0.04)] border border-gray-50">
      
      {/* header */}
      <div className="flex justify-between items-center mb-4">
        <span className="bg-[#e6f4ea] text-[#3b6b35] text-[10px] font-bold px-3 py-1 rounded-full">
          {order.status === "findingDriver" ? "Mencari Driver" : order.status }
        </span>
          <span className="text-[10px] text-gray-400">
            {order.createdAt
            ? new Date(order.createdAt).toLocaleString("id-ID", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "Tanggal tidak tersedia"}
        </span>
      </div>

      {/* main */}
      <div className="flex items-center gap-4 border-b border-gray-100 pb-4 mb-4">
        <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
          {order.image ? (
            <img
              src={`data:${order.imageFormat};base64,${order.image}`}
              alt="Order"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-[10px] text-gray-400">No Image</span>
          )}
        </div>
        <div>
          <p className="font-bold text-sm text-gray-800">
            {title}
          </p>

          <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-1">
            <MapPin size={12} />
            {order.tpsName}
          </div>
        </div>
      </div>
        <div>
          {localStorage.getItem("role") === "user" && order.status === "completed" && (
        <div className="flex justify-between items-center text-[10px] text-gray-400">
          <span></span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={12} className="text-gray-300" />
            ))}
          </div>
        </div>
          )}
          {localStorage.getItem("role") === "user" && order.status !== "completed" && (
          <button
            onClick={() => navigate(`/orders/${order.id}`)}
            className="w-full bg-[#3b6b35] text-white py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform mt-2"
          >
           Detail
          </button>
          )}
          
          {localStorage.getItem("role") !== "user" && (
          <button
            onClick={() => navigate(`/orders/${order.id}`)}
            className="w-full bg-[#3b6b35] text-white py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform mt-2"
          >
           Detail
          </button>
          )}
        </div>

    </div>
  );
}

export function OrderCardDriver({ order }) {
  const navigate = useNavigate()
  const title = order.isCampuran
    ? "Sampah Campuran"
    : "Sampah Non-Organik";
  const handleAccept = async() => {
    try {
      const res = await api.put(`/orders/${order.id}/status`, {status: "pickingUp"})
      navigate(`/orders/${res.data.data.id}`)
    } catch {
    }
  }

  return (
    <div className="bg-white p-5 rounded-2xl shadow-[0_5px_15px_rgba(0,0,0,0.04)] border border-gray-50">
      
      {/* header */}
      <div className="flex justify-between items-center mb-4">
        <span className="bg-[#e6f4ea] text-[#3b6b35] text-[10px] font-bold px-3 py-1 rounded-full">
          {order.status === "findingDriver" ? "Mencari Driver" : order.status }
        </span>
          <span className="text-[10px] text-gray-400">
            {order.createdAt
            ? new Date(order.createdAt).toLocaleString("id-ID", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "Tanggal tidak tersedia"}
        </span>
      </div>

      {/* main */}
      <div className="flex items-center gap-4 border-b border-gray-100 pb-4 mb-4">
        <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
          {order.image ? (
            <img
              src={`data:${order.imageFormat};base64,${order.image}`}
              alt="Order"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-[10px] text-gray-400">No Image</span>
          )}
        </div>
        <div>
          <p className="font-bold text-sm text-gray-800">
            {title}
          </p>

          <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-1">
            <MapPin size={12} />
            {order.tpsName}
          </div>
        </div>
      </div>
        <div>
        <button
          onClick={handleAccept}
          className="w-full bg-[#3b6b35] text-white py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform mt-2"
        >
         Terima
        </button>
        </div>

    </div>
  );
}


export function OrderCardCollector({ order }) {
  const navigate = useNavigate()
  const title = order.isCampuran
    ? "Sampah Campuran"
    : "Sampah Non-Organik";

  return (
    <div className="bg-white p-5 rounded-2xl shadow-[0_5px_15px_rgba(0,0,0,0.04)] border border-gray-50">
      
      {/* header */}
      <div className="flex justify-between items-center mb-4">
        <span className="bg-[#e6f4ea] text-[#3b6b35] text-[10px] font-bold px-3 py-1 rounded-full">
          {order.status === "findingDriver" ? "Mencari Driver" : order.status }
        </span>
          <span className="text-[10px] text-gray-400">
            {order.createdAt
            ? new Date(order.createdAt).toLocaleString("id-ID", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "Tanggal tidak tersedia"}
        </span>
      </div>

      {/* main */}
      <div className="flex items-center gap-4 border-b border-gray-100 pb-4 mb-4">
        <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
          {order.image ? (
            <img
              src={`data:${order.imageFormat};base64,${order.image}`}
              alt="Order"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-[10px] text-gray-400">No Image</span>
          )}
        </div>
        <div>
          <p className="font-bold text-sm text-gray-800">
            {title}
          </p>
          <div className="flex items-center gap-1 text-[10px] text-gray-700 mt-1">
            {order.description}
          </div>

          <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-1">
            Berat: {order.weightKg} Kg
          </div>
        </div>
      </div>
        <div>
        <button
          onClick={() => navigate(`/orders/${order.id}`)}
          className="w-full bg-[#3b6b35] text-white py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform mt-2"
        >
         Detail
        </button>
        </div>

    </div>
  );
}


