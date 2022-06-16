export interface Social {
  name: string
  link: string
}

export type SocialId = 'audit' | 'docs' | 'github' | 'twitter' | 'mirror'

/*
 * Supported walelts
 */

const socials: { [key in SocialId]: Social } = {
  audit: {
    name: 'MetaMask',
    link: 'https://google.com',
  },
  docs: {
    name: 'Docs',
    link: 'https://google.com',
  },
  github: {
    name: 'GitHub',
    link: 'https://google.com',
  },
  twitter: {
    name: 'Twitter',
    link: 'https://google.com',
  },
  mirror: {
    name: 'Mirror',
    link: 'https://google.com',
  },
}

export const socialsArray: Social[] = Object.values(socials)
