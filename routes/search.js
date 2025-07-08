import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  const query = req.query.q || '';
  res.json({
    template: 'item-list-v1',
    data: {
      title: 'Article Results',
      description: `Results for your search query "${query}"`,
      items: [
        {
          title: 'An article about the future of AI',
          description: 'A deep dive into the advancements and implications of artificial intelligence in the coming years.',
          image: 'https://example.com/images/ai-future.jpg',
          path: '/articles/ai-future',
        },
        {
          title: 'Understanding Quantum Computing',
          description: 'An introduction to quantum computing and its potential to revolutionize technology.',
          image: 'https://example.com/images/quantum-computing.jpg',
          path: '/articles/quantum-computing',
        },
        {
          title: 'The Rise of Renewable Energy',
          description: 'Exploring the growth of renewable energy sources and their impact on the environment.',
          image: 'https://example.com/images/renewable-energy.jpg',
          path: '/articles/renewable-energy',
        },
      ],
    },
  })
});

export default router;