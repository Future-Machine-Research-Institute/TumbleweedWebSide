import ApkReader from "./lib/apk/ApkReader"
import IpaReader from "./lib/ipa/IpaReader"
import {isBrowser} from "./lib/utils/is"

function PkgReader(path, extension) {
  return new (extension === "ipa" ? IpaReader : ApkReader)(path);
}

async function readPkgInfo(filePath) {
  const extension = isBrowser() ? filePath.name.substr(filePath.name.lastIndexOf(".") + 1) : filePath.substr(filePath.lastIndexOf(".") + 1);
  const reader = new PkgReader(filePath, extension);
  let appInfo = await reader.parse();
  let data = {};
  if (extension === "apk") {
    data.name = appInfo.application.label[0];
    data.appId = appInfo.package;
    data.versionName = appInfo.versionName;
    data.versionCode = appInfo.versionCode;
    data.icon = appInfo.icon;
  } else {
    data.name = appInfo.CFBundleDisplayName ? appInfo.CFBundleDisplayName : appInfo.CFBundleName;
    data.appId = appInfo.CFBundleIdentifier;
    data.versionName = appInfo.CFBundleShortVersionString;
    data.versionCode = appInfo.CFBundleVersion;
    data.icon = appInfo.icon;
  }

  return data;
}

export {
  ApkReader, 
  IpaReader, 
  PkgReader, 
  readPkgInfo
}
