import type { Locale } from "@/i18n/config";
import { actionZone } from "./action-zone";
import { creativeStudio } from "./creative-studio";
import { learningLab } from "./learning-lab";
import { outdoorFun } from "./outdoor-fun";
import { plushFriends } from "./plush-friends";
import { tinyWorlds } from "./tiny-worlds";
import type { CollectionContent, CollectionSlug } from "./types";
import { t } from "../locale";

export type { CollectionContent, CollectionSlug, CollectionStorySection } from "./types";

export const COLLECTIONS: CollectionContent[] = [
  tinyWorlds,
  creativeStudio,
  outdoorFun,
  plushFriends,
  actionZone,
  learningLab,
];

const bySlug = new Map(COLLECTIONS.map((item) => [item.slug, item]));

export function getAllCollections(): CollectionContent[] {
  return COLLECTIONS;
}

export function getCollection(slug: string): CollectionContent | undefined {
  return bySlug.get(slug);
}

export function getCollectionSlugs(): CollectionSlug[] {
  return COLLECTIONS.map((item) => item.slug as CollectionSlug);
}

export function getRelatedCollections(collection: CollectionContent): CollectionContent[] {
  return collection.relatedCollectionSlugs
    .map((slug) => getCollection(slug))
    .filter((item): item is CollectionContent => Boolean(item));
}

export function getCollectionName(collection: CollectionContent, locale: Locale): string {
  return t(collection.name, locale);
}
