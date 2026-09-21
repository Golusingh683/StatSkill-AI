# 🚀 StatSkill AI

### AI-Powered Skill Intelligence & Personalized Learning Platform

**Smart India Hackathon 2026 | Problem Statement ID: 26101 | Team Leo**

StatSkill AI is an AI-enabled Skill Intelligence and Learning Platform designed to identify competency gaps, support personalized learning, and strengthen capacity building for professionals in India's Official Statistical System.

The platform combines competency assessment, AI-powered gap analysis, personalized learning resources, AI-generated quizzes, and an intelligent learning assistant into a unified learning experience.

---

## 🏆 Smart India Hackathon

| Details                  | Information                                                                              |
| ------------------------ | ---------------------------------------------------------------------------------------- |
| **Hackathon**            | Smart India Hackathon (SIH) 2026                                                         |
| **Team**                 | Team Leo                                                                                 |
| **Problem Statement ID** | 26101                                                                                    |
| **Problem Statement**    | AI-enabled learning platform for competency-gap identification and personalized learning |
| **Organization**         | Ministry of Statistics & Programme Implementation (MoSPI)                                |
| **Department**           | Data Informatics & Innovation Division (DIID)                                            |
| **Category**             | Software                                                                                 |
| **Theme**                | Smart Education                                                                          |

### 📌 Problem Statement

The Official Statistical System is rapidly adopting technologies such as Artificial Intelligence, Machine Learning, Big Data Analytics, GIS, Cloud Computing, and modern statistical methodologies.

Professionals working in this ecosystem require continuous upskilling, but identifying the most relevant learning resources according to their job role, current competencies, and future requirements can be challenging.

The SIH problem statement proposes an AI-enabled learning platform capable of assessing competencies, identifying skill gaps, recommending personalized learning pathways, supporting continuous learning, and generating assessments from learning materials.

### 💡 Our Approach

StatSkill AI addresses this challenge through an integrated learning platform that provides:

- AI-assisted competency assessment
- Competency gap analysis
- Personalized learning recommendations
- AI-powered MCQ and quiz generation
- Learning material management
- AI-powered learner assistance
- Learner competency and progress insights
- A scalable architecture for future ecosystem integrations

---

# ✨ Key Features

## 🎯 1. Competency Assessment

Users can select their target career or job role and take a role-specific competency assessment.

The platform currently supports role-based assessments for areas such as:

- Web Development
- Data Analysis
- Software Development
- AI / ML Engineering
- Database Development

Assessment results are used to build a competency profile for the learner.

---

## 📊 2. Competency Gap Analysis

After completing the assessment, StatSkill AI analyzes the learner's competency levels and provides an AI-assisted breakdown.

The platform displays:

- Overall competency
- Career goal
- Competency profile
- Areas requiring improvement
- AI-generated insights
- Assessment-based recommendations

This helps learners understand where they currently stand and which skills they can focus on improving.

---

## 📚 3. Personalized Learning

Learning resources are presented according to the learner's competency profile.

The learning section provides:

- Recommended courses
- Learning modules
- Skill categories
- Difficulty levels
- Course descriptions
- Learning duration
- Progress tracking
- Competency-focused recommendations

The goal is to move from generic learning towards competency-oriented learning.

---

## 🤖 4. AI Quiz Generator

StatSkill AI includes an AI-powered quiz generation system.

Users can:

1. Upload a learning document
2. Select existing learning material
3. Configure the number of questions
4. Select difficulty
5. Generate MCQs automatically

The system can process supported learning documents and generate structured questions with:

- Question
- Four answer options
- Correct answer
- Explanation
- Topic
- Difficulty level

This allows learning material to be converted into interactive assessments.

---

## 💬 5. AI Learning Assistant

The platform includes an AI-powered learning assistant that helps users interact with the system.

The assistant provides quick access to:

- Learning
- Skills
- Quizzes
- Help

Users can also ask questions through the chatbot interface.

The AI integration is handled through the backend rather than exposing the API key directly in the frontend.

---

## 📈 6. Learner Dashboard

The dashboard provides an overview of the learner's development.

It displays information such as:

- Overall competency
- Completed modules
- Learning hours
- Quizzes attempted
- Competencies requiring focus
- Recent quiz activity
- Quick access to assessments and learning tools

---

# 🔄 How StatSkill AI Works

```text
                 ┌─────────────────────┐
                 │       Learner       │
                 └──────────┬──────────┘
                            │
                            ▼
              ┌──────────────────────────┐
              │ Competency Assessment    │
              └────────────┬─────────────┘
                           │
                           ▼
              ┌──────────────────────────┐
              │ Competency Gap Analysis  │
              └────────────┬─────────────┘
                           │
                           ▼
              ┌──────────────────────────┐
              │ Personalized Learning    │
              └────────────┬─────────────┘
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
    ┌──────────────────┐       ┌──────────────────┐
    │ Learning Material│       │ AI Quiz Generator│
    └──────────────────┘       └──────────────────┘
             │                           │
             └─────────────┬─────────────┘
                           ▼
                 ┌────────────────────┐
                 │ AI Learning        │
                 │ Assistant          │
                 └────────────────────┘
```

🖥️ Website Screenshots
🏠 Dashboard

The learner dashboard provides a consolidated view of competency development, learning progress, quiz activity, and areas requiring attention.

📝 Competency Assessment

Learners select their target role and take a personalized competency assessment.

🎯 Competency Gap Analysis

Assessment results are converted into a competency profile with an overall readiness score and AI-assisted insights.

📚 Personalized Learning

Learning resources are presented according to the learner's competency profile and identified learning needs.

🤖 AI Quiz Generator

Learning materials can be used to generate MCQs and quizzes using AI.

💬 AI Learning Assistant

The integrated AI assistant provides learners with an interactive way to get help while using the platform.

🧠 AI Integration

StatSkill AI uses a dedicated backend to communicate with the Gemini API.

AI-powered components
AI-assisted competency insights
AI-generated learning support
AI-powered MCQ generation
Structured quiz generation
Learning material analysis
AI Quiz Generation Flow
Learning Material
│
▼
PDF / DOCX Upload
│
▼
Backend Text Extraction
│
▼
Gemini AI
│
▼
Structured MCQ Generation
│
▼
Validation
│
▼
Interactive Quiz

The Gemini API key is kept on the server side and is not exposed in the frontend.

🏗️ System Architecture
┌───────────────────────────────────────────────┐
│ FRONTEND │
│ │
│ React + Vite │
│ │
│ Dashboard | Assessment | Learning | Quizzes │
│ Profile | Gap Analysis | AI Assistant │
└───────────────────────┬───────────────────────┘
│
│ HTTP / API
▼
┌───────────────────────────────────────────────┐
│ BACKEND │
│ │
│ Node.js + Express │
│ │
│ API Routes | File Processing | AI Services │
└───────────────┬───────────────────┬───────────┘
│ │
▼ ▼
┌────────────────┐ ┌─────────────────┐
│ PDF / DOCX │ │ Gemini API │
│ Processing │ │ AI Services │
└────────────────┘ └─────────────────┘
🛠️ Technology Stack
Frontend
React.js
Vite
JavaScript
HTML5
CSS3
Responsive UI
Backend
Node.js
Express.js
REST APIs
Multer
Mammoth
PDF.js
AI
Google Gemini API
AI-assisted competency analysis
AI-powered MCQ generation
AI learning assistant
Development Tools
Git
GitHub
VS Code
npm
📁 Project Structure
StatSkill-AI/
│
├── public/
│ ├── materials/
│ └── screenshots/
│
├── src/
│ ├── components/
│ │ ├── chatbot/
│ │ └── ...
│ │
│ ├── pages/
│ │ ├── Dashboard.jsx
│ │ ├── Assessment.jsx
│ │ ├── QuizGenerator.jsx
│ │ ├── Learning.jsx
│ │ ├── CompetencyGaps.jsx
│ │ └── Profile.jsx
│ │
│ ├── services/
│ │ └── aiService.js
│ │
│ └── ...
│
├── server/
│ ├── index.js
│ ├── lib/
│ │ ├── extractText.js
│ │ ├── geminiClient.js
│ │ ├── validateMcqs.js
│ │ └── pdfWorker.js
│ │
│ ├── .env.example
│ └── package.json
│
├── .gitignore
├── package.json
└── README.md
⚙️ Getting Started

1. Clone the Repository
   git clone https://github.com/Golusingh683/StatSkill-AI.git
   cd StatSkill-AI
2. Install Frontend Dependencies
   npm install
3. Install Backend Dependencies
   cd server
   npm install
   cd ..
   🔐 Environment Setup

Create a .env file inside the server directory:

GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-3.6-flash

The .env file should never be committed to GitHub.

A sample environment file is provided as:

server/.env.example
▶️ Running the Project
Start Backend
cd server
npm run dev

The backend runs on:

http://localhost:3001
Start Frontend

Open another terminal:

npm run dev

The frontend will be available through the Vite development server.

🔒 Security

Sensitive credentials are intentionally excluded from the repository.

The project uses:

Environment variables for API keys
.gitignore protection for .env
Server-side Gemini API communication
Separate frontend and backend architecture
🚀 Future Scope

The current platform can be extended further to support the broader requirements of the SIH problem statement.

Planned improvements
🔗 iGOT Karmayogi API integration
👤 User authentication and role-based access
🗄️ Persistent database integration
🎯 Advanced personalized learning paths
📊 Administrator analytics dashboard
📈 Long-term competency progress tracking
🔄 Continuous reassessment
🌐 Multilingual learning support
☁️ Cloud deployment
🔐 Enhanced security and role-based access control
📚 Integration with additional government learning resources
🧠 More advanced AI-based competency mapping
👥 Team Leo

We are a six-member team that collaborated to design and develop StatSkill AI for Smart India Hackathon.

Team Member Role & Contribution
Divya Pratap Singh Frontend + Backend + AI Integration
Vivek Rawat Backend + AI Integration
Nazima Suri UI/UX + Frontend
Ujjwal Tiwari Frontend + Testing
Anuj Rajak Testing + Presentation
Anubhav Pal Research + Documentation
GitHub Profiles
Divya Pratap Singh
Vivek Rawat
Nazima Suri
Ujjwal Tiwari
Anuj Rajak
Anubhav Pal
🏆 SIH Project Information

Problem Statement ID: 26101

Organization: Ministry of Statistics & Programme Implementation (MoSPI)

Department: Data Informatics & Innovation Division (DIID)

Category: Software

Theme: Smart Education

Problem Statement

Develop an AI-enabled learning platform that identifies competency gaps, recommends personalized training through integration with the iGOT Karmayogi ecosystem, and generates quizzes and MCQs from uploaded learning materials to strengthen capacity building in India's Official Statistical System.

🌱 Project Vision

StatSkill AI aims to move learning from a generic, one-size-fits-all model toward a more competency-driven and personalized learning experience.

By combining competency assessment, skill-gap identification, learning resources, AI assistance, and automated assessment generation, the platform provides a foundation for continuous professional development.

📌 Disclaimer

This project was developed as a prototype for Smart India Hackathon (SIH) based on the requirements of Problem Statement 26101.

Some capabilities described under the future scope require additional integrations, infrastructure, APIs, authentication, databases, and production-level deployment before being used in a government production environment.

⭐ Built with teamwork, AI, and a focus on smarter learning.

Team Leo — Smart India Hackathon 2026
