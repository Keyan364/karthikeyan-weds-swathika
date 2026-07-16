/* =========================================================
   EDIT ME — all the details a couple needs to change live here.
   Nothing below this file needs to be touched for basic customisation.
   ========================================================= */
const WEDDING_CONFIG = {
  coupleNames: "Meera & Arjun",
  heroDateText: "14th December 2026 · Chennai",

  wedding: {
    label: "Muhurtham",
    dateISO: "2026-12-14T07:00:00+05:30", // include timezone offset
    dateDisplay: "14 December 2026 · 7:00 AM",
    venueName: "Sri Meenakshi Kalyana Mandapam, Chennai",
    mapsQuery: "Sri Meenakshi Kalyana Mandapam Chennai"
  },

  reception: {
    label: "Reception",
    dateISO: "2026-12-14T19:00:00+05:30",
    dateDisplay: "14 December 2026 · 7:00 PM",
    venueName: "The Grand Ballroom, Taj Coromandel, Chennai",
    mapsQuery: "Taj Coromandel Chennai"
  },

  // Used for the main map + directions button + QR share link
  primaryVenueMapsQuery: "Taj Coromandel Chennai",

  // The URL guests land on when they scan the QR / click share.
  // Set this to your real GitHub Pages URL once published, e.g.
  // "https://yourusername.github.io/wedding-invite/"
  siteUrl: window.location.href,

  whatsapp: {
    // Country code + number, no spaces or symbols, e.g. 919999999999
    number: "919999999999",
    rsvpMessage: "I'm delighted to confirm my presence at Meera & Arjun's wedding!",
    shareMessage: "You're invited! 🪔 Meera & Arjun are getting married — view the invitation here:"
  },

  // Filenames inside assets/photos/ — drop your own images with these
  // names (or edit this list) and they'll appear in the gallery.
  gallery: [
    "assets/photos/photo1.jpg",
    "assets/photos/photo2.jpg",
    "assets/photos/photo3.jpg",
    "assets/photos/photo4.jpg",
    "assets/photos/photo5.jpg",
    "assets/photos/photo6.jpg"
  ]
};
