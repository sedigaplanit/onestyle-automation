/**
 * Generates api/types/capital.schema.ts from swagger.json.
 *
 * Steps:
 *   1. Run openapi-typescript to emit TypeScript types.
 *   2. Parse swagger.json to extract operationId → path mappings.
 *   3. Append an `export enum ApiPaths` block so clients can reference
 *      endpoints as ApiPaths.Login instead of hard-coded strings.
 *
 * Usage:  node scripts/generate-schemas.mjs
 * Or via: npm run generate:schemas
 */

import { execSync } from 'child_process'
import { readFileSync, appendFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const swaggerPath = resolve(root, 'swagger.json')
const outputPath = resolve(root, 'api', 'types', 'capital.schema.ts')

// Ensure output directory exists
mkdirSync(resolve(root, 'api', 'types'), { recursive: true })

const HTTP_METHODS = new Set(['get', 'put', 'post', 'delete', 'patch', 'head', 'options', 'trace'])

// ── Step 1: Generate base types (use relative paths to avoid Windows URL issues)
console.log('Running openapi-typescript...')
execSync(`npx openapi-typescript swagger.json -o api/types/capital.schema.ts`, {
  stdio: 'inherit',
  cwd: root,
})

// ── Step 2: Build ApiPaths enum ────────────────────────────────────────────
const swagger = JSON.parse(readFileSync(swaggerPath, 'utf-8'))
const entries = []

for (const [path, pathItem] of Object.entries(swagger.paths ?? {})) {
  for (const [method, operation] of Object.entries(pathItem)) {
    if (!HTTP_METHODS.has(method) || !operation?.operationId) continue
    const key = operation.operationId.charAt(0).toUpperCase() + operation.operationId.slice(1)
    entries.push(`  ${key} = '${path}'`)
  }
}

const enumBlock = `\nexport enum ApiPaths {\n${entries.join(',\n')},\n}\n`
appendFileSync(outputPath, enumBlock)

console.log(`ApiPaths enum appended with ${entries.length} entries.`)
console.log('Done → api/types/capital.schema.ts')
