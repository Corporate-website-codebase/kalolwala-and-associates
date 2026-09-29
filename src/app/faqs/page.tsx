"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footers from "@/components/Footers";

// === TYPES === //
interface FAQItem {
    question: string;
    answer: string;
}

interface FAQData {
    [category: string]: FAQItem[];
}

interface AccordionItemProps {
    question: string;
    answer: string;
    index: number;
}

// === DATA === //
const FAQ_DATA:FAQData = {
  "The K&A Approach": [
  {
    question: "What does K&A bring to a corporate communication brief?",
    answer: "We bring together business understanding, editorial thinking, design intelligence and technology. That allows us to look beyond the immediate deliverable and understand what the communication needs to achieve, who it needs to reach and how the story should travel across formats and stakeholder touchpoints."
  },
  {
    question: "How do you uncover the story within a business? ",
    answer: "We start by understanding the business behind the information. We look at strategy, performance, context, markets and the forces shaping the organisation. From there, we identify the ideas that deserve attention, establish the narrative and build the communication around them. The objective is to make the business intelligible."
  },
  {
    question: "What happens before you start writing?",
    answer: "A fair amount of thinking. We review the information, understand the organisation, identify the audience and establish the communication objective. We then determine the narrative architecture before developing the story. This means the writing has a clear role within the larger story rather than becoming a collection of well-written pages."
  },
//   {
//     question: "Can you work with companies that already have internal content prepared?",
//     answer: "Yes. K&A can edit, structure and apply designing knowledge to client-provided content for Annual Reports, Sustainability Reports and ESG reports."
//   },
],
"Orchestrating the Details (Project Management)": [
  {
    question: "What keeps a project going when there are many moving parts?",
    answer: "A clear line of sight. We establish the objective early, define ownership and keep decisions moving. With editorial, design, production, technology and multiple stakeholders working in parallel, disciplined project management brings these strands together, keeping the work aligned from the first brief to final delivery."
  },
  {
    question: "Who keeps the story intact when so many teams are working on it?",
    answer: "The project team. We stay close to the content, creative direction and business objective throughout the process, ensuring that decisions made along the way strengthen the original idea rather than dilute it."
  },
  {
    question: "What happens between ‘approved’ and ‘delivered’?",
    answer: "A great deal. Content is refined, layouts are tested, data is checked, disclosures are reconciled, proofs are reviewed and production details are resolved. We manage this final stretch with the same attention as the creative process, because quality is often determined in the details."
  },
  {
    question: "How do you keep multiple stakeholders moving in the same direction?",
    answer: "By creating clarity around who needs to decide what, when and why. We structure review processes, consolidate inputs and keep the larger objective visible, so that multiple perspectives can contribute without pulling the project apart."
  },
  {
    question: "How do you keep quality consistent when timelines are tight?",
    answer: "By building quality into the process rather than leaving it to the final review. Structured checkpoints, experienced teams, rigorous proofing and close coordination help us identify issues early and keep standards consistent through delivery."
  },
  {
    question: "What is the difference between coordinating a project and owning it?",
    answer: "Coordination keeps tasks moving. Ownership means understanding why the project matters, anticipating what could impact it, keeping an eye on the workflow and staying accountable for the outcome."
  },
  {
    question: "When a deadline cannot move, what can?",
    answer: "The way we work. We reassess priorities and bring the right teams together and make decisions quickly. The objective is to protect the quality of the final communication without allowing moving parts to become an excuse for delay. "
  },
],
"Where Insight Begins (Research)": [
  {
    question: "What does research mean at K&A?",
    answer: "Research is where we begin to understand the business behind the brief. We examine the organisation, its industry, competitive landscape, performance, stakeholders and the forces shaping its future. The objective is to build enough context to ask better questions, identify meaningful insights and create communication grounded in substance."
  },
  {
    question: "Why does research matter for corporate communication?",
    answer: "Good communication begins with understanding. Research gives us the context to distinguish what is genuinely important from what is simply available, helping us build narratives that are more informed, relevant and specific to the organisation."
  },
  {
    question: "How does research influence the final story?",
    answer: "The value of research lies in what it changes: the questions we ask, the themes we pursue, the comparisons we make and the context we bring to the narrative. It gives the story greater depth without making the communication feel research-heavy."
  },
  {
    question: "How do you separate an interesting fact from a meaningful insight?",
    answer: "We look at what the facts tell us about the business. A number, trend or market development becomes an insight when it changes how we understand performance, strategy, opportunity or risk. The distinction is important because communication should be built around meaning, not simply information."
  },
  {
    question: "Does K&A conduct primary research?",
    answer: "Our research approach can draw on both primary inputs and secondary sources, depending on the brief. Management conversations, stakeholder inputs, interviews and subject-matter discussions can happen alongside industry research, public data, company disclosures and market intelligence to build a more complete picture."
  },
  {
    question: "How can research help shape an annual report?",
    answer: "Very much so. Research can provide the external context against which performance is understood, identify the themes shaping the industry and help place strategic priorities in perspective. It ensures the annual report reflects what happened during the year, and why it mattered."
  },
  {
    question: "How does research work with Editorial?",
    answer: "Research gives editorial its depth. It helps writers understand the subject before they shape the narrative and bring context into the story. The two disciplines work together: research establishes what we need to understand; Editorial determines how that understanding should be communicated."
  },
],
"Utilising The Power of the Right Words (Editorial)": [
  {
    question: "How do you find the story in a year’s worth of information?",
    answer: "We look beyond what happened to understand what mattered. By connecting performance, strategy, context and change, we identify the ideas that deserve to lead the narrative and give the rest a meaningful place within it."
  },
  {
    question: "How do you make a complex business easy to understand?",
    answer: "We establish what the reader needs to understand, build the right sequence and use language with precision. Clarity comes from better thinking and structure, not from stripping away substance."
  },
  {
    question: "Can editing change the way a business is understood?",
    answer: "Absolutely. The order in which ideas appear, the context around a number or the language used to describe a strategic shift can materially change how a reader understands the business. Good editing is therefore as much about judgment as language."
  },
  {
    question: "When does editing become more than proofreading?",
    answer: "When we start questioning the ideas behind the words. Proofreading checks whether something is correct. Editing asks whether it is necessary, clear, relevant and in the right place. We work at both levels."
  },
  {
    question: "How do you turn data into a narrative?",
    answer: "Data tells us what changed. Editorial thinking explores why it changed, what it means and where it fits within the larger story. That context allows numbers to become evidence rather than isolated statistics."
  },
  {
    question: "How do you make an annual report worth reading?",
    answer: "By giving the reader a reason to keep going. A strong narrative has progression, hierarchy and perspective. It connects the year’s performance to the decisions, circumstances and ambitions that shaped it, rather than simply moving from one disclosure to the next."
  },
],
"Shaping the Way Stories are Seen (Design and Typesetting)": [
  {
    question: "What makes a corporate document feel designed rather than simply formatted?",
    answer: "Design should give information structure, rhythm and meaning. We use visual hierarchy, typography, imagery, grids and information design to help the reader understand what matters, where to look and how different pieces of information connect."
  },
  {
    question: "How do you design when the content itself is complex?",
    answer: "We design to bring structure to information and make every interaction intuitive.Data, financial statements, ESG disclosures and technical information each require a different visual treatment. The challenge is to give each its appropriate structure while keeping the larger document coherent."
  },
  {
    question: "How do you make hundreds of pages feel like one publication?",
    answer: "By creating a visual system rather than designing pages in isolation. Typography, grids, colour, imagery, charts, tables and page architecture are developed as a connected language, giving the publication consistency while allowing individual sections to have their own character."
  },
  {
    question: "Where does typesetting become a craft?",
    answer: "When precision starts affecting how information is understood. Typesetting involves much more than putting text into pages. It requires attention to hierarchy, spacing, tables, charts, footnotes, cross-references, pagination and the smallest details that determine whether a complex publication feels considered and effortless to navigate."
  },
  {
    question: "How do you keep design integrity intact when the content keeps changing?",
    answer: "By building flexibility into the design system from the beginning. Corporate publications rarely remain static during production. New numbers arrive, pages expand, disclosures change and approvals introduce revisions. A robust system allows the design to absorb those changes without losing its logic or visual integrity."
  },
  {
    question: "Can design make data more meaningful?",
    answer: "Yes. The right visual treatment can reveal relationships, trends and contrasts that are difficult to see in a table of numbers. We use information design and visualisation to give data context and hierarchy, while keeping the underlying information accurate and intact."
  },
  {
    question: "What happens when design meets the realities of production?",
    answer: "That is where good design proves itself. A concept has to work not only on screen, but through typesetting, proofreading, statutory disclosures, print specifications and final production. Our design and production teams work closely so that creative intent survives all the way to the finished publication."
  },
],
"The Digital Experience (Digital)": [
  {
    question: "What happens when a corporate story moves from paper to screen?",
    answer: "It needs to be re-thought. Digital allows information to become interactive, searchable and more immediate. We consider how people will navigate, discover and engage with the content and build the experience accordingly."
  },
  {
    question: "Can the same idea work across a report, website and film?",
    answer: "Yes, provided the idea is strong enough. The expression should change with the medium, but the underlying narrative should remain recognisable. We develop communication systems that allow a central story to travel across formats without becoming repetitive."
  },
  {
    question: "What makes a corporate website more than a digital brochure?",
    answer: "It should help people understand the organisation, find what matters to them and engage with the business intuitively. That requires more than visual design. Content architecture, UX, technology, performance and functionality all have to work together."
  },
  {
    question: "Where do technology and storytelling meet at K&A?",
    answer: "At the point where information becomes an experience. We combine editorial and design thinking with digital capabilities to create websites, microsites and interactive experiences that make complex business information more accessible and engaging."
  },
],
"The K&A Model\n(How K&A Creates Value)": [
  {
    question: "Why bring editorial, design, production and technology together?",
    answer: "Because the best communication happens when these disciplines inform one another. The story influences the design; the design influences how information is structured; technology changes how the audience experiences it. Keeping these capabilities connected allows us to make better decisions throughout the process."
  },
  {
    question: "What is the advantage of having these capabilities under one roof?",
    answer: "Continuity. The team shaping the narrative understands the design; the design team understands the content; production understands the intent; and digital understands the experience. Fewer hand-offs mean greater control, faster problem-solving and a more coherent final product."
  },
  {
    question: "What makes K&A different?",
    answer: "We bring substance and storytelling together. Our work begins with understanding the business and extends through editorial, design, production and technology. That combination allows us to approach communication as one connected discipline, rather than a series of separate deliverables."
  },
  {
    question: "What is the simplest way to describe what K&A does?",
    answer: "We understand the business, find the story and build the communication around it. Whether that communication lives in a report, presentation, film, website or digital experience, the principle remains the same: bring clarity, give prominence to what matters and create stories that capture attention."
  },
],
"The Story Behind the Report\n(Difference Between AR, IAR and SR and our Approach to Them)": [
  {
    question: "How do you tell a business story through an annual report? ",
    answer: "We start by looking beyond the year’s performance to understand the forces that shaped the business, the decisions that influenced its direction and the priorities that will define what comes next. We bring these perspectives together with financial performance, strategy, leadership insight and material developments, creating a narrative that gives stakeholders a clear, connected understanding of the business, its progress and the value it is building over time."
  },
  {
    question: "How do you find the story in a year’s worth of numbers?",
    answer: "We look beyond the numbers to understand what moved the business, what shaped the performance and what those changes mean for the organisation. That thinking informs the narrative, hierarchy and visual treatment, allowing data to become part of the story."
  },
  {
    question: "What makes an Integrated Annual Report different?",
    answer: "An Integrated Annual Report connects financial performance with the wider factors that influence long-term value creation. It brings strategy, governance, financial and non-financial performance, material issues, resources and relationships into one connected account of how the organisation creates value over time."
  },
  {
    question: "So, how is an Integrated Annual Report different from a conventional Annual Report?",
    answer: "The distinction lies in the lens. An Annual Report primarily presents the organisation’s financial performance, strategy, governance and statutory disclosures for the year. An Integrated Annual Report goes further by showing how these elements connect with the organisation’s business model, resources, relationships, risks and opportunities to explain value creation over the short-, medium- and long term."
  },
  {
    question: "Where does a Sustainability Report fit into the picture?",
    answer: "A Sustainability Report focuses specifically on the organisation’s environmental, social and governance performance and its broader impacts. It provides greater depth on material sustainability topics, policies, targets, initiatives, performance indicators and commitments, giving stakeholders a more detailed view of how the organisation manages its sustainability responsibilities."
  },
  {
    question: "Can the same sustainability story work across an Annual Report and a Sustainability Report?",
    answer: "The underlying facts should remain consistent, but the depth and emphasis can differ. An Annual Report integrates material sustainability matters into the broader business narrative, while a Sustainability Report can examine those matters in greater detail, supported by stronger disclosures, metrics and topic-specific context."
  },
  {
    question: "How do you make Sustainability Reporting rigorous without making it difficult to engage with?",
    answer: "We begin with the substance: material topics, performance data, frameworks, targets and evidence. We then build the story around what stakeholders need to understand, using hierarchy, context, visualisation and clear language to make detailed disclosures accessible without diluting rigour."
  },
  {
    question: "What turns a sustainability report from disclosure into communication?",
    answer: "Context. Data and disclosures become more meaningful when stakeholders can understand why an issue matters, how it connects to the business, what the organisation is doing about it and how progress is being measured. We bring those connections into the narrative so the report communicates performance rather than simply presenting information."
  },
  {
    question: "How do you decide what belongs in each report?",
    answer: "We start with purpose and audience. The Annual Report needs to present the business as a whole; the Integrated Annual Report connects the different dimensions of value creation; the Sustainability Report provides deeper insight into ESG performance and impacts. The content is then tailored to the purpose of each report. "
  },
  {
    question: "What if an organisation publishes all three?",
    answer: "They should feel connected without becoming repetitive. We establish a common narrative and consistent fact base, then give each publication its own role, level of detail and audience focus. This creates a coherent reporting ecosystem rather than three documents telling the same story."
  },
],
};

const premiumEase = [0.16, 1, 0.3, 1] as const;

// === COMPONENTS === //
const AccordionItem = ({ question, answer, index }: AccordionItemProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: index * 0.05, duration: 0.6, ease: premiumEase }}
            className="border-b border-white/10 group"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full cursor-pointer py-8 md:py-10 flex justify-between items-start text-left hover:bg-white/[0.01] transition-colors duration-500 px-4 -mx-4"
            >
                <span className="text-xl md:text-2xl font-normal tracking-tight pr-8 text-white/80 group-hover:text-white transition-colors duration-300">
                    {question}
                </span>

                <div className="relative flex items-center justify-center w-6 h-6 mt-2 shrink-0">
                    <motion.div
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        transition={{ duration: 0.4, ease: premiumEase }}
                        className="absolute w-full h-[1px] bg-white/30 group-hover:bg-[#f5c518]"
                    />
                    <motion.div
                        animate={{ rotate: isOpen ? 90 : 0, scaleY: isOpen ? 0 : 1 }}
                        transition={{ duration: 0.4, ease: premiumEase }}
                        className="absolute h-full w-[1px] bg-white/30 group-hover:bg-[#f5c518]"
                    />
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: premiumEase }}
                        className="overflow-hidden"
                    >
                        <div className="pb-12 pt-2 max-w-2xl">
                            <p className="text-base md:text-lg text-white/70 leading-relaxed font-normal">
                                {answer}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default function FAQPage() {
    return (
        <main className="min-h-screen bg-[#080808] text-white selection:bg-[#f5c518] selection:text-black">

            {/* 1. HERO SECTION */}
            <section className="pb-20 px-6 md:px-12 max-w-[1600px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                    <div className="lg:col-span-8">

                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.1, ease: premiumEase }}
                            className=" text-white pt-32 sm:pt-40 font-light sm:font-thin text-[clamp(32px,4.4vw,60px)] mb-8 leading-tight"
                        >
                            Your
                            Questions,<br />
                            Answered.
                        </motion.h1>
                    </div>

                </div>
            </section>

            {/* 2. STICKY CONTENT SECTION */}
            <section className="px-6 md:px-12 max-w-[1600px] mx-auto border-t border-white/10">
                {Object.entries(FAQ_DATA).map(([category, faqs], catIndex) => (
                    <div key={category} className="grid grid-cols-1 lg:grid-cols-12 group/section">

                        {/* LEFT SIDE: Sticky Category Heading */}
                        <aside className="lg:col-span-4 lg:border-r lg:border-white/10 relative">
                            <div className="sticky top-0 lg:top-12 h-fit py-12 lg:py-20 pr-8 bg-[#080808] z-20">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    className="flex flex-col gap-4"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-[#f5c518] font-noto-sans text-xl">
                                            0{catIndex + 1}
                                        </span>
                                        <div className="h-[1px] w-8 bg-white/10" />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight text-white/90 leading-none whitespace-pre-line">
                                        {category}
                                    </h3>
                                    {/* <p className="text-[10px] uppercase tracking-[0.3em] text-gray-600 font-bold mt-2">
                                        Section {catIndex + 1}
                                    </p> */}
                                </motion.div>
                            </div>
                        </aside>

                        {/* RIGHT SIDE: Questions List */}
                        <div className="lg:col-span-8 lg:pl-16 py-12 lg:py-20">
                            <div className="space-y-0">
                                {faqs.map((faq, index) => (
                                    <AccordionItem
                                        key={index}
                                        index={index}
                                        question={faq.question}
                                        answer={faq.answer}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </section>
            <Footers nextPageName="Contact" nextPageLink="/contact" />
        </main>
    );
}