'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

const communityTopics = [
  {
    id: 1,
    title: 'Daily Typing Challenges',
    posts: 24,
    replies: 142,
    lastActivity: '2 hours ago',
    category: 'Challenge'
  },
  {
    id: 2,
    title: 'Share Your Progress',
    posts: 87,
    replies: 324,
    lastActivity: '1 hour ago',
    category: 'Discussion'
  },
  {
    id: 3,
    title: 'Keyboard Recommendations',
    posts: 56,
    replies: 218,
    lastActivity: '30 minutes ago',
    category: 'Hardware'
  },
  {
    id: 4,
    title: 'Typing Techniques Discussion',
    posts: 43,
    replies: 187,
    lastActivity: '5 hours ago',
    category: 'Technique'
  },
  {
    id: 5,
    title: 'Competition Announcements',
    posts: 12,
    replies: 64,
    lastActivity: '1 day ago',
    category: 'Competition'
  },
  {
    id: 6,
    title: 'Help and Support',
    posts: 67,
    replies: 298,
    lastActivity: '15 minutes ago',
    category: 'Support'
  }
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Community Forum</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Connect with other typists, share tips, and participate in challenges
          </p>
        </div>

        <div className="mb-8">
          <Card className="glass">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold">Welcome to the Community!</h2>
                  <p className="text-muted-foreground">
                    Join discussions, share your progress, and connect with fellow typists.
                  </p>
                </div>
                <button className="px-6 py-3 rounded-xl text-lg font-bold bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:shadow-lg transition-all">
                  Start a New Topic
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-6">Popular Topics</h2>
            <div className="space-y-4">
              {communityTopics.map((topic) => (
                <Card key={topic.id} className="glass hover:shadow-xl transition-all animated-border">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>
                        <Link 
                          href={`/community/${topic.id}`} 
                          className="hover:text-primary transition-colors"
                        >
                          {topic.title}
                        </Link>
                      </CardTitle>
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                        {topic.category}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{topic.posts} posts • {topic.replies} replies</span>
                      <span>Last activity: {topic.lastActivity}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
            <div className="space-y-4">
              <Card className="glass">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground text-sm font-bold">
                      A
                    </div>
                    <div>
                      <p className="font-medium">
                        <Link href="/profile/1" className="hover:text-primary">
                          Alex Johnson
                        </Link>{' '}
                        posted in{' '}
                        <Link href="/community/2" className="text-primary hover:underline">
                          Share Your Progress
                        </Link>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Just hit 90 WPM! So proud of my progress this month. 🎉
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">15 minutes ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground text-sm font-bold">
                      M
                    </div>
                    <div>
                      <p className="font-medium">
                        <Link href="/profile/2" className="hover:text-primary">
                          Maria Garcia
                        </Link>{' '}
                        replied to{' '}
                        <Link href="/community/3" className="text-primary hover:underline">
                          Keyboard Recommendations
                        </Link>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        I highly recommend the ErgoDox EZ for anyone with wrist issues. It completely changed my typing experience!
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">32 minutes ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground text-sm font-bold">
                      T
                    </div>
                    <div>
                      <p className="font-medium">
                        <Link href="/profile/3" className="hover:text-primary">
                          Tom Wilson
                        </Link>{' '}
                        started{' '}
                        <Link href="/community/1" className="text-primary hover:underline">
                          Daily Typing Challenges
                        </Link>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        New challenge posted! Try to type the pangram "The quick brown fox jumps over the lazy dog" in under 8 seconds.
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}