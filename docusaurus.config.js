module.exports = {
  title: 'DVID',
  tagline: 'Distributed Versioned Image-Oriented Dataservice',
  url: 'https://dvid-io',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'janelia-flyem', // Usually your GitHub org/user name.
  projectName: 'dvid', // Usually your repo name.
  plugins: ['@docusaurus/plugin-google-analytics'],
  themeConfig: {
    googleAnalytics: {
        trackingID: 'UA-156681767-1',
    },
    navbar: {
      title: 'DVID',
      logo: {
        alt: 'DVID Logo',
        src: 'img/favicon-512x512.png',
      },
      links: [
        {to: 'docs/about', label: 'Docs', position: 'left'},
        {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/janelia-flyem/dvid',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Read',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'About',
              to: 'docs/about',
            },
            {
              label: 'Papers and Articles',
              to: 'docs/papers',
            },
          ],
        },
        {
          title: 'Datasets',
          items: [
            {
              label: 'Hemibrain',
              href: 'docs/hemibrain',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/janelia-flyem/dvid',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/janeliaflyem',
            },
          ],
        },
        {
          title: 'Links',
          items: [
            {
              label: 'FlyEM',
              href: 'https://www.janelia.org/project-team/flyem',
            },
          ],
        },

      ],
      copyright: `Copyright © ${new Date().getFullYear()} DVID. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
