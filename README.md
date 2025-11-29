
---

## ⭐ README — BACKEND (Node.js)

```markdown
# AI Reception Agent – Backend

The backend powers the intelligence behind the AI Reception Agent. It handles call classification, speech-to-text conversion, response generation, and routing of user queries to appropriate departments such as HR, Support, Appointments, and General Enquiries.

---

## 🚀 Overview

This Node.js backend uses **OpenAI** for AI reasoning and **Supabase** for call data management. It converts speech to text, identifies the intent, categorizes the request, and responds accordingly — enabling companies to automate reception tasks 24/7.

---

## ✨ Key Features

- 🗣️ **Automatic Call Attending**  
  Eliminates the need for a human receptionist.

- 🧠 **LLM-Powered Understanding**  
  Uses OpenAI to interpret user queries intelligently.

- 🗂️ **Call Categorization**  
  Classifies interactions into:
  - HR-related queries
  - Support & troubleshooting
  - Appointment scheduling
  - General enquiries

- 🔄 **Speech-to-Text Conversion**  
  Converts spoken input into actionable text.

- ⚡ **24/7 Availability**  
  Companies remain reachable anytime.

- 🗃️ **Supabase Integration**  
  Stores call logs, categories, metadata, and response tracking.

---

## 🧱 Tech Stack

| Component       | Technology |
|----------------|------------|
| Runtime         | Node.js    |
| AI Model        | OpenAI API |
| Database        | Supabase   |
| Hosting         | Render / Railway / Local |

---

## 📡 API Endpoints (Core)

| Method | Endpoint | Description |
|-------|----------|-------------|
| POST  | `/speech` | Accepts speech input, converts to text |
| POST  | `/query`  | Sends user query to OpenAI and returns response |
| GET   | `/history` | Fetches categorized call logs from Supabase |

> Endpoint naming may vary based on implementation — adjust as needed.

---

## 🔑 Environment Variables

Create a `.env` file:

1. SUPABASE_KEY=" "
2. SUPABASE_URL=" "
3.OPENAI_API_KEY=" "



---

## 🛠️ Installation & Running

```bash
git clone <your-backend-repo-url>
cd backend
npm install
npm index.js

## backend runs at
http://localhost:3001
update this url in frontend


🚀 Future Enhancements

1. Automated email/SMS notifications
2. Integration with company CRM
3. Multi-agent architecture for roles
4. Persona-based responses
5. Multi-organization dashboard

