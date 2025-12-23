# Archalo 

**Your comprehensive guide to archaeological discovery and responsible artifact reporting.**


## About

Archalo is a web platform developed by the **FLL Owlcheologists Team #41991** to bridge the gap between archaeological discovery and proper reporting procedures. When someone discovers an artifact, they often don't know what to do next. Archalo provides instant, location-specific guidance on who to contact and what steps to take.

### Mission
To empower the public to protect cultural heritage by simplifying the process of reporting archaeological finds and providing essential legal and educational resources.

## Features

### I Found an Artifact Tool
- **Location-based guidance**: Enter GPS coordinates or use your current location
- **Property lookup**: Integrates with parcel data APIs to determine jurisdiction
- **Smart matching system**: 4-tier fallback system for finding relevant contacts
  - Tier 1: Specific property owner (e.g., National Park Service)
  - Tier 2: County/jurisdiction match
  - Tier 2.5: State-level fallback
  - Tier 3: Default national guidance
- **Contact information**: Displays relevant archaeological authorities with phone, email, and special instructions
- **Interactive maps**: Shows property boundaries using Leaflet.js and OpenStreetMap
- **Historical timelines**: Displays property and regional history for context
- **Relevant laws**: Shows state and county-specific archaeological laws

### Laws Database
- **Federal laws**: Archaeological Resources Protection Act (ARPA) and related legislation
- **State laws**: State-specific archaeological protection laws
- **County laws**: County-level regulations and ordinances
- **Search functionality**: Filter by state and county
- **Admin panel**: Authenticated users can add, edit, and delete laws

### Educational Resources
- Interactive learning materials about archaeology
- Artifact identification guides
- Cultural heritage protection information

### Admin System
- **Secure authentication**: Firebase Auth with email/password
- **Permission system**: Granular permissions (laws, deletion, artifact instructions, education)
- **Content management**: Add/edit/delete artifact instructions and laws
- **Search & filter**: Find and manage existing entries

## Architecture

![Archalo Architecture](docs/archalo_architecture.svg)

### Frontend
- **Pure HTML/CSS/JavaScript** - No build tools required
- **Responsive design** - Mobile-first approach with hamburger menu
- **Firebase SDK v10.7.1** - Modular imports via CDN

### Backend Services
- **Firebase Hosting** - Fast, secure static hosting with SSL
- **Firebase Firestore** - NoSQL database for:
  - `artifactInstructions` - Location-specific contact information
  - `archaeologyLaws` - Federal, state, and county laws
  - `educationalResources` - Learning materials
  - `config` - User permissions
- **Firebase Authentication** - Secure admin access
- **Firebase Analytics** - Usage tracking

### External APIs
- **Parcel Data/ReportAll USA API** - Property ownership and boundary information
- **Leaflet.js** - Interactive mapping with OpenStreetMap tiles
- **Firebase Functions** - Application function used to call ReportAll USA Parcel API. 

## Setup Instructions

### Prerequisites
- Node.js and npm (for Firebase CLI)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MSid13/Archalo.git
   cd Archalo
   ```

2. **Install Firebase CLI** (if not already installed)
   ```bash
   npm install -g firebase-tools
   ```

### Local Development

Run a local server to test:
```bash
firebase serve
```

Access at `http://localhost:5000`

## Project Structure

```
Archalo/
├── public/                    # Static website files
│   ├── index.html          # Home page
│   ├── artifactHelp.html     # Main artifact discovery tool
│   ├── laws.html             # Laws database
│   ├── edu-resources.html    # Educational resources
│   ├── credits.html          # Credits and attributions
│   ├── workspace.html        # Development workspace
│   ├── 404.html              # Custom 404 page
│   └── owlcheologists.png    # Logo/favicon
├── docs/                      # Documentation assets
│   └── archalo_architecture.svg
├── firebase.json              # Firebase hosting configuration
├── .firebaserc               # Firebase project configuration
└── README.md                 # This file
```

## Security & Privacy

- **Owner information hidden**: Property owner names are masked as "XXXXXX" to prevent misuse
- **Firebase App Check**: Protects against abuse and ensures requests come from legitimate clients
- **Admin authentication**: Secure login required for content management
- **Permission system**: Granular access control for different admin functions

## Database Schema

### `artifactInstructions` Collection
```javascript
{
  owner: "National Park Service",      // Optional - Tier 1 match
  jurisdiction: "King",                // Optional - Tier 2 match
  state: "WA",                        // Optional - Tier 2.5 match
  keywords: ["nps", "national park"], // Search keywords
  contacts: [                         // Array of contact objects
    {
      name: "John Doe",
      role: "Senior Archaeologist",
      email: "john@example.com",
      phone: "555-1234",
      address: "123 Main St",
      specialInstructions: "Call first"
    }
  ],
  specialInstructions: "...",         // Optional special notes
  generalNotes: "...",                // Optional general info
  htmlContent: "...",                 // Generated HTML for display
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### `archaeologyLaws` Collection
```javascript
{
  title: "Archaeological Resources Protection Act",
  type: "federal" | "state" | "county",
  state: "Washington",                // For state/county laws
  county: "King",                     // For county laws
  description: "Brief summary...",
  fullText: "Complete law text...",
  reference: "16 U.S.C. 470aa-470mm",
  link: "https://...",
  createdAt: timestamp,
  updatedAt: timestamp
}
```

## Contributing

This project is maintained by the FLL Owlcheologists Team. If you find bugs or have suggestions:

1. Report issues via [Google Form](https://forms.gle/NN3anqoQDDi9g5vD7)
2. Submit pull requests on GitHub

## License

Please refer to the repository for licensing information.

## Credits

- **Team**: FLL Owlcheologists Team #41991

For full attributions, visit the [Credits page](public/credits.html).
