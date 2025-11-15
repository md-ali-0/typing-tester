'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

const blogPosts = [
  {
    id: 1,
    title: '10 Tips to Improve Your Typing Speed',
    excerpt: 'Learn proven techniques to increase your words per minute and become a more efficient typist.',
    date: '2023-06-15',
    readTime: '5 min read',
    category: 'Beginner'
  },
  {
    id: 2,
    title: 'The Science Behind Touch Typing',
    excerpt: 'Discover how muscle memory works and why touch typing is the most efficient way to type.',
    date: '2023-05-28',
    readTime: '8 min read',
    category: 'Intermediate'
  },
  {
    id: 3,
    title: 'Common Typing Mistakes and How to Avoid Them',
    excerpt: 'Identify the most frequent errors typists make and learn how to correct them.',
    date: '2023-05-12',
    readTime: '6 min read',
    category: 'Beginner'
  },
  {
    id: 4,
    title: 'Advanced Typing Techniques for Professionals',
    excerpt: 'Take your typing skills to the next level with these advanced techniques used by professional typists.',
    date: '2023-04-30',
    readTime: '10 min read',
    category: 'Advanced'
  },
  {
    id: 5,
    title: 'Ergonomic Setup for Healthy Typing',
    excerpt: 'Learn how to set up your workspace to prevent strain and injury while typing.',
    date: '2023-04-18',
    readTime: '7 min read',
    category: 'Health'
  },
  {
    id: 6,
    title: 'The History of Typewriters and Modern Keyboards',
    excerpt: 'Explore the evolution of typing technology from mechanical typewriters to today\'s keyboards.',
    date: '2023-04-05',
    readTime: '9 min read',
    category: 'History'
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Typing Blog</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tips, techniques, and insights to help you become a faster and more accurate typist
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="glass hover:shadow-xl transition-all animated-border">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">
                    <Link 
                      href={`/blog/${post.id}`} 
                      className="hover:text-primary transition-colors"
                    >
                      {post.title}
                    </Link>
                  </CardTitle>
                  <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                    {post.category}
                  </span>
                </div>
                <CardDescription className="text-muted-foreground">
                  {new Date(post.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{post.readTime}</span>
                  <Link 
                    href={`/blog/${post.id}`} 
                    className="text-primary hover:underline text-sm font-medium"
                  >
                    Read more
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="px-6 py-3 rounded-xl text-lg font-bold bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:shadow-lg transition-all">
            Load More Articles
          </button>
        </div>
      </div>
    </div>
  );
}