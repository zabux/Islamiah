import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Header() {
  const router = useRouter();
  const [active, setActive] = useState(null);
  const firstPath = '/' + router.asPath.split('/')[1];

  const navs = [
    { url: '/kalender', name: 'Kalender' },
    { url: '/quotes', name: 'Quotes' },
    { url: '/berita', name: 'Berita' },
  ];

  useEffect(() => {
    setActive(navs.find(({ url }) => url === firstPath));
  }, []);

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
          {navs.map(({ url, name }) => (
            <li key={url}>
              <button
                onClick={() => handleNavigation(url)}
                className={active && active.url === url ? 'font-bold' : ''}
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}