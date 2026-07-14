const fs = require('fs');
const routes = {
  explore: 'Explore Books',
  categories: 'Categories',
  about: 'About Us',
  contact: 'Contact Us',
  login: 'Log In',
  register: 'Sign Up',
  profile: 'My Profile',
  dashboard: 'My Dashboard',
  checkout: 'Secure Checkout'
};

for (const [route, title] of Object.entries(routes)) {
  const dir = `src/app/${route}`;
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(`${dir}/layout.tsx`, `import { Metadata } from 'next';\n\nexport const metadata: Metadata = {\n  title: '${title}',\n};\n\nexport default function Layout({ children }: { children: React.ReactNode }) {\n  return children;\n}\n`);
}
console.log('Metadata layouts created successfully.');
