export interface Visionary {
    id: 'ceo' | 'cso'
    slug: 'hussain-kalolwala' | 'jumana-vadnagarwala'
    name: string
    designation: string
    image: string
    message:string
    quote: string
    linkedin?: string
    seo: {
        title: string
        description: string
        keywords: string[]
    }
}

export const VISIONARIES_DATA: Record<string, Visionary> = {
    'hussain-kalolwala': {
        id: 'ceo',
        slug: 'hussain-kalolwala',
        name: 'Hussain Kalolwala',
        designation: 'CEO & Director',
        image: '/images/H.webp',
         message: 'Hussain Kalolwala built K&A  the way one builds a family. A CA and CS, he started the firm in 2015 with just a few people and a vision that felt larger than the room it was born in.  He knew two things: that communication could shape the way businesses think and that people, when trusted and empowered, could shape the destiny of an organisation.\n\nHussain’s ability to see opportunity where others see complexity, and to navigate the corporate landscape with clarity, courage, and discipline has helped K&A reach where it is now. He has grown the company with the steadiness of a founder who understands both the power of meticulous execution and the value of human connection. To him, K&A is a collective of people whose growth, aspirations and well-being matter as much as the work they produce. That belief has created a culture rooted in trust, mutual respect and shared ambition.\n\nHussain’s contribution to the world of corporate and sustainability communication has been widely recognised. He was honoured in Reputation Today’s ‘40 Young Turks – Class of 2020’, and his insights on annual reporting and ESG have been featured in respected publications. K&A’s Annual Reports and Integrated Reports, crafted under his guidance, continue to earn international acclaim for design, clarity and strategic depth.\n\nWhat sets him apart is his strategic mind and his belief that great work is born from great people. Hussain leads with sharp intuition, holding K&A together like a family while steering it forward with the discipline of a founder who knows exactly where he wants to go, and the humility to take everyone along.',
        quote:
            'The global communication landscape is changing at the blink of an eye, driven by high-tech innovation. Amid the whirlwind of change around us, our philosophy is to stay true to our core values, navigate the change with strategic foresight and craft authentic communication for our clients that stands the test of time.',
        linkedin: 'https://www.linkedin.com/in/thekalolwala/',
        seo: {
            title: 'Hussain Kalolwala | CEO & Director | Kalolwala & Associates',
            description:
                'Explore the vision of Hussain Kalolwala, CEO & Director at Kalolwala & Associates (K&A). Leading corporate reporting and stakeholder communications with strategic foresight.',
            keywords: [
                'Hussain Kalolwala',
                'CEO & Director K&A',
                'Kalolwala and Associates',
                'Corporate reporting',
                'Stakeholder communication',
            ],
        },
    },
    'jumana-vadnagarwala': {
        id: 'cso',
        slug: 'jumana-vadnagarwala',
        name: 'Jumana Vadnagarwala',
        designation: 'Chief Strategy Officer & Director',
        image: '/images/J.webp',
        message: 'Jumana Vadnagarwala has spent close to a decade shaping Kalolwala & Associates (K&A) with vision, discipline and heart. As Director and Chief Strategy Officer, she stands at the intersection of strategy, people and process, guiding the organisation’s growth while nurturing the culture that holds it together.\n\nWhat makes Jumana remarkable is not just her deep understanding of strategy, compliance and corporate laws, but the way she brings humanity into every decision. She thinks long-term, plans with precision and ensures that K&A’s work remains aligned with the highest regulatory and industry standards. At the same time, she has an instinctive ability to connect with clients, teams and young talent finding their footing.\n\nHer role in building K&A’s people ecosystem has been transformative. From expanding teams across Kolkata, Gurugram, Mumbai, Hyderabad and Bengaluru,  to shaping capability-building initiatives for a fast-evolving industry, she has been central to creating a cohesive, future-ready organisation. Her guidance is steady and thoughtful; she leads by listening, mentoring and helping individuals find confidence in their own strengths.\n\nHer contributions have been widely acknowledged, including being honoured as Female Entrepreneur of the Year by the Asia Leadership Awards, an achievement that reflects her professional excellence and her commitment to building K&A with integrity and intention.',
        quote:
            'Strategy is a multivariable equation at K&A, which involves resource planning and acquisition, optimal resource utilisation and above all facilitating execution brilliance and adaptation to change. If it is an equation, what do all these vectors equate to? The answer is sustainable value creation for our clients and our internal teams alike.',
        linkedin: 'https://www.linkedin.com/in/jumana-vadnagarwala-a99a3a109/',
        seo: {
            title: 'Jumana Vadnagarwala | Chief Strategy Officer & Director | Kalolwala & Associates',
            description:
                'Learn about Jumana Vadnagarwala, Chief Strategy Officer & Director at Kalolwala & Associates (K&A). Facilitating execution brilliance and sustainable value creation.',
            keywords: [
                'Jumana Vadnagarwala',
                'Chief Strategy Officer & Director',
                'Kalolwala and Associates',
                'Corporate strategy',
                'Sustainable value creation',
            ],
        },
    },
}

export const VISIONARIES_LIST: Visionary[] = Object.values(VISIONARIES_DATA)

export function getVisionaryBySlug(slug: string): Visionary | undefined {
    return VISIONARIES_DATA[slug]
}

export function getAllVisionarySlugs(): string[] {
    return Object.keys(VISIONARIES_DATA)
}
