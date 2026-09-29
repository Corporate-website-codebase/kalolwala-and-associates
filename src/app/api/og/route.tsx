import fs from 'fs'
import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import path from 'path'

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)

        const title = searchParams.get('title') || 'Kalolwala & Associates'
        const rawPath = searchParams.get('path') || searchParams.get('url') || ''

        // Format clean display URL
        let displayUrl = 'kalolwala.com'
        if (rawPath) {
            const clean = rawPath.replace(/^https?:\/\//i, '').replace(/^www\./i, '')
            if (clean.startsWith('kalolwala.com')) {
                displayUrl = clean.replace(/\/$/, '') || 'kalolwala.com'
            } else if (clean.startsWith('/')) {
                displayUrl = clean === '/' ? 'kalolwala.com' : `kalolwala.com${clean}`
            } else {
                displayUrl = `kalolwala.com/${clean}`.replace(/\/$/, '')
            }
        }

        // Read the high-resolution logo from the local filesystem and convert to base64
        const logoPath = path.join(process.cwd(), 'public', 'images', 'kna.png')
        const logoData = fs.readFileSync(logoPath)
        const logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`

        // Adjust font size dynamically based on title length for optimal readability
        const titleLength = title.length
        let fontSize = 56
        if (titleLength > 75) {
            fontSize = 42
        } else if (titleLength > 50) {
            fontSize = 48
        }

        return new ImageResponse(
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#ffffff',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    padding: '50px 60px 60px 60px',
                    textAlign: 'center',
                    position: 'relative',
                }}
            >
                {/* Top section: Logo */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '10px',
                    }}
                >
                    <img
                        src={logoBase64}
                        alt="Kalolwala & Associates"
                        width={190}
                        height={190}
                        style={{ objectFit: 'contain' }}
                    />
                </div>

                {/* Middle section: Title */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 40px',
                        maxWidth: '1060px',
                        flexGrow: 1,
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            fontSize: fontSize,
                            fontWeight: 800,
                            color: '#0f172a',
                            lineHeight: 1.25,
                            letterSpacing: '-0.025em',
                            textAlign: 'center',
                        }}
                    >
                        {title}
                    </div>
                </div>

                {/* Bottom section: URL display */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '20px',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '8px 26px',
                            borderRadius: '9999px',
                            backgroundColor: '#f8fafc',
                            border: '1.5px solid #e2e8f0',
                            fontSize: 22,
                            fontWeight: 600,
                            color: '#64748b',
                            letterSpacing: '-0.01em',
                        }}
                    >
                        <span
                            style={{
                                display: 'flex',
                                color: '#eab308',
                                fontSize: 28,
                                lineHeight: '22px',
                                marginRight: '8px',
                            }}
                        >
                            ●
                        </span>
                        <span>{displayUrl}</span>
                    </div>
                </div>

                {/* Bottom yellow accent bar */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '14px',
                        backgroundColor: '#f5c518',
                    }}
                />
            </div>,
            {
                width: 1200,
                height: 630,
                headers: {
                    'Cache-Control': 'public, max-age=31536000, immutable',
                },
            },
        )
    } catch (e: any) {
        console.error('OG Image generation failed', e)
        return new Response('Failed to generate OG image', { status: 500 })
    }
}
