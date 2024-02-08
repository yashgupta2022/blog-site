/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol:'https',
            hostname: 'assets.stickpng.com',
            pathname:'**'
        } ,
        {
            protocol:'https',
            hostname: 'i.pinimg.com',
            pathname:'**'
        } ,
        {
            protocol:'https',
            hostname: 'static-00.iconduck.com',
            pathname:'**'
        }
    ]
    },
}

export default nextConfig;
