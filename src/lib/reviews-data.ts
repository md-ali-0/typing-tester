export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  title: string;
  content: string;
  timestamp: string;
  helpful: number;
  verified: boolean;
}

export const communityReviews: Review[] = [
  {
    id: '1',
    userName: 'Alex Thompson',
    userAvatar: 'AT',
    rating: 5,
    title: 'Life-changing app!',
    content: 'I went from 35 WPM to 78 WPM in 2 months. The detailed analytics really helped me identify my weak spots. Highly recommend!',
    timestamp: '2025-01-08',
    helpful: 234,
    verified: true
  },
  {
    id: '2',
    userName: 'Jordan Lee',
    userAvatar: 'JL',
    rating: 5,
    title: 'Best typing practice platform ever',
    content: 'The variety of difficulty levels and test durations makes it perfect for any skill level. Love the dark mode and clean interface.',
    timestamp: '2025-01-06',
    helpful: 189,
    verified: true
  },
  {
    id: '3',
    userName: 'Casey Morgan',
    userAvatar: 'CM',
    rating: 4,
    title: 'Great for beginners and intermediate',
    content: 'Excellent platform for improving typing skills. The only thing I wish for is more text variety and custom word lists.',
    timestamp: '2025-01-04',
    helpful: 156,
    verified: true
  },
  {
    id: '4',
    userName: 'Riley Davis',
    userAvatar: 'RD',
    rating: 5,
    title: 'Finally improved my typing!',
    content: 'Tried many platforms before, but TypeMaster is the one that actually helped. The WPM tracking and accuracy metrics are so helpful.',
    timestamp: '2025-01-02',
    helpful: 201,
    verified: true
  },
  {
    id: '5',
    userName: 'Morgan Smith',
    userAvatar: 'MS',
    rating: 4,
    title: 'Solid platform with great features',
    content: 'Really enjoying the typing tests and the statistics page is very informative. Would love to see community leaderboards.',
    timestamp: '2024-12-31',
    helpful: 143,
    verified: true
  },
  {
    id: '6',
    userName: 'Taylor Johnson',
    userAvatar: 'TJ',
    rating: 5,
    title: 'Addiction to productivity!',
    content: 'This app made improving my typing fun! The daily challenges and achievement system keeps me motivated. Best decision ever!',
    timestamp: '2024-12-29',
    helpful: 267,
    verified: true
  }
];
