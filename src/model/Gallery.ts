//////////////////////////////////////////////////////////////
// type management for configData/galleryData files
export type GalleryItemShape = {
  id: number;
  order: number;
  path: string;
  alt: string;
  thumbStyle: string;
  title: string;
  description: string;
}


//////////////////////////////////////////////////////////////
// prop type control for viewsCommon/Gallery Gallery component
export type OuterGalleryProps = {
  imgArray: string[];
  galleryMetadata: GalleryItemShape[];
}


export type LightboxRef = HTMLDivElement | null;

// prop type control for viewsCommon/Gallery Lightbox component
export type LightboxProps = {
  currentImg: number | null;
  toNextImg: VoidFunction;
  toPrevImg: VoidFunction;
  returnNextImg: (imgIndex: number | null) => number | null;
  returnPrevImg: (imgIndex: number | null) => number | null;
  closeLightbox: VoidFunction;
  imgArray: string[];
  galleryMetadata: GalleryItemShape[];
  tabIndex: number;
}

// type management for timeoutState belonging to viewsCommon/Gallery Lightbox component
export type TimeoutState = {
  timerGoing: boolean | NodeJS.Timeout;
  active: boolean;
}

// type management for timeoutState belonging to viewsCommon/Gallery Lightbox component
export type ArrowDirection = "left" | "right";

const keyMapValues = ["Escape", "ArrowLeft", "ArrowRight"] as const;
export type KeyMapValueTypes = typeof keyMapValues[number];


//////////////////////////////////////////////////////////////
// type/prop management for viewsCommon/ResizingThumbGallery
export type ThumbGalleryProps = {
  imgArray: string[];
  galleryMetadata: GalleryItemShape[];
  openLightbox: (currentImg: number) => void;
}

const imageOrientationTypes = ["portrait", "landscape", ""] as const;
const imageLoadedTypes = ["loaded", ""] as const;
type SingleThumbType = {
  orientation: typeof imageOrientationTypes[number];
  loaded: typeof imageLoadedTypes[number];
};
export type ThumbType = SingleThumbType[];