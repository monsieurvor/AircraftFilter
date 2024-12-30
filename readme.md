# Google Flights Aircraft Filter Extension

A browser extension that adds aircraft manufacturer filtering capabilities to Google Flights. Filter your flight searches by aircraft manufacturer (Boeing/Airbus) to find flights on your preferred aircraft type.

## Features

- 🛩️ Filter flights by aircraft manufacturer (Boeing/Airbus)
- 🏷️ Adds manufacturer labels to each flight
- 🔄 Works dynamically with Google Flights' interface
- 🎯 Simple, clean UI that matches Google's design
- ⚡ Lightweight and performant
- 🔍 Maintains filters across searches

## Installation

### From Source (Developer Mode)

1. Clone this repository:
   ```bash
   git clone https://github.com/monsieurvor/AircraftFilter.git
   ```

2. Open your browser's extension management page:
   - Chrome: Navigate to `chrome://extensions`
   - Edge: Navigate to `edge://extensions`
   - Other Chromium-based browsers: Check your browser's documentation

3. Enable "Developer mode" in the top right corner

4. Click "Load unpacked" and select the directory containing the extension files

### Required Files

Make sure you have the following files in your extension directory:
- `manifest.json` - Extension configuration
- `content.js` - Main extension logic
- `icon48.png` - 48x48 extension icon
- `icon128.png` - 128x128 extension icon

## Usage

1. Visit [Google Flights](https://www.google.com/travel/flights)

2. Search for flights as you normally would

3. You'll see new filter options above the search results:
   - Boeing checkbox
   - Airbus checkbox

4. Toggle the checkboxes to show/hide flights operated by each manufacturer

5. Each flight will now display a manufacturer label next to the aircraft type

## How It Works

The extension:
1. Injects a filter UI into the Google Flights page
2. Intercepts the flight search results
3. Analyzes the aircraft type for each flight
4. Categorizes aircraft by manufacturer
5. Adds manufacturer labels to the results
6. Filters results based on your preferences

## Development

### Prerequisites

- Basic knowledge of JavaScript
- Understanding of browser extensions
- Familiarity with Chrome/Edge extension APIs

### Project Structure

```
google-flights-aircraft-filter/
├── manifest.json
├── content.js
├── icon48.png
├── icon128.png
└── README.md
```

### Local Development

1. Make changes to the source code
2. Go to the extensions page in your browser
3. Click the refresh icon on your extension's card
4. Reload the Google Flights page to see your changes

### Building for Production

1. Update version number in `manifest.json`
2. Create a zip file containing all required files
3. Submit to the Chrome Web Store or Edge Add-ons store

## Contributing

1. Fork the repository
2. Create a new branch for your feature
3. Make your changes
4. Submit a pull request

## Known Limitations

- Aircraft identification is based on text parsing and may not be 100% accurate
- Some aircraft types may be categorized as "Unknown"
- The extension needs to be manually updated if Google changes their interface

## Privacy

This extension:
- Does not collect any user data
- Does not make any external network requests
- Only processes flight data locally in your browser

## License

MIT License - See LICENSE file for details

## Support

If you encounter any issues or have suggestions:
1. Check the [Issues](https://github.com/yourusername/google-flights-aircraft-filter/issues) page
2. Create a new issue if needed
3. Include your browser version and steps to reproduce the problem

## Acknowledgments

- Thanks to Google Flights for providing the flight data
- Icon assets created by [Creator Name]
- Inspired by the needs of aviation enthusiasts