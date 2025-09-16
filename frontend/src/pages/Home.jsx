// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const shapesRef = useRef([]);
  const featuresRef = useRef([]);
  const testimonialsRef = useRef([]);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const [backgroundColor, setBackgroundColor] = useState("from-purple-50 via-pink-50 to-amber-50");

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial animations for page elements
    tl.fromTo(containerRef.current, 
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: "power2.inOut" }
    )
    .fromTo(titleRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "back.out(1.7)" },
      "-=0.5"
    )
    .fromTo(subtitleRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    );

    // Floating shapes animation
    shapesRef.current.forEach((shape, index) => {
      if (!shape) return;
      
      gsap.to(shape, {
        y: index % 2 === 0 ? -30 : 30,
        x: index % 3 === 0 ? -20 : index % 3 === 1 ? 20 : 0,
        rotation: index % 2 === 0 ? 10 : -10,
        duration: 4 + index,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.3
      });
    });

    // Sync background color changes with scroll
    const sections = gsap.utils.toArray('.color-change-section');
    
    sections.forEach((section, i) => {
      const colors = [
        "from-purple-50 via-pink-50 to-amber-50",
        "from-blue-50 via-cyan-50 to-teal-50",
        "from-green-50 via-emerald-50 to-lime-50",
        "from-rose-50 via-pink-50 to-red-50",
        "from-indigo-50 via-purple-50 to-pink-50",
        "from-amber-50 via-orange-50 to-red-50",
        "from-teal-50 via-cyan-50 to-blue-50",
        "from-lime-50 via-green-50 to-emerald-50"
      ];
      
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => setBackgroundColor(colors[i % colors.length]),
        onEnterBack: () => setBackgroundColor(colors[i % colors.length])
      });
    });

    // Features animation on scroll
    featuresRef.current.forEach((feature, index) => {
      if (!feature) return;
      
      gsap.fromTo(feature,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: feature,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          delay: index * 0.2
        }
      );
    });

    // Testimonials animation
    testimonialsRef.current.forEach((testimonial, index) => {
      if (!testimonial) return;
      
      gsap.fromTo(testimonial,
        { x: index % 2 === 0 ? -100 : 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: testimonial,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          delay: index * 0.2
        }
      );
    });

    // About and contact animations
    gsap.fromTo(aboutRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    gsap.fromTo(contactRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      // Clean up animations
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Testimonial data
  const testimonials = [
    {
      text: "MindEase helped me navigate my toughest semester. The breathing exercises became my daily ritual before studying.",
      author: "Psychology Major, Junior"
    },
    {
      text: "The community support here is incredible. I finally found people who understand what I'm going through.",
      author: "Engineering Student, Sophomore"
    },
    {
      text: "As an international student, MindEase provided me with tools to manage homesickness and academic pressure.",
      author: "International Student, Senior"
    },
    {
      text: "The mindfulness exercises have transformed how I handle stress. I'm more focused and less anxious during exams.",
      author: "Pre-Med Student, Junior"
    },
    {
      text: "I was hesitant at first, but the resources here genuinely helped with my burnout. Wish I found this earlier!",
      author: "Graduate Student, 2nd Year"
    },
    {
      text: "The anonymous support groups made me feel safe to share my struggles without judgment. Thank you, MindEase!",
      author: "Business Major, Freshman"
    }
  ];

  return (
    <div 
      ref={containerRef}
      className={`min-h-screen bg-gradient-to-br ${backgroundColor} flex flex-col items-center justify-start pt-16 overflow-hidden relative transition-all duration-1000`}
    >
      {/* Header with login button */}
      <header className="w-full fixed top-0 left-0 z-50 bg-white/80 backdrop-blur-sm py-4 px-6 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-purple-700">MindEase</span>
          </div>
          <div>
            <Link
              to="/login"
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2 rounded-full hover:from-purple-700 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-pink-200/50 font-medium"
            >
              Login
            </Link>
          </div>
        </div>
      </header>

      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-purple-300/40" ref={el => shapesRef.current[0] = el}></div>
      <div className="absolute bottom-1/3 right-1/4 w-20 h-20 rounded-full bg-pink-300/40" ref={el => shapesRef.current[1] = el}></div>
      <div className="absolute top-1/3 right-1/3 w-14 h-14 rounded-full bg-amber-300/40" ref={el => shapesRef.current[2] = el}></div>
      <div className="absolute bottom-1/4 left-1/3 w-18 h-18 rounded-full bg-blue-300/40" ref={el => shapesRef.current[3] = el}></div>
      <div className="absolute top-1/2 left-10 w-12 h-12 rounded-full bg-green-300/40" ref={el => shapesRef.current[4] = el}></div>
      <div className="absolute bottom-1/2 right-10 w-10 h-10 rounded-full bg-red-300/40" ref={el => shapesRef.current[5] = el}></div>
      
      {/* Hero section */}
      <div className="color-change-section text-center relative z-10 px-4 mb-16 mt-20">
        <h1 ref={titleRef} className="text-6xl md:text-7xl font-bold text-purple-800 mb-6">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">MindEase</span>
        </h1>
        <p ref={subtitleRef} className="text-xl md:text-2xl text-purple-600/90 mb-10 max-w-3xl mx-auto leading-relaxed">
          Your mental health support platform designed to help college students navigate anxiety, depression, burnout, and academic stress.
        </p>

        <div ref={buttonsRef} className="space-y-4 sm:space-y-0 mb-20">
          <Link
            to="/signup"
            className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-pink-200/50 hover:scale-105 font-medium text-lg"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Features section */}
      <div className="color-change-section w-full py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-purple-800 mb-16">How MindEase Helps You</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div 
              ref={el => featuresRef.current[0] = el}
              className="bg-white/80 p-8 rounded-2xl shadow-lg border border-purple-100 transform transition-all duration-300 hover:scale-105 hover:shadow-xl backdrop-blur-sm"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-purple-800 mb-4">Stress Management</h3>
              <p className="text-purple-600/80">Learn techniques to manage academic pressure and reduce anxiety with our guided exercises.</p>
            </div>
            
            <div 
              ref={el => featuresRef.current[1] = el}
              className="bg-white/80 p-8 rounded-2xl shadow-lg border border-pink-100 transform transition-all duration-300 hover:scale-105 hover:shadow-xl backdrop-blur-sm"
            >
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-pink-800 mb-4">Community Support</h3>
              <p className="text-pink-600/80">Connect with peers who understand what you're going through in a safe, moderated environment.</p>
            </div>
            
            <div 
              ref={el => featuresRef.current[2] = el}
              className="bg-white/80 p-8 rounded-2xl shadow-lg border border-teal-100 transform transition-all duration-300 hover:scale-105 hover:shadow-xl backdrop-blur-sm"
            >
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-teal-800 mb-4">Mindfulness Exercises</h3>
              <p className="text-teal-600/80">Practice mindfulness with our curated meditation sessions designed specifically for students.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials section */}
      <div className="color-change-section w-full py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-purple-800 mb-16">What Students Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                ref={el => testimonialsRef.current[index] = el}
                className="bg-white/80 p-6 rounded-2xl shadow-lg border border-purple-100 transform transition-all duration-300 hover:scale-105 hover:shadow-xl backdrop-blur-sm"
              >
                <div className="text-purple-200 text-4xl mb-4">"</div>
                <p className="text-lg text-purple-700/90 italic mb-4">
                  {testimonial.text}
                </p>
                <div className="text-right">
                  <p className="text-purple-600/70 font-medium">— Anonymous</p>
                  <p className="text-purple-500/60 text-sm">{testimonial.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Us section */}
      <div ref={aboutRef} className="color-change-section w-full py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-purple-800 mb-16">About MindEase</h2>
          
          <div className="max-w-4xl mx-auto bg-white/80 p-10 rounded-2xl shadow-lg border border-purple-100 backdrop-blur-sm">
            <p className="text-lg text-purple-700/90 mb-6">
              MindEase was founded in 2020 by a team of psychologists, educators, and software developers who recognized the growing mental health challenges facing college students.
            </p>
            <p className="text-lg text-purple-700/90 mb-6">
              Our mission is to provide accessible, evidence-based mental health support to students everywhere. We combine therapeutic techniques with modern technology to create a platform that's both effective and engaging.
            </p>
            <p className="text-lg text-purple-700/90">
              All our resources are developed in collaboration with licensed mental health professionals and are regularly updated based on the latest research in psychology and neuroscience.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">50K+</div>
                <div className="text-purple-700/80">Students Helped</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">100+</div>
                <div className="text-purple-700/80">Campuses</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
                <div className="text-purple-700/80">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Us section */}
      <div ref={contactRef} className="color-change-section w-full py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-purple-800 mb-16">Contact Us</h2>
          
          <div className="max-w-4xl mx-auto bg-white/80 p-10 rounded-2xl shadow-lg border border-purple-100 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-2xl font-semibold text-purple-800 mb-6">Get in Touch</h3>
                <p className="text-purple-700/90 mb-6">
                  Have questions or want to learn more about how MindEase can support your campus community? Reach out to our team.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-purple-100 p-3 rounded-full mr-4">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-800">Email</h4>
                      <p className="text-purple-600/80">support@mindease.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-purple-100 p-3 rounded-full mr-4">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-800">For Campuses</h4>
                      <p className="text-purple-600/80">partnerships@mindease.com</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-purple-800 mb-6">Send a Message</h3>
                <form className="space-y-4">
                  <div>
                    <input 
                      type="text" 
                      placeholder="Your Name"
                      className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      placeholder="Your Email"
                      className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <textarea 
                      placeholder="Your Message"
                      rows="4"
                      className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-pink-200/50 font-medium"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-10 bg-purple-800 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <span className="text-2xl font-bold">MindEase</span>
              <p className="text-purple-200 mt-2">Supporting student mental health</p>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-purple-200 hover:text-white transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-purple-200 hover:text-white transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-purple-200 hover:text-white transition-colors duration-300">
                FAQ
              </a>
            </div>
          </div>
          
          <div className="border-t border-purple-700 mt-8 pt-8 text-center text-purple-300">
            <p>©️ 2023 MindEase. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;