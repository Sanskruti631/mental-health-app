"use client";

import type React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LanguageSwitcher } from "@/components/language-switcher";
import {
  Send,
  Bot,
  User,
  AlertTriangle,
  Mic,
  MicOff,
  Smile,
  ThumbsUp,
  Heart,
  Laugh,
  Frown,
  Angry,
  Copy,
  Volume2,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  severity?: "low" | "medium" | "high" | "crisis";
  reactions?: string[];
  isTyping?: boolean;
}

interface ChatInterfaceProps {
  sessionId: string;
  isDarkMode: boolean;
  onUpdateSession: (id: string, title: string, lastMessage: string) => void;
}

// Helper function to format time consistently (server and client)
const formatTime = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  const paddedMinutes = minutes.toString().padStart(2, "0");
  return `${displayHours}:${paddedMinutes} ${ampm}`;
};

// Map language codes for speech recognition locales
const LANGUAGE_LOCALE_MAP: Record<string, string> = {
  en: "en-US",
  hi: "hi-IN",
  mr: "mr-IN",
  ta: "ta-IN",
  te: "te-IN",
  bn: "bn-IN",
};

// Welcome messages by language
const WELCOME_MESSAGES: Record<string, string> = {
  en: "Hello! I'm your AI mental health support assistant. I'm here to listen, provide coping strategies, and help you navigate any challenges you're facing. How are you feeling today?",
  hi: "नमस्ते! मैं आपका AI मानसिक स्वास्थ्य सहायक हूं। मैं सुनने के लिए, सामना करने की రణనీతियां प्रदान करने के लिए, और आप जिन चुनौतियों का सामना कर रहे हैं उन्हें नेविगेट करने में मदद करने के लिए यहां हूं। आज आप कैसा महసూస్ कर रहे हैं?",
  mr: "नमस्कार! मी तुमचा AI मानसिक आरोग्य सहाय्यक आहे. मी ऐकण्यासाठी, सामना करण्याच्या धोरणे प्रदान करण्यासाठी आणि तुम्ही ज्या आव्हानांचा सामना करत आहात त्यांना नेव्हిగेट करण्यात मદત करण्यासाठी येथे आहे. आज तुम्हाला कसे वाटत आहे?",
  ta: "வணக்கம்! நான் உங்கள் AI மனநல உதவியாளர். நான் கேட்க, எதிர்கொள்ளும் உத்திகளை வழங்க, நீங்கள் எதிர்கொள்ளும் சவால்களில் வழிநடத்த உதவ இங்கு இருக்கிறேன். இன்று எப்படி இருக்கிறீர்கள்?",
  te: "నమస్కారం! నేను మీ AI మానసిక ఆరోగ్య సహాయకుడి. నేను వినడానికి, ఎదుర్కోవే వ్యూహాలను అందించడానికి మరియు మీరు ఎదుర్కొనే సవాళ్లను నావిగేట్ చేయడంలో సహాయం చేయడానికి ఇక్కడ ఉన్నాను. ఈ రోజు మీరు ఎలా భావిస్తున్నారు?",
  bn: "নমস্কার! আমি আপনার AI মানসিক স্বাস্থ্য সহায়ক। আমি শুনতে, মোকাবেলার কৌশল প্রদান করতে এবং আপনি যে চ্যালেঞ্জগুলির মুখোমুখি হচ্ছেন সেগুলি নেভিগেট করতে সাহায্য করার জন্য এখানে আছি। আজ আপনি কেমন অনুভব করছেন?",
};

export function ChatInterface({
  sessionId,
  isDarkMode,
  onUpdateSession,
}: ChatInterfaceProps) {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: WELCOME_MESSAGES[i18n.language] || WELCOME_MESSAGES.en,
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showBookingPopup, setShowBookingPopup] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Voice recognition
  const recognitionRef = useRef<any>(null);

  // Crisis keywords for detection
  const crisisKeywords = [
    "suicide",
    "kill myself",
    "end it all",
    "hurt myself",
    "self harm",
    "want to die",
    "no point living",
    "better off dead",
  ];

  // Mental health responses database (fallback)
  const responses = {
    greeting: [
      "I'm glad you reached out today. Sharing how you feel takes courage. What's on your mind?",
      "Thank you for being here. I'm listening and ready to support you. What would you like to talk about?",
      "It's good to see you. Taking care of your mental health is important. How can I help you today?",
    ],
    anxiety: [
      "Anxiety can feel overwhelming, but you're not alone. Try the 5-4-3-2-1 grounding technique: name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, and 1 you taste.",
      "When anxiety strikes, remember to breathe deeply. Inhale for 4 counts, hold for 4, exhale for 6. This activates your body's relaxation response.",
      "Anxiety is your mind trying to protect you, but sometimes it overreacts. What specific situation is making you feel anxious right now?",
    ],
    depression: [
      "Depression can make everything feel heavy and difficult. Your feelings are valid, and seeking help shows strength, not weakness.",
      "When depression clouds your thoughts, remember that this feeling is temporary. Small steps like getting sunlight, gentle movement, or connecting with others can help.",
      "Depression affects how you see yourself and the world. Have you been able to do any activities that usually bring you comfort or joy?",
    ],
    stress: [
      "Academic stress is very common among students. Let's break down what's causing you stress and find manageable ways to address it.",
      "Stress can feel overwhelming, but there are effective ways to manage it. Have you tried time-blocking your schedule or the Pomodoro technique?",
      "Chronic stress affects both your mind and body. Are you getting enough sleep, nutrition, and physical activity?",
    ],
    crisis: [
      "I'm very concerned about what you've shared. Your life has value and meaning. Please reach out to a crisis counselor immediately - iCall (TISS): 9152987821 or Vandrevala Foundation: 1860 2662 345.",
      "You're going through something incredibly difficult right now, but you don't have to face this alone. Please contact emergency services immediately at 112, or call AASRA Suicide Helpline: 9820466726.",
      "What you're feeling right now is temporary, even though it doesn't feel that way. Please reach out for immediate help: Call 112 (Emergency), iCall: 9152987821, Vandrevala: 1860 2662 345, or AASRA: 9820466726. Your life matters.",
    ],
    support: [
      "Remember that seeking help is a sign of strength. You deserve support and care.",
      "You're taking an important step by talking about your feelings. That takes real courage.",
      "Your mental health matters, and you matter. There are people who want to help you through this.",
    ],
  };

  const detectSeverity = (
    message: string,
  ): "low" | "medium" | "high" | "crisis" => {
    const lowerMessage = message.toLowerCase();

    // Crisis detection
    if (crisisKeywords.some((keyword) => lowerMessage.includes(keyword))) {
      return "crisis";
    }

    // High severity indicators
    const highSeverityWords = [
      "panic",
      "can't cope",
      "overwhelming",
      "hopeless",
      "desperate",
    ];
    if (highSeverityWords.some((word) => lowerMessage.includes(word))) {
      return "high";
    }

    // Medium severity indicators
    const mediumSeverityWords = [
      "anxious",
      "depressed",
      "stressed",
      "worried",
      "sad",
      "angry",
    ];
    if (mediumSeverityWords.some((word) => lowerMessage.includes(word))) {
      return "medium";
    }

    return "low";
  };

  const generateResponse = (userMessage: string, severity: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (severity === "crisis") {
      return responses.crisis[
        Math.floor(Math.random() * responses.crisis.length)
      ];
    }

    if (
      lowerMessage.includes("anxious") ||
      lowerMessage.includes("anxiety") ||
      lowerMessage.includes("panic")
    ) {
      return responses.anxiety[
        Math.floor(Math.random() * responses.anxiety.length)
      ];
    }

    if (
      lowerMessage.includes("depressed") ||
      lowerMessage.includes("depression") ||
      lowerMessage.includes("sad")
    ) {
      return responses.depression[
        Math.floor(Math.random() * responses.depression.length)
      ];
    }

    if (
      lowerMessage.includes("stress") ||
      lowerMessage.includes("overwhelmed") ||
      lowerMessage.includes("pressure")
    ) {
      return responses.stress[
        Math.floor(Math.random() * responses.stress.length)
      ];
    }

    if (
      lowerMessage.includes("hello") ||
      lowerMessage.includes("hi") ||
      lowerMessage.includes("hey")
    ) {
      return responses.greeting[
        Math.floor(Math.random() * responses.greeting.length)
      ];
    }

    return responses.support[
      Math.floor(Math.random() * responses.support.length)
    ];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    const severity = detectSeverity(inputValue);
    userMessage.severity = severity;

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Update session title and last message
    const title =
      inputValue.length > 50 ? inputValue.substring(0, 50) + "..." : inputValue;
    onUpdateSession(sessionId, title, inputValue);

    if (severity === "high" || severity === "crisis") {
      setTimeout(() => setShowBookingPopup(true), 2000);
    }

    try {
      // Call the actual chat API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: inputValue,
          history: messages.map((msg) => ({
            role: msg.sender,
            content: msg.content,
          })),
          language: i18n.language,
        }),
      });

      const data = await response.json();

      if (data.success) {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: data.reply,
          sender: "ai",
          timestamp: new Date(),
          severity: data.risk as any,
        };

        setMessages((prev) => [...prev, aiResponse]);
        onUpdateSession(sessionId, title, data.reply);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Chat error:", error);
      // Fallback to local response if API fails
      setTimeout(
        () => {
          const aiResponse: Message = {
            id: (Date.now() + 1).toString(),
            content: generateResponse(inputValue, severity),
            sender: "ai",
            timestamp: new Date(),
            severity,
          };

          setMessages((prev) => [...prev, aiResponse]);
          setIsTyping(false);

          // Update session with AI response
          onUpdateSession(sessionId, title, aiResponse.content);
        },
        1000 + Math.random() * 2000,
      );
    }

    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Voice input functionality
  const startVoiceRecording = useCallback(() => {
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      alert("Voice recognition is not supported in this browser.");
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = LANGUAGE_LOCALE_MAP[i18n.language] || "en-US";

    recognitionRef.current.onstart = () => {
      setIsRecording(true);
    };

    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
    };

    recognitionRef.current.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current.start();
  }, [i18n.language]);

  const stopVoiceRecording = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  }, []);

  // Emoji reactions
  const emojis = [
    { emoji: "👍", label: "thumbs up", icon: ThumbsUp },
    { emoji: "❤️", label: "heart", icon: Heart },
    { emoji: "😂", label: "laugh", icon: Laugh },
    { emoji: "😢", label: "sad", icon: Frown },
    { emoji: "😠", label: "angry", icon: Angry },
  ];

  const addReaction = (messageId: string, emoji: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? {
              ...msg,
              reactions: msg.reactions
                ? msg.reactions.includes(emoji)
                  ? msg.reactions.filter((r) => r !== emoji)
                  : [...msg.reactions, emoji]
                : [emoji],
            }
          : msg,
      ),
    );
    setShowEmojiPicker(null);
  };

  // Copy message to clipboard
  const copyMessage = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
    } catch (err) {
      console.error("Failed to copy message:", err);
    }
  };

  // Text-to-speech
  const speakMessage = (content: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(content);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Update welcome message when language changes
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === "1") {
        return [
          {
            id: "1",
            content: WELCOME_MESSAGES[i18n.language] || WELCOME_MESSAGES.en,
            sender: "ai",
            timestamp: new Date(),
          },
        ];
      }
      return prev;
    });
  }, [i18n.language]);

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case "crisis":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    }
  };

  const hasCrisisMessage = messages.some((msg) => msg.severity === "crisis");

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Crisis Alert */}
      {hasCrisisMessage && (
        <div className="bg-destructive/90 backdrop-blur-sm text-destructive-foreground p-4 text-center animate-pulse border-b border-destructive/20">
          <AlertTriangle className="h-6 w-6 inline mr-2" />
          <span className="font-semibold">{t("immediateHelpAvailable")}</span>
          <div className="mt-2 text-sm">
            <div>{t("call988")}</div>
          </div>
        </div>
      )}

      {/* Language Switcher */}
      <div className="p-4 border-b border-border flex items-center justify-end bg-card/50">
        <LanguageSwitcher />
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full p-6" ref={scrollAreaRef}>
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                } animate-in slide-in-from-bottom-4 duration-500`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="group relative max-w-[80%]">
                  <div
                    className={`rounded-2xl p-4 shadow-lg border ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground border-primary/20"
                        : "bg-card text-card-foreground border-border"
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {message.sender === "ai" && (
                        <div className="bg-primary/10 rounded-full p-2 flex-shrink-0">
                          <Bot className="h-5 w-5 text-primary" />
                        </div>
                      )}
                      {message.sender === "user" && (
                        <div className="bg-muted rounded-full p-2 flex-shrink-0">
                          <User className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-base leading-relaxed break-words">
                          {message.content}
                        </p>
                        <div className="flex items-center justify-between mt-3 gap-2">
                          <span className="text-xs opacity-70 flex-shrink-0">
                            {formatTime(message.timestamp)}
                          </span>
                          {message.severity && message.sender === "user" && (
                            <Badge
                              variant="outline"
                              className={`text-xs ${getSeverityColor(
                                message.severity,
                              )}`}
                            >
                              {message.severity}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Message Actions */}
                  <div className="absolute -bottom-2 right-0 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Popover
                      open={showEmojiPicker === message.id}
                      onOpenChange={(open) =>
                        setShowEmojiPicker(open ? message.id : null)
                      }
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-8 h-8 p-0 bg-background/80 backdrop-blur-sm border border-border rounded-full hover:bg-accent"
                        >
                          <Smile className="w-4 h-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-2 bg-popover border-border">
                        <div className="flex space-x-1">
                          {emojis.map(({ emoji, label }) => (
                            <Button
                              key={emoji}
                              variant="ghost"
                              size="sm"
                              onClick={() => addReaction(message.id, emoji)}
                              className="w-8 h-8 p-0 hover:bg-accent"
                              title={label}
                            >
                              {emoji}
                            </Button>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyMessage(message.content)}
                      className="w-8 h-8 p-0 bg-background/80 backdrop-blur-sm border border-border rounded-full hover:bg-accent"
                      title="Copy message"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>

                    {message.sender === "ai" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => speakMessage(message.content)}
                        className="w-8 h-8 p-0 bg-background/80 backdrop-blur-sm border border-border rounded-full hover:bg-accent"
                        title="Speak message"
                      >
                        <Volume2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  {/* Reactions */}
                  {message.reactions && message.reactions.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2 ml-12">
                      {message.reactions.map((reaction, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-2 py-1 text-xs bg-muted border border-border rounded-full"
                        >
                          {reaction}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start animate-in slide-in-from-bottom-4 duration-500">
                <div className="bg-card text-card-foreground border border-border rounded-2xl p-4 max-w-[80%] shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary/10 rounded-full p-2">
                      <Bot className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-primary rounded-full animate-bounce" />
                      <div
                        className="w-3 h-3 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-3 h-3 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      {/* Input Area */}
      <div className="bg-card border-t border-border p-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t("shareWhatsOnYourMind")}
                className="text-base py-4 px-6 rounded-full border-2 border-input bg-background focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-200"
                disabled={isTyping}
              />
            </div>

            {/* Voice Input Button */}
            <Button
              variant="outline"
              size="lg"
              onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
              className={`px-6 py-4 rounded-full border-2 transition-all duration-200 ${
                isRecording
                  ? "bg-destructive border-destructive text-destructive-foreground animate-pulse"
                  : "border-border bg-background hover:bg-accent"
              }`}
              title={isRecording ? t("stopRecording") : t("startVoiceInput")}
            >
              {isRecording ? (
                <MicOff className="h-5 w-5" />
              ) : (
                <Mic className="h-5 w-5" />
              )}
            </Button>

            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              size="lg"
              className="px-8 py-4 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-3 text-center leading-relaxed">
            {t("aiProvidesSupport")}
          </p>
        </div>
      </div>

      {/* Crisis Booking Dialog */}
      <Dialog open={showBookingPopup} onOpenChange={setShowBookingPopup}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <span>{t("professionalHelpRecommended")}</span>
            </DialogTitle>
            <DialogDescription>{t("basedOnConversation")}</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowBookingPopup(false)}
            >
              {t("notNow")}
            </Button>
            <Button onClick={() => setShowBookingPopup(false)}>
              {t("scheduleAppointment")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
