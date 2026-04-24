// ========================================
// Utility Functions & Design Tokens
// ========================================

export const rugColors = [
  ['#8B4513','#D2691E','#CD853F','#DEB887'],
  ['#800020','#A0522D','#BC8F8F','#F4A460'],
  ['#2F4F4F','#556B2F','#8FBC8F','#BDB76B'],
  ['#191970','#4169E1','#6495ED','#B0C4DE'],
  ['#8B0000','#B22222','#CD5C5C','#E9967A'],
  ['#006400','#228B22','#32CD32','#90EE90'],
  ['#4B0082','#6A5ACD','#9370DB','#D8BFD8'],
  ['#B8860B','#DAA520','#FFD700','#FAFAD2'],
];

export function generateRugSVG(colors, pattern = 0) {
  if (!colors || !Array.isArray(colors) || colors.length < 4) {
    colors = rugColors[0];
  }
  const [c1, c2, c3, c4] = colors;
  const patterns = [
    // Traditional medallion
    `<rect width="300" height="400" fill="${c4}"/>
     <rect x="20" y="20" width="260" height="360" fill="${c1}" rx="2"/>
     <rect x="40" y="40" width="220" height="320" fill="${c2}" rx="2"/>
     <ellipse cx="150" cy="200" rx="70" ry="90" fill="${c3}"/>
     <ellipse cx="150" cy="200" rx="40" ry="55" fill="${c1}"/>
     <ellipse cx="150" cy="200" rx="15" ry="20" fill="${c4}"/>
     <rect x="60" y="50" width="180" height="10" fill="${c3}" opacity="0.5"/>
     <rect x="60" y="340" width="180" height="10" fill="${c3}" opacity="0.5"/>`,
    // Geometric tribal
    `<rect width="300" height="400" fill="${c1}"/>
     <polygon points="150,40 260,200 150,360 40,200" fill="${c2}" opacity="0.7"/>
     <polygon points="150,80 230,200 150,320 70,200" fill="${c3}" opacity="0.6"/>
     <polygon points="150,120 200,200 150,280 100,200" fill="${c4}" opacity="0.8"/>
     <line x1="0" y1="60" x2="300" y2="60" stroke="${c3}" stroke-width="3"/>
     <line x1="0" y1="340" x2="300" y2="340" stroke="${c3}" stroke-width="3"/>`,
    // Border pattern
    `<rect width="300" height="400" fill="${c2}"/>
     <rect x="15" y="15" width="270" height="370" fill="none" stroke="${c1}" stroke-width="8"/>
     <rect x="30" y="30" width="240" height="340" fill="${c4}" opacity="0.3"/>
     <rect x="30" y="30" width="240" height="340" fill="none" stroke="${c3}" stroke-width="3"/>
     <circle cx="150" cy="200" r="60" fill="${c1}" opacity="0.5"/>
     <circle cx="150" cy="200" r="35" fill="${c3}" opacity="0.5"/>
     <circle cx="150" cy="200" r="12" fill="${c4}"/>`,
    // Striped modern
    `<rect width="300" height="400" fill="${c4}"/>
     ${[0,1,2,3,4,5,6,7].map(i => `<rect x="0" y="${i*50}" width="300" height="25" fill="${i%2===0?c1:c2}" opacity="0.6"/>`).join('')}
     <rect x="100" y="100" width="100" height="200" fill="${c3}" opacity="0.4"/>
     <rect x="120" y="130" width="60" height="140" fill="${c1}" opacity="0.3"/>`,
  ];
  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400">${patterns[pattern % patterns.length]}</svg>`)}`;
}
