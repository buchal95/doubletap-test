#!/usr/bin/env node

/**
 * Quality Check Script
 * 
 * Runs all quality checks for the project
 */

const { execSync } = require('child_process');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function runCheck(command, description) {
  log(`\n🔍 ${description}...`, 'cyan');
  try {
    execSync(command, { stdio: 'inherit' });
    log(`✅ ${description} passed`, 'green');
    return true;
  } catch (error) {
    log(`❌ ${description} failed`, 'red');
    return false;
  }
}

function main() {
  log('🚀 Running Quality Checks for DoubleTap', 'bright');
  
  const checks = [
    {
      command: 'npm run type-check',
      description: 'TypeScript type checking'
    },
    {
      command: 'npm run lint',
      description: 'ESLint code quality'
    },
    {
      command: 'npm run test',
      description: 'Unit tests'
    },
    {
      command: 'npm run build',
      description: 'Production build'
    }
  ];

  let passedChecks = 0;
  const totalChecks = checks.length;

  for (const check of checks) {
    if (runCheck(check.command, check.description)) {
      passedChecks++;
    }
  }

  log(`\n📊 Quality Check Results:`, 'bright');
  log(`   Passed: ${passedChecks}/${totalChecks}`, passedChecks === totalChecks ? 'green' : 'yellow');
  
  if (passedChecks === totalChecks) {
    log('\n🎉 All quality checks passed! Ready for deployment.', 'green');
    process.exit(0);
  } else {
    log('\n⚠️  Some quality checks failed. Please fix the issues before deployment.', 'red');
    process.exit(1);
  }
}

main();
