import { Banknote } from "lucide-react";
import api from "./Api";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CircleCheckBig } from "lucide-react";
import { Wallet } from "lucide-react";
import { MapPin } from "lucide-react";

// findingDriver -> pickingUp -> inTransit -> delivered -> inspection -> deposited -> completed , cancelled, complaint

function renderStatus(status, orderData, onStatusChange) {
  const acc =  <AcceptedOrder orderData={orderData} onStatusChange={onStatusChange} />;
  switch (status) {
    case "findingDriver":
      return <FindingDriver />;
    case "pickingUp":
    case "inTransit":
      return acc
    case "delivered":
    case "inspection":
    case "deposited":
      const role = localStorage.getItem("role")
      if (role === "user") {
        return acc
      } 
      if (role === "driver") {
        orderData.status = "delivered"
        return <AcceptedOrder orderData={orderData} onStatusChange={onStatusChange} />;
      } 
      if (role === "collector") {
        return <Collector orderData={orderData} onStatusChange={onStatusChange}/>;
      }
    default:
      return <div>Unknown status: {status}</div>;
  }
}

const statusActionLabels = {
  findingDriver: "Batalkan",
  inTransit: "Antar",
  delivered: "Tandai Terkirim",
  inspection: "Periksa",
  deposited: "Konfirmasi",
  completed: "Selesaikan",
  complaint: "Ajukan Komplain",
  cancelled: "Batalkan",
};

const Roles = {
  DRIVER: "driver",
  COLLECTOR: "collector",
  USER: "user",
};

const allowed = {
  findingDriver: {
    pickingUp: [Roles.DRIVER],
    cancelled: [Roles.USER, Roles.DRIVER],
  },
  pickingUp: {
    inTransit: [Roles.DRIVER],
    cancelled: [Roles.USER],
    findingDriver: [Roles.DRIVER]
  },
  inTransit: {
    delivered: [Roles.DRIVER],
  },
  delivered: {
    inspection: [Roles.COLLECTOR],
  },
  inspection: {
    deposited: [Roles.COLLECTOR],
  },
  deposited: {
    complaint: [Roles.USER],
  },
};

function getAvailableTransitions(currentStatus, role) {
  const transitions = allowed[currentStatus] || {};

  return Object.entries(transitions)
    .filter(([_, roles]) => roles.includes(role))
    .map(([status]) => status);
}

export default function Order() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  const fetchData = async () => {
    if (!id) return;
    try {
      const res = await api.get(`/orders/${id}`);
      setData(res.data?.data);
    } catch (err) {
      console.error(err);
    }
  };

  const navigate = useNavigate()
  const changeStatus = async (status, points = 0) => {
    if (status === null) return;
    try {
      console.info(status)
      if (points > 0) {
        await api.put(`/orders/${id}/status`, {status: status, points: points});
      } else {
        await api.put(`/orders/${id}/status`, {status: status});
      }
      if (status === "findingDriver") {
        navigate("/")
        return
      }
      const reGet = await api.get(`/orders/${id}`);
      setData(reGet.data?.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      {!data ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-auto mt-5">
        {renderStatus(data.status, data, changeStatus)}
        </div>
      )}
    </div>
  );
}



function FindingDriver() {
  const { id } = useParams();
  const [dots, setDots] = useState("");
  useEffect(() => {
    const id = setInterval(() => setDots(d => d.length >= 3 ? "" : d + "."), 500);
    return () => clearInterval(id);
  }, []);
  const navigate = useNavigate()
  const handleCancel = async() => {
    try {
      await api.put(`/orders/${id}/status`, {status: "cancelled"});
      navigate("/")
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center px-4 py-10 gap-0">
    {localStorage.getItem("role") !== "user" ? (
      <p>Unauthorized</p>
    ) : (
      <>
      <div className="relative w-24 h-24 mb-6 bg-blue">
        <div className="absolute top-1/2 left-1/2 w-22 h-22 rounded-full bg-[#3b6b35]/10 animate-pulse -translate-x-1/2 -translate-y-1/2" />

        <svg viewBox="0 0 64 64" className="w-24 h-24 relative z-10">
          <circle cx="27" cy="27" r="14" fill="none" stroke="#3b6b35" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="37.5" y1="37.5" x2="50" y2="50" stroke="#3b6b35" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="27" cy="27" r="8" fill="rgba(59,107,53,0.08)" />
        </svg>

        {[0, -0.533, -1.066].map((delay, i) => (
          <span
            key={i}
            className="absolute top-1/2 left-1/2 rounded-full bg-[#3b6b35]"
            style={{
              width: 9 - i * 2,
              height: 9 - i * 2,
              opacity: 1 - i * 0.3,
              animation: `orbit 1.6s linear ${delay}s infinite`,
            }}
          />
        ))}
      </div>

      <p className="text-base font-medium text-gray-800 mt-3">Mencari Driver{dots}</p>
      <p className="text-sm text-gray-500 mb-8">Biasanya butuh 30–60 detik</p>

      <button
        onClick={handleCancel}
        className="w-full bg-[#3b6b35] text-white py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform mt-2"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="7" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
          <line x1="5" y1="5" x2="11" y2="11" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="11" y1="5" x2="5" y2="11" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        Batal
      </button>
    </>
    )}
    </div>
  );
}

function FakeMap() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;

    const routePoints = [
      { x: 0.15, y: 0.48 },
      { x: 0.28, y: 0.35 },
      { x: 0.45, y: 0.42 },
      { x: 0.60, y: 0.38 },
      { x: 0.75, y: 0.48 },
      { x: 0.85, y: 0.50 },
    ];

    function getRoutePoint(t) {
      const total = routePoints.length - 1;
      const seg = Math.min(Math.floor(t * total), total - 1);
      const local = t * total - seg;
      const p0 = routePoints[seg];
      const p1 = routePoints[seg + 1];
      return {
        x: p0.x + (p1.x - p0.x) * local,
        y: p0.y + (p1.y - p0.y) * local,
      };
    }

    function drawMap() {
      // Background
      ctx.fillStyle = '#e8f0e4';
      ctx.fillRect(0, 0, W, H);

      // Horizontal main roads
      [[0.30, 8], [0.50, 5], [0.68, 5]].forEach(([yRatio, width]) => {
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, yRatio * H - width, W, width * 2);
        ctx.fillStyle = '#d4dfd0';
        ctx.fillRect(0, yRatio * H - width - 1, W, 1.5);
        ctx.fillRect(0, yRatio * H + width - 0.5, W, 1.5);
      });

      // Vertical roads
      [[0.20, 6], [0.45, 8], [0.70, 6]].forEach(([xRatio, width]) => {
        ctx.fillStyle = '#fff';
        ctx.fillRect(xRatio * W - width, 0, width * 2, H);
        ctx.fillStyle = '#d4dfd0';
        ctx.fillRect(xRatio * W - width - 1, 0, 1.5, H);
        ctx.fillRect(xRatio * W + width - 0.5, 0, 1.5, H);
      });

      // Road dashes
      ctx.setLineDash([10, 10]);
      ctx.strokeStyle = '#c8d4c4';
      ctx.lineWidth = 1;
      [[0.30, true], [0.50, true], [0.68, true]].forEach(([y]) => {
        ctx.beginPath(); ctx.moveTo(0, y * H); ctx.lineTo(W, y * H); ctx.stroke();
      });
      [[0.20, false], [0.45, false], [0.70, false]].forEach(([x]) => {
        ctx.beginPath(); ctx.moveTo(x * W, 0); ctx.lineTo(x * W, H); ctx.stroke();
      });
      ctx.setLineDash([]);

      // Buildings
      const buildings = [
        [0.02, 0.05, 0.14, 0.20],
        [0.02, 0.55, 0.14, 0.20],
        [0.02, 0.78, 0.10, 0.18],
        [0.25, 0.05, 0.15, 0.20],
        [0.25, 0.55, 0.16, 0.18],
        [0.50, 0.05, 0.16, 0.22],
        [0.50, 0.55, 0.16, 0.10],
        [0.75, 0.05, 0.22, 0.22],
        [0.75, 0.72, 0.22, 0.24],
      ];
      buildings.forEach(([x, y, w, h]) => {
        ctx.fillStyle = '#c4d4bc';
        ctx.beginPath();
        ctx.roundRect(x * W + 2, y * H + 2, w * W - 4, h * H - 4, 3);
        ctx.fill();
        ctx.fillStyle = '#b8cbb0';
        ctx.beginPath();
        ctx.roundRect(x * W + 2, y * H + 2, w * W - 4, h * H - 4, 3);
        ctx.fill();
      });

      // Green parks
      ctx.fillStyle = '#a8c898';
      ctx.beginPath(); ctx.roundRect(0.26 * W, 0.32 * H, 0.14 * W, 0.14 * H, 4); ctx.fill();
      ctx.fillStyle = '#98b888';
      ctx.beginPath(); ctx.arc(0.33 * W, 0.39 * H, 14, 0, Math.PI * 2); ctx.fill();

      // Route dashed line
      ctx.setLineDash([6, 4]);
      ctx.strokeStyle = '#3b6b35';
      ctx.lineWidth = 2.5;
      ctx.lineJoin = 'round';
      ctx.beginPath();
      routePoints.forEach((p, i) => {
        i === 0
          ? ctx.moveTo(p.x * W, p.y * H)
          : ctx.lineTo(p.x * W, p.y * H);
      });
      ctx.stroke();
      ctx.setLineDash([]);

      // Origin pin (A)
      const A = routePoints[0];
      ctx.fillStyle = '#3b6b35';
      ctx.beginPath();
      ctx.arc(A.x * W, A.y * H, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 9px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('A', A.x * W, A.y * H);

      // Destination pin (B) — teardrop
      const B = routePoints[routePoints.length - 1];
      ctx.fillStyle = '#c0392b';
      ctx.beginPath();
      ctx.arc(B.x * W, B.y * H - 10, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(B.x * W - 5, B.y * H - 6);
      ctx.lineTo(B.x * W, B.y * H + 1);
      ctx.lineTo(B.x * W + 5, B.y * H - 6);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.fillText('B', B.x * W, B.y * H - 10);

      // Animated driver dot
      const pos = getRoutePoint(tRef.current);
      const px = pos.x * W;
      const py = pos.y * H;

      // Pulse ring
      ctx.strokeStyle = 'rgba(59,107,53,0.25)';
      ctx.lineWidth = 2;
      const pulse = 0.5 + 0.5 * Math.sin(Date.now() / 300);
      ctx.beginPath();
      ctx.arc(px, py, 14 + pulse * 6, 0, Math.PI * 2);
      ctx.stroke();

      // Driver circle
      ctx.fillStyle = '#3b6b35';
      ctx.beginPath();
      ctx.arc(px, py, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🚗', px, py + 1);
    }

    function loop() {
      tRef.current = (tRef.current + 0.0018) % 1;
      drawMap();
      animRef.current = requestAnimationFrame(loop);
    }

    loop();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={192}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
}

const userMessage = {
  pickingUp: "Driver Otw ke Kamu, Ditunggu Ya",
  inTransit: "Driver Sedang Otw ke TPS, Ditunggu Ya",
  delivered: "Sampah Kamu Sudah Sampai di TPS, tunggu petugas untuk memproses",
  inspection: "Sampah kamu lagi di periksa dan diverifikasi",
  deposited: "Sampah Sudah Terdeposit pada TPS yang dituju, Transaksi Ini Sudah Selesai",
  completed: "Transaksi sudah selesai",
  complaint: "Transaksi sudah selesai",
  cancelled: "Yah... Order ini udah dibatalkan",
};

const driverMessage = {
  pickingUp: "Customer udah nunggu nih",
  inTransit: "Gas langsung ke TPA",
  delivered: "Hore! Transaksi Sudah Selesai",
  inspection: "Hore! Transaksi Sudah Selesai",
  deposited: "Hore! Transaksi Sudah Selesai",
  completed: "Hore! Transaksi Sudah Selesai",
  complaint: "Hore! Transaksi Sudah Selesai",
  cancelled: "Yah... Order ini udah dibatalkan",
};

function AcceptedOrder({ orderData, onStatusChange }) {
  console.info(orderData)
  const title = orderData.isCampuran
    ? "Sampah Campuran"
    : "Sampah Non-Organik";
  const role = localStorage.getItem("role")
  if (role === "user" || role === "driver") {
    const nextStatuses = getAvailableTransitions(orderData.status, role === "user" ? Roles.USER : Roles.DRIVER);
    return (
      <div className="flex flex-col max-w-sm mx-auto pb-6">
        <div className="rounded-2xl overflow-hidden border border-gray-200 h-48 bg-[#e8f0e4] relative">
        {orderData.status !== "inTransit" && orderData.status !== "pickingUp" ? (
          <>
          {orderData.status === "delivered" && (
            <div className="flex items-center flex-col justify-center w-full p-8">
              <CircleCheckBig size={100}/>
            <p className="mt-4">Sudah sampai di TPS</p>
            </div>
          ) }
          {orderData.status === "inspected" && (
            <div className="flex items-center flex-col p-8">
            <svg viewBox="0 0 64 64" className="w-24 h-24 relative z-10">
            <circle cx="27" cy="27" r="14" fill="none" stroke="#3b6b35" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="37.5" y1="37.5" x2="50" y2="50" stroke="#3b6b35" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="27" cy="27" r="8" fill="rgba(59,107,53,0.08)" />
            </svg>

            {[0, -0.533, -1.066].map((delay, i) => (
              <span
              key={i}
              className="absolute top-1/2 left-1/2 rounded-full bg-[#3b6b35]"
              style={{
                width: 9 - i * 2,
                  height: 9 - i * 2,
                  opacity: 1 - i * 0.3,
                  animation: `orbit 1.6s linear ${delay}s infinite`,
              }}
              />
            ))}

            <p className="mt-2 text-sm">Petugas lagi Mengecek Sampahmu</p>
            </div>
          ) }
          {orderData.status === "deposited" && (
            <div className="flex items-center flex-col p-8">
              <Wallet size={100}/>
            <p className="mt-2 text-sm">Sampah Kamu Sudah terdeposit!</p>
            <p className="text-xs text-gray-600">brosampah point : {orderData.points?.toLocaleString("id-ID")}</p>
            </div>
          ) }

          </>
        ) : (
          <>
          <FakeMap />
          <div className="absolute top-2.5 right-2.5 bg-white rounded-lg px-2.5 py-1 border border-gray-100 flex items-center gap-1.5">
            <span className="text-xs font-medium text-[#3b6b35]">Live</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#3b6b35]" />
          </div>
          </>
        )}
        </div>

        {/* Bottom sheet */}
        <div className="bg-white rounded-2xl border border-gray-100 mt-2.5 p-4">
          <p className="text-center text-xs font-medium mb-3 tracking-wide text-black">
            {role === "driver" ? driverMessage[orderData.status] : userMessage[orderData.status]}
          </p>
          <p className="text-center text-xs font-medium mb-3 tracking-wide text-black">
          </p>

          {/* Locations */}
          <div className="bg-gray-50 rounded-xl p-3 mb-2.5">
            <div className="flex gap-2.5 items-start mb-2.5">
              <div className="relative w-5 h-5 mt-0.5 flex-shrink-0">
                <div className="w-3 h-3 rounded-full bg-[#3b6b35] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                { orderData.status === "pickingUp" && (
                  <div className="absolute inset-0 rounded-full border-2 border-[#3b6b35] animate-ping opacity-50" />
                )}
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">{role === "driver" ? "Lokasi Penjemputan" : "Lokasi Kamu"}</p>
                <p className="text-sm font-medium mt-0.5">{orderData.pickUpAddress}</p>
              </div>
            </div>
            <div className="w-px h-3 bg-gray-300 ml-2.5 mb-2.5" />
            <div className="flex gap-2.5 items-start">
              <div className="relative w-5 h-5 mt-0.5 flex-shrink-0">
                <div className="w-3 h-3 rounded-sm bg-red-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                { orderData.status === "inTransit" && (
                  <div className="absolute inset-0 rounded-sm border-2 border-red-600 animate-ping opacity-30" />
                )}
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">Drop-off</p>
                <p className="text-xs font-medium mt-1">{orderData.tpsName}</p>
              </div>
            </div>
          </div>

          {role === "user" && (
            <div className="rounded-xl border border-gray-100 p-3 mb-2.5">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2.5">Driver</p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#EAF3DE] flex items-center justify-center text-sm font-medium text-[#3B6D11] flex-shrink-0">D</div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{orderData.driver.username}</p>
                  <p className="text-xs text-gray-400 mt-0.5">★★★★☆ 4.8 · 400 kg Sampah</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[10px] text-gray-400">ETA</p>
                  <p className="text-base font-medium text-[#3b6b35]">11 min</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2.5 pt-2.5 border-t border-gray-100">Honda Beat · B 4821 KJX</p>
            </div>
          )}

          {role === "driver" && (
            <div className="rounded-xl border border-gray-100 p-3 mb-2.5">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2.5">Customer</p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#EAF3DE] flex items-center justify-center text-sm font-medium text-[#3B6D11] flex-shrink-0">D</div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{orderData.user.username}</p>
                  <p className="text-xs text-gray-400 mt-0.5">★★★★★ 5.0 · 50 kg Sampah</p>
                </div>
              </div>
            </div>
          )}

            <div className="rounded-xl border border-gray-100 p-3 mb-2.5">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2.5">Tempat Pembuangan</p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#EAF3DE] flex items-center justify-center text-sm font-medium text-[#3B6D11] flex-shrink-0">TP</div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{orderData.tpsName}</p>
                  <p className="text-xs text-gray-400 mt-0.5"> ★★★★★ 5.0</p>
                  <p className="text-[11px] text-gray-400 mt-0.5 flex gap-0.5 items-center"> <MapPin size={12}/> {orderData.tpsAddress}</p>
                </div>
              </div>
            </div>

          {/* Product */}
          <div className="rounded-xl border border-gray-100 p-3">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2.5">Sampah</p>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#EAF3DE] flex items-center justify-center overflow-hidden flex-shrink-0">
            {orderData.image ? (
              <img
                src={`data:${orderData.imageFormat};base64,${orderData.image}`}
                alt="Order"
                className="w-full h-full object-cover"
              />
            ) : (
              ""
            )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{title}</p>
                <p className="text-xs text-gray-400 mt-0.5"> {orderData.weightKg} kg</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-medium">Rp {orderData.trashPrice}</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-gray-100 p-3 mt-2">
          <div className="grid grid-cols-[1fr_auto_auto] text-sm gap-y-1 text-gray-700">
            <p> Sampah </p>
            <p>Rp</p>
            <p className="text-right">{orderData.trashPrice.toLocaleString("id-ID")}</p>

            <p>Biaya Pengangkutan</p>
            <p>Rp</p>
            <p className="text-right">{orderData.deliveryFee.toLocaleString("id-ID")}</p>

            <p>Biaya Layanan</p>
            <p>Rp</p>
            <p className="text-right"> {orderData.serviceFee.toLocaleString("id-ID")}</p>


            <p className="font-bold border-t pt-2 mt-2 text-black">Total</p>
            <p className="font-bold border-t pt-2 mt-2 text-black">Rp</p>
            <p className="text-right font-bold border-t pt-2 mt-2 text-black">
              {orderData.totalPrice.toLocaleString("id-ID")}
            </p>
          </div>
          </div>
      {/*

          <div className="bg-[#356d9c] p-3 rounded-xl flex items-center gap-3 mt-3 text-white shadow-sm">
            <div className="bg-white/20 p-2 rounded-lg">
              <Wallet size={16} />
            </div>
            <p className="text-[11px] font-bold">
              {`Saldomu bertambah sebesar: Rp ${orderData.deliveryFee.toLocaleString("id-ID") }`}
           </p>
          </div>

        */}
       <div className="bg-white rounded-2xl border border-gray-200 p-4 flex items-center justify-between mt-3 mb-2">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Banknote className="text-green-600" size={18} />
              </div>
              <p className="text-sm font-medium"> Metode: Tunai</p>
            </div>

          </div>

            {nextStatuses.map((status) => (
              <button
                className="w-full bg-[#3b6b35] text-white py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform mt-3"
              key={status} onClick={() => onStatusChange(status)}>
                {statusActionLabels[status] || status}
              </button>
            ))}

        </div>
      </div>
    );
  }
}

function Collector({orderData, onStatusChange}) {
  const [payment, setPayment] = useState("");
  const [scaleImage, setScaleImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setScaleImage(file);
    }
  };

  const navigate = useNavigate()
  const title = orderData.isCampuran
    ? "Sampah Campuran"
    : "Sampah Non-Organik";
  const nextStatuses = getAvailableTransitions(orderData.status, Roles.COLLECTOR);

  return (
      <div className="flex flex-col max-w-sm mx-auto pb-6">
        <div className="rounded-2xl overflow-hidden border border-gray-200 h-48 bg-gray-300 relative">
          {orderData.image ? (
            <img
              src={`data:${orderData.imageFormat};base64,${orderData.image}`}
              alt="Order"
              className="w-full h-full object-cover"
            />
          ) : (
            "No Image"
          )}
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 mt-2.5 p-4">
          <p className="text-center text-xs font-medium mb-3 tracking-wide text-black">
              Informasi Sampah
          </p>
          <p className="text-center text-xs font-medium mb-3 tracking-wide text-black">
          </p>
            <div className="rounded-xl border border-gray-100 p-3 mb-2.5">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2.5">Pengirim Sampah</p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#EAF3DE] flex items-center justify-center text-sm font-medium text-[#3B6D11] flex-shrink-0">D</div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{orderData.user.username}</p>
                  <p className="text-xs text-gray-400 mt-0.5">★★★★★ 5.0 · 50 kg Sampah dikirim</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-gray-100 p-3 mb-2.5">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2.5">Detail</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 px-1">
                  <p className="text-sm mt-1">{title}</p>
                  <p className="text-xs mt-1 "> Estimasi Harga: Rp {(orderData.isCampuran ? 0 : orderData.weightKg * 10000).toLocaleString("id-ID")}</p>
                  <p className="text-xs text-gray-400 font-sm mt-2"> Deskripsi: {orderData.description}</p>
                  <p className="text-xs text-gray-400 mt-0.5">berat: {orderData.weightKg} Kg</p>
                </div>
              </div>
            </div>
      </div>
      {orderData.status === "deposited" && (
        <>
            <div className="rounded-2xl overflow-hidden border border-gray-200 h-48 bg-[#e8f0e4] relative">
              <div className="flex items-center flex-col justify-center w-full p-8">
                <CircleCheckBig size={100}/>
              <p className="mt-4">Sudah Terdeposit</p>
              </div>
            </div>

              <button
                className="w-full bg-[#3b6b35] text-white py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform mt-3"
              onClick={() =>navigate("/") }>
                Kembali
              </button>
    </>

      )}
      {orderData.status === "inspection" && (
        <div className="bg-white rounded-2xl border border-gray-100 mt-3 p-4">
          <p className="text-xs font-medium mb-3 text-black text-center">
            Input Hasil Timbangan
          </p>

          <div className="mb-3">
            <label className="text-[10px] text-gray-400 uppercase tracking-widest">
              Bukti Gambar Timbangan
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2 block w-full text-sm"
            />
          </div>

          <div className="mb-3">
            <label className="text-[10px] text-gray-400 uppercase tracking-widest">
              Jumlah Bayar (Rp)
            </label>
            <input
              type="number"
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              placeholder="Masukkan jumlah bayar"
              className="mt-2 w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {scaleImage && (
            <img
              src={URL.createObjectURL(scaleImage)}
              alt="Preview"
              className="mt-2 rounded-lg h-32 object-cover"
            />
          )}

        </div>
      )}    
            {nextStatuses.map((status) => (
              <button
                className="w-full bg-[#3b6b35] text-white py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform mt-3"
              key={status} onClick={() => onStatusChange(status, payment/10)}>
                {statusActionLabels[status] || status}
              </button>
            ))}
    </div>

  );
}


