#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const android = path.join(root, 'android')
const manifest = path.join(android, 'app', 'src', 'main', 'AndroidManifest.xml')
const appConfig = path.join(root, 'app.config.ts')

function fail(message) {
  console.error(`[android-startup-audit] FAIL: ${message}`)
  process.exitCode = 1
}

function read(file) {
  if (!fs.existsSync(file)) {
    fail(`missing required file: ${path.relative(root, file)}`)
    return ''
  }
  return fs.readFileSync(file, 'utf8')
}

if (!fs.existsSync(android)) {
  fail('clean Expo prebuild did not create the android directory')
}

const manifestText = read(manifest)
const configText = read(appConfig)

for (const required of [
  'com.cyanideph.uzzap2028',
  'UZZAP 2028',
]) {
  if (!manifestText.includes(required)) {
    fail(`Android manifest is missing expected UZZAP identity: ${required}`)
  }
}

if (!configText.includes("package: 'com.cyanideph.uzzap2028'")) {
  fail('app.config.ts does not declare the expected Android package')
}

if (!configText.includes("image: './assets/icons/uzzap-icon.png'")) {
  fail('app.config.ts does not point expo-splash-screen at the UZZAP icon')
}

const scanRoots = [
  path.join(android, 'app', 'src', 'main'),
  path.join(root, 'src'),
  path.join(root, 'assets'),
]

const legacyPattern = /seaguntech|seagun\s*tech|seagun/gi

function scanDirectory(dir) {
  if (!fs.existsSync(dir)) return
  const stack = [dir]
  while (stack.length) {
    const current = stack.pop()
    const stat = fs.statSync(current)
    if (stat.isDirectory()) {
      for (const entry of fs.readdirSync(current)) {
        if (!['node_modules', '.git', 'build'].includes(entry)) {
          stack.push(path.join(current, entry))
        }
      }
      continue
    }

    const ext = path.extname(current).toLowerCase()
    if (!['.xml', '.json', '.gradle', '.kt', '.java', '.ts', '.tsx', '.js', '.jsx', '.txt', '.html', '.svg'].includes(ext)) {
      continue
    }

    const content = fs.readFileSync(current, 'utf8')
    if (legacyPattern.test(content)) {
      fail(`legacy Seaguntech branding found in ${path.relative(root, current)}`)
      legacyPattern.lastIndex = 0
    }
  }
}

for (const dir of scanRoots) scanDirectory(dir)

const splashFiles = []
function collectSplashFiles(dir) {
  if (!fs.existsSync(dir)) return
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry)
    const stat = fs.statSync(full)
    if (stat.isDirectory()) collectSplashFiles(full)
    else if (/splash/i.test(entry)) splashFiles.push(full)
  }
}

collectSplashFiles(path.join(android, 'app', 'src', 'main', 'res'))

if (splashFiles.length === 0) {
  fail('no generated Android splash resources were found')
}

if (process.exitCode) {
  console.error('[android-startup-audit] Startup audit failed. Do not merge this PR until all failures are fixed.')
  process.exit(1)
}

console.log('[android-startup-audit] PASS: package identity, splash configuration, generated splash resources, and legacy branding checks passed.')
