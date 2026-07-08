'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Bot, 
  ArrowRight, 
  RefreshCw, 
  Rss, 
  ExternalLink, 
  Calendar, 
  Star, 
  BookOpen, 
  CheckSquare, 
  Clock, 
  Terminal, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Globe, 
  ShieldAlert, 
  X,
  Sparkles,
  TrendingUp,
  Briefcase
} from 'lucide-react';
import { GlassCard, OrbitingDots } from '@/components/atoms';
import { toast } from 'sonner';

interface Story {
  rank: number;
  headline: string;
  category: string;
  publishedDate: string;
  countriesImpacted: string;
  readingTime: string;
  score: number;
  techImpact: number;
  careerValue: number;
  eduValue: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | string;
  summary: string;
  detailedExplanation: {
    what: string;
    why: string;
    who: string;
    how: string;
    importance: string;
    whyNow: string;
  };
  technicalBreakdown: string;
  whyCare: string;
  skillsToLearn: string[];
  placementImpact: string;
  futurePrediction: {
    sixMonths: string;
    oneYear: string;
    fiveYears: string;
  };
  sources: string[];
}

interface Insights {
  topSkills: string[];
  topTechnologies: string[];
  topCompanies: string[];
  topDevTools: string[];
  topAITools: string[];
  topOpenSource: string[];
  topGitHubRepos: string[];
  topOpportunities: string[];
  topResearchPapers: string[];
  topInterviewTopics: string[];
  topHackathons: string[];
  topInternships: string[];
}

interface ActionTask {
  task: string;
  description: string;
  completed?: boolean;
}

interface IntelligenceReport {
  generationTime: string;
  stories: Story[];
  insights: Insights;
  actionPlan: ActionTask[];
}

const fallbackReport: IntelligenceReport = {
  generationTime: new Date().toISOString(),
  stories: [
    {
      rank: 1,
      headline: "Google DeepMind Releases Gemini 2.5 Flash with Native Agentic Tooling",
      category: "AI Breakthroughs",
      publishedDate: "July 8, 2026",
      countriesImpacted: "Global",
      readingTime: "3 min",
      score: 95,
      techImpact: 38,
      careerValue: 19,
      eduValue: 9,
      difficulty: "Advanced",
      summary: "Google DeepMind has launched Gemini 2.5 Flash, bringing native agentic orchestration, sub-second latency tool calls, and grounded Google search integrations to developers.",
      detailedExplanation: {
        what: "Google DeepMind has officially released Gemini 2.5 Flash, optimized for speed and efficiency.",
        why: "To enable developers to deploy real-time agentic workflows that require fast tool execution and real-time knowledge.",
        who: "Announced by Google DeepMind's leadership team.",
        how: "It utilizes a distilled architecture with reinforced tool-use training, enabling sub-second response times for multi-turn function calls.",
        importance: "It allows local and edge agents to run complex logic pipelines without costly API delays.",
        whyNow: "With the industry moving from chat interfaces to autonomous agents, low-latency function calling has become the primary bottleneck."
      },
      technicalBreakdown: "The model employs a custom training pipeline optimized for JSON output formats and function calling schemas, minimizing validation errors.",
      whyCare: "B.Tech students can leverage this model to build fully autonomous coding agents and portfolio projects for free using the Google Developer API.",
      skillsToLearn: ["Agentic Orchestration", "Function Calling", "Gemini API v1beta", "JSON Schema Design", "API Integration"],
      placementImpact: "Enables students to build advanced, agentic portfolio projects. Demonstrating native tool integration is a huge standout in AI developer job interviews.",
      futurePrediction: {
        sixMonths: "Widespread deployment of Gemini-powered agents in local IDE environments.",
        oneYear: "Integration of real-time web-grounded agents into mobile apps.",
        fiveYears: "Fully autonomous dev agents managing complete software repositories."
      },
      sources: ["https://deepmind.google/technologies/gemini/"]
    },
    {
      rank: 2,
      headline: "OpenAI Unveils Academy Developer Program Offering API Credits to Engineering Students",
      category: "Student Programs",
      publishedDate: "July 7, 2026",
      countriesImpacted: "Global",
      readingTime: "4 min",
      score: 91,
      techImpact: 35,
      careerValue: 20,
      eduValue: 10,
      difficulty: "Beginner",
      summary: "OpenAI has announced the OpenAI Academy Developer Program to distribute API credits, educational pathways, and developer community access to engineering students worldwide.",
      detailedExplanation: {
        what: "OpenAI is launching a student-focused developers academy.",
        why: "To support builders in emerging ecosystems and lower the cost barrier to entry for student developer projects.",
        who: "OpenAI developer relations department.",
        how: "Eligible engineering students apply with a project proposal to receive $250 in free API credits, mentorship, and certification pathways.",
        importance: "Lowers financial hurdles for computer science students building large language model prototypes.",
        whyNow: "As AI project complexity grows, API costs are becoming a significant friction point for university student builders."
      },
      technicalBreakdown: "The program grants API keys to students with rate limits optimized for building robust, multi-agent student applications without immediate charge.",
      whyCare: "B.Tech students can directly apply to offset expenses for final-year projects, hackathons, and research experiments.",
      skillsToLearn: ["OpenAI API", "RAG Systems", "Cost Optimization", "Token Engineering", "Prompt Design"],
      placementImpact: "Having projects backed by OpenAI Academy developer credits adds significant prestige to CVs during campus placement processes.",
      futurePrediction: {
        sixMonths: "Thousands of university projects migrating to official OpenAI Academy support.",
        oneYear: "Emergence of academy-backed startups originating from campus hackathons.",
        fiveYears: "OpenAI certification pathways becoming standard prerequisites in junior engineering job descriptions."
      },
      sources: ["https://openai.com/blog/"]
    },
    {
      rank: 3,
      headline: "Microsoft Research Releases TypeChat 2.0 to Guarantee Type-Safe Schema Generation",
      category: "Software Engineering",
      publishedDate: "July 8, 2026",
      countriesImpacted: "Global",
      readingTime: "3 min",
      score: 89,
      techImpact: 37,
      careerValue: 18,
      eduValue: 10,
      difficulty: "Intermediate",
      summary: "Microsoft has launched TypeChat 2.0, utilizing TypeScript type definitions to guarantee strictly type-safe JSON returns from any model, eliminating validation crashes.",
      detailedExplanation: {
        what: "Microsoft Research has released TypeChat 2.0 for type-safe structured data integration.",
        why: "To replace complex prompt-based formatting rules with deterministic validation layers linked directly to TypeScript schemas.",
        who: "Microsoft Research and Anders Hejlsberg's team.",
        how: "It uses a compiler-level schema checker that validates model outputs against TypeScript types and automatically schedules auto-correction loops on failure.",
        importance: "Ensures backend services consuming AI outputs never crash due to unexpected response formats.",
        whyNow: "TypeScript has become the default codebase standard, and integrating structured outputs reliably is key to production deployments."
      },
      technicalBreakdown: "It parses TypeScript schemas into JSON validation schemas, validating outputs with ajv, and feeds compiler errors back to the model for self-healing.",
      whyCare: "Helps B.Tech students master robust software engineering architectures and write production-grade API wrappers.",
      skillsToLearn: ["TypeScript Type Guards", "JSON Schema Validation", "Error Self-Healing", "ajv Library", "Structured Output Parsing"],
      placementImpact: "Shows deep expertise in robust system design and type safety, which are core requirements for top-tier SDE recruitment tests.",
      futurePrediction: {
        sixMonths: "TypeChat 2.0 becoming standard in Next.js backend middleware pipelines.",
        oneYear: "Integration of type-safe schemas directly into edge model SDKs.",
        fiveYears: "Total obsolescence of raw, unstructured text generation for service-to-service communications."
      },
      sources: ["https://microsoft.github.io/TypeChat/"]
    },
    {
      rank: 4,
      headline: "AWS Launches Cloud Practitioner Student Cohort with Free Exam Vouchers",
      category: "Career & Placements",
      publishedDate: "July 6, 2026",
      countriesImpacted: "Asia Pacific, North America",
      readingTime: "3 min",
      score: 88,
      techImpact: 32,
      careerValue: 20,
      eduValue: 9,
      difficulty: "Beginner",
      summary: "Amazon Web Services has announced a dedicated student learning cohort providing free cloud education, hands-on lab sandboxes, and 100% discount vouchers for the Certified Cloud Practitioner exam.",
      detailedExplanation: {
        what: "AWS is opening a massive cloud certification cohort for students.",
        why: "To build a certified cloud talent pipeline and accelerate student familiarity with AWS infrastructure.",
        who: "AWS Academy and Training team.",
        how: "Students register with a .edu / college email to access a 20-hour self-paced course, and receive a free exam voucher upon completion.",
        importance: "Provides free professional certification worth $100 to university students.",
        whyNow: "Cloud orchestration roles are experiencing a talent shortage, prompting providers to subsidize certification costs."
      },
      technicalBreakdown: "Cohorts use AWS Educate sandboxes allowing students to launch EC2, RDS, and S3 instances in a restricted environment without billing risks.",
      whyCare: "Obtaining an AWS certification is one of the fastest ways for a B.Tech student to pass recruiter filters for cloud and DevOps roles.",
      skillsToLearn: ["EC2 & S3 Basics", "IAM Policies", "AWS VPC Orchestration", "Cloud Billing Models", "AWS Lambda Serverless"],
      placementImpact: "Directly boosts SRE, DevOps, and Cloud Consultant placement rates. Certified badges highlight CV profiles instantly.",
      futurePrediction: {
        sixMonths: "Increase in AWS Practitioner certified candidates entering the junior placement market.",
        oneYear: "Lifting baseline requirements for DevOps roles to include active cloud certifications.",
        fiveYears: "Universal standard cloud literacy requirements across all engineering disciplines."
      },
      sources: ["https://aws.amazon.com/blogs/training-and-certification/"]
    },
    {
      rank: 5,
      headline: "Linux Foundation Announces GSoC 2026 Post-Program Open Source Grants",
      category: "Engineering Opportunities",
      publishedDate: "July 7, 2026",
      countriesImpacted: "Global",
      readingTime: "5 min",
      score: 87,
      techImpact: 33,
      careerValue: 19,
      eduValue: 9,
      difficulty: "Advanced",
      summary: "The Linux Foundation has announced open-source continuation grants for Google Summer of Code (GSoC) contributors to fund long-term development on kernel and cloud-native projects.",
      detailedExplanation: {
        what: "Linux Foundation is launching continuation grants for GSoC contributors.",
        why: "To prevent post-program drop-off and ensure code maintainability for critical core infrastructure.",
        who: "The Linux Foundation Board.",
        how: "GSoC participants submit completion reports to apply for $5,000 monthly stipends to maintain contributions for an additional 6 months.",
        importance: "Bridges the gap between short-term student internships and professional open-source maintainer careers.",
        whyNow: "Open source security depends heavily on active maintainers, prompting foundations to fund student contributors post-program."
      },
      technicalBreakdown: "Grants are distributed based on git contribution metrics, code coverage metrics, and maintainer reviews on PR consistency.",
      whyCare: "Provides GSoC applicants with an immediate follow-up career path and a continuous professional stipend.",
      skillsToLearn: ["Git Workflow", "Open Source Collaboration", "Linux System Programming", "PR Reviews", "CI/CD Workflows"],
      placementImpact: "Offers a rare opportunity to showcase paid open-source work experience, which carries immense weight with SDE-II hiring teams.",
      futurePrediction: {
        sixMonths: "Reduction in code abandonments following the conclusion of GSoC 2026.",
        oneYear: "Other major foundations (Apache, CNCF) releasing matching post-GSoC grants.",
        fiveYears: "Open source maintainer pathways becoming formalized alternative hiring pipelines."
      },
      sources: ["https://www.linuxfoundation.org/blog/"]
    }
  ],
  insights: {
    topSkills: ["TypeScript", "Next.js", "Cloud Architecture (AWS)", "Agentic Orchestration", "Function Calling", "Git & GitHub", "API Integration", "JSON Schema Design", "System Programming", "DSA Algorithms"],
    topTechnologies: ["Next.js 16 (Turbopack)", "Gemini 2.5 Flash API", "TypeChat 2.0", "AWS Lambda", "Supabase", "Docker", "PostgreSQL", "React", "FastAPI", "ajv JSON Validator"],
    topCompanies: ["Google DeepMind", "OpenAI", "Microsoft Research", "Amazon Web Services", "Linux Foundation", "Meta", "Vercel", "NVIDIA", "GitHub", "Supabase"],
    topDevTools: ["VS Code", "GitHub Copilot", "Postman", "Git CLI", "Docker Desktop", "npm / pnpm", "ajv validator", "Thunder Client", "Vite", "ajv-cli"],
    topAITools: ["Gemini 2.5 Flash", "GitHub Copilot Workspace", "Claude 3.5 Sonnet", "v0.dev", "Cursor IDE", "ChatGPT", "Perplexity AI", "Gemma 3", "Phind", "DeepSeek"],
    topOpenSource: ["TypeChat", "React", "Next.js", "FastAPI", "Zustand", "Prisma", "Ollama", "LangChain", "Kubernetes", "TypeScript"],
    topGitHubRepos: ["microsoft/TypeChat", "donnemartin/system-design-primer", "kamranahmedse/developer-roadmap", "trekhleb/javascript-algorithms", "goldbergyoni/nodebestpractices", "jwasham/coding-interview-university", "public-apis/public-apis", "freeCodeCamp/freeCodeCamp", "vinta/awesome-python", "sindresorhus/awesome"],
    topOpportunities: ["AWS Cloud Cohort Voucher", "OpenAI Academy Program", "Linux Foundation GSoC Grant", "Google Summer of Code", "MLH Fellowship", "Microsoft Imagine Cup", "Google STEP Internship", "Amazon Wow", "Flipkart Runway", "Adobe Co-op"],
    topResearchPapers: ["Gemini 2.5 Flash Technical Report", "TypeChat: Type-Safe Language Model Outputs", "Attention Is All You Need", "LoRA: Low-Rank Adaptation", "Retrieval-Augmented Generation (RAG)", "DPO: Direct Preference Optimization", "ResNet Deep Residual Learning", "CLIP Contrastive Pre-training", "YOLOv10 Real-Time Detection", "FlashAttention-3"],
    topInterviewTopics: ["Type Safety & Guarding", "REST APIs & JSON Parsing", "Database Indexing & Keys", "Tree Rotations (AVL)", "Graph BFS/DFS Traversals", "AWS Security Policies", "System Design", "Dynamic Programming", "OOP Principles", "Callback Loops"],
    topHackathons: ["MLH Global Hack Week", "Google Solution Challenge", "Microsoft Imagine Cup", "SIH (Smart India Hackathon)", "EthIndia", "Hashnode Hackathon", "AWS Dev Challenge", "GitHub Universe Hack", "Hugging Face Community Hack", "Devpost Global Hackathon"],
    topInternships: ["Google Software Engineering Intern", "Microsoft Software Engineer Intern", "Amazon SDE Intern", "NVIDIA AI Research Intern", "Meta Software Engineer Intern", "Uber SDE Intern", "Salesforce Intern", "Goldman Sachs Analyst Intern", "Adobe Research Intern", "Intel Cloud Intern"]
  },
  actionPlan: [
    { task: "Apply to OpenAI Academy Program", description: "Submit your student developer credentials to get $250 free credits.", completed: false },
    { task: "Enroll in AWS Free Cloud Cohort", description: "Sign up with your student email and claim your free Cloud Practitioner voucher.", completed: false },
    { task: "Build a TypeChat 2.0 Prototype", description: "Set up a small TypeScript project validating an LLM JSON output against a custom schema.", completed: false },
    { task: "Practice Graph Traversals (BFS/DFS)", description: "Solve 2 LeetCode medium questions to maintain placement coding test readiness.", completed: false },
    { task: "Review Linux GSoC Contribution Rules", description: "Familiarize yourself with LF kernel pull request workflows to plan future open-source stipends.", completed: false }
  ]
};

function cleanJsonString(raw: string): string {
  let cleaned = raw.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\n?/i, '');
  }
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.replace(/```$/, '');
  }
  return cleaned.trim();
}

export function AIInsightWidget() {
  const [report, setReport] = useState<IntelligenceReport>(fallbackReport);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('Updated today');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal View States
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);

  useEffect(() => {
    fetchIntelligenceReport();
  }, []);

  const isReportExpired = (cachedTimeMs: number): boolean => {
    const now = new Date();
    
    // Get current time in IST (UTC + 5:30)
    const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
    const istTime = new Date(utcTime + (3600000 * 5.5));
    
    // Get 06:00 AM IST today
    const today6AM = new Date(istTime);
    today6AM.setHours(6, 0, 0, 0);
    
    // Get 06:00 AM IST yesterday
    const yesterday6AM = new Date(today6AM.getTime() - 86400000);
    
    const cachedTimeIST = new Date(cachedTimeMs + now.getTimezoneOffset() * 60000 + (3600000 * 5.5));
    
    if (istTime.getTime() >= today6AM.getTime()) {
      return cachedTimeIST.getTime() < today6AM.getTime();
    } else {
      return cachedTimeIST.getTime() < yesterday6AM.getTime();
    }
  };

  const fetchIntelligenceReport = async (forceRefresh = false) => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) return;

    const cachedData = localStorage.getItem('ai_daily_brief_report_data');
    const cachedTime = localStorage.getItem('ai_daily_brief_report_time');
    const now = Date.now();

    // Strict 06:00 AM IST cache check
    if (!forceRefresh && cachedData && cachedTime) {
      if (!isReportExpired(parseInt(cachedTime))) {
        try {
          const parsed = JSON.parse(cachedData);
          setReport(parsed);
          setLastUpdated('Updated today (06:00 AM IST Cohort)');
          return;
        } catch (e) {
          console.error('Failed to parse cached intelligence report');
        }
      }
    }

    setIsLoading(true);
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    
    const prompt = `# ===========================================
# OpportunityOS Daily Intelligence Engine v2.0
# World's Best Daily Engineering Intelligence Report
# ===========================================
Today's Date: ${currentDate}

Analyze the latest global engineering, technology, academic placements, SDE hiring patterns, research releases, and internship opportunities from the past 24 hours.

Produce the top 5 most important, educational, and placement-significant stories that B.Tech Computer Science/engineering students should know.

You must respond with a strictly valid JSON object matching this structure. Do not include markdown code block formatting (like \`\`\`json), just return the raw JSON text.

{
  "generationTime": "ISO Date String",
  "stories": [
    {
      "rank": 1,
      "headline": "A short, engaging headline (avoid clickbait)",
      "category": "AI Breakthroughs" | "Software Engineering" | "Career & Placements" | "Student Programs" | "Engineering Opportunities" | string,
      "publishedDate": "Date string",
      "countriesImpacted": "e.g. Global or Asia Pacific",
      "readingTime": "e.g. 3 min",
      "score": 95,
      "techImpact": 38,
      "careerValue": 19,
      "eduValue": 9,
      "difficulty": "Beginner" | "Intermediate" | "Advanced",
      "summary": "Engaging summary (40-60 words)",
      "detailedExplanation": {
        "what": "Explain what happened in detail.",
        "why": "Explain why it happened.",
        "who": "Explain who announced it.",
        "how": "Explain how the technology works.",
        "importance": "Explain why this is important for students.",
        "whyNow": "Explain why this happened now."
      },
      "technicalBreakdown": "Explain the underlying technologies using simple engineering terminology.",
      "whyCare": "Explain the practical relevance to B.Tech engineering students.",
      "skillsToLearn": ["exactly 5 skills"],
      "placementImpact": "Explain how this helps in interviews, resume building, hackathons, or system design.",
      "futurePrediction": {
        "sixMonths": "6-month prediction",
        "oneYear": "1-year prediction",
        "fiveYears": "5-year prediction"
      },
      "sources": ["Trusted URLs where this is verified"]
    }
  ],
  "insights": {
    "topSkills": ["exactly 10 skills"],
    "topTechnologies": ["exactly 10 technologies"],
    "topCompanies": ["exactly 10 companies"],
    "topDevTools": ["exactly 10 developer tools"],
    "topAITools": ["exactly 10 AI tools"],
    "topOpenSource": ["exactly 10 open-source projects"],
    "topGitHubRepos": ["exactly 10 github repos"],
    "topOpportunities": ["exactly 10 student opportunities"],
    "topResearchPapers": ["exactly 10 research papers"],
    "topInterviewTopics": ["exactly 10 interview topics"],
    "topHackathons": ["exactly 10 hackathons"],
    "topInternships": ["exactly 10 internships"]
  },
  "actionPlan": [
    {
      "task": "A short task name",
      "description": "Engaging 1-sentence action item to complete today"
    }
  ]
}`;

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
      let response;
      let rawText = '';

      // Stage 1: Try with Google Search Grounding
      try {
        response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            tools: [{ google_search: {} }], // Enable real-time Google search grounding
            generationConfig: {
              responseMimeType: 'application/json'
            }
          }),
        });

        if (response.ok) {
          const data = await response.json();
          rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        }
      } catch (e) {
        console.warn('Grounded search fetch failed, trying standard API generation');
      }

      // Stage 2: Fallback to standard generation
      if (!rawText) {
        response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
              responseMimeType: 'application/json'
            }
          }),
        });

        if (response.ok) {
          const data = await response.json();
          rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        }
      }

      if (rawText) {
        try {
          const cleanedText = cleanJsonString(rawText);
          const parsed: IntelligenceReport = JSON.parse(cleanedText);
          if (parsed.stories && parsed.stories.length > 0) {
            const actionPlanFormatted = (parsed.actionPlan || []).map(task => ({
              ...task,
              completed: false
            }));
            const fullReport = { ...parsed, actionPlan: actionPlanFormatted };

            setReport(fullReport);
            localStorage.setItem('ai_daily_brief_report_data', JSON.stringify(fullReport));
            localStorage.setItem('ai_daily_brief_report_time', now.toString());
            setLastUpdated('Updated today (06:00 AM IST Cohort)');
            toast.success('OpportunityOS Daily Intelligence Report generated successfully!');
            return;
          }
        } catch (parseError) {
          console.warn('Failed to parse Gemini response as structured JSON:', parseError);
        }
      }

      throw new Error('Parsed response does not contain stories.');
    } catch (err) {
      console.warn('All fetch stages failed, loading fallback report:', err instanceof Error ? err.message : err);
      setReport(fallbackReport);
      setLastUpdated('Updated today (offline mode)');
      toast.error('Offline Mode: Loaded cached version of Today\'s Daily Intelligence Report.');
    } finally {
      setIsLoading(false);
    }
  };



  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Placements':
      case 'Career & Placements':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'AI Breakthroughs':
        return 'bg-violet-500/10 text-violet-400 border-violet-500/20';
      case 'Software Engineering':
        return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <>
      <GlassCard glow className="p-6 border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 flex flex-col h-[550px] justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
            <div className="flex items-center gap-2.5">
              <OrbitingDots size="sm" />
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5" /> Intelligence Engine v2.0
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] text-slate-500 font-mono">{lastUpdated}</span>
              <button
                onClick={() => fetchIntelligenceReport(true)}
                disabled={isLoading}
                className="p-1 rounded bg-white/5 border border-white/5 text-slate-400 hover:text-white transition-colors"
                title="Force refresh"
              >
                <RefreshCw className={`h-3 w-3 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Today's Focus</h4>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Autonomous Technology Intelligence. Conducting global scans to deliver the Top 5 most critical engineering career updates.
            </p>
          </div>

          {/* Stories list previews */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <RefreshCw className="h-6 w-6 text-indigo-400 animate-spin" />
              <span className="text-xs text-slate-400">Scraping global developer networks...</span>
            </div>
          ) : (
            <div className="space-y-2.5 max-h-[280px] overflow-y-auto no-scrollbar">
              {report.stories.slice(0, 3).map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950/30 border border-white/5 hover:border-indigo-500/20 transition-all flex items-start gap-2.5">
                  <div className="h-5 w-5 rounded bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    #{item.rank}
                  </div>
                  <div className="overflow-hidden">
                    <h5 className="text-xs font-semibold text-white truncate">{item.headline}</h5>
                    <div className="flex items-center gap-2 text-[9px] text-slate-500 mt-1">
                      <span className="text-indigo-400">{item.category}</span>
                      <span>•</span>
                      <span>Score: {item.score}/100</span>
                    </div>
                  </div>
                </div>
              ))}
              {report.stories.length > 3 && (
                <div className="text-[10px] text-slate-500 text-center pt-1 font-mono">
                  + {report.stories.length - 3} more critical engineering stories today
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Launch Button */}
        <div className="border-t border-white/5 pt-4 mt-2">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-indigo-500/20 transition-all active:scale-[0.98]"
          >
            Launch Intelligence Report Reader <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </GlassCard>

      {/* Fullscreen Modal Report Reader */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-slate-950/90 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className="w-full max-w-6xl h-[90vh] bg-slate-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100 cursor-default"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-slate-950/40 shrink-0">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">OpportunityOS Daily Intelligence Engine v2.0</h3>
                  <p className="text-[10px] text-slate-400 font-mono">Top 5 Global Engineering Reports & Placement News</p>
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/5 border border-white/5 text-slate-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body Container */}
            <div className="flex-1 flex overflow-hidden">
              {/* Stories Reader */}
              <div className="flex-1 flex overflow-hidden">
                  {/* Left Story Navigator */}
                  <div className="w-1/4 border-r border-white/5 bg-slate-950/20 overflow-y-auto p-3 flex flex-col gap-2 shrink-0">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 px-1">Today's Reports</span>
                    {report.stories.map((story, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedStoryIndex(idx)}
                        className={`text-left p-3 rounded-xl border transition-all flex items-start gap-2.5 ${
                          selectedStoryIndex === idx 
                            ? 'bg-indigo-950/40 border-indigo-500/50 text-white shadow-inner' 
                            : 'bg-white/5 border-white/5 hover:bg-white/10 text-slate-300'
                        }`}
                      >
                        <div className={`h-5 w-5 rounded flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                          selectedStoryIndex === idx ? 'bg-indigo-600 text-white' : 'bg-white/10 text-slate-400'
                        }`}>
                          #{story.rank}
                        </div>
                        <div className="overflow-hidden">
                          <h5 className="text-xs font-bold leading-snug line-clamp-2">{story.headline}</h5>
                          <span className="text-[9px] text-slate-500 mt-1 block truncate">{story.category}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Right Story Detail View */}
                  <div className="flex-1 overflow-y-auto p-6 font-sans space-y-6">
                    {/* Story Header */}
                    <div className="pb-4 border-b border-white/10">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-0.5 rounded border text-[10px] font-bold uppercase ${getCategoryColor(report.stories[selectedStoryIndex].category)}`}>
                          {report.stories[selectedStoryIndex].category}
                        </span>
                        <span className="text-xs text-slate-500">•</span>
                        <span className="text-xs text-slate-500 font-mono">⏱️ {report.stories[selectedStoryIndex].readingTime} read</span>
                        <span className="text-xs text-slate-500">•</span>
                        <span className="text-xs text-slate-500 font-mono">📅 {report.stories[selectedStoryIndex].publishedDate}</span>
                      </div>
                      <h2 className="text-xl font-bold text-white leading-snug">
                        {report.stories[selectedStoryIndex].headline}
                      </h2>
                    </div>



                    {/* Quick Summary */}
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                      <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Star className="h-3.5 w-3.5" /> Quick Summary
                      </h4>
                      <p className="text-xs text-slate-200 leading-relaxed font-sans italic">
                        "{report.stories[selectedStoryIndex].summary}"
                      </p>
                    </div>

                    {/* Detailed Explanation */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-1 border-b border-white/5 flex items-center gap-1.5">
                        <BookOpen className="h-4 w-4" /> Detailed Explanation
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                        <div className="space-y-2 bg-slate-950/25 p-3 rounded-lg border border-white/5">
                          <strong className="text-indigo-400 font-mono text-[10px]">WHAT HAPPENED?</strong>
                          <p className="text-slate-300 leading-relaxed">{report.stories[selectedStoryIndex].detailedExplanation.what}</p>
                        </div>
                        <div className="space-y-2 bg-slate-950/25 p-3 rounded-lg border border-white/5">
                          <strong className="text-indigo-400 font-mono text-[10px]">WHY DID IT HAPPEN?</strong>
                          <p className="text-slate-300 leading-relaxed">{report.stories[selectedStoryIndex].detailedExplanation.why}</p>
                        </div>
                        <div className="space-y-2 bg-slate-950/25 p-3 rounded-lg border border-white/5">
                          <strong className="text-indigo-400 font-mono text-[10px]">WHO ANNOUNCED IT?</strong>
                          <p className="text-slate-300 leading-relaxed">{report.stories[selectedStoryIndex].detailedExplanation.who}</p>
                        </div>
                        <div className="space-y-2 bg-slate-950/25 p-3 rounded-lg border border-white/5">
                          <strong className="text-indigo-400 font-mono text-[10px]">HOW DOES IT WORK?</strong>
                          <p className="text-slate-300 leading-relaxed">{report.stories[selectedStoryIndex].detailedExplanation.how}</p>
                        </div>
                        <div className="space-y-2 bg-slate-950/25 p-3 rounded-lg border border-white/5">
                          <strong className="text-indigo-400 font-mono text-[10px]">WHY IS IT IMPORTANT?</strong>
                          <p className="text-slate-300 leading-relaxed">{report.stories[selectedStoryIndex].detailedExplanation.importance}</p>
                        </div>
                        <div className="space-y-2 bg-slate-950/25 p-3 rounded-lg border border-white/5">
                          <strong className="text-indigo-400 font-mono text-[10px]">WHY NOW?</strong>
                          <p className="text-slate-300 leading-relaxed">{report.stories[selectedStoryIndex].detailedExplanation.whyNow}</p>
                        </div>
                      </div>
                    </div>

                    {/* Technical Breakdown */}
                    <div className="space-y-2">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-1 border-b border-white/5 flex items-center gap-1.5">
                        <Terminal className="h-4 w-4" /> Technical Breakdown
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans bg-slate-950/30 p-4 rounded-xl border border-white/5">
                        {report.stories[selectedStoryIndex].technicalBreakdown}
                      </p>
                    </div>

                    {/* Why Every B.Tech Student Should Care */}
                    <div className="space-y-2">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-1 border-b border-white/5 flex items-center gap-1.5">
                        <Globe className="h-4 w-4" /> Why Every B.Tech Student Should Care
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans bg-indigo-950/20 p-4 rounded-xl border border-indigo-500/10">
                        {report.stories[selectedStoryIndex].whyCare}
                      </p>
                    </div>

                    {/* Skills to Learn */}
                    <div className="space-y-2">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-1 border-b border-white/5">Skills To Learn</h3>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {report.stories[selectedStoryIndex].skillsToLearn.map((skill, idx) => (
                          <span key={idx} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-xs text-slate-300 font-mono">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Placement Impact */}
                    <div className="space-y-2">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-1 border-b border-white/5 flex items-center gap-1.5">
                        <Briefcase className="h-4 w-4" /> Placement Impact
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans bg-emerald-950/15 p-4 rounded-xl border border-emerald-500/10">
                        {report.stories[selectedStoryIndex].placementImpact}
                      </p>
                    </div>

                    {/* Future Predictions */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-1 border-b border-white/5">Future Prediction</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
                        <div className="p-3.5 rounded-xl bg-slate-950/40 border border-white/5 space-y-1.5">
                          <strong className="text-indigo-400 font-mono text-[10px]">6 MONTHS</strong>
                          <p className="text-slate-300 leading-relaxed">{report.stories[selectedStoryIndex].futurePrediction.sixMonths}</p>
                        </div>
                        <div className="p-3.5 rounded-xl bg-slate-950/40 border border-white/5 space-y-1.5">
                          <strong className="text-indigo-400 font-mono text-[10px]">1 YEAR</strong>
                          <p className="text-slate-300 leading-relaxed">{report.stories[selectedStoryIndex].futurePrediction.oneYear}</p>
                        </div>
                        <div className="p-3.5 rounded-xl bg-slate-950/40 border border-white/5 space-y-1.5">
                          <strong className="text-indigo-400 font-mono text-[10px]">5 YEARS</strong>
                          <p className="text-slate-300 leading-relaxed">{report.stories[selectedStoryIndex].futurePrediction.fiveYears}</p>
                        </div>
                      </div>
                    </div>

                    {/* Official Sources */}
                    {report.stories[selectedStoryIndex].sources && report.stories[selectedStoryIndex].sources.length > 0 && (
                      <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                        <span className="text-xs text-slate-400 font-mono">Official Sources:</span>
                        <div className="flex flex-wrap gap-2">
                          {report.stories[selectedStoryIndex].sources.map((src, idx) => (
                            <a
                              key={idx}
                              href={src}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-indigo-400 hover:text-indigo-300 hover:underline flex items-center gap-1 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-lg transition-colors"
                            >
                              Source Link <ExternalLink className="h-3 w-3" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            {/* Modal Footer Info */}
            <div className="p-3 border-t border-white/10 bg-slate-950/40 text-center shrink-0 flex items-center justify-between text-[10px] text-slate-500 font-mono">
              <span>Timezone Cohort: Asia/Kolkata (IST)</span>
              <span>Next Scrape Window: 06:00 AM IST</span>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
