#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const android = path.join(root, 'android')
const manifest = path.join(android, 'app', 'src', 'main', 'AndroidManifest.xml')
const appConfig = path.join(root, 'app.config.ts')
const resources = path.join(android, 'app', 'src', 'main', 'res')

const failures = []

function fail(message) {
  failures.push(message)
  console.error(`[android-startup-audit] FAIL: ${message}`)
}

function read(file) {
  if (!fs.existsSync(file)) {
    fail(`missing required file: ${path.relative(root, file)}`)
    return ''
  }
  return fs.readFileSync(file, 'utf8')
}

if (!fs.existsSync(android)) fail('clean Expo prebuild did not create the android directory')

const manifestText = read(manifest)
const configText = read(appConfig)

if (!/package="com\.cyanideph\.uzzap2028"/.test(manifestText)) {
  fail('generated Android manifest does not use package com.cyanideph.uzzap2028')
}

if (!configText.includes("package: 'com.cyanideph.uzzap2028'")) {
  fail('app.config.ts does not declare the expected Android package')
}

if (!configText.includes("name: 'UZZAP 2028'")) {
  fail('app.config.ts does not declare UZZAP 2028 as the app name')
}

if (!configText.includes("image: './assets/icons/uzzap-icon.png'")) {
  fail('app.config.ts does not point expo-splash-screen at the UZZAP icon')
}

const scanRoots = [
  path.join(android, 'app', 'src', 'main'),
  path.join(root, 'src'),
  path.join(root, 'assets'),
  path.join(root, 'scripts'),
]

const legacyPattern = /seaguntech|seagun\s*tech|seagun/gi
const allowedTextExtensions = new Set([
  '.xml', '.json', '.gradle', '.gradle.kts', '.kt', '.java', '.ts', '.tsx',
  '.js', '.jsx', '.txt', '.html', '.svg', '.properties', '.pro', '.cfg',
])

function scanDirectory(dir) {
  if (!fs.existsSync(dir)) return
  const stack = [dir]
  while (stack.length) {
    const current = stack.pop()
    const stat = fs.statSync(current)
    if (stat.isDirectory()) {
      for (const entry of fs.readdirSync(current)) {
        if (!['node_modules', '.git', 'build'].includes(entry)) stack.push(path.join(current, entry))
      }
      continue
    }

    const relative = path.relative(root, current)
    if (legacyPattern.test(relative)) {
      fail(`legacy branding found in filename: ${relative}`)
      legacyPattern.lastIndex = 0
    }

    const ext = path.extname(current).toLowerCase()
    if (!allowedTextExtensions.has(ext)) continue

    const content = fs.readFileSync(current, 'utf8')
    if (legacyPattern.test(content)) {
      fail(`legacy branding found in ${relative}`)
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

collectSplashFiles(resources)

if (splashFiles.length === 0) fail('no generated Android splash resources were found')

const splashXml = splashFiles
  .filter((file) => path.extname(file).toLowerCase() === '.xml')
  .map((file) => read(file))
  .join('\n')

if (splashXml && /seaguntech|seagun\s*tech|seagun/i.test(splashXml)) {
  fail('generated splash XML still contains legacy branding')
}

const appNameFiles = []
function collectAppNameFiles(dir) {
  if (!fs.existsSync(dir)) return
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry)
    const stat = fs.statSync(full)
    if (stat.isDirectory()) collectAppNameFiles(full)
    else if (/strings\.xml$/i.test(entry)) appNameFiles.push(full)
  }
}
collectAppNameFiles(resources)

const stringsText = appNameFiles.map(read).join('\n')
if (!/UZZAP\s+2028/i.test(stringsText)) {
  fail('generated Android string resources do not contain the UZZAP 2028 app name')
}

if (failures.length) {
  console.error(`[android-startup-audit] ${failures.length} startup audit failure(s). Do not merge this PR until all failures are fixed.`)
  process.exit(1)
}

console.log('[android-startup-audit] PASS: Android identity, splash resources, and legacy-branding checks passed.')
