# 🔫 Escape from Tarkov Ammo Comparison

A lightweight, responsive Vue 3 app that allows you to sort, search, and visually compare ammo stats from Escape from Tarkov. Powered by GraphQL and Vue's Composition API, with built-in charting for quick analysis.
- [Click Here For A Demo!](https://eft-ammo-chart.vercel.app/)

![screenshot](/preview.PNG)

---

## 📦 Features

- 🔍 **Search** by ammo short name
- 🔃 **Sort** by damage, penetration, armor damage, and more
- 📊 **Bar chart** visualization for top ammo stats
- 💬 **GraphQL data** pulled from Tarkov API
- 🧠 Built with Vue 3

---

## 🛠️ Tech Stack

- **Vue 3** + Composition API
- **Apollo Client** (GraphQL)
- **Chart.js** + `vue-chartjs` for graphing
- **Vite** for blazing-fast builds

---

## 🚀 Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/BrandoTheDev/EFT-Ammo-Chart.git
cd tarkov-ammo-compare
```

2. Install dependencies
```bash
npm install
```

3. Run it locally
```bash
npm run dev
```

⚙️ Configuration

Make sure your apollo.js client is pointed at the correct GraphQL endpoint.

Example:
```js
// src/apollo.js
import { ApolloClient, InMemoryCache } from '@apollo/client/core';

export default new ApolloClient({
  uri: 'https://api.tarkov.dev/graphql',
  cache: new InMemoryCache()
});
```

🔮 Planned Features
- Filter by caliber or ammo type
- Toggle between graph types
- User config saving (localStorage)
- Responsive mobile UI

🤘 Credits
- Escape from Tarkov GraphQL data by Tarkov.dev

📜 License
- MIT License – Use, modify, and deploy freely.
