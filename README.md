# Astrix

> Astrix is a desktop app for Jyotish astrologers to map and match astrological attributes across Signs, Houses, Nakshatras, and Planets on an infinite canvas — built for intuitive, visual prediction-making.

![Electron](https://img.shields.io/badge/Electron-29-47848F?logo=electron) ![React](https://img.shields.io/badge/React-18-61DAFB?logo=react) ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css) ![Platform](https://img.shields.io/badge/Platform-Windows-0078D6?logo=windows)

---

## What is Astrix?

Astrix is a desktop tool built for Jyotish (Vedic astrology) practitioners. Instead of reading off a reference sheet, you build your own attribute library for each astrological entity — then visually connect attributes across pillars to form predictions and insights.

The idea is simple: an astrologer's intelligence does the matching. Astrix just gives it the right surface to work on.

---

## Features

- **Infinite canvas** — pan freely across your workspace with middle-mouse or Space+drag
- **Four pillars** — independent columns for Sign, House, Nakshatra, and Planet
- **Your attributes, your rules** — no pre-built data; you add every attribute yourself
- **Attribute management** — hide attributes you don't need, restore them anytime with Reset
- **Match Mode** — connect attributes across pillars with color-coded bezier lines
- **Match notes** — annotate each connection with your interpretation
- **Persistent storage** — all attributes saved locally, survive app restarts
- **Desktop app** — runs as a native Windows executable, no browser needed

---

## Pillars

| Pillar | Entities |
|--------|----------|
| Sign | 12 Zodiac Signs (Aries → Pisces) |
| House | 12 Bhavas (1st → 12th) |
| Nakshatra | 27 Lunar Mansions (Ashwini → Revati) |
| Planet | 9 Grahas (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu) |

---

## How It Works

1. **Open a column** — click any pillar to expand it
2. **Select an entity** — pick a sign, house, nakshatra, or planet
3. **Add attributes** — type your words (e.g. "Mother", "Mind", "Water" for Cancer)
4. **Enable Match Mode** — toggle the gold button in the top bar
5. **Connect attributes** — click an attribute in one column, then one in another
6. **A bezier line appears** — color-coded per pair, with a note field to record your reading

---

## Installation

### Run from source

```bash
git clone https://github.com/piyush-1803/astrix.git
cd astrix
npm install
npm run dev
```

### Build .exe

```bash
npm run dist
```

Output will be in the `/release` folder.

### Requirements

- Node.js 18+
- Windows 10/11

---

## Tech Stack

- **Electron 29** — desktop shell
- **React 18** — UI
- **Vite** — bundler
- **Tailwind CSS** — styling
- **Framer Motion** — animations
- **electron-builder** — packaging

---

## Project Structure
astrix/
├── electron/
│   ├── main.js          ← Electron main process
│   └── preload.js       ← Context bridge
├── src/
│   ├── App.jsx
│   ├── components/      ← Canvas, columns, attributes, connectors
│   ├── context/         ← Match state (useReducer)
│   ├── hooks/           ← useLocalStorage
│   └── data/            ← Entity definitions (signs, houses, nakshatras, planets)
---

## License

MIT
