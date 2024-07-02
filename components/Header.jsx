import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Header = () => {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState('');

  const navigationItems = [
    { url: '/', name: 'Home' },
    { url: '/quotes', name: 'Quotes' },
    { url: '/services', name: 'Services' },
    { url: '/contact', name: 'Contact' },
  ];

  useEffect(() => {
    const path = router.asPath;
    const active = navigationItems.find(item => path === item.url);
    setActiveItem(active ? active.name : '');
  }, [router.asPath]);

  const handleNavigation = (url) => {
    router.push(url);
  };

  return (
    <header>
      <button onClick={() => handleNavigation('/')}>𝐐𝐮𝐨𝐭𝐞𝐬 𝐈𝐬𝐥𝐚𝐦𝐢𝐜</button>
      <nav>
        <ul>
          {navigationItems.map(item => (
            <li key={item.url}>
              <button
                onClick={() => handleNavigation(item.url)}
                style={{ fontWeight: item.name === activeItem ? 'bold' : 'normal' }}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;