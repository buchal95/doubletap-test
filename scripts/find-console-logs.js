const fs = require('fs');
const path = require('path');

function findConsoleStatements(dir, fileExtensions, maxResults = 10) {
  const results = [];
  
  function searchDirectory(currentDir) {
    if (results.length >= maxResults) return;
    
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      if (results.length >= maxResults) break;
      
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        searchDirectory(fullPath);
      } else if (stat.isFile()) {
        const ext = path.extname(item);
        if (fileExtensions.includes(ext)) {
          try {
            const content = fs.readFileSync(fullPath, 'utf8');
            const lines = content.split('\n');
            
            lines.forEach((line, index) => {
              if (results.length >= maxResults) return;
              
              const regex = /console\.(log|warn)/;
              if (regex.test(line)) {
                results.push({
                  file: fullPath,
                  line: index + 1,
                  content: line.trim()
                });
              }
            });
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

// Search for console statements
const consoleStatements = findConsoleStatements('app', ['.tsx', '.ts'], 10);

console.log('Console statements found:');
consoleStatements.forEach(result => {
  console.log(`${result.file}:${result.line}: ${result.content}`);
});