/** @type {import('next').NextConfig} */
const nextConfig = {

    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://57.128.86.34:8080/api/:path*'
            },
        ]
    },
};

export default nextConfig;

//'http://57.128.86.34:8080/api/:path*'
//'http://localhost:8080/api/:path*'
