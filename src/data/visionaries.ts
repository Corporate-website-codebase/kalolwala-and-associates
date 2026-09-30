export interface Visionary {
    id: 'ceo' | 'cso'
    slug: 'hussain-kalolwala' | 'jumana-vadnagarwala'
    name: string
    designation: string
    image: string
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
