import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <header className="bg-rose-500 p-3 flex justify-between items-center">
      <div>
        <button onClick={() => handleNavigation('/')}>
          <span className="text-lg font-bold text-rose-50">𝐐𝐮𝐨𝐭𝐞𝐬 𝐈𝐬𝐥𝐚𝐦𝐢𝐜</span>
        </button>
      </div>

      <nav className="text-rose-50">
        <ul className="flex space-x-4">
          <li>
            <button onClick={() => handleNavigation('/kalender')}>
              Kalender
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation('/quotes')}>
              Quotes
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation('/berita')}>
              Berita
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}