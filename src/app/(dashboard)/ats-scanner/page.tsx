'use client';

import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Upload, 
  Bot, 
  Send, 
  User, 
  AlertTriangle, 
  CheckCircle, 
  ListFilter, 
  Sparkles, 
  TrendingUp, 
  ArrowRight,
  RefreshCw,
  Trash2,
  AlertCircle,
  Plus
} from 'lucide-react';
import { GlassCard } from '@/components/atoms';
import { mockUser } from '@/services/mock-data';
import { toast } from 'sonner';

interface ATSAnalysis {
  overallScore: number;
  layers: {
    format: {
      score: number;
      max: number;
      issues: Array<{ severity: 'CRITICAL' | 'WARNING' | 'MINOR'; issue: string; fix: string }>;
    };
    keywords: {
      score: number;
      max: number;
      matchRate: number;
      densityScore: number;
      table: Array<{ keyword: string; status: 'EXACT MATCH' | 'PARTIAL MATCH' | 'MISSING'; location: string }>;
      priorityAdds: string[];
    };
    content: {
      score: number;
      max: number;
      quantificationRate: number;
      actionVerbStrength: number;
      impactClarity: number;
      jdRelevance: number;
    };
    structure: {
      score: number;
      max: number;
      sections: Array<{ name: string; status: 'MET' | 'MISSING' }>;
      autoRejectionRisks: string[];
    };
    roleMatch: {
      score: number;
      max: number;
      experienceAlignment: string;
      basicQualifications: Array<{ requirement: string; status: 'MET' | 'PARTIALLY MET' | 'NOT MET' }>;
      preferredQualifications: Array<{ requirement: string; status: 'MET' | 'PARTIALLY MET' | 'NOT MET' }>;
      graduationYearEligibility: string;
      projectMapping: Array<{ project: string; matchReason: string }>;
    };
  };
  priorityFixes: {
    critical: string[];
    important: string[];
    optional: string[];
  };
  standoutAnalysis: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function ATSScannerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<ATSAnalysis | null>(null);
  
  // Save extracted text for follow-up chat context
  const [extractedText, setExtractedText] = useState('');
  
  // Tab switcher
  const [activeTab, setActiveTab] = useState<'format' | 'keywords' | 'content' | 'structure' | 'roleMatch'>('format');
  
  // Follow-up Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    validateAndSetFile(droppedFile);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  };

  const validateAndSetFile = (selectedFile: File) => {
    const validExtensions = ['.pdf', '.docx', '.txt'];
    const filename = selectedFile.name.toLowerCase();
    const isValid = validExtensions.some(ext => filename.endsWith(ext));

    if (!isValid) {
      toast.error('Unsupported file format. Please upload a PDF, Word (.docx), or Text (.txt) file.');
      return;
    }
    setFile(selectedFile);
    toast.success(`Loaded file: ${selectedFile.name}`);
  };

  const removeFile = () => {
    setFile(null);
    setExtractedText('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAudit = async () => {
    if (!file) {
      toast.error('Please upload your resume file.');
      return;
    }
    if (!jobDescription.trim()) {
      toast.error('Please paste the target job description.');
      return;
    }

    setIsLoading(true);
    setAnalysis(null);
    setChatMessages([]);

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      toast.error('Gemini API Key is missing. Please verify .env.local setup.');
      setIsLoading(false);
      return;
    }

    try {
      let geminiParts: any[] = [];
      let currentExtractedText = '';

      // 1. Process files based on type
      if (file.name.endsWith('.pdf')) {
        // Read file as base64 and send directly to Gemini multimodal engine
        const base64Data = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const rawBase64 = (reader.result as string).split(',')[1];
            resolve(rawBase64);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        geminiParts.push({
          inlineData: {
            mimeType: 'application/pdf',
            data: base64Data
          }
        });
        currentExtractedText = '[Multimodal PDF Document Contents]';
        setExtractedText(currentExtractedText);
      } 
      else if (file.name.endsWith('.docx')) {
        // Upload to server-side Mammoth route
        const formData = new FormData();
        formData.append('file', file);

        const parseResponse = await fetch('/api/parse-resume', {
          method: 'POST',
          body: formData
        });

        if (!parseResponse.ok) {
          throw new Error('Word document parser route returned an error.');
        }

        const parseData = await parseResponse.json();
        currentExtractedText = parseData.text;
        setExtractedText(currentExtractedText);

        geminiParts.push({
          text: `Resume Text:\n${currentExtractedText}`
        });
      } 
      else {
        // Text file
        const textData = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsText(file);
        });

        currentExtractedText = textData;
        setExtractedText(currentExtractedText);

        geminiParts.push({
          text: `Resume Text:\n${currentExtractedText}`
        });
      }

      // 2. Add prompt & JD details to Gemini parts
      const systemInstruction = `You are the most advanced ATS (Applicant Tracking System) engine used by Fortune 500 companies (Amazon, Google, Microsoft, McKinsey).
Perform a FULL 5-layer ATS audit on the provided Resume (supplied either as a PDF file or text) and Job Description.

CRITICAL FORMATTING & DESIGN RULES (Layer 1):
- A standard, ATS-safe resume MUST consist of clean, single-column plain text with standard headings and horizontal lines only.
- If the resume contains multiple design colors (e.g. background shapes, text blocks in orange/blue), photos, icons, graphics, badges, or complex multi-column grid layouts, it is NOT acceptable.
- In Layer 1 (File and Format Scan): If you detect multiple colors, columns, photos, drawings, icons, or complex decorative grids, you MUST mark this layer's score as 0/20 with a severity of CRITICAL, and output the issue: "Decorative design elements / complex layout detected. ATS systems require clean, plain text with proper headings and lines only."
- If the formatting is plain text, score this layer based on standard checks (safe fonts, emoji checks, date consistency, bullet style).

Job Description:
${jobDescription}

Perform the audit according to these rules:
1. File & Format Scan (Layer 1): Evaluate formatting as stated above.
2. Keyword Density (Layer 2): Extract the top 20 keywords from the JD. For each, specify status (EXACT MATCH, PARTIAL MATCH, or MISSING) in the resume and name the section it was found. Recommend top 5 priority adds.
3. Content & Impact (Layer 3): Analyze quantification rates, action verb strength, business impact clarity, and relevance.
4. Structure Audit (Layer 4): Check if critical sections are present (Work Experience, Education, Skills, Summary, Contact info) and flag auto-rejection risks.
5. Role-Specific Match (Layer 5): Check seniority alignment, qualifications, eligibility, and rank projects.

You must respond with a strictly valid JSON object matching the following structure. Do not include markdown code block formatting (like \`\`\`json), just return the raw JSON text.

{
  "overallScore": 82,
  "layers": {
    "format": { "score": 16, "max": 20, "issues": [ { "severity": "CRITICAL" | "WARNING" | "MINOR", "issue": "Issue description", "fix": "Fix instructions" } ] },
    "keywords": { 
      "score": 21, 
      "max": 25, 
      "matchRate": 75, 
      "densityScore": 80, 
      "table": [ { "keyword": "React", "status": "EXACT MATCH" | "PARTIAL MATCH" | "MISSING", "location": "Skills" } ],
      "priorityAdds": ["Docker", "Kubernetes", "GraphQL", "CI/CD", "Node.js"]
    },
    "content": { "score": 18, "max": 25, "quantificationRate": 60, "actionVerbStrength": 80, "impactClarity": 70, "jdRelevance": 90 },
    "structure": { "score": 13, "max": 15, "sections": [ { "name": "Work Experience", "status": "MET" | "MISSING" } ], "autoRejectionRisks": [] },
    "roleMatch": {
      "score": 12,
      "max": 15,
      "experienceAlignment": "Highly Aligned",
      "basicQualifications": [ { "requirement": "Pursuing CS degree", "status": "MET" | "PARTIALLY MET" | "NOT MET" } ],
      "preferredQualifications": [ { "requirement": "Open source contributions", "status": "MET" | "PARTIALLY MET" | "NOT MET" } ],
      "graduationYearEligibility": "Eligible",
      "projectMapping": [ { "project": "Google Summer of Code 2026", "matchReason": "Directly demonstrates open source collaboration and React/TypeScript development." } ]
    }
  },
  "priorityFixes": {
    "critical": ["Missing Docker keyword in skills section."],
    "important": ["Increase metrics in Work Experience section bullets (currently only 60%)."],
    "optional": ["Convert bullet points to standard dots."]
  },
  "standoutAnalysis": "Standout analysis details here"
}`;

      geminiParts.push({
        text: systemInstruction
      });

      // 3. Query Gemini
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: geminiParts }],
          generationConfig: {
            responseMimeType: 'application/json'
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`API returned status: ${response.status}`);
      }

      const responseData = await response.json();
      const rawText = responseData.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!rawText) {
        throw new Error('Empty response from model');
      }

      const parsed: ATSAnalysis = JSON.parse(rawText.trim());
      setAnalysis(parsed);
      
      // Initialize chat with a welcome message
      setChatMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: `Hi ${mockUser.name}! I have completed your ATS audit on the uploaded file **${file.name}**. Your score is **${parsed.overallScore}/100**.\n\n${
            parsed.layers.format.score === 0 
              ? "🔴 **CRITICAL FORMATTING CHECK FAILED**: Multiple designs, colors, columns, or photos were detected. You must reformat your resume to a simple, single-column plain text document to avoid auto-rejection."
              : parsed.priorityFixes.critical.length > 0 
                ? "⚠️ You have some critical fixes to make to avoid auto-rejection."
                : "✅ Formatting and layout structure look clean!"
          }\n\nAsk me any questions about how to rewrite or optimize your resume for this role!`,
        }
      ]);
      
      toast.success('ATS Audit Completed!');
    } catch (err) {
      console.error('Error conducting ATS audit:', err);
      toast.error('Failed to analyze resume. Please verify file format and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatLoading || !analysis || !file) return;

    const userMsg = chatInput.trim();
    setChatInput('');
    
    const newUserMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: userMsg,
    };
    
    setChatMessages((prev) => [...prev, newUserMsg]);
    setIsChatLoading(true);

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      toast.error('API key missing');
      setIsChatLoading(false);
      return;
    }

    const systemPrompt = `You are the Fortune 500 ATS Career Coach. The user has audited their resume file (${file.name}) against a job description.
    
    Resume Context:
    ${extractedText}
    
    Target Job Description:
    ${jobDescription}
    
    ATS Audit Results:
    - Overall Score: ${analysis.overallScore}/100
    - Standout Analysis: ${analysis.standoutAnalysis}
    - Format Score: ${analysis.layers.format.score}/20 (Critical check for colors, columns, photos, drawings, and designs)
    - Critical Fixes: ${analysis.priorityFixes.critical.join(', ')}
    - Key missing keywords: ${analysis.layers.keywords.priorityAdds.join(', ')}
    
    Answer the user's questions about their resume, formatting guidelines (simple plain text, no decorations), the job requirements, and how to improve their bullets honestly and faithfully. Provide exact suggestions of how they should write/rephrase their resume points.`;

    const chatHistory = [...chatMessages, newUserMsg].map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: chatHistory,
          systemInstruction: {
            parts: [{ text: systemPrompt }],
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Chat request failed');
      }

      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!reply) {
        throw new Error('Empty response');
      }

      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + '-reply',
          role: 'assistant',
          content: reply,
        },
      ]);
    } catch (err) {
      console.error('Chat error:', err);
      toast.error('Failed to get response. Try again.');
    } finally {
      setIsChatLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5';
    if (score >= 75) return 'text-indigo-400 border-indigo-500/30 bg-indigo-500/5';
    if (score >= 60) return 'text-amber-400 border-amber-500/30 bg-amber-500/5';
    return 'text-rose-400 border-rose-500/30 bg-rose-500/5';
  };

  const getBadgeColor = (status: string) => {
    switch (status) {
      case 'EXACT MATCH':
      case 'MET':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'PARTIAL MATCH':
      case 'PARTIALLY MET':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default:
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      {!analysis && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Resume Upload Card */}
          <GlassCard className="p-6 h-[60vh] [&>div:last-child]:h-full [&>div:last-child]:flex [&>div:last-child]:flex-col [&>div:last-child]:justify-between">
            <span className="text-sm font-bold text-white flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-indigo-400" /> Upload Resume Document
            </span>

            {/* Drag & Drop Zone */}
            {!file ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`flex-1 flex flex-col items-center justify-center border-2 border-dashed rounded-xl cursor-pointer p-6 text-center transition-all ${
                  isDragging 
                    ? 'border-indigo-500 bg-indigo-500/5 scale-98' 
                    : 'border-white/10 hover:border-indigo-500/50 bg-slate-950/20 hover:bg-slate-950/40'
                }`}
              >
                <Upload className="h-10 w-10 text-slate-500 mb-3 animate-bounce" />
                <p className="text-xs font-semibold text-white">Drag & drop your resume file here</p>
                <p className="text-[10px] text-slate-400 mt-1">or click to browse local files</p>
                <span className="mt-4 px-2.5 py-1 rounded bg-white/5 border border-white/5 text-[9px] text-slate-400 font-mono">
                  Supports PDF, DOCX, TXT
                </span>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept=".pdf,.docx,.txt"
                  className="hidden"
                />
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center bg-slate-950/40 border border-white/10 rounded-xl p-6 relative">
                <FileText className="h-14 w-14 text-indigo-500 mb-2" />
                <p className="text-xs font-bold text-white max-w-[80%] text-center truncate">{file.name}</p>
                <p className="text-[10px] text-slate-500 mt-1">{(file.size / 1024).toFixed(1)} KB</p>

                <button
                  onClick={removeFile}
                  className="absolute top-4 right-4 p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                  title="Remove file"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            )}
            
            {/* ATS safe reminder banner */}
            <div className="mt-4 p-3 bg-indigo-500/5 border border-indigo-500/10 rounded-xl flex items-start gap-2.5">
              <AlertCircle className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
              <p className="text-[10px] text-slate-400 leading-normal">
                **ATS Formatting Audit Notice**: Fortune 500 ATS systems require simple, single-column plain text resumes with standard headers. Multi-column templates, colors, and photos will cause auto-rejections. PDF documents are recommended for layout scanning.
              </p>
            </div>
          </GlassCard>

          {/* Job Description Card */}
          <GlassCard className="p-6 h-[60vh] [&>div:last-child]:h-full [&>div:last-child]:flex [&>div:last-child]:flex-col">
            <span className="text-sm font-bold text-white flex items-center gap-2 mb-4">
              <Bot className="h-5 w-5 text-indigo-400" /> Target Job Description
            </span>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job description you are applying for..."
              className="flex-1 w-full bg-slate-950/50 border border-white/10 rounded-xl p-4 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 resize-none font-sans"
            />
          </GlassCard>
        </div>
      )}

      {/* Audit trigger bar */}
      {!analysis && (
        <div className="flex justify-center">
          <button
            onClick={handleAudit}
            disabled={isLoading}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-base transition-all shadow-xl shadow-indigo-600/20 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <RefreshCw className="h-5 w-5 animate-spin" /> Running 5-Layer ATS Audit...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 fill-current" /> Conduct ATS Match Scan
              </>
            )}
          </button>
        </div>
      )}

      {/* Loading state indicator */}
      {isLoading && (
        <GlassCard className="p-8 text-center max-w-lg mx-auto flex flex-col items-center justify-center gap-4">
          <RefreshCw className="h-10 w-10 text-indigo-400 animate-spin" />
          <h3 className="font-bold text-white text-lg">AI ATS Engine Auditing</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Running Layer 1 (File Scan & Visual Layout check), Layer 2 (Keyword Density), Layer 3 (Impact & Metrics), Layer 4 (Section Structure), and Layer 5 (Seniority & Eligibility Check). This takes about 10-15 seconds.
          </p>
        </GlassCard>
      )}

      {/* Analysis Output Section */}
      {analysis && (
        <div className="space-y-6">
          {/* Header Action bar */}
          <div className="flex items-center justify-between bg-slate-950/40 p-4 border border-white/5 rounded-2xl">
            <div>
              <h2 className="font-bold text-white text-lg">ATS Scored Report</h2>
              <p className="text-xs text-slate-400">Match generated today for target application</p>
            </div>
            <button
              onClick={() => {
                setAnalysis(null);
                removeFile();
              }}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-white font-semibold transition-colors flex items-center gap-1"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Scan Another Job
            </button>
          </div>

          {/* Top Score summary section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Overall score radial card */}
            <GlassCard glow className={`p-6 flex flex-col items-center justify-center border text-center ${getScoreColor(analysis.overallScore)}`}>
              <span className="text-xs font-bold uppercase tracking-wider block mb-3">Overall ATS Match</span>
              <div className="relative flex items-center justify-center h-28 w-28 rounded-full border-4 border-current">
                <span className="text-3xl font-extrabold">{analysis.overallScore}</span>
                <span className="text-[10px] absolute bottom-4 text-slate-400">/ 100</span>
              </div>
              <span className="text-xs font-semibold mt-4">
                {analysis.overallScore >= 90 ? 'Excellent Match Probability' : analysis.overallScore >= 75 ? 'Good — Ready with fixes' : 'Average — High Risk'}
              </span>
            </GlassCard>

            {/* Score breakdown metrics list */}
            <GlassCard className="p-6 md:col-span-2 flex flex-col justify-between">
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block mb-4">5-Layer Match Breakdown</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-300">Format & File Scan</span>
                    <span className="text-white">{analysis.layers.format.score} / {analysis.layers.format.max}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500" style={{ width: `${(analysis.layers.format.score / analysis.layers.format.max) * 100}%` }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-300">Keyword Density</span>
                    <span className="text-white">{analysis.layers.keywords.score} / {analysis.layers.keywords.max}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500" style={{ width: `${(analysis.layers.keywords.score / analysis.layers.keywords.max) * 100}%` }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-300">Content & Bullet Impact</span>
                    <span className="text-white">{analysis.layers.content.score} / {analysis.layers.content.max}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500" style={{ width: `${(analysis.layers.content.score / analysis.layers.content.max) * 100}%` }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-300">Section Structure</span>
                    <span className="text-white">{analysis.layers.structure.score} / {analysis.layers.structure.max}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500" style={{ width: `${(analysis.layers.structure.score / analysis.layers.structure.max) * 100}%` }} />
                  </div>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-300">Role-Specific Match</span>
                    <span className="text-white">{analysis.layers.roleMatch.score} / {analysis.layers.roleMatch.max}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500" style={{ width: `${(analysis.layers.roleMatch.score / analysis.layers.roleMatch.max) * 100}%` }} />
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Standout Analysis statement card */}
          <GlassCard className="p-6 bg-gradient-to-br from-indigo-950/30 to-slate-900 border-indigo-500/20">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 fill-indigo-400/10 text-indigo-400" /> Standout & shortlisting analysis
            </span>
            <p className="text-sm text-slate-200 leading-relaxed font-sans">
              {analysis.standoutAnalysis}
            </p>
          </GlassCard>

          {/* Details & Fixes section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Detailed Layer Tabs */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-1 bg-slate-950/60 p-1 border border-white/5 rounded-xl overflow-x-auto no-scrollbar">
                {(['format', 'keywords', 'content', 'structure', 'roleMatch'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg font-medium text-xs whitespace-nowrap transition-all ${
                      activeTab === tab
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {tab === 'roleMatch' ? 'Role Match' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Tab Contents */}
              <GlassCard className="p-6 min-h-[45vh]">
                {/* Tab: Format */}
                {activeTab === 'format' && (
                  <div className="space-y-4">
                    <h3 className="font-bold text-white text-base font-heading">Layer 1: Format & File Scan</h3>
                    
                    {analysis.layers.format.score === 0 && (
                      <div className="flex items-start gap-2.5 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-xs">
                        <AlertTriangle className="h-5 w-5 shrink-0" />
                        <div>
                          <span className="font-bold block">FORMAT REJECTED BY AUTOMATED ATS FILTERS</span>
                          The audit detected non-acceptable visual decoration, multiple design colors, complex columns, or photo frames. Re-upload a standard single-column text-only document.
                        </div>
                      </div>
                    )}

                    {analysis.layers.format.issues.length === 0 ? (
                      <div className="flex items-center gap-2 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm">
                        <CheckCircle className="h-5 w-5" /> Formatting is ATS-safe! No emojis, arrow characters, or bad dates found.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {analysis.layers.format.issues.map((issue, idx) => (
                          <div key={idx} className="flex gap-3 p-3.5 rounded-xl bg-slate-950/40 border border-white/5">
                            <AlertTriangle className={`h-5 w-5 shrink-0 ${
                              issue.severity === 'CRITICAL' ? 'text-rose-500' : 'text-amber-500'
                            }`} />
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                                  issue.severity === 'CRITICAL' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                }`}>{issue.severity}</span>
                                <h4 className="text-xs font-semibold text-white">{issue.issue}</h4>
                              </div>
                              <p className="text-xs text-slate-400">**Fix**: {issue.fix}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Tab: Keywords */}
                {activeTab === 'keywords' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-white text-base">Layer 2: Keyword Match Table</h3>
                      <div className="text-xs text-slate-400">Match Rate: <span className="font-bold text-white">{analysis.layers.keywords.matchRate}%</span></div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-white/10 text-slate-400">
                            <th className="pb-2 font-semibold">Keyword</th>
                            <th className="pb-2 font-semibold">Status</th>
                            <th className="pb-2 font-semibold">Location</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {analysis.layers.keywords.table.map((row, idx) => (
                            <tr key={idx} className="text-slate-300">
                              <td className="py-2.5 font-medium text-white">{row.keyword}</td>
                              <td className="py-2.5">
                                <span className={`px-2 py-0.5 rounded border text-[9px] font-bold ${getBadgeColor(row.status)}`}>
                                  {row.status}
                                </span>
                              </td>
                              <td className="py-2.5 text-slate-400">{row.location}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Tab: Content */}
                {activeTab === 'content' && (
                  <div className="space-y-6">
                    <h3 className="font-bold text-white text-base">Layer 3: Content Impact & Metrics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-950/40 border border-white/5 rounded-xl text-center">
                        <span className="text-2xl font-bold text-white font-mono">{analysis.layers.content.quantificationRate}%</span>
                        <span className="text-[10px] text-slate-400 block mt-1">Quantification Rate</span>
                        <p className="text-[9px] text-slate-500 mt-2">Percentage of bullets using metrics or measurable numbers</p>
                      </div>

                      <div className="p-4 bg-slate-950/40 border border-white/5 rounded-xl text-center">
                        <span className="text-2xl font-bold text-white font-mono">{analysis.layers.content.actionVerbStrength}%</span>
                        <span className="text-[10px] text-slate-400 block mt-1">Action Verb Strength</span>
                        <p className="text-[9px] text-slate-500 mt-2">Percentage of bullets starting with strong action verbs</p>
                      </div>

                      <div className="p-4 bg-slate-950/40 border border-white/5 rounded-xl text-center">
                        <span className="text-2xl font-bold text-white font-mono">{analysis.layers.content.impactClarity}%</span>
                        <span className="text-[10px] text-slate-400 block mt-1">Impact Clarity</span>
                        <p className="text-[9px] text-slate-500 mt-2">Bullets clearly stating business/practical outcomes</p>
                      </div>

                      <div className="p-4 bg-slate-950/40 border border-white/5 rounded-xl text-center">
                        <span className="text-2xl font-bold text-white font-mono">{analysis.layers.content.jdRelevance}%</span>
                        <span className="text-[10px] text-slate-400 block mt-1">JD Relevance Domain</span>
                        <p className="text-[9px] text-slate-500 mt-2">Relevance of project descriptions to the target domain</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Structure */}
                {activeTab === 'structure' && (
                  <div className="space-y-4">
                    <h3 className="font-bold text-white text-base">Layer 4: Section Structure</h3>
                    <div className="space-y-2">
                      {analysis.layers.structure.sections.map((section, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-slate-950/40 border border-white/5 rounded-xl">
                          <span className="text-xs font-semibold text-white">{section.name}</span>
                          <span className={`px-2 py-0.5 rounded border text-[9px] font-bold ${getBadgeColor(section.status)}`}>
                            {section.status}
                          </span>
                        </div>
                      ))}
                    </div>

                    {analysis.layers.structure.autoRejectionRisks.length > 0 && (
                      <div className="mt-4 p-4 bg-rose-500/5 border border-rose-500/20 rounded-xl">
                        <h4 className="text-xs font-bold text-rose-400 flex items-center gap-1.5 mb-2">
                          <AlertTriangle className="h-4 w-4" /> AUTO-REJECTION RISKS DETECTED
                        </h4>
                        <ul className="list-disc pl-4 text-xs text-rose-300 space-y-1">
                          {analysis.layers.structure.autoRejectionRisks.map((risk, idx) => (
                            <li key={idx}>{risk}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab: Role Match */}
                {activeTab === 'roleMatch' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold text-white text-base">Layer 5: Seniority & Qualifications Match</h3>
                      <p className="text-xs text-slate-400 mt-1">Experience Alignment: <span className="font-bold text-indigo-400">{analysis.layers.roleMatch.experienceAlignment}</span></p>
                    </div>

                    <div className="space-y-3">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Qualifications Met</span>
                      <div className="space-y-2">
                        {analysis.layers.roleMatch.basicQualifications.map((q, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-950/40 border border-white/5 rounded-xl text-xs">
                            <span className="text-slate-300">Basic: {q.requirement}</span>
                            <span className={`px-2 py-0.5 rounded border text-[9px] font-bold ${getBadgeColor(q.status)}`}>
                              {q.status}
                            </span>
                          </div>
                        ))}
                        {analysis.layers.roleMatch.preferredQualifications.map((q, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-950/40 border border-white/5 rounded-xl text-xs">
                            <span className="text-slate-300">Pref: {q.requirement}</span>
                            <span className={`px-2 py-0.5 rounded border text-[9px] font-bold ${getBadgeColor(q.status)}`}>
                              {q.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Top Projects Ranking</span>
                      {analysis.layers.roleMatch.projectMapping.map((p, idx) => (
                        <div key={idx} className="p-3 bg-slate-950/40 border border-white/5 rounded-xl space-y-1">
                          <h4 className="text-xs font-bold text-white">#{idx+1} {p.project}</h4>
                          <p className="text-[11px] text-slate-400 leading-relaxed">{p.matchReason}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </GlassCard>
            </div>

            {/* Recommendations Column */}
            <div className="space-y-6">
              {/* Keywords to add immediately */}
              <GlassCard className="p-6 border-indigo-500/20">
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block mb-3 flex items-center gap-1">
                  <Plus className="h-4 w-4" /> Priority Keywords to Add
                </span>
                <div className="flex flex-wrap gap-2">
                  {analysis.layers.keywords.priorityAdds.map((word, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold">
                      +{word}
                    </span>
                  ))}
                </div>
              </GlassCard>

              {/* Checklist Action Items */}
              <GlassCard className="p-6">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block mb-4 flex items-center gap-1">
                  <ListFilter className="h-4 w-4" /> Priority Improvement Checklist
                </span>
                <div className="space-y-4">
                  {/* Critical */}
                  {analysis.priorityFixes.critical.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider">Critical (Auto-Rejection Risks)</span>
                      {analysis.priorityFixes.critical.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Important */}
                  {analysis.priorityFixes.important.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">Important (Boost Score +10 pts)</span>
                      {analysis.priorityFixes.important.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Optional */}
                  {analysis.priorityFixes.optional.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Optional (Polishing touches)</span>
                      {analysis.priorityFixes.optional.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </GlassCard>
            </div>
          </div>

          {/* Interactive Chat container */}
          <GlassCard className="p-6 space-y-4 border-indigo-500/20 bg-gradient-to-t from-slate-950/20 to-slate-900">
            <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
              <div className="h-8 w-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Fortune 500 ATS Career Coach</h3>
                <p className="text-[10px] text-slate-400">Ask any questions about this audit or how to rewrite specific points</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="space-y-4 max-h-[35vh] overflow-y-auto pr-2 text-sm leading-relaxed">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 ${
                    msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-indigo-400'
                  }`}>
                    {msg.role === 'user' ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                  </div>
                  <div className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white/5 border border-white/10 text-slate-200'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {isChatLoading && (
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Bot className="h-3.5 w-3.5 animate-spin text-indigo-400" /> AI Coach is formulating recommendations...
                </div>
              )}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendChat} className="pt-3 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about rephrasing statements, matching keywords, or standout strategy..."
                className="flex-1 rounded-xl bg-slate-950 border border-white/10 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                disabled={isChatLoading || !chatInput.trim()}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition-colors flex items-center justify-center disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
