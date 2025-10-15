/** @type {import('next').NextConfig} */
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const nextConfig = {
    images: {
        domains: ['i.ibb.co', 'cdn.jsdelivr.net', 'lh3.googleusercontent.com'], // Add other domains as needed
    },
    webpack: (config) => {
        // ensure '@' alias resolves to ./src during webpack builds
        config.resolve = config.resolve || {}
        config.resolve.alias = config.resolve.alias || {}
        config.resolve.alias['@'] = path.resolve(__dirname, 'src')
        return config
    }
};

export default nextConfig;
