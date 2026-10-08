const version = document.getElementById("version");
const btn = document.getElementById("downloadBtn");

const API = "https://api.github.com/repos/mm2vault/VYRA/releases?per_page=30";

fetch(API, { headers: { Accept: "application/vnd.github+json" } })
  .then((r) => r.ok ? r.json() : Promise.reject(new Error("GitHub Releases unavailable")))
  .then((releases) => {
    const valid = releases
      .filter((release) => !release.draft)
      .sort((a, b) => new Date(b.published_at || b.created_at) - new Date(a.published_at || a.created_at));

    const latest = valid[0];
    if (!latest) throw new Error("No releases found");

    const apk = (latest.assets || []).find((asset) =>
      asset.name.toLowerCase().endsWith(".apk")
    );

    version.textContent =
      "Son sürüm: " +
      latest.tag_name +
      (latest.prerelease ? " • prerelease" : "");

    if (apk?.browser_download_url) {
      btn.href = apk.browser_download_url;
      btn.target = "_blank";
      btn.rel = "noopener";
    } else {
      btn.href = latest.html_url || "https://github.com/mm2vault/VYRA/releases";
    }
  })
  .catch(() => {
    version.textContent = "En güncel APK GitHub Releases üzerinde.";
    btn.href = "https://github.com/mm2vault/VYRA/releases";
  });