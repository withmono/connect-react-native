const fs = require('fs');
const path = require('path');

const pkg = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8')
);

const content = `// Auto-generated from package.json version. Do not edit manually.
export const SDK_VERSION = '${pkg.version}';
`;

fs.writeFileSync(path.join(__dirname, '..', 'sdk-version.ts'), content);
