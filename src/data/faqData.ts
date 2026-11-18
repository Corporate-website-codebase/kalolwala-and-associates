// === TYPES === //
export interface FAQItem {
    id: string;
    question: string;
    answer: string;
}

export interface FAQData {
    [category: string]: FAQItem[];
}

interface RawFAQItem {
    question: string;
    answer: string;
}

interface RawFAQData {
    [category: string]: RawFAQItem[];
}

// === UTIL === //
function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

function buildFaqData(raw: RawFAQData): FAQData {
    const data: FAQData = {};
    const usedIds = new Set<string>();

    Object.entries(raw).forEach(([category, items]) => {
        data[category] = items.map((item) => {
            const baseId = slugify(item.question);
            let id = baseId;
            let counter = 2;
            while (usedIds.has(id)) {
                id = `${baseId}-${counter}`;
                counter++;
            }
            usedIds.add(id);
            return { ...item, id };
        });
    });

    return data;
}

// === RAW DATA === //
const FAQ_RAW_DATA: RawFAQData = {
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
],

  "Sustainability and ESG Reports": [
    {
      "question": "Does K&A provide ESG reporting and sustainability reporting services in India?",
      "answer": "Yes. K&A provides ESG reporting services and sustainability reporting support for organisations in India and global markets. Our work includes ESG disclosures, sustainability reports, BRSR reporting, content development and report design, helping businesses communicate their sustainability performance with clarity and credibility."
    },
    {
      "question": "Which sustainability reporting frameworks does K&A work with?",
      "answer": "K&A works with several recognised sustainability reporting frameworks and standards, including GRI Standards, IFRS S1 and S2 (ISSB), BRSR and BRSR Core, the Integrated Reporting Framework, ESRS, GHG Protocol and TNFD. The applicable frameworks depend on an organisation's reporting requirements and stakeholder expectations."
    },
    {
      "question": "What is the difference between an ESG report and a sustainability report?",
      "answer": "An ESG report focuses on an organisation's environmental, social and governance performance, risks and disclosures. A sustainability report generally provides a broader view of its sustainability initiatives, impacts, commitments and long-term objectives. Both help stakeholders understand an organisation's non-financial performance."
    },
    {
      "question": "Can K&A help companies with BRSR and BRSR Core reporting requirements?",
      "answer": "Yes. K&A supports organisations with Business Responsibility and Sustainability Reporting (BRSR) and BRSR Core through content development, disclosure structuring, data presentation and report preparation. We help companies organise reporting information and prepare disclosures supported by verifiable evidence."
    },
    {
      "question": "Does K&A conduct materiality assessments for ESG reporting?",
      "answer": "Materiality assessments help organisations identify and prioritise sustainability topics that are relevant to their business and stakeholders. K&A can support the reporting process by translating identified material topics into structured disclosures and clear sustainability narratives, subject to the agreed scope of work."
    },
    {
      "question": "How does K&A help prevent greenwashing in sustainability reports?",
      "answer": "K&A focuses on evidence-based reporting, source verification and consistency between sustainability disclosures and an organisation's actual practices. We work with sustainability, finance and compliance teams to ensure that reported commitments, initiatives and performance metrics are supported by verifiable information."
    }
  ],
  
  "Investor and Corporate Presentations": [
  {
    "question": "What investor presentation design services does K&A offer?",
    "answer": "K&A provides investor presentation design services for listed companies and growing businesses. These include earnings presentations, investor relations presentations, analyst meets, institutional investor decks, AGM presentations, IPO roadshows and fundraising presentations. Our approach combines financial understanding, strategic content and visual storytelling."
  },
  {
    "question": "How quickly can K&A prepare an earnings presentation?",
    "answer": "The turnaround time depends on the complexity of the presentation, availability of financial information and review requirements. K&A works closely with investor relations and finance teams to plan content, design and revisions around reporting schedules and deadlines."
  },
  {
    "question": "Does K&A write presentation content or only design the slides?",
    "answer": "K&A provides both corporate presentation content services and presentation design. Our team works on the narrative, financial messaging, slide structure and visual presentation to ensure that complex business information is communicated clearly and accurately."
  },
  {
    "question": " How does K&A tailor presentations to a company's business?",
    "answer": "K&A begins by understanding the organisation's business model, financial performance, segment drivers, strategy and target audience. This helps our team develop relevant content and presentation designs that reflect the company's priorities rather than relying on generic templates."
  },
  {
    "question": "Are investor presentations regulated in India?",
    "answer": "Yes. Listed companies in India must follow applicable SEBI disclosure requirements. Under SEBI's LODR Regulations, presentations made to analysts and institutional investors must be shared with stock exchanges. Companies must also comply with applicable disclosure requirements concerning earnings calls and unpublished price-sensitive information."
  },
  {
    "question": "Can K&A create presentation templates for internal teams?",
    "answer": "Yes. K&A can develop customised corporate presentation templates aligned with an organisation's brand identity and communication guidelines. These templates help internal teams maintain consistency in layouts, typography, colours, charts and overall presentation design."
  }
],

"Corporate Branding & Design": [
  {
    "question": "What branding and design services does K&A offer?",
    "answer": "K&A offers brand identity design services covering brand strategy, verbal identity, visual identity, logo design, stationery, corporate collateral, digital interfaces and brand guidelines. We create cohesive brand identity systems that help businesses maintain a consistent presence across all stakeholder touchpoints."
  },
  {
    "question": "How is a corporate brand different from a consumer brand?",
    "answer": "A corporate brand represents an entire organisation, including its purpose, values, reputation and business identity. A consumer brand focuses more specifically on individual products or services and their relationship with customers. Corporate branding builds recognition and credibility among investors, employees, customers and other stakeholders."
  },
  {
    "question": "Does K&A provide corporate brand strategy or only visual design?",
    "answer": "K&A works beyond visual design to develop cohesive corporate brand strategies. Our approach brings together brand positioning, verbal identity, visual language and practical application to ensure that an organisation's identity reflects its business objectives and communicates consistently across platforms."
  },
  {
    "question": "Can K&A manage a complete corporate rebranding project?",
    "answer": "Yes. K&A can support corporate rebranding projects, from defining brand positioning and developing a new visual identity to creating brand guidelines and applying the identity across corporate collateral, digital platforms and communication materials. The scope depends on the organisation's requirements."
  },
  {
    "question": "Does K&A design annual reports in line with a company’s brand?",
    "answer": "Yes. K&A designs annual reports that align with an organisation's corporate identity and visual guidelines. This includes layout design, typography, data visualisation and information presentation, ensuring consistency between the company's brand identity and its corporate reporting."
  }
],

"Corporate Films & Video Reports": [
  {
    "question": "What corporate video production services does K&A offer?",
    "answer": "K&A provides corporate video production services, including concept development, scriptwriting, corporate filmmaking, cinematography, motion graphics, data visualisation and post-production. We create business-focused films that communicate an organisation's strategy, performance and purpose."
  },
  {
    "question": "What is a video annual report?",
    "answer": "A video annual report presents an organisation's annual performance, financial highlights, business strategy and key achievements through a visual storytelling format. It makes complex business information easier for investors, employees and other stakeholders to understand."
  },
  {
    "question": "How does K&A ensure accuracy in corporate films?",
    "answer": "K&A focuses on research, verified business information and subject-matter understanding during script development. Our writers work with annual reports, sustainability reports and investor presentations, helping ensure that corporate films communicate financial performance, ESG information and business strategy accurately."
  },
  {
    "question": "Does K&A use AI in corporate film production?",
    "answer": "AI tools can support selected stages of corporate film production, such as research, content development and visual workflows. However, storytelling, business context, creative direction and factual accuracy remain central to the production process."
  },
  {
    "question": "Can K&A create ESG and sustainability films?",
    "answer": "Yes. K&A creates ESG and sustainability films that communicate an organisation's environmental, social and governance initiatives, performance and commitments. These films help businesses present complex sustainability information through clear narratives and engaging visuals."
  },
  {
    "question": "How long does it take to produce a corporate film?",
    "answer": "The production timeline depends on the film's length, complexity, research requirements, scripting, filming and post-production. A well-defined brief and timely feedback at each stage help ensure smooth and efficient delivery."
  }
],

"Software & Digital Solutions": [
  {
    "question": "What corporate website development services does K&A offer?",
    "answer": "K&A provides corporate website development services, including website strategy, UI/UX design, frontend and backend development, corporate microsites and ongoing maintenance. We build scalable digital platforms that bring an organisation's content, information and brand together."
  },
  {
    "question": "What must a listed company’s website include in India?",
    "answer": "A listed company's website should provide easy access to corporate information, investor relations details, annual reports, financial disclosures, governance information and relevant ESG updates. A well-structured website helps investors, regulators and other stakeholders find accurate information easily."
  },
  {
    "question":"What is enterprise website development, and how is it different from standard website development?",
    "answer":"Enterprise website development focuses on building scalable, secure and performance-driven websites for organisations with complex requirements. Unlike standard websites, enterprise platforms often involve advanced integrations, structured information architecture, multiple user requirements and robust backend systems."

  },
  {
    "question": "What is an interactive annual report microsite?",
    "answer": "An interactive annual report microsite is a dedicated digital platform that presents an organisation's annual report through interactive layouts, data visualisations, navigation and multimedia elements. It makes financial and business information easier for investors and stakeholders to access and understand."
  },
  {
    "question": "Does K&A provide enterprise software development services?",
    "answer": "Yes. K&A provides enterprise software development services focused on digital platforms, frontend and backend architectures, scalable cloud deployments and business-specific digital solutions. Our approach combines technology, functionality and user experience to address organisational requirements."
  },
  {
    "question": "Are K&A websites secure, accessible and compliant?",
    "answer": "K&A develops websites with a focus on security, accessibility, performance and compliance. Our development approach considers robust architecture, user experience and ongoing maintenance to help keep digital platforms reliable as business and regulatory requirements evolve."
  },
  {
    "question": "Can AI chatbots be integrated into corporate websites?",
    "answer": "Yes. AI-powered chatbots can be integrated into corporate websites to help visitors access information, find relevant resources and interact with the organisation more efficiently. These solutions can improve website engagement and simplify information access for different stakeholder groups."
  }
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
    question: "What happens between 'approved' and 'delivered'?",
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
"Where Insight Begins \n(Research & Content)": [
  {
    question: "Does K&A conduct primary research?",
    answer: "Our research approach can draw on both primary inputs and secondary sources, depending on the brief. Management conversations, stakeholder inputs, interviews and subject-matter discussions can happen alongside industry research, public data, company disclosures and market intelligence to build a more complete picture."
  },
  {
    question: "Does K&A write annual report content, or only design it?",
    answer: "Both, and content leads. K&A's content team writes the strategic narrative, CEO/Chair and leadership messages, value creation model, MD&A, BRSR and sustainability disclosures. Design and production follow the narrative, so the story, the numbers and the layout are developed and checked together by one team."
  },
  {
    question: "Which reporting frameworks does K&A work with?",
    answer: "K&A writes to the Integrated Reporting Framework, GRI Standards, SEBI's BRSR and BRSR Core, and IFRS S1 and S2. It also prepares statutory content under the Companies Act, 2013 and SEBI LODR Regulations, and runs materiality assessments covering impact, financial and double materiality."
  },
  {
    question: "How can research help shape an annual report?",
    answer: "Very much so. Our research capability provides the external context against which performance is understood, identify the themes shaping the industry and help place strategic priorities in perspective. It ensures the annual report reflects what happened during the year, and why it mattered."
  },
  {
    question: "What should I look for in an annual report agency in India?",
    answer: "Look for a consultant that can write as well as design, understands SEBI and BRSR requirements, works to frameworks such as Integrated Reporting and GRI, and has delivered reports for large listed companies. Check that content, design and statutory typesetting happen under one roof, which reduces errors between narrative and financials and ensures data consistency throughout the report. Agency with technology-first approach will make your life easier."
  },
  {
    question: "Does K&A prepare BRSR and sustainability reports?",
    answer: "Yes. K&A writes BRSR and BRSR Core disclosures to the standard needed for reasonable assurance, along with GRI-aligned sustainability reports and integrated annual reports. All three are built from one consistent dataset, so figures match across the annual report, BRSR and standalone sustainability report. Our team of sustainability helps collect data, do the calculations of emissions and ensure BRSR report is ready along with the annual report, on-time!"
  },
  {
    question: "Who does K&A work with?",
    answer: "K&A works with listed companies across the Nifty 50 and Sensex 30, mid-cap and IPO-bound companies, and unlisted businesses that report voluntarily. It works directly with CFOs, company secretaries, investor relations, sustainability heads and corporate communication teams."
  },
],
"Utilising The Power of the Right Words (Editorial)": [
  {
    question: "How do you find the story in a year's worth of information?",
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
    answer: "By giving the reader a reason to keep going. A strong narrative has progression, hierarchy and perspective. It connects the year's performance to the decisions, circumstances and ambitions that shaped it, rather than simply moving from one disclosure to the next."
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
    answer: "We start by looking beyond the year's performance to understand the forces that shaped the business, the decisions that influenced its direction and the priorities that will define what comes next. We bring these perspectives together with financial performance, strategy, leadership insight and material developments, creating a narrative that gives stakeholders a clear, connected understanding of the business, its progress and the value it is building over time."
  },
  {
    question: "How do you find the story in a year's worth of numbers?",
    answer: "We look beyond the numbers to understand what moved the business, what shaped the performance and what those changes mean for the organisation. That thinking informs the narrative, hierarchy and visual treatment, allowing data to become part of the story."
  },
  {
    question: "What makes an Integrated Annual Report different?",
    answer: "An Integrated Annual Report connects financial performance with the wider factors that influence long-term value creation. It brings strategy, governance, financial and non-financial performance, material issues, resources and relationships into one connected account of how the organisation creates value over time."
  },
  {
    question: "So, how is an Integrated Annual Report different from a conventional Annual Report?",
    answer: "The distinction lies in the lens. An Annual Report primarily presents the organisation's financial performance, strategy, governance and statutory disclosures for the year. An Integrated Annual Report goes further by showing how these elements connect with the organisation's business model, resources, relationships, risks and opportunities to explain value creation over the short-, medium- and long term."
  },
  {
    question: "Where does a Sustainability Report fit into the picture?",
    answer: "A Sustainability Report focuses specifically on the organisation's environmental, social and governance performance and its broader impacts. It provides greater depth on material sustainability topics, policies, targets, initiatives, performance indicators and commitments, giving stakeholders a more detailed view of how the organisation manages its sustainability responsibilities."
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

export const FAQ_DATA: FAQData = buildFaqData(FAQ_RAW_DATA);

// === QUESTION → ANSWER LOOKUP === //
// Normalises whitespace, case and curly apostrophes/quotes so small differences
// (e.g. trailing spaces) don't break the match.
const normalize = (text: string): string =>
    text
        .replace(/[’‘]/g, "'")
        .replace(/[“”]/g, '"')
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();

const ANSWER_BY_QUESTION = new Map<string, string>();
Object.values(FAQ_DATA)
    .flat()
    .forEach((item) => {
        ANSWER_BY_QUESTION.set(normalize(item.question), item.answer);
    });

export function getFaqAnswer(question: string): string | undefined {
    return ANSWER_BY_QUESTION.get(normalize(question));
}