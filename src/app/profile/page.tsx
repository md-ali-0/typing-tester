'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { getCurrentUser, logoutUser } from '@/lib/auth-utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push('/login');
    } else {
      setUser(currentUser);
      setUsername(currentUser.username);
      setEmail(currentUser.email);
    }
  }, [router]);

  const handleLogout = () => {
    logoutUser();
    router.push('/');
  };

  const handleSave = () => {
    // In a real app, this would save to a database
    setEditing(false);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2 gradient-text">Profile</h1>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Profile</h1>
            <p className="text-muted-foreground">Manage your account settings</p>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="mt-4 sm:mt-0 border border-border bg-background hover:bg-muted hover:text-foreground rounded-xl"
          >
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="glass">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground text-2xl font-bold">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{user.username}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Member since {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Update your profile information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    {editing ? (
                      <Input
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="bg-background/50 border-border"
                      />
                    ) : (
                      <p className="text-foreground">{user.username}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    {editing ? (
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-background/50 border-border"
                      />
                    ) : (
                      <p className="text-foreground">{user.email}</p>
                    )}
                  </div>

                  <Separator className="bg-border" />

                  <div className="flex gap-3">
                    {editing ? (
                      <>
                        <Button 
                          onClick={handleSave}
                          className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:shadow-lg"
                        >
                          Save Changes
                        </Button>
                        <Button 
                          onClick={() => {
                            setEditing(false);
                            setUsername(user.username);
                            setEmail(user.email);
                          }}
                          variant="outline"
                          className="px-6 py-3 rounded-xl border border-border bg-background hover:bg-muted hover:text-foreground"
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button 
                        onClick={() => setEditing(true)}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:shadow-lg"
                      >
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass mt-8">
              <CardHeader>
                <CardTitle>Test History</CardTitle>
                <CardDescription>Your recent typing tests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl backdrop-blur-sm">
                    <div>
                      <p className="font-medium">Timed Test</p>
                      <p className="text-sm text-muted-foreground">2 hours ago</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">78 WPM</p>
                      <p className="text-sm text-muted-foreground">95% accuracy</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl backdrop-blur-sm">
                    <div>
                      <p className="font-medium">Paragraph Test</p>
                      <p className="text-sm text-muted-foreground">1 day ago</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">82 WPM</p>
                      <p className="text-sm text-muted-foreground">92% accuracy</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl backdrop-blur-sm">
                    <div>
                      <p className="font-medium">Speed Challenge</p>
                      <p className="text-sm text-muted-foreground">3 days ago</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">75 WPM</p>
                      <p className="text-sm text-muted-foreground">97% accuracy</p>
                    </div>
                  </div>
                  
                  <div className="text-center pt-4">
                    <Link 
                      href="/stats" 
                      className="text-primary hover:underline"
                    >
                      View all test history
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}