const fs = require('fs');
const path = require('path');

const ADMIN_EMAILS = '["kazisamin0173@gmail.com", "starspanglefinance@gmail.com"]';

const frontendFiles = [
  'src/app/admin/books/new/page.tsx',
  'src/app/admin/books/page.tsx',
  'src/app/book/[id]/page.tsx',
  'src/app/cart/page.tsx',
  'src/app/dashboard/page.tsx',
  'src/components/layout/Navbar.tsx',
  'src/components/ui/BookCard.tsx'
];

frontendFiles.forEach(file => {
  const fullPath = path.join('C:/Projects/Book-Verse', file);
  if (!fs.existsSync(fullPath)) return;
  
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Replace simple equality checks
  content = content.replace(/session\?\.user\?\.email === "kazisamin0173@gmail\.com"/g, `${ADMIN_EMAILS}.includes(session?.user?.email)`);
  content = content.replace(/session\.user\.email === "kazisamin0173@gmail\.com"/g, `${ADMIN_EMAILS}.includes(session.user.email)`);
  content = content.replace(/user\?\.email === "kazisamin0173@gmail\.com"/g, `${ADMIN_EMAILS}.includes(user?.email)`);
  content = content.replace(/user\.email === "kazisamin0173@gmail\.com"/g, `${ADMIN_EMAILS}.includes(user.email)`);
  content = content.replace(/email === "kazisamin0173@gmail\.com"/g, `${ADMIN_EMAILS}.includes(email)`);
  
  fs.writeFileSync(fullPath, content);
  console.log('Updated frontend file:', file);
});

const backendFiles = [
  'src/config/auth.ts',
  'src/features/orders/order.controller.ts',
  'src/features/user/user.controller.ts'
];

backendFiles.forEach(file => {
  const fullPath = path.join('C:/Projects/Book-Verse-Server', file);
  if (!fs.existsSync(fullPath)) return;
  
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Handle backend specific replacements
  content = content.replace(/user\.email === 'kazisamin0173@gmail\.com'/g, `${ADMIN_EMAILS}.includes(user.email)`);
  content = content.replace(/user\.email !== 'kazisamin0173@gmail\.com'/g, `!${ADMIN_EMAILS}.includes(user.email)`);
  
  fs.writeFileSync(fullPath, content);
  console.log('Updated backend file:', file);
});
