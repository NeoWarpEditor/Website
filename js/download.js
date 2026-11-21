"use strict";

/**
 * download.js —— 下载页脚本
 * 1. 当前系统标识（支持 HarmonyOS / Android / Windows / macOS / Linux，
 *    修复：Android 误判为 Linux、iPadOS 误判为 macOS）
 */


/* --------------------------------------------------------------------------
   当前系统标识
   注意点：
   - Android 的 UA 含 "Linux"，须先于桌面 Linux 判断；
   - HarmonyOS / OpenHarmony 的 ArkWeb UA 可能同时携带 "Android" 兼容字段，
     须先于 Android 判断；
   - iPadOS 桌面模式 UA 含 "Macintosh"（maxTouchPoints > 1），暂无对应版本，不标识；
   - iPhone / iPod 暂无对应版本，不标识。
   -------------------------------------------------------------------------- */
(function markCurrentPlatform() {
    const ua = navigator.userAgent;

    let platform = "";

    if (/harmonyos|openharmony/i.test(ua)) {
        platform = "harmonyos";
    } else if (/android/i.test(ua)) {
        platform = "android";
    } else if (/iphone|ipod/i.test(ua)) {
        /* iOS 暂无对应版本 */
        return;
    } else if (/macintosh/i.test(ua) && navigator.maxTouchPoints > 1) {
        /* iPadOS 桌面模式 */
        return;
    } else {
        const dataPlatform = ((navigator.userAgentData && navigator.userAgentData.platform) || "").toLowerCase();
        if (dataPlatform) {
            if (dataPlatform.includes("mac")) platform = "macos";
            else if (dataPlatform.includes("win")) platform = "windows";
            else if (dataPlatform.includes("linux") || dataPlatform.includes("chrome os")) platform = "linux";
        }
        if (!platform) {
            if (/macintosh|mac os x/i.test(ua)) platform = "macos";
            else if (/windows/i.test(ua)) platform = "windows";
            else if (/linux|cros|x11/i.test(ua)) platform = "linux";
        }
    }
    if (!platform) return;

    const row = document.querySelector(`[data-platform="${platform}"]`);
    if (row) {
        const badge = row.querySelector("[data-current]");
        if (badge) badge.hidden = false;
    }
})();
