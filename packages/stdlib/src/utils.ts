import { setFlagsFromString } from "v8";
import { runInNewContext } from "vm";
import { isNil } from "./lodash";

/**
 * Convert any number to a human readable string.
 * Supports converting up to a pebibyte.
 * It will use 0 - 2 digits after the decimal.
 */
export function bytesToHumanReadable(bytes: number): string {
  const sizes = ["Bytes", "KiB", "MiB", "GiB", "TiB", "PiB"];
  if (bytes === 0) {
    return "0 Byte";
  }
  const idx = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = bytes / Math.pow(1024, idx);
  // Remove any unnecessary trailing 0's
  return `${Number(value.toFixed(2))} ${sizes[idx]}`;
}

/**
 * Returns an integer with the current amount of seconds since Unix Epoch
 */
export function getSecondsSinceEpoch(): number {
  return Math.floor(Date.now() / 1000);
}

/**
 * Internal gc function reference
 * Note that this is undefined if the gc function is not called and Node is not running with
 * --expose-gc on
 */
let internalGc = global.gc;

/**
 * Let V8 know to please run the garbage collector.
 */
export function gc() {
  if (isNil(internalGc)) {
    setFlagsFromString("--expose_gc");
    internalGc = runInNewContext("gc");
  }

  internalGc();
}
