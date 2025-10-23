/**
 * Mock CV Analysis Service for Testing
 * Simulates API responses when backend is unavailable
 */

export const cvMockService = {
  /**
   * Mock CV analysis - always succeeds
   */
  async mockAnalyzeCV(fileId: string, fileName: string) {
    console.log('🎭 Using MOCK CV Analysis for:', fileName);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      success: true,
      file_id: fileId,
      status: 'analyzed',
      extracted_data: {
        name: "Nguyen Thanh Thai",
        email: "thai.nguyen@example.com",
        phone: "+84 123 456 789",
        experience: "3+ years",
        skills: ["JavaScript", "React", "Node.js", "Python"],
        education: "Bachelor of Computer Science"
      },
      analysis_result: {
        score: 85,
        summary: "Strong technical background in web development",
        strengths: ["Modern tech stack", "Good experience level"],
        recommendations: ["Consider cloud technologies", "Add more project details"]
      },
      ai_insights: {
        job_match_score: 82,
        recommended_positions: ["Frontend Developer", "Full Stack Developer"],
        skill_gaps: ["AWS", "Docker"],
        career_suggestions: ["Focus on cloud technologies", "Develop DevOps skills"]
      }
    };
  }
};
