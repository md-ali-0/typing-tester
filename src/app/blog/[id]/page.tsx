'use client';

import Footer from '@/components/footer';
import Header from '@/components/header';
import Link from 'next/link';

// Mock blog post data - in a real app this would come from a CMS or database
const blogPost = {
  id: '1',
  title: '10 Tips to Improve Your Typing Speed',
  date: '2025-10-15',
  readTime: '5 min read',
  category: 'Tips & Tricks',
  author: {
    name: 'Alex Johnson',
    avatar: 'AJ'
  },
  content: `
    <p className="mb-6">Improving your typing speed is a valuable skill that can significantly boost your productivity, whether you're a student, professional, or just someone who spends a lot of time on the computer. Here are 10 proven tips to help you type faster and more accurately.</p>
    
    <h2 className="text-2xl font-bold mb-4 mt-8">1. Learn Proper Finger Placement</h2>
    <p className="mb-6">Start by placing your fingers on the home row keys (ASDF for the left hand, JKL; for the right hand). This is the foundation of touch typing and will help you develop muscle memory for all other keys.</p>
    
    <h2 className="text-2xl font-bold mb-4 mt-8">2. Practice Regularly</h2>
    <p className="mb-6">Consistency is key when it comes to improving typing speed. Dedicate at least 15-30 minutes daily to focused practice sessions. Short, regular sessions are more effective than occasional long ones.</p>
    
    <h2 className="text-2xl font-bold mb-4 mt-8">3. Focus on Accuracy First</h2>
    <p className="mb-6">Speed will naturally follow accuracy. Don't worry about how fast you're typing initially. Focus on hitting the correct keys and minimizing errors. Your speed will increase as your accuracy improves.</p>
    
    <h2 className="text-2xl font-bold mb-4 mt-8">4. Use Online Typing Tutors</h2>
    <p className="mb-6">Take advantage of online resources and typing tutors that provide structured lessons and real-time feedback. These tools can help identify your weak spots and provide targeted practice.</p>
    
    <h2 className="text-2xl font-bold mb-4 mt-8">5. Learn Keyboard Shortcuts</h2>
    <p className="mb-6">Master common keyboard shortcuts for your operating system and frequently used applications. This reduces the time spent moving between mouse and keyboard.</p>
    
    <h2 className="text-2xl font-bold mb-4 mt-8">6. Maintain Good Posture</h2>
    <p className="mb-6">Sit up straight with your feet flat on the floor. Keep your wrists floating above the keyboard, not resting on the desk or wrist rest while typing. This prevents strain and allows for more fluid movements.</p>
    
    <h2 className="text-2xl font-bold mb-4 mt-8">7. Practice Difficult Letter Combinations</h2>
    <p className="mb-6">Identify letter pairs or sequences that slow you down and practice them specifically. Common challenging combinations include "th", "st", "tr", and "str".</p>
    
    <h2 className="text-2xl font-bold mb-4 mt-8">8. Take Regular Breaks</h2>
    <p className="mb-6">Avoid fatigue by taking short breaks every 30-45 minutes. This helps prevent mistakes and keeps your mind fresh for learning.</p>
    
    <h2 className="text-2xl font-bold mb-4 mt-8">9. Gradually Increase Difficulty</h2>
    <p className="mb-6">As you improve, challenge yourself with more complex texts, technical documents, or programming code. This helps you adapt to different typing scenarios.</p>
    
    <h2 className="text-2xl font-bold mb-4 mt-8">10. Track Your Progress</h2>
    <p className="mb-6">Keep records of your typing speed and accuracy over time. Seeing improvement will motivate you to continue practicing and help you identify areas for further development.</p>
    
    <div className="bg-primary/5 border-l-4 border-primary p-6 my-8 rounded-r-lg">
      <h3 className="font-bold text-lg mb-2">Pro Tip</h3>
      <p>Don't look at the keyboard while typing. This is one of the biggest barriers to improving speed. Force yourself to look at the screen and trust your muscle memory.</p>
    </div>
    
    <p className="mt-8">With consistent practice and these tips, you'll see significant improvements in your typing speed within a few weeks. Remember, the goal isn't just to type fast, but to type accurately and comfortably.</p>
  `
};

export default function BlogPostPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-primary hover:underline mb-8"
          >
            ← Back to Blog
          </Link>
          
          <article className="bg-card border border-border rounded-xl p-8">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                {blogPost.category}
              </span>
              <span className="text-sm text-muted-foreground">{blogPost.readTime}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-6">{blogPost.title}</h1>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                {blogPost.author.avatar}
              </div>
              <div>
                <p className="font-medium">{blogPost.author.name}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(blogPost.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
            
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
            />
          </article>
          
          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-xl font-bold mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/blog/2" className="group block">
                <div className="p-6 bg-card border border-border rounded-lg hover:shadow-md transition-all">
                  <h4 className="font-bold mb-2 group-hover:text-primary transition-colors">
                    The Science Behind Touch Typing
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Understanding how muscle memory works and why touch typing is the most efficient method.
                  </p>
                </div>
              </Link>
              <Link href="/blog/3" className="group block">
                <div className="p-6 bg-card border border-border rounded-lg hover:shadow-md transition-all">
                  <h4 className="font-bold mb-2 group-hover:text-primary transition-colors">
                    Choosing the Right Keyboard for Typing
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    A comprehensive guide to selecting the perfect keyboard for your typing needs.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}