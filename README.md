
# 🦜 Parrot - Nigerian Sign Language (NSL) Translator

**Bridge the communication gap with real-time Nigerian Sign Language translation, powered by the Google Gemini API.**

Parrot is an innovative web application designed to provide instant, AI-driven translations from Nigerian Sign Language (NSL) to text. It serves as a vital tool for the Deaf community, learners, family members, and professionals, fostering more inclusive and seamless communication.

---

## ✨ Key Features

- **🗣️ Real-Time Conversation Mode**: Translates continuous signing from a live camera feed, providing both a raw sign gloss and an AI-refined, natural language sentence.
- **⚡ Quick Translate**: Instantly recognizes and identifies single signs, perfect for quick lookups or learning new vocabulary.
- **🧠 AI Assistant**: An integrated, expert assistant powered by Gemini Pro that can answer any question about NSL, from grammar and syntax to cultural nuances.
- **📖 NSL Dictionary**: A searchable dictionary of common signs, complete with video (emoji placeholder) demonstrations to aid in learning and practice.
- **🔒 Privacy First**: All camera processing is done in real-time. Video data is never stored, ensuring your conversations remain private and secure.
- **🇳🇬 Built for Nigeria**: Specifically tailored to understand the unique grammar, signs, and cultural context of Nigerian Sign Language.
- **📱 Fully Responsive**: A seamless experience whether you're on a desktop, tablet, or mobile device.

---

## 🚀 Technology Stack

This project leverages a modern, powerful tech stack to deliver a fast and intelligent user experience.

- **Frontend**:
  - **React**: A declarative, component-based library for building the user interface.
  - **TypeScript**: For static typing, improving code quality and maintainability.
  - **Tailwind CSS**: A utility-first CSS framework for rapid and responsive UI development.
  - **Lucide React**: Beautiful and consistent icons.

- **AI & Backend**:
  - **Google Gemini API**: The core AI engine for all translation and assistant features.
    - `gemini-2.5-flash`: Used for high-speed, real-time image-to-text translation in the Conversation and Quick Translate tabs.
    - `gemini-2.5-pro`: Powers the knowledgeable AI Assistant for in-depth language queries.

---

## 🔧 How It Works

The magic of Parrot lies in its direct and efficient use of the Gemini API's multimodal capabilities.

1.  **Camera Access**: The app securely requests permission to use the user's camera via the browser's `navigator.mediaDevices.getUserMedia` API.
2.  **Frame Capture**: A frame is captured from the live video stream as a JPEG image and converted to a Base64 string.
3.  **API Request**: The image data is sent to the Gemini API along with a specialized prompt instructing the model to act as an NSL expert.
4.  **AI Processing**: Gemini analyzes the image, identifies the sign, and returns a structured JSON object containing the translation.
5.  **Display Results**: The React frontend receives the JSON response and dynamically updates the UI to display the translation to the user in real-time.

---

## 📂 Project Structure

The codebase is organized into logical directories for clarity and scalability.

```
/
├── public/
├── src/
│   ├── components/
│   │   ├── AIAssistantTab.tsx
│   │   ├── ConversationTab.tsx
│   │   ├── DictionaryTab.tsx
│   │   ├── LandingPage.tsx
│   │   ├── MainApp.tsx
│   │   ├── QuickTranslateTab.tsx
│   │   └── ... (other UI components)
│   ├── hooks/
│   │   └── useCamera.ts      # Custom hook for managing camera logic
│   ├── services/
│   │   └── geminiService.ts  # All Gemini API interactions
│   ├── types.ts              # Core TypeScript types and enums
│   ├── App.tsx               # Main component routing between pages
│   └── index.tsx             # Application entry point
├── index.html
├── README.md
└── metadata.json
```

---

## 🏁 Getting Started

To run this project locally, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- `npm` or `yarn` package manager

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/parrot-nsl-translator.git
    cd parrot-nsl-translator
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up your Environment Variables:**
    This project requires a Google Gemini API key.

    - Create a file named `.env` in the root of the project.
    - Add your API key to this file:
      ```
      VITE_GEMINI_API_KEY=YOUR_API_KEY_HERE
      ```
    > **Note**: This assumes you are running in a Vite environment. In the provided `aistudio` context, `process.env.API_KEY` is automatically injected, so a `.env` file is not needed for that specific platform.

4.  **Run the development server:**
    ```sh
    npm run dev
    ```

5.  Open your browser and navigate to `http://localhost:5173` (or the port specified in your terminal).

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
