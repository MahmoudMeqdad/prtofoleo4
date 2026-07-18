export interface HomepageCollection {
  id: string;
  slug: string;
  desktopMedia: string;
  mobileMedia?: string;
  mediaType: "image" | "video";
  poster?: string;
  textColor: "light" | "dark";
  overlayStrength?: number;
  focalPoint?: string;
  titleScale?: "lg" | "xl";
  sequence?: string;
}

export const HERO_MEDIA = {
  videoSrc: "/media/home/hero-loop.mp4",
  posterSrc: "/media/home/hero-poster.png",
  fallbackGradient: "linear-gradient(135deg, #c8121b 0%, #9a0e16 55%, #6b0a10 100%)",
};

export const HOMEPAGE_COLLECTIONS: HomepageCollection[] = [
  {
    id: "tiny-worlds",
    slug: "tiny-worlds",
    desktopMedia: "/media/home/collections/tiny-worlds-desktop.svg",
    mobileMedia: "/media/home/collections/tiny-worlds-mobile.svg",
    mediaType: "image",
    textColor: "light",
    overlayStrength: 0.45,
    focalPoint: "center 40%",
    titleScale: "xl",
    sequence: "01",
  },
  {
    id: "creative-studio",
    slug: "creative-studio",
    desktopMedia: "/media/home/collections/creative-studio-desktop.svg",
    mobileMedia: "/media/home/collections/creative-studio-mobile.svg",
    mediaType: "image",
    textColor: "dark",
    overlayStrength: 0.2,
    focalPoint: "center 55%",
    titleScale: "lg",
    sequence: "02",
  },
  {
    id: "outdoor-fun",
    slug: "outdoor-fun",
    desktopMedia: "/media/home/collections/outdoor-fun-desktop.svg",
    mediaType: "image",
    poster: "/media/home/collections/outdoor-fun-poster.svg",
    textColor: "light",
    overlayStrength: 0.5,
    focalPoint: "center 35%",
    titleScale: "xl",
    sequence: "03",
  },
  {
    id: "plush-friends",
    slug: "plush-friends",
    desktopMedia: "/media/home/collections/plush-friends-desktop.svg",
    mobileMedia: "/media/home/collections/plush-friends-mobile.svg",
    mediaType: "image",
    textColor: "light",
    overlayStrength: 0.35,
    focalPoint: "70% 50%",
    titleScale: "lg",
    sequence: "04",
  },
  {
    id: "action-zone",
    slug: "action-zone",
    desktopMedia: "/media/home/collections/action-zone-desktop.svg",
    mediaType: "image",
    textColor: "light",
    overlayStrength: 0.55,
    focalPoint: "center 45%",
    titleScale: "xl",
    sequence: "05",
  },
  {
    id: "learning-lab",
    slug: "learning-lab",
    desktopMedia: "/media/home/collections/learning-lab-desktop.svg",
    mobileMedia: "/media/home/collections/learning-lab-mobile.svg",
    mediaType: "image",
    textColor: "dark",
    overlayStrength: 0.15,
    focalPoint: "center 60%",
    titleScale: "lg",
    sequence: "06",
  },
];
