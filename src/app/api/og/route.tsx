import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    
    const title = searchParams.get('title') || 'Kalolwala & Associates';
    const description = searchParams.get('description') || 'Corporate Reporting, Branding & Digital Solutions';

    // Read the logo from the local filesystem and convert to base64
    const logoPath = path.join(process.cwd(), 'public', 'images', 'kna-email.png');
    const logoData = fs.readFileSync(logoPath);
    const logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`;

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            padding: '80px',
            textAlign: 'center',
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', marginBottom: '40px' }}>
            <img
              src={logoBase64}
              alt="Kalolwala & Associates"
              width={250}
              height={80}
              style={{ objectFit: 'contain' }}
            />
          </div>

          {/* Title */}
          <div
            style={{
              display: 'flex',
              fontSize: 72,
              fontWeight: 800,
              color: '#111827',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              marginBottom: '24px',
              textAlign: 'center',
            }}
          >
            {title}
          </div>

          {/* Description */}
          <div
            style={{
              display: 'flex',
              fontSize: 32,
              color: '#4b5563',
              lineHeight: 1.5,
              textAlign: 'center',
              maxWidth: '900px',
            }}
          >
            {description}
          </div>

          {/* Bottom yellow accent bar */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '16px',
              backgroundColor: '#f5c518',
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error("OG Image generation failed", e);
    return new Response('Failed to generate OG image', { status: 500 });
  }
}
