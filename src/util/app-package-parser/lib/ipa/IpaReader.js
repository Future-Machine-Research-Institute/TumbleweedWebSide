'use strict';

import Reader from "../Reader";
import {parse as plistParse} from "./xmlPlistParser"
import {parseBuffer as bplistParseBuffer} from "./bplistParser"
// const cgbiToPng = require('cgbi-to-png');
// import revert from "cgbi-to-png"
import { isBrowser } from "../utils/is";
import cgbi from "@future-machine-research-institute/cgbidecompress/lib/cgbi";

const PLIST_REG = new RegExp("payload/.+?.app/info.plist$", "i");
// const PROVISION_REG = /payload\/.+?\.app\/embedded.mobileprovision/;
const PROVISION_REG = new RegExp("payload/.+?.app/embedded.mobileprovision$", "i");

function arrayBufferToBase64( buffer ) {
  var binary = '';
  var bytes = new Uint8Array( buffer );
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
  }
  return window.btoa( binary );
}

const uint8arrayToBase64 = function(u8Arr) {
  try{
       let CHUNK_SIZE = 0x8000; //arbitrary number
       let index = 0;
       let length = u8Arr.length;
       let result = '';
       let slice;
       while (index < length) {
           slice = u8Arr.subarray(index, Math.min(index + CHUNK_SIZE, length));
           result += String.fromCharCode.apply(null, slice);
           index += CHUNK_SIZE;
       }
       // web image base64图片格式: "data:image/png;base64," + b64encoded;
       // return  "data:image/png;base64," + btoa(result);
       return window.btoa(result);
   }
   catch(e) {
       throw e;
   }
}

//bufferpack
//crc
//stream-to-buffer
//streamifier

class IpaReader extends Reader {
  constructor(path) {
    super(path);
    if (!(this instanceof IpaReader)) {
      return new IpaReader(path);
    }
  }

  async parse() {
    let whatYouNeed = [PLIST_REG, PROVISION_REG];
    let buffers = await this.getEntries(whatYouNeed);
    // 解析 Info.plist
    let plistInfo = this.parsePlistInfo(buffers);
    // 解析 embedded.mobileprovision
    let provisionInfo = this.parseMobileProvisionInfo(buffers);
    plistInfo.mobileProvision = provisionInfo;
    // 解析图标
    let iconName = this.findOutIcon(plistInfo);
    let iconBuffer = await this.getEntry(new RegExp(iconName.toLowerCase()));
    console.log("iconBuffer: ", iconBuffer)
    if(!iconBuffer) {
      plistInfo.icon = null;
    } else {
      const pngBuffer = cgbi.revert(iconBuffer);
      console.log("pngBuffer: ", pngBuffer)
      let icon = 'data:image/png;base64,' + uint8arrayToBase64(pngBuffer);
      plistInfo.icon = icon;
      // try {
      //   const pngBuffer = revert(iconBuffer);
      //   console.log("pngBuffer: ", pngBuffer)
      //   let icon = 'data:image/png;base64,' + pngBuffer.toString('base64');
      //   plistInfo.icon = icon;
      // } catch (error) {
      //   if (isBrowser()) {
      //     // Normal conversion in other cases
      //     plistInfo.icon = 'data:image/png;base64,' + arrayBufferToBase64(iconBuffer).toString('base64')
      //     console.log("plistInfo.icon: ", plistInfo.icon)
      //   } else {
      //     plistInfo.icon = null
      //     console.warn('[Warning] failed to parse icon: ', err)
      //   }
      // }
    }
    return plistInfo;
  }

  /**
   * 解析 Plist 文件信息
   * @param {*} buffers
   */
  parsePlistInfo(buffers) {
    let plistInfo, firstByte;

    let aStringOrBuffer = buffers[PLIST_REG];
    if (aStringOrBuffer) {
      firstByte = aStringOrBuffer[0];
      try {
        if (firstByte === 60 || firstByte === '<' || firstByte == 239) {
          plistInfo = plistParse(aStringOrBuffer.toString());
        } else if (firstByte === 98) {
          plistInfo = bplistParseBuffer(aStringOrBuffer)[0];
        } else {
          console.error("Unable to determine format for plist aStringOrBuffer: '%s'", aStringOrBuffer);
          plistInfo = {};
        }
      } catch (e) {
        throw Error("'%s' has errors", aFile);
      }
    } else {
      throw new Error("Parse ipa file failed, can not find info.plist.");
    }
    return plistInfo;
  }

  /**
   * 解析 embedded.mobileprovision
   * @param {*} buffers
   */
  parseMobileProvisionInfo(buffers) {
    let provisionInfo;
    // console.log("buffers: ", buffers)
    // console.log("PROVISION_REG: ", PROVISION_REG)
    // console.log("buffers[PROVISION_REG]: ", buffers[PROVISION_REG])
    if (buffers[PROVISION_REG]) {
      try {
        provisionInfo = buffers[PROVISION_REG].toString("utf-8");
        var firstIndex = provisionInfo.indexOf("<");
        var lastIndex = provisionInfo.lastIndexOf("</plist>");
        provisionInfo = provisionInfo.slice(firstIndex, lastIndex);
        provisionInfo += "</plist>";
        provisionInfo = plistParse(provisionInfo);
      } catch (e) {
        throw new Error(`Parse ipa file failed, can not find embedded.mobileprovision, error: ${e.message}`);
      }
    }
    return provisionInfo;
  }

  /**
   * 查找图标
   * @param {*} pkgInfo 
   */
  findOutIcon(pkgInfo) {
    if (
      pkgInfo.CFBundleIcons &&
      pkgInfo.CFBundleIcons.CFBundlePrimaryIcon &&
      pkgInfo.CFBundleIcons.CFBundlePrimaryIcon.CFBundleIconFiles &&
      pkgInfo.CFBundleIcons.CFBundlePrimaryIcon.CFBundleIconFiles.length
    ) {
      // It's an array...just try the last one
      return pkgInfo.CFBundleIcons.CFBundlePrimaryIcon.CFBundleIconFiles[
        pkgInfo.CFBundleIcons.CFBundlePrimaryIcon.CFBundleIconFiles.length - 1
      ];
    } else {
      // Maybe there is a default one
      return ".app/Icon.png";
    }
  }
}

export default IpaReader;
