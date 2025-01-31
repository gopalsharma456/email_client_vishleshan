# React Native Email Client

A **basic email client** built with **React Native** and **TypeScript**, featuring email management (inbox, drafts, sent items), Redux Toolkit for state management, and integration with a mock email API using `json-server`.

## 📌 Features
- 📩 View received emails
- 📝 Compose and send emails
- 💾 Save drafts locally
- ✅ Mark emails as read/unread
- 🗑️ Delete emails
- 🔄 Pagination support for inbox
- 📡 API integration with a mock server

## 🚀 Tech Stack
- **Frontend:** React Native, TypeScript
- **State Management:** Redux Toolkit / React Context
- **Navigation:** React Navigation
- **Storage:** AsyncStorage / SQLite / WatermelonDB
- **Backend (Mock API):** json-server

---

## 🛠 Setup Instructions

### 1️⃣ Clone the repository
```sh
git clone https://github.com/yourusername/email-client.git
cd email-client
```

### 2️⃣ Install dependencies
```sh
npm install  # or yarn install
```

### 3️⃣ Start the mock API server
```sh
npm install -g json-server
json-server --watch db.json --port 5000
```

### 4️⃣ Run the React Native app
For **iOS:**
```sh
npx pod-install
npm run ios  # or yarn ios
```
For **Android:**
```sh
npm run android  # or yarn android
```

---

## 🔗 API Endpoints
| Method | Endpoint | Description |
|--------|------------|-------------|
| GET | `/emails` | Get all emails |
| GET | `/emails/:id` | Get email by ID |
| POST | `/emails` | Send a new email |
| PATCH | `/emails/:id` | Update email (e.g., mark as read) |
| DELETE | `/emails/:id` | Delete an email |
| GET | `/drafts` | Get all drafts |
| POST | `/drafts` | Save a draft |

---

## 📂 Project Structure
```
📦 email-client
├── 📂 src
│   ├── 📂 components  # UI components
│   ├── 📂 screens     # Screens (Inbox, Compose, Drafts)
│   ├── 📂 redux       # Redux slices & store
│   ├── 📂 services    # API calls
│   ├── 📂 utils       # Helper functions
│   ├── App.tsx       # Main app entry point
├── db.json          # Mock API database
├── package.json     # Project dependencies
└── README.md        # Project documentation
```

---

## ✅ To-Do List
- [ ] Implement rich-text email editor
- [ ] Support email attachments
- [ ] Integrate authentication
- [ ] Deploy a real backend API

---

## 📝 License
This project is licensed under the **MIT License**.

---

## 🙌 Contributing
Feel free to submit pull requests and suggest new features!

---

## 📬 Contact
For any queries, reach out to **Gopal Sharma** via [LinkedIn](https://linkedin.com/in/gopalsharma) or email **gopal@example.com**.

