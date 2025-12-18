/**
 * VIGILCAP REPORT VERIFICATION WORKER
 * ====================================
 * 
 * This Cloudflare Worker handles secure HMAC-SHA256 verification of reports.
 * The secret key is stored as an environment variable, never exposed to clients.
 * 
 * SETUP INSTRUCTIONS:
 * -------------------
 * 1. Go to https://dash.cloudflare.com
 * 2. Create a free account if you don't have one
 * 3. Go to "Workers & Pages" → "Create Application" → "Create Worker"
 * 4. Name it: vigilcap-verify
 * 5. Click "Quick Edit" and paste this entire code
 * 6. Click "Save and Deploy"
 * 7. Go to Worker Settings → Variables → Add:
 *    Name: SECRET_KEY
 *    Value: VIGILCAP_SECURE_HASH_KEY_2025
 *    (Or your actual secret key)
 * 8. Your endpoint will be: https://vigilcap-verify.YOUR_SUBDOMAIN.workers.dev/verify
 * 9. Update verify.html with this URL
 * 
 * CUSTOM DOMAIN (Optional):
 * -------------------------
 * To use verify.vigilcap.com:
 * 1. In Cloudflare Dashboard, add your domain
 * 2. Go to Worker → Triggers → Add Custom Domain
 * 3. Enter: verify.vigilcap.com
 */

// CORS headers for cross-origin requests
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
    async fetch(request, env, ctx) {
        // Handle CORS preflight
        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }

        // Only accept POST requests to /verify
        const url = new URL(request.url);

        if (request.method !== 'POST' || url.pathname !== '/verify') {
            return new Response(JSON.stringify({ error: 'Not found' }), {
                status: 404,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        try {
            // Parse request body
            const { file, signature } = await request.json();

            if (!file || !signature) {
                return new Response(JSON.stringify({
                    valid: false,
                    error: 'Missing file or signature'
                }), {
                    status: 400,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }

            // Decode base64 file data
            const fileData = Uint8Array.from(atob(file), c => c.charCodeAt(0));

            // Get secret key from environment variable
            const secretKey = env.SECRET_KEY || 'VIGILCAP_SECURE_HASH_KEY_2025';

            // Import the secret key for HMAC
            const key = await crypto.subtle.importKey(
                'raw',
                new TextEncoder().encode(secretKey),
                { name: 'HMAC', hash: 'SHA-256' },
                false,
                ['sign']
            );

            // Compute HMAC-SHA256
            const signatureBuffer = await crypto.subtle.sign('HMAC', key, fileData);

            // Convert to hex string
            const computedSignature = Array.from(new Uint8Array(signatureBuffer))
                .map(b => b.toString(16).padStart(2, '0'))
                .join('')
                .toUpperCase();

            // Constant-time comparison to prevent timing attacks
            const isValid = constantTimeCompare(computedSignature, signature.toUpperCase());

            return new Response(JSON.stringify({
                valid: isValid,
                message: isValid ? 'Report verified successfully' : 'Signature does not match'
            }), {
                status: 200,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });

        } catch (error) {
            console.error('Verification error:', error);
            return new Response(JSON.stringify({
                valid: false,
                error: 'Internal server error'
            }), {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }
    }
};

/**
 * Constant-time string comparison to prevent timing attacks
 */
function constantTimeCompare(a, b) {
    if (a.length !== b.length) {
        return false;
    }

    let result = 0;
    for (let i = 0; i < a.length; i++) {
        result |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }

    return result === 0;
}
