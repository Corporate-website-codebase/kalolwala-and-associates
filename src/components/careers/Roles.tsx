"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Upload, X, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LOCATIONS = ["Kolkata", "Mumbai", "Delhi", "Hyderabad", "Bengaluru"];
const DEPARTMENTS = ["Research Analyst", "Editor", "Post Print Production", "Designer", "Digital"];

export default function ApplicationForm() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("Select Location");
  const [department, setDepartment] = useState("Select Department");
  const [resume, setResume] = useState<File | null>(null);
  
  // New State for handling feedback messages
  const [status, setStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [showDept, setShowDept] = useState(false);

  const locationRef = useRef<HTMLDivElement | null>(null);
  const deptRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) {
        setShowLocation(false);
      }
      if (deptRef.current && !deptRef.current.contains(e.target as Node)) {
        setShowDept(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
      setStatus(null); // Clear errors when user fixes input
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null); // Clear previous messages

    // Validation
    if (!name || location.includes("Select") || department.includes("Select")) {
      setStatus({ type: 'error', message: "Please fill in all fields (Name, Location, Department)." });
      return;
    }
    if (!resume) {
      setStatus({ type: 'error', message: "Please upload your resume." });
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("location", location);
    formData.append("department", department);
    formData.append("resume", resume);

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: `Application successfully submitted for ${name}!` });
        // Reset form
        setName("");
        setLocation("Select Location");
        setDepartment("Select Department");
        setResume(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        setStatus({ type: 'error', message: data.message || "Failed to submit application." });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus({ type: 'error', message: "Network error. Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Base style for all inputs
  const inputClasses = `
    w-full h-14 
    px-5 
    bg-neutral-900 
    border border-yellow-500/50 
    text-white placeholder:text-neutral-500 
    text-lg outline-none 
    focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/50
    transition-all duration-200
    flex items-center
  `;

  return (
    <div className="w-full mb-20 mx-auto font-noto-sans">
      
      {/* Grid Wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* LEFT COLUMN: FORM */}
        <div className="w-full">
          <h1 className="mb-8 text-5xl font-light text-yellow-500 mt-4">
            Apply Now
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            
            {/* 1. NAME INPUT */}
            <div className="flex flex-col gap-3">
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if(status?.type === 'error') setStatus(null);
                }}
                placeholder="Enter your full name"
                style={{ color: "white", backgroundColor: "#171717" }} 
                className={`${inputClasses} appearance-none`}
                disabled={isSubmitting}
              />
            </div>

            {/* 2. DROPDOWNS ROW */}
            <div className="flex flex-col md:flex-row gap-6 relative z-20">
              
              {/* Location */}
              <div className="w-full md:w-1/2 flex flex-col gap-3 relative" ref={locationRef}>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => {
                    setShowLocation(!showLocation);
                    setShowDept(false);
                  }}
                  className={`
                    ${inputClasses} justify-between
                    ${showLocation ? "border-yellow-400 bg-neutral-800" : ""}
                    ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}
                  `}
                >
                  <span className={location.includes("Select") ? "text-neutral-500" : "text-white"}>
                    {location}
                  </span>
                  <ChevronDown className={`text-yellow-500 w-5 h-5 transition-transform ${showLocation ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {showLocation && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 w-full mt-2 border border-yellow-500/30 bg-neutral-900 shadow-2xl z-50 overflow-hidden"
                    >
                      {LOCATIONS.map((loc) => (
                        <div
                          key={loc}
                          onClick={() => {
                            setLocation(loc);
                            setShowLocation(false);
                            setStatus(null);
                          }}
                          className="px-6 py-4 text-neutral-300 hover:text-white hover:bg-yellow-500/20 cursor-pointer transition-colors border-b border-neutral-800 last:border-0"
                        >
                          {loc}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Department */}
              <div className="w-full md:w-1/2 flex flex-col gap-3 relative" ref={deptRef}>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => {
                    setShowDept(!showDept);
                    setShowLocation(false);
                  }}
                  className={`
                    ${inputClasses} justify-between
                    ${showDept ? "border-yellow-400 bg-neutral-800" : ""}
                    ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}
                  `}
                >
                  <span className={department.includes("Select") ? "text-neutral-500" : "text-white"}>
                    {department}
                  </span>
                  <ChevronDown className={`text-yellow-500 w-5 h-5 transition-transform ${showDept ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {showDept && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 w-full mt-2 border border-yellow-500/30 bg-neutral-900 shadow-2xl z-50 overflow-hidden"
                    >
                      {DEPARTMENTS.map((dept) => (
                        <div
                          key={dept}
                          onClick={() => {
                            setDepartment(dept);
                            setShowDept(false);
                            setStatus(null);
                          }}
                          className="px-6 py-4 text-neutral-300 hover:text-white hover:bg-yellow-500/20 cursor-pointer transition-colors border-b border-neutral-800 last:border-0"
                        >
                          {dept}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* 3. ATTACH RESUME */}
            <div className="flex flex-col gap-3 relative z-10">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                disabled={isSubmitting}
              />
              
              {!resume ? (
                <div 
                  onClick={() => !isSubmitting && fileInputRef.current?.click()}
                  className={`
                    group w-full h-32 border-2 border-yellow-500/30 
                    bg-neutral-900 hover:bg-neutral-800 hover:border-yellow-400 
                    flex flex-col items-center justify-center cursor-pointer 
                    transition-all duration-300
                    ${isSubmitting ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}
                  `}
                >
                  <div className="p-3 rounded-full bg-neutral-800 group-hover:bg-yellow-500/20 mb-3 transition-colors">
                    <Upload className="text-neutral-400 group-hover:text-yellow-400" size={24} />
                  </div>
                  <span className="font-medium text-neutral-300 group-hover:text-white transition-colors">
                    Click here to upload file
                  </span>
                  <span className="text-xs text-neutral-500 mt-1">.PDF, .DOC, .DOCX</span>
                </div>
              ) : (
                <div className="
                  w-full h-20 border border-yellow-500/60 bg-neutral-900 
                  flex items-center justify-between px-6
                ">
                  <div className="flex items-center gap-4 overflow-hidden">
                      <div className="w-10 h-10 bg-yellow-500/20 flex items-center justify-center text-yellow-500">
                        <Upload size={18} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white truncate font-medium text-lg">{resume.name}</span>
                        <span className="text-neutral-500 text-xs">{(resume.size / 1024 / 1024).toFixed(2)} MB</span>
                      </div>
                  </div>
                  <button 
                    type="button"
                    disabled={isSubmitting}
                    onClick={(e) => {
                      e.stopPropagation();
                      setResume(null);
                      if(fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="p-2 text-neutral-500 hover:text-red-400 hover:bg-red-400/10 rounded-full transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}
            </div>

            {/* 4. SUBMIT SECTION */}
            <div className="flex flex-col gap-4">
              <motion.button
                whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className={`
                  w-full h-16
                  bg-yellow-500 hover:bg-yellow-400 
                  text-black text-xl tracking-wider
                  transition-colors duration-200
                  shadow-[0_0_20px_rgba(234,179,8,0.2)]
                  flex items-center justify-center gap-3
                  ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}
                `}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  "Submit Application"
                )}
              </motion.button>

              {/* FEEDBACK MESSAGE AREA */}
              <AnimatePresence mode="wait">
                {status && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`
                      w-full p-4 border flex items-center gap-3
                      ${status.type === 'success' 
                        ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                        : 'bg-red-500/10 border-red-500/30 text-red-400'
                      }
                    `}
                  >
                    {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                    <span className="text-sm font-medium">{status.message}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
          </form>
        </div>

        {/* RIGHT COLUMN: IMAGE */}
        <div className=" w-full h-full relative min-h-[600px]">
          <div className="sticky top-10 h-full max-h-[800px]">
            <img 
              src="/images/careers.webp" 
              alt="Office" 
              className="w-full h-full object-cover border border-yellow-500/20 shadow-2xl opacity-80 hover:opacity-100 transition-opacity duration-500"
            />
          </div>
        </div>

      </div>
    </div>
  );
}