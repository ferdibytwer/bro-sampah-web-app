import React, { useState, useRef, useEffect } from "react";
import api from "./Api"

import {
  Home,
  ClipboardCheck,
  Truck,
  Search,
  User,
  Wallet,
  MapPin,
  CreditCard,
  ChevronRight,
  Settings,
  Star,
  Camera,
  X,
  Loader2,
  Sparkles,
  MessageCircle,
  Upload,
  Trophy,
  Receipt,
} from "lucide-react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { OrderCardAktivitas, OrderCardCollector, OrderCardDriver } from "./orderCard";


const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";

// --- ICONS & HELPERS ---
// Simple Icon component for the "Lainnya" grid
const GridIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

// --- FIXED NAVBAR ---
const Navbar = ({ activeTab, setActiveTab }) => (
  <div className="absolute bottom-6 left-6 right-6 z-50">
    <div className="bg-[#3b6b35] rounded-full py-4 px-6 flex justify-between items-center shadow-2xl">
      <NavIcon
        icon={<Home size={24} />}
        active={activeTab === "home"}
        onClick={() => setActiveTab("home")}
      />
      <NavIcon
        icon={<ClipboardCheck size={24} />}
        active={activeTab === "tasks"}
        onClick={() => setActiveTab("tasks")}
      />
      <NavIcon
        icon={<Truck size={24} />}
        active={activeTab === "delivery"}
        onClick={() => setActiveTab("delivery")}
      />
      <NavIcon
        icon={<Search size={24} />}
        active={activeTab === "ai_scan"}
        onClick={() => setActiveTab("ai_scan")}
      />
      <NavIcon
        icon={<User size={24} />}
        active={activeTab === "profile"}
        onClick={() => setActiveTab("profile")}
      />
    </div>
  </div>
);

const NavIcon = ({ icon, active, onClick }) => (
  <button
    onClick={onClick}
    className={`transition-all duration-200 ${active ? "text-white" : "text-white/50 hover:text-white/80"}`}
  >
    {icon}
  </button>
);

// --- PAGES ---

const DashboardPage = () => (
  <div className="animate-in fade-in duration-500 pb-32">
    {/* Header Green Section */}
    <div className="bg-[#4d7c44] text-white p-6 pt-12 pb-24 rounded-b-[40px]">
      <h1 className="text-xl font-bold tracking-wide">Hi Hanna 👋</h1>
      <p className="text-[12px] opacity-90 mt-1">
        Sudah siap mengumpulkan sampah hari ini?
      </p>
      <div className="mt-6">
        <p className="text-[10px] opacity-80 mb-1">Ambil sampah di:</p>
        <div className="flex items-center gap-1.5 text-xs font-medium">
          <MapPin size={14} />
          <span>Gg. Mega 3, Jebres, Surakarta</span>
        </div>
      </div>
    </div>

    {/* Points Card */}
    <div className="px-6 -mt-16 relative z-10">
      <div className="bg-white rounded-3xl p-6 shadow-[0_10px_20px_rgba(0,0,0,0.05)] border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Bro Sampah Points
        </h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-[#a3c585] p-3 rounded-2xl text-white">
              <Wallet size={36} />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-800 leading-none">
                5000 points
              </p>
              <p className="text-[11px] text-gray-500 mt-1">Rp5000</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="text-center">
              <button className="bg-white border border-gray-200 p-2 rounded-lg shadow-sm text-gray-600">
                <Wallet size={16} />
              </button>
              <p className="text-[8px] mt-1 text-gray-500">Tarik Saldo</p>
            </div>
            <div className="text-center">
              <button className="bg-white border border-gray-200 p-2 rounded-lg shadow-sm text-gray-600">
                <GridIcon />
              </button>
              <p className="text-[8px] mt-1 text-gray-500">Lainnya</p>
            </div>
          </div>
        </div>
        <p className="mt-4 text-[9px] text-gray-400 text-center">
          Yuk, dapatkan lebih banyak point dengan rutin mengumpulkan sampah!
        </p>
      </div>
    </div>

    {/* Leaderboard Section */}
    <div className="px-6 mt-6">
      <div className="bg-[#c85250] rounded-t-xl p-2 flex items-center justify-center gap-2 text-white font-bold text-[11px] shadow-sm">
        <Trophy size={14} /> Leaderboard Mingguan
      </div>
      <div className="bg-[#e6e6e6] p-6 rounded-b-xl shadow-sm">
        <div className="flex justify-around items-end gap-2 pb-4 border-b border-gray-300">
          <div className="text-center flex flex-col items-center">
            <div className="relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-sm">
                👑
              </div>
              <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center text-xl mb-1 shadow">
                👨
              </div>
            </div>
            <p className="font-bold text-[10px] text-gray-800">Andra</p>
            <p className="text-[8px] text-gray-500">2.900 Points</p>
          </div>

          <div className="text-center flex flex-col items-center -mb-2">
            <div className="relative">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-xl">
                👑
              </div>
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-3xl mb-1 shadow-lg border-2 border-white">
                👸
              </div>
            </div>
            <p className="font-bold text-[12px] text-gray-800">Nana</p>
            <p className="text-[9px] font-bold text-gray-600">3.500 Points</p>
          </div>

          <div className="text-center flex flex-col items-center">
            <div className="relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-sm">
                👑
              </div>
              <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center text-xl mb-1 shadow">
                🧔
              </div>
            </div>
            <p className="font-bold text-[10px] text-gray-800">Ferdi</p>
            <p className="text-[8px] text-gray-500">3.100 Points</p>
          </div>
        </div>

        <div className="space-y-1 mt-3">
          <div className="bg-gray-200 p-2 rounded-md flex justify-between items-center text-[10px] font-bold text-gray-700">
            <span>4. Aya</span>
            <span>2.750 Points</span>
          </div>
          <div className="bg-gray-200 p-2 rounded-md flex justify-between items-center text-[10px] font-bold text-gray-700">
            <span>5. Nisa</span>
            <span>2.620 Points</span>
          </div>
          <div className="bg-[#c85250] p-3 rounded-lg flex justify-between items-center text-white mt-2 shadow-md">
            <div className="flex items-center gap-2">
              <Trophy size={20} className="opacity-50" />
              <div>
                <p className="text-[10px] font-bold">10. Kamu</p>
                <p className="text-[7px] opacity-80">
                  1.900 Points lagi untuk menuju top 3!
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold">1.600 Points</span>
          </div>
        </div>
      </div>
    </div>

    {/* Challenges */}
    <div className="px-6 mt-6">
      <div className="relative bg-[#a3c585] rounded-xl p-5 pt-8 shadow-sm">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#3b6b35] text-white px-4 py-1.5 rounded-full text-[10px] font-bold shadow-md whitespace-nowrap border-2 border-white">
          Tantangan Minggu ini!
        </div>
        <div className="space-y-2">
          {[
            "Setor sampah 3 hari berturut-turut",
            "Ajak 2 teman pakai Bro Sampah",
            "Kumpulkan 10 kg sampah daur ulang",
          ].map((task, i) => (
            <div key={i} className="flex items-center gap-2 text-white">
              <div className="w-3.5 h-3.5 border border-white rounded-sm flex items-center justify-center bg-transparent"></div>
              <span className="text-[10px]">{task}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <button className="bg-[#3b6b35] text-white py-1.5 px-4 rounded-full text-[9px] font-bold shadow-md">
            Ikuti Sekarang!
          </button>
        </div>
      </div>
    </div>
  </div>
);

const AktivitasPage = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const res = await api.get(`/orders/me`);
      const dt= res.data.data
      if (localStorage.getItem("role")  === "collector") {
        const filtered = dt.filter(item =>
          ["delivered", "inspected", "deposited"].includes(item.status)
        );
        setData(filtered);
      } else if (localStorage.getItem("role") === " driver") {
        const normalized = dt
          .filter(item =>
            ["delivered", "inspected", "deposited"].includes(
              item.status?.toLowerCase()
            )
          )
          .map(item => ({
            ...item,
            status: "delivered"
          }));

        setData(normalized);
      }
      else {
        setData(dt);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
  <div className="bg-[#fcfcfc] min-h-full animate-in fade-in duration-500 pb-32">
    <div className="p-6 pt-12 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">Aktivitas</h1>
      <Search size={20} className="text-gray-500" />
    </div>

    <div className="px-6 mb-6">
      <div className="bg-white border border-gray-100 shadow-sm p-4 rounded-xl flex items-center gap-3">
        <div className="bg-[#a3c585] p-2 rounded-lg text-white">
          <Wallet size={20} />
        </div>
        <span className="text-sm font-bold text-gray-700">
          Riwayat Withdraw
        </span>
      </div>
    </div>

    <div className="px-6 flex gap-6 border-b border-gray-200">
      <button className="text-[#3b6b35] font-bold text-sm pb-2 border-b-2 border-[#3b6b35]">
        Aktivitas Anda
      </button>
      <button className="text-gray-400 font-bold text-sm pb-2">
        Akumulasi Sampah
      </button>
    </div>

    <div className="p-6 space-y-4">

    {data && data.length > 0 ? (
      data.map((dt) => (
        <OrderCardAktivitas key={dt.id} order={dt} />
      ))
    ) : (
      <div className="w-full h-full flex items-center justify-center">
      <p>
      Tidak Ada Sampah
      </p>
      </div>
    )}

    </div>
  </div>
);

}


const JemputSampahPage = () => {
  const DEFAULT_DESCRIPTION = "Sampah yang terdiri dari plastik dan kertas";
  const DEFAULT_WEIGHT = "10";
  const weightUnits = ["Kg", "g", "mg", "lb", "oz"];
  const [capturedImage, setCapturedImage] = React.useState(null);
  const [description, setDescription] = React.useState("")
  const [weight, setWeight] = React.useState(0)
  const [weightUnit, setWeightUnit] = React.useState("Kg")
  const [points, setPoints] = React.useState(0)
  const [activeTab, setActiveTab] = React.useState("non-organik");
  const [aiResult, setAiResult] = React.useState(null);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const convertToKg = (value, unit) => {
    switch (unit) {
      case "Kg":
        return value;
      case "g":
        return value / 1000;
      case "mg":
        return value / 1_000_000;
      case "lb":
        return value * 0.453592;
      case "oz":
        return value * 0.0283495;
      default:
        return 0;
    }
  };

  useEffect(() => {
    const weightInKg = convertToKg(weight, weightUnit);
    const calculatedPoints = weightInKg * 1000;
    setPoints(Math.round(calculatedPoints));
  }, [weight, weightUnit]);

  const fileInputRef = React.useRef(null);
  const handleCapture = () => fileInputRef.current.click();

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setDescription(DEFAULT_DESCRIPTION)
    setWeight(DEFAULT_WEIGHT)
    setWeightUnit("Kg")
  };
  const navigate = useNavigate()

  const handleNext = () => {
    if (!capturedImage) {
      alert("Lengkapi data terlebih dahulu");
      return;
    }

    const payload = {
      image: capturedImage,
      description: description,
      weightKg: convertToKg(weight, weightUnit),
      weight: weight,
      weightUnit: weightUnit,
      points: points,
      type: activeTab,
    };

    localStorage.setItem("reportPayload", JSON.stringify(payload));
    navigate("/checkout")
  };

  const formStyle = "border-b border-gray-300 focus-within:border-black focus-within:shadow-[0_2px_0_0_rgba(0,0,0,1)] transition-all"

  return (
    <div className="p-6 pt-12 pb-32 animate-in fade-in duration-500">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={onFileChange}
        hidden
      />

      <h1 className="text-xl font-bold text-center text-gray-800 mb-1">
        Jemput Sampah
      </h1>
      <p className="text-[10px] text-center text-gray-500 mb-6">
        Pilih jenis sampah anda
      </p>

      <div className="flex gap-2 p-1 bg-[#4d7c44] rounded-full mb-6">
        <button
          onClick={() => setActiveTab("non-organik")}
          className={`flex-1 font-bold py-2 rounded-full text-[11px] shadow-sm ${
            activeTab === "non-organik"
              ? "bg-white text-[#4d7c44]"
              : "text-white"
          }`}
        >
          Sampah non-organik
        </button>
        <button
          onClick={() => setActiveTab("campuran")}
          className={`flex-1 font-bold py-2 text-[11px] ${
            activeTab === "campuran"
              ? "bg-white text-[#4d7c44] rounded-full"
              : "text-white"
          }`}
        >
          Sampah campuran
        </button>
      </div>

      {/* Image & Deskripsi Box */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 mb-6">
        <div
          className="w-full h-40 bg-gray-200 relative cursor-pointer group"
          onClick={handleCapture}
        >
          {capturedImage ? (
            <img
              src={capturedImage}
              className="w-full h-full object-cover"
              alt="Sampah"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 group-hover:text-[#4d7c44] transition-colors">
              <Camera size={40} />
              <p className="text-[10px] font-bold mt-2">
                Ketuk untuk Ambil Foto
              </p>
            </div>
          )}

          {isAnalyzing && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
              <Loader2 className="animate-spin" size={32} />
            </div>
          )}
        </div>

        {/* SHOW ONLY AFTER IMAGE UPLOADED */}
        {capturedImage && (
          <div className="p-4 text-[10px] text-gray-600">
            <p className="mb-1">
              <span className="text-[#3b6b35] font-bold">Deskripsi:</span>{" "}
              {isAnalyzing
                ? "Menganalisis..."
                : DEFAULT_DESCRIPTION }
            </p>
            <p>
              <span className="text-[#3b6b35] font-bold">
                Estimasi berat sampah:
              </span>{" "}
              {isAnalyzing
                ? "..."
                : DEFAULT_WEIGHT + " Kg"}
            </p>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {capturedImage && (
        <div>
          <p className="font-bold"> Berat </p>
          <div className="gap-5 flex">
            <div className={formStyle + "w-16"}>
              <select
                value={weightUnit}
                onChange={(e) =>
                  setWeightUnit(e.target.value)
                }
                className="w-full py-3 outline-none bg-transparent"
              >
                {weightUnits.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>
          <div className={`${formStyle} w-24`}>
              <input
                type="number"
                value={weight}
                onWheel={(e) => e.target.blur()}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="10"
                className="w-full py-3 outline-none bg-transparent"
                required
              />
            </div>
          </div>
        </div>
  )}

        {capturedImage && (
        <div>
          <p className="font-bold"> Description </p>

          <div className={ formStyle }>
            <textarea
              value={description}
              rows={4}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Description"
                    className="w-full py-3 outline-none bg-transparent resize-none"

            />
          </div>
          
        </div>

        )}

        <div>
          
        </div>
        {capturedImage && activeTab === "non-organik" && (
          <div className="bg-[#356d9c] p-3 rounded-xl flex items-center gap-3 text-white shadow-sm mt-6">
            <div className="bg-white/20 p-2 rounded-lg">
              <Wallet size={16} />
            </div>
            <p className="text-[11px] font-bold">
              Estimasi Bro Sampah Points:{" "}
              { points }{" "}
              Points
            </p>
          </div>
        )}

        <button
          onClick={handleNext}
          className="w-full bg-[#3b6b35] text-white py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform mt-2"
        >
          <Receipt size={18} /> Lanjutkan
        </button>
      </div>
    </div>
  );
};

function JemputSampahCollectorPage() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await api.get(`/orders/delivered`);
      setData(res.data.data);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="p-6 pt-12 pb-32 animate-in fade-in duration-500 h-full">
      <h1 className="text-xl font-bold text-center text-gray-800 mb-1">
        Kelola Sampah
      </h1>
      <p className="text-[10px] text-center text-gray-500 mb-6">
        List Sampah yang datang
      </p>
    {data && data.length > 0 ? (
      data.map((dt) => (
        <OrderCardCollector key={dt.id} order={dt} />
      ))
    ) : (
      <div className="w-full h-full flex items-center justify-center">
      <p>
      Tidak Ada Sampah
      </p>
      </div>
    )}
  </div>
  )

}
function JemputSampahDriverPage() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await api.get(`/orders/searching`);
      setData(res.data.data);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="p-6 pt-12 pb-32 animate-in fade-in duration-500 h-full">
      <h1 className="text-xl font-bold text-center text-gray-800 mb-1">
        Jemput Sampah
      </h1>
      <p className="text-[10px] text-center text-gray-500 mb-6">
        Ayo Antar Sampah ke TPA terdekat
      </p>
    {data && data.length > 0 ? (
      data.map((dt) => (
        <OrderCardDriver key={dt.id} order={dt} />
      ))
    ) : (
      <div className="w-full h-full flex items-center justify-center">
      <p>
      Tidak Ada Sampah
      </p>
      </div>
    )}
  </div>
  )

}



const ProfilePage = (onRoleChange) => {
const roles = ["driver", "user", "collector"];
    
  const [role, setRole] = useState(localStorage.getItem("role") ?? "user");
  const [data, setData] = useState(null);
  const fetchData = async () => {
    try {
      const res = await api.get("/");
      setData(res.data?.data); 
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("role", role);
    onRoleChange
    fetchData();
  }, [role]);
    return (
  <div className="bg-[#fcfcfc] min-h-full pb-32 animate-in fade-in duration-500">
    <div className="bg-[#4d7c44] rounded-b-[30px] p-6 pt-12 text-white pb-16 relative">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-3xl shadow-md border-2 border-white">
          👸
        </div>
        <div>
          <h2 className="text-xl font-bold"> {data?.username ?? "Hanna"} </h2>
          <p className="text-[10px] flex items-center gap-1 opacity-80 mt-1">
            Lihat akun saya <ChevronRight size={12} />
          </p>
        </div>
        <button className="ml-auto p-2 hover:bg-white/10 rounded-full transition-colors">
          <Settings size={22} />
        </button>
      </div>

      {/* Member Card Floating */}
      <div className="absolute left-6 right-6 -bottom-10 bg-white p-4 rounded-xl shadow-lg border border-gray-100 text-gray-800">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold">Member Gratis</span>
          <span className="text-[10px] font-bold text-gray-500">
            Limit penjemputan: <span className="text-gray-800">7%</span>
          </span>
        </div>
        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div className="bg-[#4d7c44] h-full w-[7%]" />
        </div>
        <p className="text-[8px] text-gray-400 mt-2 text-center">
          Daftarkan premium member atau tingkatkan cashbackmu untuk mengurangi
          biaya layanan!
        </p>
      </div>
    </div>
    <div className="p-6 mt-14 grid grid-cols-2 gap-4">
    </div>

    <div className="w-full h-full flex items-center">
     <div className="flex gap-2">
      {roles.map((r) => (
        <button
          key={r}
          onClick={() => setRole(r)}
          className={`px-4 py-2 rounded-lg border transition
            ${
              role === r
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
        >
          {r}
        </button>
      ))}
    </div>
        
    </div>

    {/* Floating Chat Button */}
    <div className="fixed bottom-28 right-6 flex items-center gap-2">
      <span className="text-[10px] font-bold text-gray-600 bg-white py-1 px-3 rounded-full shadow-sm border border-gray-100">
        Butuh bantuan?
      </span>
      <button className="bg-[#1e88e5] text-white p-3 rounded-full shadow-lg">
        <MessageCircle size={20} className="fill-white" />
      </button>
    </div>

  </div>
);
}

// --- AI MODAL SCANNER ---
const AiScannerModal = ({
  isOpen,
  onClose,
  capturedImage,
  onCapture,
  isAnalyzing,
  aiResult,
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-60 bg-black/60 backdrop-blur-sm p-4 flex items-center justify-center animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-350px rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="relative h-48 bg-gray-100 flex items-center justify-center">
          {capturedImage ? (
            <img src={capturedImage} className="w-full h-full object-cover" />
          ) : (
            <button
              onClick={onCapture}
              className="flex flex-col items-center gap-2 text-gray-400 hover:text-[#4d7c44] transition-colors"
            >
              <Camera size={48} />
              <span className="text-[10px] font-bold uppercase">
                Ketuk untuk Foto Sampah
              </span>
            </button>
          )}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-black/30 p-1.5 rounded-full text-white"
          >
            <X size={18} />
          </button>
          {isAnalyzing && (
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
              <Loader2 className="animate-spin mb-2" size={32} />
              <p className="text-[10px] font-bold">Menganalisis Material...</p>
            </div>
          )}
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 text-[#4d7c44] mb-4">
            <Sparkles size={18} />
            <h3 className="font-bold text-sm">Klasifikasi AI Bro Sampah</h3>
          </div>
          {aiResult ? (
            <div className="space-y-3">
              <div className="bg-[#e6f4ea] p-4 rounded-xl">
                <p className="text-[9px] font-bold text-[#3b6b35] uppercase mb-1">
                  Jenis Terdeteksi
                </p>
                <p className="text-lg font-bold text-gray-800">
                  {aiResult.type || "Plastik & Kertas"}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-[11px] text-gray-600 font-medium italic">
                  "
                  {aiResult.tips ||
                    "Pisahkan plastik dan kertas untuk proses daur ulang yang lebih optimal."}
                  "
                </p>
              </div>
            </div>
          ) : (
            <p className="text-[11px] text-gray-500 text-center py-4">
              Gunakan kamera untuk mendeteksi jenis sampah secara otomatis
              menggunakan kecerdasan buatan.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---
const App = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [capturedImage, setCapturedImage] = useState(null);
  const [aiResult, setAiResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("")
  const [data, setData] = useState(null)
  

  const fileInputRef = useRef(null);
  
  const fetchData = async () => {
    try {
      const res = await api.get(`/orders/me`);
      const data = res.data.data;
      if (data === null) {
        return
      }
      if (data.length === 1) {
        const order = data[0];
        if (order.status !== "completed" && order.status !== "deposited") {
          setData(order);
        }
      } else if (data.length > 1) {
        const hasActiveOrder = data.some(
          (order) => order.status !== "completed" && order.status !== "deposited"
        );

        if (hasActiveOrder) {
          const role = localStorage.getItem("role");

          if (role === "user") {
            setNotificationMessage("Lihat Sampah Mu yang Diproses");
            return
          } else if (role === "driver") {
            setNotificationMessage("Lihat Sampah yang kamu Antar");
            return
          } else if (role === "collector") {
            setNotificationMessage("Lihat Sampah yang bakal dateng");
            return
          }
        } 
      }
      setData(null);
      setNotificationMessage("")

    } catch (err) {
      console.error(err);
      setNotificationMessage("")
    }
  }
  useEffect(() => {
    fetchData()
  }, []);

  const navigate = useNavigate()

  const callAi = async (image, mode) => {
    setIsAnalyzing(true);
    const prompt =
      mode === "delivery"
        ? 'Analisis foto sampah ini. Berikan JSON: { "description": "Deskripsi singkat seperti: Sampah yang terdiri dari plastik dan kertas", "weight": "... kg", "points": 0 }'
        : 'Identifikasi material sampah ini. Berikan JSON: { "type": "Nama Material", "tips": "Tips pengolahan" }';

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: prompt },
                  {
                    inlineData: {
                      mimeType: "image/png",
                      data: image.split(",")[1],
                    },
                  },
                ],
              },
            ],
            generationConfig: { responseMimeType: "application/json" },
          }),
        },
      );
      const data = await response.json();
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (content) setAiResult(JSON.parse(content));
    } catch (e) {
      setAiResult({
        description: "Gagal menganalisis gambar.",
        weight: "0 kg",
        type: "Error",
        tips: "Silakan coba lagi.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCapture = () => fileInputRef.current.click();
  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedImage(reader.result);
        callAi(reader.result, activeTab);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-[#e8ece8] min-h-screen flex justify-center items-start md:py-8 font-sans">
    {notificationMessage !== "" && data !== null && (
  <button
    onClick={ data !== null ? () => navigate(`orders/${data.id}`) : () => {}}
    className="fixed bottom-25 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-[#3b6b35] text-white py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform z-50"
  >
    {notificationMessage}
  </button>
)}

      {/* Wrapper utama yang membuat menu tidak ikut di-scroll */}
      <div className="bg-[#fcfcfc] h-screen md:h-844px w-full max-w-390px relative overflow-hidden md:rounded-[45px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] ring-1 ring-gray-200 flex flex-col">
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={onFileChange}
          accept="image/*"
        />


        {/* AREA KONTEN (Bisa di-scroll) */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative bg-[#fcfcfc]">
          {activeTab === "home" && <DashboardPage />}
          {activeTab === "tasks" && <AktivitasPage />}
          {activeTab === "delivery" && localStorage.getItem("role") === "user" && (
            <JemputSampahPage
              capturedImage={capturedImage}
              onCapture={handleCapture}
              aiResult={aiResult}
              isAnalyzing={isAnalyzing}
            />
          )}
          {activeTab === "delivery" && localStorage.getItem("role") === "driver" && (
            <JemputSampahDriverPage/>
          )}
          {activeTab === "delivery" && localStorage.getItem("role") === "collector" && (
            <JemputSampahCollectorPage />
          )}

          {activeTab === "profile" && <ProfilePage onRoleChange={fetchData()} />}
        </div>

        {/* AREA MENU (Fixed di bawah) */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={(t) => {
            setActiveTab(t);
            if (t !== "delivery") {
              setCapturedImage(null);
              setAiResult(null);
            }
          }}
        />

      </div>
    </div>
  );
};

export default App;
