const fs = require('fs');
const path = require('path');

const walkSync = (dir, callback) => {
  fs.readdirSync(dir).forEach(file => {
    let filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      walkSync(filepath, callback);
    } else if (filepath.endsWith('.tsx') || filepath.endsWith('.ts')) {
      callback(filepath);
    }
  });
};

const replacements = [
  { regex: /bg-dark-950/g, replacement: 'bg-background' },
  { regex: /bg-dark-900/g, replacement: 'bg-card' },
  { regex: /bg-dark-800/g, replacement: 'bg-card' },
  { regex: /bg-dark-700/g, replacement: 'bg-muted' },
  { regex: /text-white/g, replacement: 'text-foreground' },
  { regex: /text-gray-200/g, replacement: 'text-muted-foreground' },
  { regex: /text-gray-300/g, replacement: 'text-muted-foreground' },
  { regex: /text-gray-400/g, replacement: 'text-muted-foreground' },
  { regex: /text-gray-500/g, replacement: 'text-muted-foreground' },
  { regex: /border-white\/10/g, replacement: 'border-card-border' },
  { regex: /border-white\/20/g, replacement: 'border-card-border' },
  { regex: /bg-white\/5/g, replacement: 'bg-foreground/5' },
  { regex: /bg-white\/10/g, replacement: 'bg-foreground/10' },
  { regex: /accent-cyan/g, replacement: 'primary' },
  { regex: /accent-blue/g, replacement: 'primary' }, // simplify
  { regex: /accent-darkBlue/g, replacement: 'secondary' }
];

walkSync('src', (filepath) => {
  let content = fs.readFileSync(filepath, 'utf8');
  let newContent = content;
  replacements.forEach(r => {
    newContent = newContent.replace(r.regex, r.replacement);
  });
  if (content !== newContent) {
    fs.writeFileSync(filepath, newContent, 'utf8');
    console.log('Updated: ' + filepath);
  }
});
