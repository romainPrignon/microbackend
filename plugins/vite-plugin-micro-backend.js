/**
 * replace dynamic import with globalThis so that node:vm can "mock" the import function
 * ex: await import(...) => await globalThis.import(...)
 */
export function microBackend(options = {}) {
    return {
        name: 'vite-plugin-micro-backend',
        apply: 'build',
        renderChunk(code, chunk, options) {
            const regex = /import\s*\((?!globalThis\.import\()(['"`].*?['"`])\)/g;

            const transformedCode = code.replace(regex, (match, importPath) => {
                return `globalThis.import(${importPath})`;
            });

            if (transformedCode !== code) {
                return {
                    code: transformedCode,
                    map: null,
                };
            }

            return null;
        }
    };
}