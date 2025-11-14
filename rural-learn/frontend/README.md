# Rural Learn - Education Continuity Platform

A comprehensive web-based education platform designed to bridge the teacher gap in rural areas through AI-powered learning, mock tests, and career guidance.

## 🚀 Features

### For Students (Free Tier)
- **AI-Powered Course Generation**: Get personalized courses with Gemini AI
- **YouTube Video Integration**: Best educational videos for each topic
- **AI-Generated Notes**: Downloadable PDF notes from video content
- **Interactive Quizzes**: Topic-based assessments with instant feedback
- **Learning Roadmaps**: Step-by-step progression from basic to advanced
- **Mock Test Prediction**: 50% accuracy prediction for JEE, NEET, CLAT, CAT, UPSC
- **Career Guidance**: AI-generated career roadmaps
- **Progress Tracking**: Streaks, points, and achievements
- **Mental Health Support**: Stress management and motivation tracking

### For Teachers (Institute Tier)
- **Course Creation**: Upload and manage custom courses
- **Teaching Style Adaptation**: AI adapts content to teacher's methodology
- **Student Analytics**: Track student progress and performance
- **Custom Mock Tests**: Create institution-specific assessments
- **Personalized Content**: Generate content matching teaching approach

### Anti-Cheating Features
- **Tab Switch Detection**: Automatic test submission on suspicious activity
- **Time Analysis**: Performance insights and improvement suggestions
- **Secure Testing Environment**: Comprehensive monitoring during assessments

## 🛠 Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** for database
- **Gemini AI API** for content generation
- **YouTube API** for video search
- **JWT** for authentication
- **Bcrypt** for password hashing

### Frontend
- **Next.js 14** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Query** for data fetching
- **Zustand** for state management
- **Chart.js** for analytics
- **React Hot Toast** for notifications

## 📁 Project Structure

```
rural-learn/
├── backend/
│   ├── models/          # Database schemas
│   ├── routes/          # API endpoints
│   ├── utils/           # Utility functions (Gemini AI, YouTube)
│   ├── middleware/      # Authentication middleware
│   └── server.js        # Main server file
├── frontend/
│   ├── app/             # Next.js app directory
│   │   ├── auth/        # Authentication pages
│   │   ├── dashboard/   # Main dashboard
│   │   ├── courses/     # Course pages
│   │   ├── mock-tests/  # Mock test interface
│   │   └── career/      # Career guidance
│   ├── components/      # Reusable components
│   └── lib/             # Utilities and stores
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- Gemini AI API Key
- YouTube API Key

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/rural-learn
JWT_SECRET=your_jwt_secret_key_here
GEMINI_API_KEY=your_gemini_api_key_here
YOUTUBE_API_KEY=your_youtube_api_key_here
```

4. Start the server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### AI Features
- `POST /api/ai/generate-course` - Generate AI course
- `POST /api/ai/adapt-content` - Adapt content to teaching style
- `POST /api/ai/ask` - Ask AI questions
- `GET /api/ai/search-videos` - Search educational videos

### Mock Tests
- `POST /api/mock-tests/generate` - Generate mock test
- `GET /api/mock-tests/:id` - Get mock test
- `POST /api/mock-tests/:id/submit` - Submit test attempt

### Career Guidance
- `POST /api/career/roadmap` - Generate career roadmap
- `GET /api/career/paths` - Get popular career paths

## 🎯 Key Features Implementation

### AI Course Generation
- Uses Gemini AI to create structured course content
- Integrates YouTube API for relevant educational videos
- Generates downloadable PDF notes
- Creates topic-based quizzes

### Mock Test Prediction
- AI analyzes exam patterns for 50% prediction accuracy
- Supports multiple exam types (JEE, NEET, CLAT, CAT)
- Provides detailed performance analysis
- Anti-cheating mechanisms with tab monitoring

### Teaching Style Adaptation
- AI adapts content to match teacher's methodology
- Personalized content generation for institutes
- Maintains educational quality while reflecting teaching approach

## 🌟 Impact

Addressing critical education challenges in Chhattisgarh:
- **6,800+** single-teacher primary schools
- **212** schools without any teacher
- Providing quality education access to remote villages
- Bridging the digital divide in rural education

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Gemini AI for powering the intelligent content generation
- YouTube API for educational video integration
- The rural education community for inspiration and feedback

---

**Rural Learn** - Empowering rural education through technology 🚀