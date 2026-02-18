# Digital Mental Health System - Complete Project Overview

## **Project Identity**
- **Name**: MindCare (also referred to as "SoulSupport" in some interfaces)
- **Purpose**: Comprehensive Digital Mental Health and Psychological Support System for Higher Education Students
- **Type**: Next.js 16 Full-Stack Web Application
- **Tech Stack**: React 18, TypeScript, Tailwind CSS 4, Radix UI, Framer Motion

---

## **Current Architecture**

### **Frontend Framework**
- **Next.js 16** with App Router architecture
- **TypeScript** for type safety
- **Tailwind CSS 4** with custom animations
- **Radix UI** components for accessible UI primitives
- **Framer Motion** for animations
- **React Hook Form + Zod** for form validation

### **Authentication System**
- Role-based authentication (Student, Admin, Therapist)
- Mock localStorage-based auth (ready for backend integration)
- Protected routes with middleware
- Context-based state management (`AuthContext`)

### **Data Storage**
- Currently: **Mock data + localStorage**
- Database schema defined for PostgreSQL (users, sessions, appointments, profiles)
- Ready for backend integration with SQL queries already written

---

## **Core Features & Pages**

### **1. Landing Page** (`/`)
- Hero section with call-to-action
- Features showcase
- Statistics section
- Footer with crisis resources

### **2. Authentication**
- **Login** (`/login`) - Multi-role login (student/admin/therapist)
- **Register** (`/register`) - Role-specific registration
- **Forgot Password** (`/forgot-password`)
- **Profile Completion** - Modal for completing user profiles

### **3. Student Dashboard** (`/dashboard/student`)
- Mental health status with PHQ-9, GAD-7, GHQ-12 scores
- Quick action cards (AI Chat, Book Counseling, Resources, Games, Peer Support)
- Recent activity timeline
- Upcoming appointments
- Daily wellness tips
- Crisis support button

### **4. Mental Health Assessments** (`/self-assessment`)
Three standardized clinical assessments:
- **PHQ-9**: 9-question depression screening
- **GAD-7**: 7-question anxiety screening  
- **GHQ-12**: 12-question general psychological wellbeing

Each assessment:
- Progress tracking
- Risk level calculation (Minimal/Mild/Moderate/Severe)
- Results with color-coded severity
- Automatic counselor recommendations for high-risk scores
- Crisis hotline alerts

### **5. AI Chatbot** (`/chat`)
**Current Implementation** (Rule-based):
- Keyword-based response system
- Crisis detection (suicide, self-harm keywords)
- Severity classification (low/medium/high/crisis)
- Pre-programmed responses for:
  - Anxiety (grounding techniques, breathing exercises)
  - Depression (validation, coping strategies)
  - Stress (time management, self-care)
  - Crisis (immediate hotline referrals)
- Session analytics (duration, message count, mood trend)
- Automatic counselor booking prompt for high-severity cases
- 988 Crisis Lifeline integration

**What's Missing for AI**:
- No actual AI/ML model integration
- No conversation history or context memory
- No personalized recommendations
- No learning from user interactions

### **6. Questionnaire/Quiz** (`/quiz`)
- 9-question mental health screening
- Custom "SoulSupport" branded interface
- Progress tracking with visual indicators
- Multiple choice responses (Not at all → Nearly every day)
- Redirects to chat after completion
- Sidebar navigation

### **7. Mood Tracker** (`/mood-tracker`)
- 5-level mood selection (Great → Bad)
- Activity tracking (Exercise, Sleep, Social, Work, Meditation, etc.)
- Daily notes and reflections
- Calendar-based date selection
- Progress statistics (days tracked, average mood, trends)
- LocalStorage persistence

### **8. Appointments** (`/appointments`)
- Therapist directory with ratings
- Appointment booking system
- Session type selection (Individual, Group, Crisis)
- Urgency level indicators
- Appointment history

### **9. Community/Peer Support** (`/community`)
- Forum-style peer support
- Anonymous posting option
- Moderation features

### **10. Resource Hub** (`/resources`)
- Mental wellness guides
- Relaxation audio
- Educational videos
- Self-assessment tools
- Multi-language support

### **11. Wellness Games** (`/games`)
- Mindfulness and cognitive games
- Stress relief activities

### **12. Admin Dashboard** (`/dashboard/admin`)
- College-level analytics
- Student oversight
- Counselor management

### **13. Therapist Dashboard** (`/therapist-dashboard`)
- Patient management
- Appointment scheduling
- Session notes

---

## **Current AI/ML Capabilities** ❌

**NONE** - The chatbot is entirely rule-based:
```typescript
// Current "AI" is just keyword matching
if (lowerMessage.includes("anxious") || lowerMessage.includes("anxiety")) {
  return responses.anxiety[Math.floor(Math.random() * responses.anxiety.length)]
}
```

---

## **Planned AI/ML Architecture**

### **1. Predictive ML Model (Core Prediction)**
- **Purpose**: Predict mental health risk level
- **Best choices**:
  - Logistic Regression
  - Random Forest
  - XGBoost
- **Why?**:
  - Explainable
  - Accepted in academia
  - Works well with clinical scores
- **Output**:
  ```json
  {
    "risk": "high",
    "confidence": 0.81
  }
  ```

### **2. LLM (Conversation + Adaptation)**
- **Purpose**:
  - Chatbot
  - Question generation
  - Personalized suggestions
- **Examples**:
  - GPT-4 / GPT-4o
  - LLaMA 3
  - Mistral
- **⚠️ Note**: LLMs do NOT decide risk alone. They assist the system.

### **3. Safety Classifier (Mandatory)**
- **Purpose**: Detect suicide / self-harm risk
- **Methods**:
  - Keyword rules
  - ML classifier
  - LLM confirmation
- **Policy**: This overrides everything.

---

## **Database Schema (Prepared)**

Tables defined in `lib/database.ts`:
- `users` - Core user accounts
- `student_profiles` - Student-specific data
- `admin_profiles` - Admin/college data
- `therapist_profiles` - Therapist credentials
- `user_sessions` - Authentication sessions
- `appointments` - Booking records
- All queries written, just needs actual DB connection

---

## **File Structure**
```
digital-mental-health-system/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes (auth only)
│   ├── appointments/
│   ├── chat/                 # Chatbot page
│   ├── community/            # Peer support forum
│   ├── dashboard/
│   │   ├── student/          # Student dashboard
│   │   ├── admin/            # Admin dashboard
│   │   └── counsellor/       # Therapist dashboard
│   ├── games/                # Wellness games
│   ├── mood-tracker/         # Mood logging
│   ├── quiz/                 # Mental health quiz
│   ├── resources/            # Resource library
│   ├── self-assessment/      # Clinical assessments
│   │   ├── phq9/
│   │   ├── gad7/
│   │   └── ghq12/
│   ├── login/
│   ├── register/
│   └── ...
├── components/               # Reusable UI components
│   ├── ui/                   # Radix UI primitives
│   ├── chat-interface.tsx    # Chatbot component
│   ├── navigation.tsx
│   └── ...
├── contexts/
│   └── auth-context.tsx      # Auth state management
├── lib/
│   ├── auth.ts               # Auth logic
│   ├── database.ts           # DB queries
│   └── utils.ts
├── styles/
├── public/
└── package.json
```

---

## **Key Integration Points for AI**

1. **Chatbot (`components/chat-interface.tsx`)**:
   - Replace `generateResponse()` with API call to AI model
   - Add streaming support for responses
   - Implement conversation memory

2. **Questionnaire (`app/quiz/page.tsx`)**:
   - Replace hardcoded questions with AI-generated ones
   - Add API endpoint for question generation
   - Implement adaptive questioning logic

3. **Assessment Analysis**:
   - Add AI interpretation of assessment scores
   - Generate personalized recommendations
   - Predict risk trajectories

4. **Backend Needed**:
   - `/api/chat` - LLM inference endpoint
   - `/api/questionnaire/generate` - Question generation
   - `/api/analysis` - Mental health risk prediction
   - Database for conversation history

---

## **Current Limitations**

❌ No actual database (using localStorage)  
❌ No backend API (all mock data)  
❌ No AI/ML models  
❌ No real-time communication  
❌ No data analytics/reporting  
❌ No email/SMS notifications  
❌ No payment integration  
❌ No video conferencing for therapy sessions  

---

## **Next Steps for AI Integration**

1. **Choose AI Model**:
   - Commercial: OpenAI GPT-4, Anthropic Claude
   - Open-source: Llama 3, Mistral, Mental-LLaMA

2. **Fine-tune Model**:
   - Collect mental health conversation datasets
   - Annotate with therapist guidance
   - Train on crisis detection
   - Validate with mental health professionals

3. **Build Backend**:
   - Set up PostgreSQL database
   - Create Next.js API routes
   - Implement model serving (FastAPI/Flask)
   - Add conversation memory storage

4. **Connect Frontend**:
   - Replace mock functions with API calls
   - Add loading states and error handling
   - Implement streaming responses

---

## **Summary**

This is a **production-ready UI/UX** for a mental health platform with comprehensive features, but it needs **AI model integration** and **backend infrastructure** to become a fully functional intelligent system. The codebase is well-structured and ready for these additions.

### **Strengths**:
✅ Complete, polished UI with 13+ pages  
✅ Role-based authentication architecture  
✅ Clinical assessment tools (PHQ-9, GAD-7, GHQ-12)  
✅ Database schema designed  
✅ TypeScript for type safety  
✅ Responsive design with Tailwind  

### **Immediate Needs**:
🔴 AI/ML model integration  
🔴 Backend API development  
🔴 Database implementation  
🔴 Conversation memory system  
🔴 Real-time inference infrastructure  
