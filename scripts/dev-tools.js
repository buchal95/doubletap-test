#!/usr/bin/env node

/**
 * Development Tools Script
 * 
 * Utility script for common development tasks
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function runCommand(command, description) {
  log(`\n🔧 ${description}...`, 'cyan');
  try {
    execSync(command, { stdio: 'inherit' });
    log(`✅ ${description} completed`, 'green');
  } catch (error) {
    log(`❌ ${description} failed`, 'red');
    process.exit(1);
  }
}

// Available commands
const commands = {
  'type-check': () => {
    runCommand('npx tsc --noEmit', 'Type checking');
  },

  'lint': () => {
    runCommand('npx eslint . --ext .ts,.tsx,.js,.jsx', 'Linting code');
  },

  'lint-fix': () => {
    runCommand('npx eslint . --ext .ts,.tsx,.js,.jsx --fix', 'Fixing lint issues');
  },

  'format': () => {
    runCommand('npx prettier --write .', 'Formatting code');
  },

  'clean': () => {
    log('\n🧹 Cleaning build artifacts...', 'cyan');
    const dirsToClean = ['.next', 'node_modules/.cache', 'dist', 'build'];
    
    dirsToClean.forEach(dir => {
      if (fs.existsSync(dir)) {
        fs.rmSync(dir, { recursive: true, force: true });
        log(`  Removed ${dir}`, 'yellow');
      }
    });
    
    log('✅ Cleanup completed', 'green');
  },

  'analyze': () => {
    log('\n📊 Analyzing bundle size...', 'cyan');
    runCommand('npm run build', 'Building for analysis');
    
    // Check if bundle analyzer is available
    try {
      runCommand('npx @next/bundle-analyzer', 'Running bundle analyzer');
    } catch {
      log('Bundle analyzer not found. Install with: npm install --save-dev @next/bundle-analyzer', 'yellow');
    }
  },

  'check-deps': () => {
    log('\n📦 Checking dependencies...', 'cyan');
    
    try {
      runCommand('npm audit', 'Security audit');
    } catch {
      log('Security vulnerabilities found. Run "npm audit fix" to fix them.', 'yellow');
    }
    
    try {
      runCommand('npx npm-check-updates', 'Checking for updates');
    } catch {
      log('npm-check-updates not found. Install with: npm install -g npm-check-updates', 'yellow');
    }
  },

  'setup': () => {
    log('\n🚀 Setting up development environment...', 'cyan');
    
    // Install dependencies
    runCommand('npm install', 'Installing dependencies');
    
    // Setup git hooks (if husky is available)
    try {
      runCommand('npx husky install', 'Setting up git hooks');
    } catch {
      log('Husky not found. Skipping git hooks setup.', 'yellow');
    }
    
    // Create .env.local if it doesn't exist
    if (!fs.existsSync('.env.local')) {
      const envTemplate = `# Local environment variables
NEXT_PUBLIC_SITE_URL=http://localhost:3000
GOOGLE_CALENDAR_API_KEY=your_api_key_here
GOOGLE_CALENDAR_ID=your_calendar_id_here
BRJ_API_KEY=your_brj_api_key_here
`;
      fs.writeFileSync('.env.local', envTemplate);
      log('Created .env.local template', 'green');
    }
    
    log('✅ Development environment setup completed', 'green');
  },

  'help': () => {
    log('\n📖 Available commands:', 'bright');
    log('  type-check  - Run TypeScript type checking', 'cyan');
    log('  lint        - Run ESLint', 'cyan');
    log('  lint-fix    - Run ESLint with auto-fix', 'cyan');
    log('  format      - Format code with Prettier', 'cyan');
    log('  clean       - Clean build artifacts', 'cyan');
    log('  analyze     - Analyze bundle size', 'cyan');
    log('  check-deps  - Check dependencies and security', 'cyan');
    log('  setup       - Setup development environment', 'cyan');
    log('  help        - Show this help message', 'cyan');
    log('\nUsage: node scripts/dev-tools.js <command>', 'yellow');
  }
};

// Main execution
const command = process.argv[2];

if (!command || !commands[command]) {
  log('❌ Invalid or missing command', 'red');
  commands.help();
  process.exit(1);
}

log(`🛠️  DoubleTap Development Tools`, 'bright');
commands[command]();
