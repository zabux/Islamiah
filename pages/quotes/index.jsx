import { useEffect, useState } from 'react';
import Layout from '../../components/Layouts';
import Loading from '../../components/Loading';
import ErrorCard from '../../components/ErrorCards';

export default function QiblaFinder() {
  const [coordinates, setCoordinates] = useState(null);
  const [qiblaDirection, setQiblaDirection] = useState(null);
  const [deviceOrientation, setDeviceOrientation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!coordinates) return;

    setLoading(true);
    setError(null);

    fetch(`https://api.aladhan.com/v1/qibla/${coordinates.latitude}/${coordinates.longitude}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setQiblaDirection(data.data.direction);
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
    const handleOrientation = (event) => {
      setDeviceOrientation(event.alpha); // Menggunakan alpha (kompas)
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation, true);
    } else {
      setError('Device orientation tidak didukung oleh browser ini');
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  const calculateQiblaDirection = () => {
    if (qiblaDirection !== null && deviceOrientation !== null) {
      const qiblaRelativeToNorth = qiblaDirection - deviceOrientation;
      return qiblaRelativeToNorth < 0 ? qiblaRelativeToNorth + 360 : qiblaRelativeToNorth;
    }
    return null;
  };

  const qiblaRelativeDirection = calculateQiblaDirection();

  return (
    <Layout name="Qibla Finder">
      <h1 className="text-3xl font-bold text-rose-500 mb-3">Penentu Arah Kiblat</h1>
      <p>Temukan arah kiblat berdasarkan lokasi dan orientasi perangkat Anda.</p>

      {loading && <Loading message="Memuat arah kiblat..." />}
      {error && <ErrorCard message={`Gagal memuat data: ${error}`} />}

      {qiblaRelativeDirection !== null && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Arah Kiblat:</h2>
          <p className="text-lg">Arah kiblat dari lokasi Anda adalah {qiblaDirection.toFixed(2)}° dari utara.</p>
          <p className="text-lg">Arah kiblat relatif terhadap perangkat Anda adalah {qiblaRelativeDirection.toFixed(2)}°.</p>
        </div>
      )}
    </Layout>
  );
}