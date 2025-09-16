import { Outlet, useParams, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import api from "../../lib/api.js";
import { SidebarDemo as AppSidebar } from "../../components/Sidebar.jsx";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function StudentDashboard() {
  const { studentId } = useParams();
  const location = useLocation();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuote, setCurrentQuote] = useState(0);
  const mainRef = useRef(null);
  const headerRef = useRef(null);
  const quoteRef = useRef(null);
  
  // Mental health quotes
  const mentalHealthQuotes = [
    {
      text: "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.",
      author: "Unknown"
    },
    {
      text: "It's okay to not be okay. It's okay to ask for help. It's okay to take a break.",
      author: "Unknown"
    },
    {
      text: "You don't have to control your thoughts. You just have to stop letting them control you.",
      author: "Dan Millman"
    },
    {
      text: "Healing is not linear. It's okay to have bad days. Progress is still progress, no matter how small.",
      author: "Unknown"
    },
    {
      text: "Your illness does not define you. Your strength and courage do.",
      author: "Unknown"
    },
    {
      text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
      author: "Nelson Mandela"
    },
    {
      text: "You are allowed to be both a masterpiece and a work in progress simultaneously.",
      author: "Sophia Bush"
    },
    {
      text: "Taking care of your mind is as important as taking care of your body.",
      author: "Unknown"
    },
    {
      text: "It's not about perfect. It's about effort. And when you bring that effort every day, that's where transformation happens.",
      author: "Jillian Michaels"
    },
    {
      text: "You are not your illness. You have an individual story to tell. You have a name, a history, a personality. Staying yourself is part of the battle.",
      author: "Julian Seifter"
    }
  ];

  // Check if we're on the dashboard home page
  const isDashboardHome = location.pathname === `/student/${studentId}`;

  useEffect(() => {
    // Rotate quotes every 10 seconds
    const quoteInterval = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % mentalHealthQuotes.length);
    }, 10000);

    return () => clearInterval(quoteInterval);
  }, []);

  useEffect(() => {
    // Animate header on load
    if (headerRef.current) {
      gsap.fromTo(headerRef.current, 
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    }

    // Animate quote cards with stagger effect
    if (quoteRef.current && isDashboardHome) {
      const quoteCards = quoteRef.current.querySelectorAll('.quote-card');
      gsap.fromTo(quoteCards,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, [isDashboardHome, mentalHealthQuotes.length]);

  useEffect(() => {
    const fetchStudentData = async () => {
      if (!studentId) {
        setError("No student ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const response = await api.get(`/students/${studentId}`);
        
        if (response.data) {
          setStudent(response.data);
        } else {
          setError("No student data received");
        }
      } catch (err) {
        console.error("StudentDashboard - Error:", err);
        setError(err.response?.data?.message || "Failed to load student data");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [studentId]);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <AppSidebar role="student" id={studentId} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-indigo-700 font-medium">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <AppSidebar role="student" id={studentId} />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md w-full">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pl-40">
      {/* Sidebar */}
      <AppSidebar role="student" id={studentId} />
      
      {/* Main Content */}
      <div ref={mainRef} className="flex-1 min-w-0 overflow-auto transition-all duration-300">
        {/* Header */}
        <div ref={headerRef} className="relative px-8 py-8 mb-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 to-indigo-100/30 backdrop-blur-sm"></div>
          <div className="absolute inset-0 bg-white/20"></div>
          <div className="relative flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-indigo-900 mb-2">
                Mental Wellness Portal
              </h1>
              <p className="text-indigo-700">
                Welcome back, <span className="font-semibold">{student?.fullName || 'Student'}</span>
              </p>
              {student?.email && (
                <p className="text-sm text-indigo-600/80 mt-1">{student.email}</p>
              )}
            </div>
            
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
              {student?.fullName?.charAt(0) || 'S'}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-8">
          {/* Pass studentId to the Outlet component */}
          <Outlet context={{ studentId }} />
        </div>

        {/* Quotes Section - Only show on dashboard home */}
        {isDashboardHome && (
          <div ref={quoteRef} className="mt-12 px-8 pb-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-indigo-800">Daily Inspiration</h2>
              <div className="flex space-x-2">
                {mentalHealthQuotes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuote(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentQuote ? 'bg-indigo-500 w-6' : 'bg-indigo-200'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50 mb-8">
              <p className="text-xl text-gray-800 italic mb-4">"{mentalHealthQuotes[currentQuote].text}"</p>
              <p className="text-indigo-600 text-right">— {mentalHealthQuotes[currentQuote].author}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mentalHealthQuotes.map((quote, index) => (
                <div 
                  key={index} 
                  className="quote-card bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-md border border-white/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <p className="text-gray-700 italic mb-3">"{quote.text}"</p>
                  <p className="text-indigo-600 text-sm text-right">— {quote.author}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}