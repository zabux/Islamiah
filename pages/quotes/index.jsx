import { useEffect, useRef, useState } from 'react';
import Layout from '../../components/Layouts';
import Loading from '../../components/Loading';
import ErrorCard from '../../components/ErrorCards';

export default function QiblaFinder() {
  const [coordinates, setCoordinates] = useState(null);
  const [qiblaDirection, setQiblaDirection] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!coordinates) return;

    setLoading(true);
    setError(null); // Reset error sebelum melakukan fetch

    fetch(`https://api.aladhan.com/v1/qibla/${coordinates.latitude}/${coordinates.longitude}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setQiblaDirection(data.data.direction); // Menggunakan data dari API
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  }, [coordinates]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          setError('Gagal mendapatkan lokasi: ' + error.message);
        }
      );
    } else {
      setError('Geolocation tidak didukung oleh browser ini');
    }
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((err) => {
          setError('Gagal mengakses kamera: ' + err.message);
        });
    }
  }, [videoRef]);

  return (
    <Layout name="Qibla Finder">
      <h1 className="text-3xl font-bold text-rose-500 mb-3">Penentu Arah Kiblat</h1>
      <p>Temukan arah kiblat berdasarkan lokasi Anda saat ini.</p>

      {loading && <Loading message="Memuat arah kiblat..." />}
      {error && <ErrorCard message={`Gagal memuat data: ${error}`} />}

      {qiblaDirection && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Arah Kiblat:</h2>
          <p className="text-lg">Arah kiblat dari lokasi Anda adalah {qiblaDirection.toFixed(2)}° dari utara.</p>
        </div>
      )}

      <div className="mt-4">
        <video ref={videoRef} autoPlay className="rounded-lg shadow-lg" style={{ width: '100%', height: 'auto' }}></video>
        {qiblaDirection && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
            <div className="w-32 h-32 border-4 border-rose-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}