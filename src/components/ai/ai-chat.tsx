'use client';

import React, { useState } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { GlassCard, OrbitingDots } from '@/components/atoms';
import { useAIChatStore, useOpportunityStore } from '@/providers/store-provider';
import { mockUser, mockCareerScore } from '@/services/mock-data';
import type { Opportunity } from '@/types';

function generateAdvisorResponse(userMsg: string, opportunities: Opportunity[]): string {
  const normalized = userMsg.toLowerCase().trim();

  // 1. Check for opportunity matches
  let matchedOpp: Opportunity | undefined = undefined;

  for (const opp of opportunities) {
    const titleLower = opp.title.toLowerCase();
    const orgLower = (opp.organization || '').toLowerCase();

    // Match if title, organization, or tags are mentioned in the message
    if (
      normalized.includes(titleLower) ||
      (opp.title.includes('Google Summer of Code') && (normalized.includes('gsoc') || normalized.includes('google summer') || normalized.includes('summer of code'))) ||
      (opp.title.includes('MLH Global Hack Week') && (normalized.includes('mlh') || normalized.includes('hack week') || normalized.includes('hackathon'))) ||
      (opp.title.includes('AWS Certified Cloud') && (normalized.includes('aws') || normalized.includes('amazon') || normalized.includes('certification') || normalized.includes('practitioner'))) ||
      (opp.title.includes('Data Structures & Algorithms') && (normalized.includes('dsa') || normalized.includes('algorithms') || normalized.includes('assignment') || normalized.includes('avl'))) ||
      (opp.title.includes('Rhodes Scholarship') && (normalized.includes('rhodes') || normalized.includes('scholarship'))) ||
      (opp.title.includes('Stanford CS Research') && (normalized.includes('stanford') || normalized.includes('research') || normalized.includes('assistantship'))) ||
      (opp.title.includes('TEDx') && (normalized.includes('tedx') || normalized.includes('talk'))) ||
      (opp.title.includes('Codeforces') && (normalized.includes('codeforces') || normalized.includes('contest') || normalized.includes('competitive')))
    ) {
      matchedOpp = opp;
      break;
    }
  }

  // Helper to format dates
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'No deadline';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  if (matchedOpp) {
    const title = matchedOpp.title;
    const deadline = matchedOpp.deadline;
    const daysLeft = matchedOpp.daysUntilDeadline ?? (deadline ? Math.max(0, Math.ceil((new Date(deadline).getTime() - Date.now()) / 86400000)) : undefined);
    const status = matchedOpp.status.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase()); // e.g. "in-progress" -> "In Progress"

    // Check type of query
    const isDeadlineQuery = /deadline|when|date|last day|due|timeline|calendar/.test(normalized);
    const isTipsQuery = /how|prepare|win|tips|steps|roadmap|guide|checklist|tasks/.test(normalized);
    const isInfoQuery = /what|description|summary|about|info|details|requirements|difficulty|hours/.test(normalized);

    if (isDeadlineQuery) {
      let response = `The deadline to apply for **${title}** is **${formatDate(deadline)}**`;
      if (daysLeft !== undefined) {
        response += ` (which is in **${daysLeft}** ${daysLeft === 1 ? 'day' : 'days'}).`;
      } else {
        response += `.`;
      }
      response += `\n\nYour current preparation status is **${status}** (overall progress: **${matchedOpp.progress}%**).\n\n`;

      const remaining = matchedOpp.checklist.filter((item) => !item.completed);
      if (remaining.length > 0) {
        response += `Here are your remaining preparation tasks:\n` +
          remaining.map((item) => `- [ ] ${item.text}${item.estimatedMinutes ? ` (est. ${item.estimatedMinutes}m)` : ''}`).join('\n');
      } else {
        response += `Great job! You have completed all checklist items for this program.`;
      }
      return response;
    }

    if (isTipsQuery) {
      let response = `Here are some preparation steps and winning tips for **${title}**:\n\n`;

      if (matchedOpp.winningTips && matchedOpp.winningTips.length > 0) {
        response += `### 💡 Winning Tips\n` + matchedOpp.winningTips.map((tip) => `- ${tip}`).join('\n') + `\n\n`;
      }

      if (matchedOpp.requirements && matchedOpp.requirements.length > 0) {
        response += `### 📋 Requirements\n` + matchedOpp.requirements.map((req) => `- ${req}`).join('\n') + `\n\n`;
      }

      response += `### 🛠️ Action Checklist\n` +
        matchedOpp.checklist.map((item) => `- [${item.completed ? 'x' : ' '}] ${item.text}${item.estimatedMinutes ? ` (est. ${item.estimatedMinutes}m)` : ''}`).join('\n');

      return response;
    }

    if (isInfoQuery) {
      let response = `Here are the details for **${title}**:\n\n`;
      response += `* **Organization**: ${matchedOpp.organization || 'N/A'}\n`;
      response += `* **Status**: ${status}\n`;
      response += `* **Deadline**: ${formatDate(deadline)}\n`;
      response += `* **Difficulty**: ${matchedOpp.difficulty ? matchedOpp.difficulty.replace(/\b\w/g, (c) => c.toUpperCase()) : 'N/A'}\n`;
      if (matchedOpp.estimatedHours) {
        response += `* **Estimated Time Commitment**: ${matchedOpp.estimatedHours} hours\n`;
      }
      if (matchedOpp.resumeImpact) {
        response += `* **Resume Impact**: ${matchedOpp.resumeImpact}\n`;
      }
      response += `\n**Description**:\n${matchedOpp.description}\n`;
      if (matchedOpp.summary) {
        response += `\n**Summary**:\n${matchedOpp.summary}\n`;
      }
      return response;
    }

    // Default opportunity info
    let response = `Here is a quick overview of **${title}** (Status: **${status}**, Progress: **${matchedOpp.progress}%**):\n\n`;
    response += `* **Description**: ${matchedOpp.description}\n`;
    response += `* **Deadline**: ${formatDate(deadline)} (${daysLeft !== undefined ? `${daysLeft} days left` : 'No deadline'})\n\n`;

    const nextTasks = matchedOpp.checklist.filter((item) => !item.completed).slice(0, 3);
    if (nextTasks.length > 0) {
      response += `### Next Steps:\n` + nextTasks.map((item) => `- [ ] ${item.text}`).join('\n');
    }
    return response;
  }

  // 2. Check for general career score queries
  if (normalized.includes('career score') || normalized.includes('my score') || normalized.includes('career score breakdown')) {
    const cs = mockCareerScore;
    return `Your overall **Career Score** is **${cs.overall}/100** (Percentile: **${cs.percentile}th**). The trend is currently **${cs.trend}**.

### Breakdown:
* **Skill Growth**: \`${cs.breakdown.skillGrowth}/100\` — High rate of skill acquisition.
* **Resume Value**: \`${cs.breakdown.resumeValue}/100\` — Excellent high-impact projects.
* **Career Impact**: \`${cs.breakdown.careerImpact}/100\` — Strong goal alignment.
* **Consistency**: \`${cs.breakdown.consistency}/100\` — Active progress tracking.
* **Brand Value**: \`${cs.breakdown.brandValue}/100\` — Public projects and certifications.
* **Networking**: \`${cs.breakdown.networking}/100\` — Community/professional connection.

*Recommendation*: Complete practice exams for your AWS certification and make your first open-source contribution for GSOC to further boost your score!`;
  }

  // 3. Check for profile/skills/resume queries
  if (normalized.includes('profile') || normalized.includes('skills') || normalized.includes('resume') || normalized.includes('my major') || normalized.includes('who am i')) {
    const u = mockUser;
    return `Here is a summary of your profile **${u.name}** (${u.university}):
* **Major**: ${u.major} (Class of ${u.graduationYear})
* **Bio**: *"${u.bio}"*
* **Skills**: ${u.skills.join(', ')}
* **Interests**: ${u.interests.join(', ')}
* **Career Goals**: 
${u.careerGoals.map((goal) => `  - ${goal}`).join('\n')}

Let me know if you would like recommendations matching your skill set or goals!`;
  }

  // 4. Check for deadlines query generally
  if (normalized.includes('deadline') || normalized.includes('due') || normalized.includes('last day') || normalized.includes('when')) {
    const upcoming = opportunities
      .filter((o) => o.deadline && o.status !== 'completed' && o.status !== 'archived')
      .sort((a, b) => new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime());

    if (upcoming.length > 0) {
      return `Here are the deadlines for your upcoming opportunities:
` + upcoming.map((o) => {
        const dl = formatDate(o.deadline);
        const days = o.daysUntilDeadline ?? Math.max(0, Math.ceil((new Date(o.deadline!).getTime() - Date.now()) / 86400000));
        return `- **${o.title}**: Due on **${dl}** (${days} ${days === 1 ? 'day' : 'days'} left) - Status: *${o.status}*`;
      }).join('\n') + `\n\nWhich program would you like to prepare for?`;
    }
  }

  // 5. Greetings and Help
  if (normalized.includes('hello') || normalized.includes('hi') || normalized.includes('hey') || normalized.includes('help') || normalized.includes('what can you do')) {
    return `Hi Alex! I'm your AI Career Advisor. I can help you prioritize opportunities, prepare for deadlines, and plan your career path.

You can ask me questions like:
* *"When is the last day to apply for Google Summer of Code?"*
* *"How do I prepare for MLH Global Hack Week?"*
* *"What are the requirements for Stanford CS Research Assistantship?"*
* *"Show my career score breakdown."*
* *"What is my upcoming deadline?"*`;
  }

  // Fallback response
  return `I'm not sure I understand your question completely. Would you like to discuss one of your active programs?
  
Here are your primary active programs:
1. **Google Summer of Code 2026** (due in 18 days)
2. **MLH Global Hack Week** (due in 5 days)
3. **Stanford CS Research Assistantship** (due in 12 days)
4. **AWS Certified Cloud Practitioner** (due in 25 days)

Just ask me about any of these!`;
}
async function fetchGeminiResponse(
  userMsg: string,
  history: { role: 'user' | 'assistant'; content: string }[],
  opportunities: Opportunity[]
): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Gemini API key is not configured in .env.local');
  }

  const systemPrompt = `You are Gemini Career Mentor AI, a personalized career guidance advisor for OpportunityOS.
The current date is ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.

User Profile:
- Name: ${mockUser.name}
- University: ${mockUser.university}
- Major: ${mockUser.major}
- Skills: ${mockUser.skills.join(', ')}
- Interests: ${mockUser.interests.join(', ')}
- Career Goals: ${mockUser.careerGoals.join(', ')}

User's Active Opportunities in Dashboard:
${opportunities.map(o => `- ${o.title} (${o.type}): Status: ${o.status}, Progress: ${o.progress}%, Deadline: ${o.deadline || 'None'}`).join('\n')}

CRITICAL INSTRUCTIONS:
1. You MUST provide real-time, accurate information. Use the Google Search tool to verify application statuses, registration deadlines, and open/close dates for any program mentioned (like Google Summer of Code 2026, MLH hackathons, AWS certifications, etc.).
2. Do NOT give fake or outdated information. For example, if Google Summer of Code 2026 registrations have already closed for the year, state clearly that registrations are closed and provide the actual historical timeline or next steps.
3. If the user mentions a link or a specific program, perform a Google Search to get up-to-date details about it.
4. Integrate the user's profile and active opportunities to make your advice highly customized.
5. Format your response in clean markdown. Keep your answer engaging, professional, and concise.`;

  // Map history to Gemini API expected format (role: 'user' | 'model')
  const contents = history.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }]
  }));

  // Query Gemini 2.5 Flash model
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents,
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
      tools: [
        {
          googleSearch: {}
        }
      ]
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Gemini API Error details:', errorText);
    throw new Error(`Gemini API request failed with status: ${response.status}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error('Received an empty response from Gemini API');
  }

  return text;
}

export function AIChat() {
  const messages = useAIChatStore((s) => s.messages);
  const addMessage = useAIChatStore((s) => s.addMessage);
  const isLoading = useAIChatStore((s) => s.isLoading);
  const setLoading = useAIChatStore((s) => s.setLoading);
  const opportunities = useOpportunityStore((s) => s.opportunities);

  const [input, setInput] = useState('');

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');

    addMessage({ role: 'user', content: userMsg });
    setLoading(true);

    try {
      const currentHistory = [
        ...messages,
        { id: 'temp-id', role: 'user' as const, content: userMsg, timestamp: new Date().toISOString() }
      ];
      const response = await fetchGeminiResponse(userMsg, currentHistory, opportunities);
      setLoading(false);
      addMessage({
        role: 'assistant',
        content: response,
      });
    } catch (err) {
      console.error('Error fetching Gemini response, falling back to local simulation:', err);
      // Fallback to offline responsive rules
      setTimeout(() => {
        setLoading(false);
        const fallbackResponse = generateAdvisorResponse(userMsg, opportunities);
        addMessage({
          role: 'assistant',
          content: fallbackResponse + "\n\n*(Note: Gemini live search is offline. Using local backup advisor)*",
        });
      }, 1000);
    }
  };


  return (
    <GlassCard className="h-[calc(100vh-140px)] flex flex-col p-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-white/10 mb-4">
        <OrbitingDots size="sm" />
        <div>
          <h2 className="font-bold text-white text-base">Gemini Career Mentor AI</h2>
          <p className="text-xs text-slate-400">Personalized career guidance & strategy</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-indigo-400'}`}>
              {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white/5 border border-white/10 text-slate-200'}`}>
              {msg.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <Bot className="h-4 w-4 animate-spin text-indigo-400" /> AI Advisor is thinking...
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="pt-4 border-t border-white/10 flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your AI Career Advisor anything..."
          className="flex-1 rounded-xl bg-slate-950 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </GlassCard>
  );
}
