import fs from 'node:fs';
import path from 'node:path';

const originalSymlinkSync = fs.symlinkSync;

fs.symlinkSync = function (target, dest, type) {
  try {
    const destDir = path.dirname(dest);
    const resolvedTarget = path.isAbsolute(target) ? target : path.resolve(destDir, target);

    if (fs.existsSync(dest)) {
      try {
        fs.rmSync(dest, { recursive: true, force: true });
      } catch {}
    }

    if (fs.statSync(resolvedTarget).isDirectory()) {
      fs.mkdirSync(dest, { recursive: true });
      fs.cpSync(resolvedTarget, dest, { recursive: true });
    } else {
      fs.mkdirSync(destDir, { recursive: true });
      fs.copyFileSync(resolvedTarget, dest);
    }
    console.log(`[MonkeyPatch] Successfully copied instead of symlinking: ${target} -> ${dest}`);
  } catch (err) {
    console.warn(`[MonkeyPatch] Copy fallback failed: ${err.message}. Retrying original symlink...`);
    originalSymlinkSync(target, dest, type);
  }
};

if (fs.promises) {
  fs.promises.symlink = async function (target, dest, type) {
    return fs.symlinkSync(target, dest, type);
  };
}
