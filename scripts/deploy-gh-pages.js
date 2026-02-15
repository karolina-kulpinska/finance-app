const { execSync } = require("child_process");

function run(cmd) {
  console.log("> " + cmd);
  return execSync(cmd, { stdio: "inherit" });
}

try {
  // ensure build exists
  run("node -v");
  // create or update gh-pages worktree from origin
  let remoteExists = true;
  try {
    run("git fetch origin gh-pages");
  } catch (e) {
    console.log(
      "No remote gh-pages branch yet. Will use git subtree to create it.",
    );
    remoteExists = false;
  }

  if (!remoteExists) {
    // Fallback: initialize a temporary git repo inside `build` and push to origin
    try {
      const originUrl = require("child_process")
        .execSync("git config --get remote.origin.url")
        .toString()
        .trim();
      if (!originUrl) throw new Error("No remote origin URL configured");
      try {
        run("rd /s /q build\\.git");
      } catch (e) {
        try {
          run("rm -rf build/.git");
        } catch (e2) {}
      }
      run("git -C build init");
      run(`git -C build remote add origin ${originUrl}`);
      run("git -C build add --all");
      try {
        run('git -C build commit -m "Deploy to gh-pages"');
      } catch (e) {
        console.log("Nothing to commit in build.");
      }
      run("git -C build branch -M gh-pages");
      run("git -C build push -f origin gh-pages");
      // cleanup
      try {
        run("rd /s /q build\\.git");
      } catch (e) {
        try {
          run("rm -rf build/.git");
        } catch (e2) {}
      }
      console.log("Deploy finished (build repo).");
      process.exit(0);
    } catch (err) {
      console.error("Build-repo deploy failed:", err);
      throw err;
    }
  }

  // Use a temp worktree folder to avoid conflicts with build/
  const worktreeDir = "gh-pages-tmp";
  const fs = require("fs");
  // Remove temp worktree if exists
  if (fs.existsSync(worktreeDir)) {
    try {
      run(`rd /s /q ${worktreeDir}`);
    } catch (e) {
      try {
        run(`rm -rf ${worktreeDir}`);
      } catch (e2) {}
    }
  }
  try {
    run(`git worktree add -B gh-pages ${worktreeDir} origin/gh-pages`);
    // Clean worktree contents
    const files = fs.readdirSync(worktreeDir);
    for (const file of files) {
      if (file === ".git") continue;
      const filePath = `${worktreeDir}/${file}`;
      fs.rmSync(filePath, { recursive: true, force: true });
    }
    // Copy build/* to worktree
    const copydir = require("copy-dir");
    copydir.sync("build", worktreeDir, {
      utimes: true,
      mode: true,
      cover: true,
    });
    // Commit and push
    run(`git -C ${worktreeDir} add --all`);
    try {
      run(`git -C ${worktreeDir} commit -m "Deploy to gh-pages"`);
    } catch (e) {
      console.log("Nothing to commit in gh-pages-tmp.");
    }
    run(`git -C ${worktreeDir} push origin gh-pages --force`);
  } finally {
    // cleanup worktree
    try {
      run(`git worktree remove ${worktreeDir} --force`);
    } catch (e) {}
    try {
      run(`rd /s /q ${worktreeDir}`);
    } catch (e) {
      try {
        run(`rm -rf ${worktreeDir}`);
      } catch (e2) {}
    }
  }
  console.log("Deploy finished.");
} catch (err) {
  console.error("Deploy failed:", err);
  process.exit(1);
}
