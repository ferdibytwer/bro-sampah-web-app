import { MapPin, MapPinHouse, Banknote, ChevronRight, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";

import api from './Api'

export default function Checkout() {
  const navigate = useNavigate()
  const data = JSON.parse(localStorage.getItem("reportPayload"));
  if (!data) {
    navigate("/")
    alert("Data laporan tidak ditemukan");
    return;
  }
  console.info(data)

  const tpsName = "TPS Bonoloyo";
  const tpsAddress = "Kadipiro, Banjarsari, Surakarta, Jawa Tengah";

  const pickupAddress =
    "Jl. Ir. Sutami No.36, Jebres, Kec. Jebres, Kota Surakarta, Jawa Tengah 57126";

  const distance = "6 km";
  const duration = "10-12 min";
  const price = 15000;
  const priceLayanan = 1500;

  const isCampuran = data?.type === "campuran";

  const wasteValue = !isCampuran
    ? 0
    : Number(data?.weightKg || 0) * 1000;

  const totalPrice = price + priceLayanan + wasteValue;

  const handleSubmit = async () => {
    try {
      const payload = {
        image: data.image,
        description: data.description,
        weightKg: Number(data.weightKg),
        type: data.type,

        pickupAddress,
        tpsAddress,
        tpsName,
        tpsId: 1,

        price,
        serviceFee: priceLayanan,
        totalPrice,

        paymentMethod: 1,
      };

      console.log("SENDING:", payload);

      const res = await api.post("/orders/", payload);
      localStorage.removeItem("reportPayload")
      navigate(`/orders/${res.data.data.id}`);

    } catch (err) {
      console.error("ERROR:", err.response?.data || err.message);
      alert("Gagal membuat pesanan");
    }
  }

  return (
    <div className="w-full h-full justify-center items-center flex">
      <div className="max-w-xl h-full px-8 py-6 flex flex-col gap-5">
      <p className="w-full text-2xl font-bold text-center">
        Pembayaran
      </p>
        <div className="relative z-10 rounded-2xl border border-gray-200 grid grid-rows-2 divide-y divide-gray-200 bg-white">
          
          <div className="px-6 py-3 flex gap-5">
            <div className="w-full flex flex-col">
              <p className="text-xs text-gray-500">Lokasi TPS</p>
              <p>{tpsName}</p>
              <p className="text-xs text-gray-800">{tpsAddress}</p>
            </div>
            <div className="flex items-center">
              <MapPin />
            </div>
          </div>

          <div className="px-6 py-3 flex gap-5">
            <div className="w-full flex flex-col gap-1">
              <p className="text-xs text-gray-500">Lokasi Penjemputan</p>
              <p className="text-sm">{pickupAddress}</p>
            </div>
            <div className="flex items-center">
              <MapPinHouse />
            </div>
          </div>
        </div>

        <div className="h-15 rounded-2xl -mt-11 border border-gray-200 z-0 flex flex-col py-2 px-4 bg-gray-50">
          <div className="mt-auto">
            <div className="flex justify-between text-xs">
              <div className="gap-3 flex">
                <p>Estimasi Jarak : {distance}</p>
      <p className="border border-gray-200 rounded-2xl bg-gray-200 px-2 text-gray-700">
                  {duration}
                </p>
              </div>
              <div>
                <p className="pr-2">Rp {price.toLocaleString("id-ID")}</p>
              </div>
            </div>
          </div>
        </div>

      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 ">
        <div
          className="w-full h-40 bg-gray-200 relative cursor-pointer group"
        >
            <img
              src={data.image}
              className="w-full h-full object-cover"
              alt="Sampah"
            />

        </div>
          <div className="p-4 text-[10px] text-gray-600">
            <p className="mb-1">
              <span className="text-[#3b6b35] font-bold">Deskripsi:</span>{" "}
              { data.description }
            </p>
            <p>
              <span className="text-[#3b6b35] font-bold">
                Estimasi berat sampah:
              </span>{" "}
              { data.weight + " " + data.weightUnit }
            </p>
          </div>
        </div>


           <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-3">
          <p className="font-bold text-sm">Rincian Pembayaran</p>

  <div className="grid grid-cols-[1fr_auto_auto] text-sm gap-y-1 text-gray-700">
    <p> Sampah Campuran </p>
    <p>Rp</p>
    <p className="text-right">{wasteValue.toLocaleString("id-ID")}</p>

    <p>Biaya Pengangkutan</p>
    <p>Rp</p>
    <p className="text-right">{price.toLocaleString("id-ID")}</p>

    <p>Biaya Layanan</p>
    <p>Rp</p>
    <p className="text-right"> {priceLayanan.toLocaleString("id-ID")}</p>


    <p className="font-bold border-t pt-2 mt-2 text-black">Total</p>
    <p className="font-bold border-t pt-2 mt-2 text-black">Rp</p>
    <p className="text-right font-bold border-t pt-2 mt-2 text-black">
      {totalPrice.toLocaleString("id-ID")}
    </p>
  </div>

      </div>
     <div className="bg-white rounded-2xl border border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <Banknote className="text-green-600" size={18} />
            </div>
            <p className="text-sm font-medium">Tunai</p>
          </div>

          <ChevronRight className="text-gray-400" />
        </div>
        {!isCampuran && (
          <div className="bg-[#356d9c] p-3 rounded-xl flex items-center gap-3 text-white shadow-sm">
            <div className="bg-white/20 p-2 rounded-lg">
              <Wallet size={16} />
            </div>
            <p className="text-[11px] font-bold">
              Estimasi Bro Sampah Points:{" "}
              { data.points }{" "}
              Points
            </p>
          </div>
        )}
            <button
          onClick={handleSubmit}
          className="w-full bg-[#3b6b35] text-white py-3.5 rounded-xl text-sm font-bold flex items-center justify-center shadow-md active:scale-95 transition-transform"
        >
          Bayar & Cari Driver
        </button>
      </div>
    </div>
  );
}

