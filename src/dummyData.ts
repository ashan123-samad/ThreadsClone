import type { Post, User } from './types';

export const users: User[] = [
  {
    id: 'user-1',
    username: 'maya',
    name: 'Maya Chen',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
    bio: 'Product designer who loves thoughtful interfaces.',
  },
  {
    id: 'user-2',
    username: 'jules',
    name: 'Jules Rivera',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
    bio: 'Coffee-fueled developer building with React Native.',
  },
  {
    id: 'user-3',
    username: 'nora',
    name: 'Nora Patel',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&q=80',
    bio: 'Photographer capturing everyday moments in motion.',
  },
  {
    id: 'user-4',
    username: 'leo',
    name: 'Leo Brooks',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80',
    bio: 'Runner and weekend cook with a soft spot for tacos.',
  },
  {
    id: 'user-5',
    username: 'sara',
    name: 'Sara Kim',
    image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=256&q=80',
    bio: 'Writer and storyteller sharing tiny ideas every day.',
  },
];

const getUser = (id: string): User => users.find((user) => user.id === id) as User;

export const posts: Post[] = [
  {
    id: 'post-1',
    createdAt: '2026-07-20T09:00:00.000Z',
    content: 'Just shipped a cleaner onboarding flow for the app. Feels much more intuitive now.',
    user_id: 'user-1',
    user: getUser('user-1'),
    parent_id: null,
    parent: null,
    replose: [],
  },
  {
    id: 'post-2',
    createdAt: '2026-07-20T10:15:00.000Z',
    content: 'Anyone else obsessed with the new dark mode? It makes late-night coding so much easier.',
    user_id: 'user-2',
    user: getUser('user-2'),
    parent_id: null,
    parent: null,
    replose: [],
  },
  {
    id: 'post-3',
    createdAt: '2026-07-20T11:30:00.000Z',
    content: 'I found the best sunset spot near the river this weekend. The photos came out amazing.',
    user_id: 'user-3',
    user: getUser('user-3'),
    parent_id: null,
    parent: null,
    replose: [],
  },
  {
    id: 'post-4',
    createdAt: '2026-07-21T07:20:00.000Z',
    content: 'Tried a new taco recipe at home and it was a huge hit. I might be making it again this week.',
    user_id: 'user-4',
    user: getUser('user-4'),
    parent_id: null,
    parent: null,
    replose: [],
  },
  {
    id: 'post-5',
    createdAt: '2026-07-21T08:45:00.000Z',
    content: 'A tiny habit I am keeping this month is writing one sentence before bed. It clears my mind.',
    user_id: 'user-5',
    user: getUser('user-5'),
    parent_id: null,
    parent: null,
    replose: [],
  },
  {
    id: 'post-6',
    createdAt: '2026-07-21T09:10:00.000Z',
    content: 'The new dashboard feels so much lighter. Great work to the team.',
    user_id: 'user-1',
    user: getUser('user-1'),
    parent_id: null,
    parent: null,
    replose: [],
  },
  {
    id: 'post-7',
    createdAt: '2026-07-21T13:05:00.000Z',
    content: 'I am finally getting into the habit of morning runs again. The fresh air is everything.',
    user_id: 'user-4',
    user: getUser('user-4'),
    parent_id: null,
    parent: null,
    replose: [],
  },
  {
    id: 'post-8',
    createdAt: '2026-07-22T06:30:00.000Z',
    content: 'The best part of my weekend was a long walk and a good book. It felt like a reset button.',
    user_id: 'user-3',
    user: getUser('user-3'),
    parent_id: null,
    parent: null,
    replose: [],
  },
  {
    id: 'post-9',
    createdAt: '2026-07-22T12:00:00.000Z',
    content: 'I have been collecting tiny design inspiration from the city lately. It is surprisingly motivating.',
    user_id: 'user-2',
    user: getUser('user-2'),
    parent_id: null,
    parent: null,
    replose: [],
  },
  {
    id: 'post-10',
    createdAt: '2026-07-22T15:40:00.000Z',
    content: 'The weekend playlist is officially the soundtrack of my productivity. I cannot stop replaying it.',
    user_id: 'user-5',
    user: getUser('user-5'),
    parent_id: null,
    parent: null,
    replose: [],
  },
  {
    id: 'post-11',
    createdAt: '2026-07-23T09:20:00.000Z',
    content: 'That onboarding flow looks amazing. I would love to see the same treatment on the settings page.',
    user_id: 'user-2',
    user: getUser('user-2'),
    parent_id: 'post-1',
    parent: null,
    replose: [],
  },
  {
    id: 'post-12',
    createdAt: '2026-07-23T10:05:00.000Z',
    content: 'The river photos are stunning. I would happily frame one of those.',
    user_id: 'user-1',
    user: getUser('user-1'),
    parent_id: 'post-3',
    parent: null,
    replose: [],
  },
  {
    id: 'post-13',
    createdAt: '2026-07-23T11:45:00.000Z',
    content: 'I am definitely trying that taco recipe next weekend. Thanks for the inspiration!',
    user_id: 'user-5',
    user: getUser('user-5'),
    parent_id: 'post-4',
    parent: null,
    replose: [],
  },
  {
    id: 'post-14',
    createdAt: '2026-07-23T18:10:00.000Z',
    content: 'That sentence-before-bed habit sounds so simple but so powerful. I might start it too.',
    user_id: 'user-4',
    user: getUser('user-4'),
    parent_id: 'post-5',
    parent: null,
    replose: [],
  },
  {
    id: 'post-15',
    createdAt: '2026-07-24T08:00:00.000Z',
    content: 'Dark mode and a good playlist together is a pretty unbeatable combo for focus.',
    user_id: 'user-3',
    user: getUser('user-3'),
    parent_id: 'post-2',
    parent: null,
    replose: [],
  },
];

posts[10].parent = posts[0];
posts[10].replose = [posts[10]];
posts[11].parent = posts[2];
posts[11].replose = [posts[11]];
posts[12].parent = posts[3];
posts[12].replose = [posts[12]];
posts[13].parent = posts[4];
posts[13].replose = [posts[13]];
posts[14].parent = posts[1];
posts[14].replose = [posts[14]];

posts[0].replose = [posts[10]];
posts[1].replose = [posts[14]];
posts[2].replose = [posts[11]];
posts[3].replose = [posts[12]];
posts[4].replose = [posts[13]];
