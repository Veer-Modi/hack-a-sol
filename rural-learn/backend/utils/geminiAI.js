const { GoogleGenerativeAI } = require('@google/generative-ai');

class GeminiAI {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
  }

  async generateCourseContent(subject, level = 'beginner') {
    const prompt = `Create a comprehensive course structure for ${subject} at ${level} level. Include:
    1. Course overview and objectives
    2. 8-10 modules with titles and descriptions
    3. Learning roadmap from basic to advanced
    4. Key topics for each module
    5. Estimated time for completion
    
    Format as JSON with modules array containing: title, description, order, estimatedTime, topics`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return JSON.parse(response.text());
    } catch (error) {
      console.error('Gemini AI Error:', error);
      throw error;
    }
  }

  async generateQuiz(topic, difficulty = 'medium', questionCount = 10) {
    const prompt = `Generate ${questionCount} multiple choice questions on "${topic}" with ${difficulty} difficulty.
    Each question should have:
    - question text
    - 4 options (A, B, C, D)
    - correct answer index (0-3)
    - detailed explanation
    
    Format as JSON array of question objects.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return JSON.parse(response.text());
    } catch (error) {
      console.error('Quiz generation error:', error);
      throw error;
    }
  }

  async generateMockTest(examType, subjects, questionCount = 50) {
    const prompt = `Generate a ${examType} mock test with ${questionCount} questions covering ${subjects.join(', ')}.
    Include questions of varying difficulty (30% easy, 50% medium, 20% hard).
    Each question should have:
    - question text
    - 4 options
    - correct answer index
    - marks and negative marks
    - subject and topic
    - difficulty level
    - explanation
    
    Also provide AI prediction metrics based on real ${examType} exam patterns.
    Format as JSON with questions array and prediction object.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return JSON.parse(response.text());
    } catch (error) {
      console.error('Mock test generation error:', error);
      throw error;
    }
  }

  async generateCareerRoadmap(careerPath, currentLevel = 'beginner') {
    const prompt = `Create a detailed career roadmap for "${careerPath}" starting from ${currentLevel} level.
    Include:
    1. Step-by-step learning path
    2. Required skills and technologies
    3. Timeline estimates
    4. Resources and courses
    5. Project ideas
    6. Job opportunities
    7. Salary expectations
    
    Format as JSON with roadmap array containing step, title, description, skills, resources, timeline.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return JSON.parse(response.text());
    } catch (error) {
      console.error('Career roadmap generation error:', error);
      throw error;
    }
  }

  async generateNotes(content, teachingStyle = 'visual') {
    const prompt = `Convert the following content into comprehensive study notes using ${teachingStyle} teaching style:
    
    ${content}
    
    Create notes with:
    - Key concepts highlighted
    - Examples and analogies
    - Summary points
    - Practice questions
    - Visual descriptions where applicable
    
    Format as structured text suitable for PDF generation.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Notes generation error:', error);
      throw error;
    }
  }

  async analyzePerformance(testResults, studentProfile) {
    const prompt = `Analyze student performance and provide personalized recommendations:
    
    Test Results: ${JSON.stringify(testResults)}
    Student Profile: ${JSON.stringify(studentProfile)}
    
    Provide:
    1. Strengths and weaknesses analysis
    2. Time management insights
    3. Topic-wise improvement suggestions
    4. Study plan recommendations
    5. Next steps for improvement
    
    Format as JSON with analysis object.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return JSON.parse(response.text());
    } catch (error) {
      console.error('Performance analysis error:', error);
      throw error;
    }
  }

  async adaptToTeachingStyle(content, teacherStyle) {
    const prompt = `Adapt the following educational content to match the teaching style: "${teacherStyle}"
    
    Original Content: ${content}
    
    Modify the content to reflect this teaching approach while maintaining educational value.
    Include appropriate examples, explanations, and presentation style.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Teaching style adaptation error:', error);
      throw error;
    }
  }
}

module.exports = new GeminiAI();