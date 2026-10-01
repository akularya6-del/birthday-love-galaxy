export const deviceConfig = {
  // Detect device type
  get isMobile() {
    return window.innerWidth < 768;
  },
  
  get isSmallPhone() {
    return window.innerWidth < 380;
  },
  
  get isIPhoneNotch() {
    return /iPhone/.test(navigator.userAgent) && window.devicePixelRatio >= 3;
  },
  
  canvas: {
    width: () => window.innerWidth,
    height: () => window.innerHeight,
    pixelRatio: () => Math.min(window.devicePixelRatio, 2),
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  },
  
  card: {
    getWidth: (isHerCard) => {
      const baseWidth = window.innerWidth < 380 ? '82vw' : '75vw';
      const maxWidth = isHerCard ? 340 : 300;
      return `min(${baseWidth}, ${maxWidth}px)`;
    },
    
    getHeight: (isHerCard) => {
      const width = parseFloat(isHerCard ? 340 : 300);
      return isHerCard ? `${width}px` : `${width * 1.33}px`;
    },
    
    aspectRatio: (index) => index === 3 ? '1 / 1' : '3 / 4',
  },
  
  orbit: {
    get radius() {
      return window.innerWidth < 380 ? 100 : 140;
    },
    get centerY() {
      return window.innerHeight * 0.42;
    },
    herCardOffset: {
      z: 0.3,
      scale: 1.4,
    },
  },
  
  safeArea: {
    top: () => getComputedStyle(document.documentElement).getPropertyValue('--safe-area-top') || '0px',
    bottom: () => getComputedStyle(document.documentElement).getPropertyValue('--safe-area-bottom') || '0px',
  },
};

export const touchTargets = {
  minTapArea: 44,
  cardPadding: 16,
  navButtonHeight: 48,
  closeButtonSize: 40,
  bottomBarHeight: 64,
};

export const memoriesData = [
  {
    id: 1,
    title: "Our First Date", // TODO: Update based on user answers
    location: "That Little Italian Place Downtown", // TODO: Update
    description: "I was so nervous but the moment you smiled, everything felt right. That coffee date turned into 5 hours of conversation and I knew you were special.",
    date: "Spring 2024",
    imageUrl: "/assets/images/memories/01-first-date.jpg"
  },
  {
    id: 2,
    title: "Second Time Lucky", // TODO: Update
    location: "The Museum Adventure",
    description: "Our second date was magical.",
    date: "Summer 2024",
    imageUrl: "/assets/images/memories/02-second-date.jpg"
  },
  {
    id: 3,
    title: "Movie Night Magic", // TODO: Update
    location: "At Home",
    description: "Popcorn, movies, and falling for you.",
    date: "Fall 2024",
    imageUrl: "/assets/images/memories/03-third-date.jpg"
  },
  {
    id: 4,
    title: "My Beautiful Queen", // TODO: Update
    location: "",
    description: "You walked into my life and everything changed. Your smile lights up my darkest days, your laugh is my favorite sound, and every moment with you feels like a beautiful dream I never want to wake up from. Happy Birthday to the woman who makes my heart race and my soul complete.",
    date: "",
    imageUrl: "/assets/images/memories/04-her-main.jpg",
    reasons: [
      "Your laugh is contagious",
      "You make me braver than I've ever been",
      "Your kindness inspires everyone around you"
    ]
  }
];

export const uiText = {
  heroTitle: "Happy Birthday My Love ❤️",
  heroSubtitle: "A Collection of Our Beautiful Moments",
  navButtons: ["Memories", "Our Story", "Gallery"],
  bottomLeft: "With All My Love ❤️",
  bottomRight: "2025",
  loadingText: "Gathering beautiful memories...",
};
