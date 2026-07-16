import type { Locale } from "./config";
import type { Dictionary } from "./types";

export type { Dictionary };

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  switch (locale) {
    case "ar":
      return (await import("./ar")).ar;
    default:
      return (await import("./en")).en;
  }
}
