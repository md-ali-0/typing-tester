'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    ChartConfig
} from '@/components/ui/chart';
import { getCurrentUser } from '@/lib/auth-utils';
import { useEffect, useState } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

// Mock data for charts
const speedData = [
  { day: 'Mon', speed: 65 },
  { day: 'Tue', speed: 72 },
  { day: 'Wed', speed: 68 },
  { day: 'Thu', speed: 75 },
  { day: 'Fri', speed: 80 },
  { day: 'Sat', speed: 78 },
  { day: 'Sun', speed: 82 },
];

const accuracyData = [
  { day: 'Mon', accuracy: 92 },
  { day: 'Tue', accuracy: 94 },
  { day: 'Wed', accuracy: 91 },
  { day: 'Thu', accuracy: 95 },
  { day: 'Fri', accuracy: 96 },
  { day: 'Sat', accuracy: 93 },
  { day: 'Sun', accuracy: 97 },
];

const speedChartConfig = {
  speed: {
    label: 'WPM',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

const accuracyChartConfig = {
  accuracy: {
    label: 'Accuracy %',
    color: 'hsl(var(--secondary))',
  },
} satisfies ChartConfig;

export default function StatsPage() {
  const [userStats, setUserStats] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const user = getCurrentUser();
    if (user) {
      // Mock user stats
      setUserStats({
        currentWpm: 78,
        accuracy: 95,
        testsTaken: 24,
        bestWpm: 85
      });
    }
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2 gradient-text">Your Typing Statistics</h1>
            <p className="text-muted-foreground">Loading your stats...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!userStats) {
    return (
      <div className="min-h-screen bg-background relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2 gradient-text">Your Typing Statistics</h1>
            <p className="text-muted-foreground">Please log in to view your statistics.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Your Typing Statistics</h1>
          <p className="text-muted-foreground text-lg">
            Track your progress and see how you&apos;ve improved over time
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="glass animated-border">
            <CardHeader className="pb-2">
              <CardDescription className="text-muted-foreground">Current WPM</CardDescription>
              <CardTitle className="text-3xl font-bold">{userStats.currentWpm}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Words per minute</p>
            </CardContent>
          </Card>
          
          <Card className="glass animated-border">
            <CardHeader className="pb-2">
              <CardDescription className="text-muted-foreground">Accuracy</CardDescription>
              <CardTitle className="text-3xl font-bold">{userStats.accuracy}%</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Typing accuracy</p>
            </CardContent>
          </Card>
          
          <Card className="glass animated-border">
            <CardHeader className="pb-2">
              <CardDescription className="text-muted-foreground">Tests Taken</CardDescription>
              <CardTitle className="text-3xl font-bold">{userStats.testsTaken}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Total tests completed</p>
            </CardContent>
          </Card>
          
          <Card className="glass animated-border">
            <CardHeader className="pb-2">
              <CardDescription className="text-muted-foreground">Best Score</CardDescription>
              <CardTitle className="text-3xl font-bold">{userStats.bestWpm}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Highest WPM achieved</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Speed Progress</CardTitle>
              <CardDescription className="text-muted-foreground">
                Your typing speed over the past week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="min-h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={speedData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 20,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="day" 
                      stroke="hsl(var(--muted-foreground))" 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))" 
                      tickLine={false} 
                      axisLine={false} 
                      tickFormatter={(value: number) => `${value} WPM`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--background))', 
                        borderColor: 'hsl(var(--border))',
                        borderRadius: 'var(--radius)',
                        color: 'hsl(var(--foreground))'
                      }}
                    />
                    <Legend />
                    <Bar 
                      dataKey="speed" 
                      fill="hsl(var(--primary))" 
                      radius={[4, 4, 0, 0]} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Accuracy Progress</CardTitle>
              <CardDescription className="text-muted-foreground">
                Your typing accuracy over the past week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="min-h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={accuracyData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 20,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="day" 
                      stroke="hsl(var(--muted-foreground))" 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))" 
                      tickLine={false} 
                      axisLine={false} 
                      domain={[85, 100]}
                      tickFormatter={(value: number) => `${value}%`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--background))', 
                        borderColor: 'hsl(var(--border))',
                        borderRadius: 'var(--radius)',
                        color: 'hsl(var(--foreground))'
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="accuracy" 
                      stroke="hsl(var(--secondary))" 
                      strokeWidth={2}
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}