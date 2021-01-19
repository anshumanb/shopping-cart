import path from 'path';
import fs from 'fs';

export const inRootDir = (...rest) =>
    path.resolve(
        path.dirname(new URL(import.meta.url).pathname),
        '..',
        ...rest
    );

export const inBuildDir = (...rest) => inRootDir('build', ...rest);

const readFile = (filePath) => {
    try {
        return fs.readFileSync(filePath, 'utf-8');
    } catch {
        return '';
    }
};

export const readJson = (filePath) =>
    JSON.parse(readFile(filePath) || null) || {};
