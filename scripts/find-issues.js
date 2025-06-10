const fs = require('fs');
const path = require('path');

function findFilesWithPatterns(dir, fileExtensions, patterns) {
  const results = [];
  
  function searchDirectory(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        searchDirectory(fullPath);
      } else if (stat.isFile()) {
        const ext = path.extname(item);
        if (fileExtensions.includes(ext)) {
          try {
            const content = fs.readFileSync(fullPath, 'utf8');
            const regex = new RegExp(patterns.join('|'), 'i');
            if (regex.test(content)) {
              results.push(fullPath);
            }
          } catch (error) {
            console.error(`Error reading file ${fullPath}:`, error.message);
          }
        }
      }
    }
  }
  
  searchDirectory(dir);
  return results;
}

// Search for files with issues
const issuePatterns = ['unused', 'deprecated', 'TODO', 'FIXME'];
const filesWithIssues = findFilesWithPatterns('app', ['.tsx', '.ts'], issuePatterns);

console.log('Files containing potential issues:');
filesWithIssues.forEach(file => console.log(file));