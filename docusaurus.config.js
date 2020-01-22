module.exports = {
  title: 'DVID',
  tagline: 'Distributed Versioned Image-Oriented Dataservice',
  url: 'https://dvid-io',
  baseUrl: '/',
  favicon: '',
  organizationName: 'janelia-flyem', // Usually your GitHub org/user name.
  projectName: 'dvid', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'DVID',
      logo: {
        alt: 'DVID Logo',
        src: 'img/logo.svg',
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
          title: 'Docs',
          items: [
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
            {
              label: 'Optic lobe, mushroom body, etc',
              href: 'http://flyem.dvid.io',
            }
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
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
    plugins: ['@docusaurus/plugin-google-analytics'],
    themeConfig: {
      googleAnalytics: {
        trackingID: 'UA-156681767-1',
      },
    },
};
