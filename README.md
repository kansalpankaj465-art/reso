# Bank Helpline Hub

A modern React Native application built with Expo SDK 53 for quick access to banking customer service contacts.

## 📋 Prerequisites

- Node.js (v18 or later)
- Expo CLI
- iOS Simulator / Android Emulator (for development)

## 🛠️ Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on specific platforms:
```bash
npm run ios     # iOS Simulator
npm run android # Android Emulator
npm run web     # Web browser
```

## 📁 Project Structure

```
bank-helpline-hub/
├── app/                    # App Router screens
│   ├── (tabs)/            # Tab-based navigation
│   ├── bank-detail/       # Bank detail screen
│   ├── search/            # Search functionality
│   ├── settings/          # Settings screen
│   └── _layout.tsx        # Root layout
├── components/            # Reusable components
├── constants/             # App constants and themes
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions
```

## 🎨 Features

- **Modern UI**: Clean, banking-focused design
- **Tab Navigation**: Easy access to main features
- **Search Functionality**: Find banks quickly
- **Favorites System**: Save frequently used contacts
- **Settings**: Customizable app preferences
- **Responsive Design**: Works on all screen sizes
- **TypeScript**: Full type safety

## 🚀 Deployment

Build for production:

```bash
# For development build
expo build

# For production
expo build --release-channel production
```

## 🙏 Acknowledgments

- Built with [Expo](https://expo.dev)
- Icons by [Lucide](https://lucide.dev)
- Powered by [React Native](https://reactnative.dev)

Built with ❤️ using Expo SDK 53