import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
      name: 'Khizar Amin',
      short_name: 'Khizar Amin',
      description: 'Khizar Amin\'s Portfolio',
      start_url: '/',
      display: 'standalone',
      background_color: '#fff',
      theme_color: '#fff',
      icons: [
        {
          src: '/favicon.ico',
          sizes: 'any',
          type: 'image/x-icon',
        },
      ],
    }
  }