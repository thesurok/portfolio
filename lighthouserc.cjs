module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run preview -- --host 127.0.0.1 --port 4321',
      startServerReadyPattern: '4321',
      url: [
        'http://127.0.0.1:4321/portfolio/',
        'http://127.0.0.1:4321/portfolio/work/',
        'http://127.0.0.1:4321/portfolio/about/',
        'http://127.0.0.1:4321/portfolio/work/lattice/',
      ],
      numberOfRuns: 1,
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.95 }],
        'categories:accessibility': ['warn', { minScore: 0.95 }],
        'categories:best-practices': ['warn', { minScore: 0.95 }],
        'categories:seo': ['warn', { minScore: 0.95 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
