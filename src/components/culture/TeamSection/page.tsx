'use client';

import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// --- TYPES ---
type TeamMember = {
  id: number;  
  name: string;
  role: string;
  qual: string; 
  imageSrc: string;
  message: string;
};

// --- DATA ---
const teamData: TeamMember[] = [
  {
    id: 1,
    name: 'Hussain Kalolwala',
    role: 'Chief Executive Officer, Director',
    qual: 'CA, CS',
    imageSrc: '/images/culture/team/Hussain Kalolwala.jpg',
    message: 'Hussain Kalolwala built K&A  the way one builds a family. A CA and CS, he started the firm in 2015 with just a few people and a vision that felt larger than the room it was born in.  He knew two things: that communication could shape the way businesses think and that people, when trusted and empowered, could shape the destiny of an organisation.\n\nHussain’s ability to see opportunity where others see complexity, and to navigate the corporate landscape with clarity, courage, and discipline has helped K&A reach where it is now. He has grown the company with the steadiness of a founder who understands both the power of meticulous execution and the value of human connection. To him, K&A is a collective of people whose growth, aspirations and well-being matter as much as the work they produce. That belief has created a culture rooted in trust, mutual respect and shared ambition.\n\nHussain’s contribution to the world of corporate and sustainability communication has been widely recognised. He was honoured in Reputation Today’s ‘40 Young Turks – Class of 2020’, and his insights on annual reporting and ESG have been featured in respected publications. K&A’s Annual Reports and Integrated Reports, crafted under his guidance, continue to earn international acclaim for design, clarity and strategic depth.\n\nWhat sets him apart is his strategic mind and his belief that great work is born from great people. Hussain leads with sharp intuition, holding K&A together like a family while steering it forward with the discipline of a founder who knows exactly where he wants to go, and the humility to take everyone along.'
  },
  {
    id: 2,
    name: 'Jumana Vadnagarwala',
    role: 'Chief Strategy Officer, Director',
    qual: 'B.Com (H), EPBCL IIM Calcutta',
    imageSrc: '/images/culture/team/Jumana Vadnagarwala.jpg',
    message: 'Jumana Vadnagarwala has spent close to a decade shaping Kalolwala & Associates (K&A) with vision, discipline and heart. As Director and Chief Strategy Officer, she stands at the intersection of strategy, people and process, guiding the organisation’s growth while nurturing the culture that holds it together.\n\nWhat makes Jumana remarkable is not just her deep understanding of strategy, compliance and corporate laws, but the way she brings humanity into every decision. She thinks long-term, plans with precision and ensures that K&A’s work remains aligned with the highest regulatory and industry standards. At the same time, she has an instinctive ability to connect with clients, teams and young talent finding their footing.\n\nHer role in building K&A’s people ecosystem has been transformative. From expanding teams across Kolkata, Gurugram, Mumbai, Hyderabad and Bengaluru,  to shaping capability-building initiatives for a fast-evolving industry, she has been central to creating a cohesive, future-ready organisation. Her guidance is steady and thoughtful; she leads by listening, mentoring and helping individuals find confidence in their own strengths.\n\nHer contributions have been widely acknowledged, including being honoured as Female Entrepreneur of the Year by the Asia Leadership Awards, an achievement that reflects her professional excellence and her commitment to building K&A with integrity and intention.'
  },
  {
    id: 3,
    name: 'Rajath Bhandarkar',
    role: 'General Manager | Research',
    qual: 'MBA (Energy and Environment)',
    imageSrc: '/images/culture/team/Rajath Bhandarkar.jpg',
    message: "A mechanical engineer with a keen interest in Renewable Energy and corporate Sustainability. Rajath pursued MBA at Symbiosis Institute of International Business with a specialisation in energy and environment management.\n\nRajath has a quirky personality with a slick wit and an absurd sense of humour. He can go from making F.R.I.E.N.D.S references to discussing Plato's allegory of the cave in a matter of minutes. He keeps humming broken lyrics from Linkin Park under pressure. He still believes Lucky Ali to be the best Indian pop singer. He grew up with an immense passion for Astrophysics and can gaze at the night sky till the sun shines on the horizon."
  },
  {
    id: 4,
    name: 'Yatha Lakhtaria',
    role: 'General Manager | Research',
    qual: 'MBA (Energy and Environment)',
    imageSrc: '/images/culture/team/Yatha Lakhtaria.jpg',
    message: 'With a Bachelor’s degree in Environmental Science and an MBA in Energy & Environment, Yatha  brings a strong academic foundation to her work in corporate sustainability. An avid reader with a mind that sees the world through many lenses, she approaches every project with curiosity and a commitment to precision.\n\nHer personality is a lively mix of wit, imagination and observation. She is the kind of person who can move effortlessly from discussing climate frameworks to debating the virtues of fictional dragons, all while juggling deadlines with a calm, caffeinated grace. Her browser usually holds more tabs than most laptops can handle, but she navigates them with an efficiency that speaks to her professionalism and disciplined work ethic.\n\nShe has a knack for spotting details others miss, almost as if she sees the fine print through a magnifying glass. A rapid learner, she absorbs new concepts in a heartbeat and folds them seamlessly into her work. Outside office hours, she can journey from dusk to dawn through her favourite novels, and proudly claims allegiance to House Ravenclaw, driven by curiosity, intellect and an unrelenting appetite to learn.'
  },

  {
    id: 5,
    name: 'Padmeja Ganjoo',
    role: 'General Manager | Research',
    qual: 'MBA (Energy and Environment)',
    imageSrc: '/images/culture/team/Padmeja.jpg',
    message: 'Padmeja is equal parts curiosity and conviction. An extrovert with unmistakable Virgo precision, she finds joy in stories, conversations and the subtle details that reveal who people really are.\n\nWith an MBA in Energy & Environment and a background in Chemical Engineering, her academic journey mirrors her personality: structured yet deeply inquisitive. Outside the professional world, she is most at ease in the kitchen, experimenting with flavours that reflect her mood. Lately, she has been drawn to soulful Kashmiri music — its warmth, cadence and emotional pull.\n\nWhether she is  decoding a complex brief or discovering a new artist, Padmeja brings the same thoughtful energy everywhere she goes.'
  },
  {
    id: 6,
    name: 'Pankaj Lal',
    role: 'President | Design and Animation',
    qual: '',
    imageSrc: '/images/culture/team/Pankaj Lal.jpg',
    message: 'Pankaj approaches design the way some people approach people — with patience, attentiveness and an instinct to truly understand before he creates. His calm presence has a way of steadying the room, turning pressure into flow and chaos into clarity. For him, every project is an opportunity to craft something honest, thoughtful and rooted in purpose'
  },
  {
    id: 7,
    name: 'Pankaj Vishwakarma',
    role: 'President - Print Production',
    qual: '',
    imageSrc: '/images/culture/team/Pankaj Vishwakarma.jpg',
    message: 'Pankaj’s journey began unusually early. He stepped into the professional world at just 18. What started with nervous anticipation gradually transformed into a career he has embraced for nearly two decades. From those early days of singing softly at his desk while learning the ropes to becoming a steady, seasoned presence in the field, Pankaj has grown alongside the craft he loves.\n\nMusic once kept him company at work, and that same rhythm now shapes the way he approaches design — with flow, attention and an instinct for harmony. A tiny shift in layout, a fresh nuance in design, a new way an idea can shape an experience,  these sparks continue to fuel his curiosity. He notices things others might miss, and it is in these observations that he finds joy, purpose and connection with his work.\n\nTwo decades in, Pankaj still brings the same sincerity and passion that guided him into the profession. Only now, it is strengthened by experience, intuition and an instinctive understanding of good design.'
  },
  {
    id: 8,
    name: 'Amit Kumar Lal',
    role: 'Vice President | Print Production',
    qual: '',
    imageSrc: '/images/culture/team/Amit Kumar Lal.jpg',
    message: 'Amit is a steady force — a professional shaped as much by discipline as by resilience. Over the years, he has worn many hats, growing from a self-driven professional into a dependable leader who brings calm, clarity and conviction to everything he undertakes. Where others see pressure, Amit sees structure; where others see deadlines, he finds rhythm.\n\nHis humility and warmth draw people in, but it is his consistency that inspires them. Under his watch, work flows with purpose. Amit believes in perseverance as a way of life. He takes challenges head-on, treating each one as an opportunity to refine, uplift and excel. Whether navigating demanding timelines or managing complex workflows, he brings a rare blend of patience, precision and determination.\n\nAt heart, Amit is a man who believes that success is defined by sincerity and that real achievement lies in showing up every day with focus, intent and an unswerving commitment to doing the best one can.'
  },
  {
    id: 9,
    name: 'Subarna Biswas',
    role: 'General Manager | Print Production',
    qual: 'Bachelor of Arts',
    imageSrc: '/images/culture/team/SubarnaBiswas.jpg',
    message: 'Subarna orchestrates the entire print ecosystem, from  streamlining workflows, elevating quality, solving last-minute problems and ensuring that every project moves with impeccable accuracy.\n\nBehind his sharp technical eye is a personality that keeps the team grounded. He has a humour that surfaces at the most unexpected moments, the kind that diffuses tension faster than any deadline can build it.\n\nOutside work, Subarna is the kind of person who can lose himself in a perfectly brewed cup of chai while discussing cinema, art or music. He believes that every design carries a story and he makes sure each one is told right.'
  },
  {
    id: 10,
    name: 'Sintu Das',
    role: 'President | Typesetting',
    qual: 'Bachelor of Arts',
    imageSrc: '/images/culture/team/Sintu Das.jpg',
    message: 'Sintu is someone who sees meaning in the smallest details — a habit that naturally shapes the way he works. Whether he is typesetting patiently, syncing pages with precision, or bringing cohesion to an entire document, he approaches every project with a quiet commitment to quality, clarity and impact.\n\nCalm under pressure and meticulous even in fast-paced environments, he has built a reputation for dependability. His work is steady, accurate and thoughtful, no matter how tight the deadline.'
  },
  {
    id: 11,
    name: 'Shaun Ward',
    role: 'President | Client Relations & Operations',
    qual: 'Bachelor of Arts',
    imageSrc: '/images/culture/team/Shaun Ward.jpg',
    message: 'Shaun is a dynamic professional whose 15-year journey has taken him through the energy of film sets, the curiosity of classrooms, and the fast-paced rhythm of corporate corridors. He has led 200-member production crews, nurtured relationships with schools, colleges and brands, collaborated closely with producers and actors, and trained young minds in communication and personality development.\n\nA natural storyteller, he has built connections across cities, sets, and institutions, and somewhere along the way, added “film scriptwriter” to his résumé. Off work, he can be found immersed in a gripping thriller or passionately cheering for his favourite Premier League team, often with equal intensity.\n\nAs President of Client Relations and Operations, Shaun brings strategy, creativity, people insight and operational discipline into a single, cohesive leadership style. The outcome is unmistakable—stronger partnerships, smoother processes and a culture where sharp thinking and good storytelling move in step.'
  },
  {
    id: 12,
    name: 'Subhojit Dasgupta',
    role: 'General Manager| Project Management',
    qual: '',
    imageSrc: '/images/culture/team/Subhojit.jpg',
    message: 'Subhojit brings nearly a decade of experience in marketing, client servicing and project management, anchored by a calm confidence that steadies every project he touches. A Marketing MBA with an instinct for clarity and coordination, he navigates timelines, expectations and last-minute pivots with an ease that reassures both colleagues and clients.\n\nA true Kolkata boy, his heart beats for football, his patience comes from cricket and his soul feels at home in the offbeat mountains he loves to escape to. He believes that inner peace wins more battles than panic ever could, a philosophy that reflects in the measured, thoughtful way he works and leads.'
  },
  {
    id: 13,
    name: 'Rajat Chakroborty',
    role: 'Vice President | Editorial',
    qual: 'Bachelors in English (Hons), Masters (Industrial Relations & Personnel Management)',
    imageSrc: '/images/culture/team/Rajat Chakraborty.jpg',
    message: 'Rajat wears many hats — business editor, storyteller and an ardent believer of ‘Mind over Matter’. He has always had a way with words, but numbers whisper to him with rare clarity as well. He believes mathematics conveys the secret code of the universe.\n\nA spiritualist at heart and a language purist, he effortlessly gallops between words and numbers. His business acumen is razor-sharp, always attuned to the undercurrents of markets, industries and ideas shaping the world. Books, the stock market and the vectors of next business growth/challenges never cease to fascinate him.\n\nRajat is a perpetual learner with a school-boyish enthusiasm and a sense of wonder, and he believes learning is the key to everlasting happiness.'
  },
  {
    id: 14,
    name: 'Shreya Sarkar Tadimalla',
    role: 'Manager | Editorial',
    qual: 'Bachelors in English (Hons), Masters in Journalism and Mass Communication',
    imageSrc: '/images/culture/team/Shreya Sarkar Tadimalla.jpg',
    message: 'Shreya is a believer in the magic of words. A former journalist with over a decade of experience and a lifelong love for literature, she knows that language, when shaped with intention, can shift perspectives and stir emotions.\n\nAs Manager, Editorial, she brings a sharp eye for detail and an instinctive sense of rhythm to every assignment. She has a knack for taking the simplest draft and shaping it into writing that is clear, engaging and genuinely enjoyable to read. Even in the most high-pressure moments, she remains composed, managing workflows with confidence.\n\nBeyond work, Shreya immerses herself in detective stories and dystopian novels, drawn to narratives that challenge the mind and stretch the imagination.\n\nTravel excites her deeply; her curiosity about people and cultures draws her towards new places, new stories and new ways of understanding the world.'
  },
  {
    id: 15,
    name: 'Ankita Kundu',
    role: 'Manager | Business Development & Client Relations',
    qual: 'MBA (Agri business)',
    imageSrc: '/images/culture/team/Ankita Kundu.jpg',
    message: 'Ankita is the kind of person whose words can turn an atheist into a believer—persuasive, articulate and effortlessly impactful. As Manager, Business Development & Client Relations, she identifies new avenues for growth, whether by onboarding promising clients or forging strategic alliances that unlock long-term value.\n\nRelationship-building comes naturally to her. She believes that meaningful engagement is the foundation of enduring partnerships, and she brings that conviction into every interaction.\n\nAnkita is a traveller at heart. New cultures, unfamiliar streets and the stories of people she meets along the way inspire her. And when she is not talking business, she turns to painting, expressing her thoughts that she does not put into words.'
  },
  {
    id: 16,
    name: 'Naeem Kangroo',
    role: 'Manager | Business Development & Client Relations',
    qual: 'B.Com Honours - E-commerce',
    imageSrc: '/images/culture/team/Naeem Kangroo.jpg',
    message: 'Naeem is a business development professional with an instinct for understanding what businesses truly need. He is known for turning conversations into meaningful, long-term partnerships and brings clarity, intent and persistence to every engagement, ensuring clients feel supported and understood at every step.\n\nOutside work, Naeem finds his rhythm outdoors, whether it is a game of cricket or simply being in open spaces. He unwinds through music, letting it restore the same calm focus he brings to his work.'
  },
];

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;




const TeamSection: React.FC = () => {
  const [activeMember, setActiveMember] = useState<TeamMember | null>(null);
  const [startRect, setStartRect] = useState<DOMRect | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Modal refs
  const modalRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  // We need a ref for the temporary image in the modal for the crossfade
  const modalImageLayerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Split Data
  const leaders = teamData.slice(0, 2);
  const teamMembers = teamData.slice(2);

  // 1. ENTRY ANIMATION
  useEffect(() => {
    const validCards = cardsRef.current.filter((el): el is HTMLDivElement => el !== null);
    if (validCards.length > 0 && sectionRef.current) {
      ScrollTrigger.batch(validCards, {
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { y: 60, opacity: 0, scale: 0.95 },
            {
              y: 0, opacity: 1, scale: 1,
              duration: 0.8, stagger: 0.05, ease: 'power3.out'
            }
          );
        },
        start: "top 90%",
        once: true
      });
    }
  }, []);

  // 2. CLICK HANDLER
  const handleCardClick = (member: TeamMember, index: number) => {
    // Find the actual card container (the child of the wrapper that has the ref)
    const cardWrapper = cardsRef.current[index];
    const cardElement = cardWrapper?.querySelector('.card-container') as HTMLElement;

    if (cardElement) {
      const rect = cardElement.getBoundingClientRect();
      setStartRect(rect);
      setActiveIndex(index);
      setActiveMember(member);
      document.body.style.overflow = 'hidden';
    }
  };

  // 3. EXPAND ANIMATION (The Crossfade Magic)
  useIsomorphicLayoutEffect(() => {
    if (activeMember && startRect && modalRef.current && overlayRef.current && modalImageLayerRef.current) {

      const ctx = gsap.context(() => {
        const tl = gsap.timeline();

        // 1. Hide Original Card
        if (activeIndex !== null && cardsRef.current[activeIndex]) {
          // Hide the inner container, keep the wrapper for layout spacing
          const cardElement = cardsRef.current[activeIndex]?.querySelector('.card-container');
          if (cardElement) gsap.set(cardElement, { opacity: 0 });
        }

        // 2. Setup Initial Modal State (LOOKS EXACTLY LIKE THE CARD)
        gsap.set(modalRef.current, {
          top: startRect.top,
          left: startRect.left,
          width: startRect.width,
          height: startRect.height,
          opacity: 1,
          zIndex: 100,
          backgroundColor: '#18181b',
          border: '1px solid rgba(255,255,255,0.05)'
        });

        // Ensure the temporary image layer is visible initially
        gsap.set(modalImageLayerRef.current, { opacity: 1 });
        // Ensure new text content is hidden initially
        if (modalContentRef.current) gsap.set(modalContentRef.current, { opacity: 0, y: 20 });

        tl.to(overlayRef.current, { opacity: 1, pointerEvents: 'auto', duration: 0.4, ease: 'power1.out' }, 0);

        // 4. Calculate Center Position
        const targetWidth = Math.min(900, window.innerWidth * 0.95); 
        const targetHeight = Math.min(700, window.innerHeight * 0.9);
          
        const targetLeft = (window.innerWidth - targetWidth) / 2;
        const targetTop = (window.innerHeight - targetHeight) / 2;

        tl.to(modalRef.current, {
          top: targetTop,
          left: targetLeft,
          width: targetWidth,
          height: targetHeight,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          border: '1px solid rgba(234,179,8,0.3)', // Yellow tint border on expand
          duration: 0.6,
          ease: 'expo.inOut'
        }, 0);

        // FADE OUT Image Layer during expansion
        tl.to(modalImageLayerRef.current, { opacity: 0, duration: 0.4, ease: 'power2.in' }, 0);

        // FADE IN Text Content slightly later
        if (modalContentRef.current) {
          tl.to(modalContentRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.2);
        }

      }, sectionRef);

      return () => ctx.revert();
    }
  }, [activeMember, startRect, activeIndex]);

  // 4. CLOSE HANDLER (Reverse Crossfade)
  const handleCloseModal = () => {
    if (modalRef.current && overlayRef.current && startRect && modalImageLayerRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          if (activeIndex !== null && cardsRef.current[activeIndex]) {
            const cardElement = cardsRef.current[activeIndex]?.querySelector('.card-container');
            if (cardElement) gsap.set(cardElement, { opacity: 1 });
          }
          setActiveMember(null);
          setStartRect(null);
          setActiveIndex(null);
          document.body.style.overflow = '';
        }
      });

      // Fade OUT text content
      tl.to(modalContentRef.current, { opacity: 0, y: 10, duration: 0.2 }, 0);

      // Fade IN image layer while shrinking
      tl.to(modalImageLayerRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' }, 0.1);

      // Shrink Box back to card rect
      tl.to(modalRef.current, {
        top: startRect.top,
        left: startRect.left,
        width: startRect.width,
        height: startRect.height,
        border: '1px solid rgba(255,255,255,0.05)',
        boxShadow: 'none',
        duration: 0.5,
        ease: 'power4.inOut' // Snappier ease for exit
      }, 0);

      // ADDED: pointerEvents: 'none' to disable clicking when hidden
      tl.to(overlayRef.current, { opacity: 0, pointerEvents: 'none', duration: 0.3 }, "-=0.2");
    }
  };

  // --- CARD COMPONENT ---
  const MemberCard = ({ member, index, isLeader = false }: { member: TeamMember, index: number, isLeader?: boolean }) => {
    return (
      // Outer wrapper holds the ref and space, and the abstract bg
      <div
        ref={(el) => { cardsRef.current[index] = el; }}
        className={`relative group flex-shrink-0 ${isLeader ? 'w-full max-w-[380px] h-[500px]' : 'w-full max-w-[300px] h-[380px]'}`}
      >
        {/* --- NEW ABSTRACT YELLOW BEHIND IMAGE --- */}

        {/* --- THE ACTUAL CARD CONTAINER (This is what visually expands) --- */}
        <div
          onClick={() => handleCardClick(member, index)}
          className="card-container relative h-full w-full cursor-pointer bg-zinc-900 border border-white/5 overflow-hidden transition-transform duration-500 ease-out "
        >
          {/* IMAGE LAYER */}
          <div className="absolute inset-0 z-0">
            <Image
              src={member.imageSrc}
              alt={member.name}
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent opacity-90 transition-opacity duration-300"></div>
          </div>

          {/* TEXT CONTENT (Always Visible) */}
          <div className="absolute bottom-0 left-0 w-full p-6 z-20 flex flex-col justify-end h-full pointer-events-none">
            <div className="translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
              <h3 className={`font-bold text-white leading-tight mb-2 ${isLeader ? 'text-2xl' : 'text-xl'}`}>
                {member.name}
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-6 h-[2px] bg-yellow-500 transition-all duration-300 group-hover:w-10"></div>
                <p className="text-[11px] font-bold text-zinc-300 uppercase tracking-widest group-hover:text-yellow-500 transition-colors duration-300 truncate">
                  {member.role.split(',')[0]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section ref={sectionRef} className="bg-[#191818] font-noto-sans min-h-scree py-10 relative flex flex-col items-center overflow-hidden">


      <div className="mx-auto marginal relative z-10">
        <p className='text-white md:text-4xl text-2xl leading-tight md:w-1/2 mb-14 font-noto-sans font-light mx-auto text-center'>
          We transform ideas into powerful brand moments. Crafted with intelligence, sharpened by design and delivered through technology that resonates.
        </p>
        {/* Leaders */}
        <div className="flex flex-wrap justify-center gap-6 mb-6">
          {leaders.map((member, i) => (
            <MemberCard key={member.id} member={member} index={i} isLeader={true} />
          ))}
        </div>
        {/* Team */}
        <div className="flex flex-wrap justify-center gap-6">
          {teamMembers.map((member, i) => (
            <MemberCard key={member.id} member={member} index={i + leaders.length} />
          ))}
        </div>
      </div>

      <div ref={overlayRef} className="fixed inset-0 bg-black/80 backdrop-blur-sm opacity-0 pointer-events-none z-40" onClick={handleCloseModal} />

      {/* --- MODAL --- */}
      {activeMember && (
        <div
          ref={modalRef}
          className="fixed z-50 overflow-hidden"
          style={{ opacity: 0 }}
        >
          {/* --- TEMPORARY IMAGE LAYER FOR SMOOTH TRANSITION --- */}
          {/* This layer is visible initially and fades out as it expands */}
          <div ref={modalImageLayerRef} className="absolute inset-0 z-0 pointer-events-none">
            <Image
              src={activeMember.imageSrc}
              alt={activeMember.name}
              fill
              className="object-cover grayscale opacity-60" // Keep it styled like the inactive card
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent opacity-90"></div>
            {/* Mimic bottom text for seamless start */}
            <div className="absolute bottom-0 left-0 w-full p-6 z-20 flex flex-col justify-end h-full">
              <h3 className="font-bold text-white leading-tight mb-2 text-xl">{activeMember.name}</h3>
            </div>
          </div>


          {/* --- CLOSE BUTTON --- */}
          {/* Moved button here (outside scrollable area) and changed to absolute */}
          <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-white hover:text-yellow-500 transition-colors z-[60] bg-black/40 rounded-full p-2"
            >
              <X size={24} />
            </button>


          {/* --- ACTUAL MODAL CONTENT (Fades IN) --- */}
          <div
            className="relative z-10 w-full h-full p-8 md:p-12 overflow-y-auto custom-scrollbar bg-zinc-900/90"
            data-lenis-prevent // Added to prevent lenis scroll hijacking
            onWheel={(e) => e.stopPropagation()} // Added extra safety for mouse wheel
            onTouchMove={(e) => e.stopPropagation()} // Added extra safety for touch
          >
           
            <div ref={modalContentRef} className="opacity-0">
              {/* Name */}
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">
                {activeMember.name}
              </h2>

              {/* Designation */}
              <p className="text-yellow-500 font-semibold uppercase tracking-[0.18em] text-xs mb-1">
                {activeMember.role}
              </p>

              {/* Qualification */}
              <p className="text-zinc-400 text-sm italic mb-5">
                {activeMember.qual}
              </p>

              {/* Divider */}
              <div className="w-14 h-[2px] bg-yellow-500/60 mb-8"></div>

              {/* Message */}
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-zinc-200 font-noto-sans font-light leading-relaxe whitespace-pre-line text-lg">
                  {activeMember.message}
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #3f3f46;
          border-radius: 2px;
        }
      `}</style>
    </section>
  );
};

export default TeamSection;