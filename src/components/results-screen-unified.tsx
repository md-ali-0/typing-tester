'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface TestResults {
  wpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  timeElapsed: number;
  totalChars: number;
  rawWpm: number;
}

interface ResultsScreenProps {
  results: TestResults;
  onRetry: () => void;
}

export default function ResultsScreenUnified({ results, onRetry }: ResultsScreenProps) {
  const { wpm, accuracy, correctChars, incorrectChars, timeElapsed, totalChars, rawWpm } = results;

  // Calculate performance rating
  const getPerformanceRating = (wpm: number) => {
    if (wpm >= 100) return 'Exceptional';
    if (wpm >= 80) return 'Excellent';
    if (wpm >= 60) return 'Good';
    if (wpm >= 40) return 'Average';
    return 'Beginner';
  };

  const performanceRating = getPerformanceRating(wpm);

  return (
    <div className="min-h-screen bg-background relative py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Test Results</h1>
          <p className="text-muted-foreground text-lg">
            Here&apos;s how you performed in your typing test
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-2xl">Performance Summary</CardTitle>
                <CardDescription>
                  Your overall typing performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-muted/50 rounded-2xl backdrop-blur-sm">
                    <div className="text-4xl font-bold text-primary">{wpm}</div>
                    <div className="text-muted-foreground">Words Per Minute</div>
                  </div>
                  
                  <div className="text-center p-6 bg-muted/50 rounded-2xl backdrop-blur-sm">
                    <div className="text-4xl font-bold text-primary">{accuracy}%</div>
                    <div className="text-muted-foreground">Accuracy</div>
                  </div>
                  
                  <div className="text-center p-6 bg-muted/50 rounded-2xl backdrop-blur-sm">
                    <div className="text-4xl font-bold text-primary">{rawWpm}</div>
                    <div className="text-muted-foreground">Raw WPM</div>
                  </div>
                  
                  <div className="text-center p-6 bg-muted/50 rounded-2xl backdrop-blur-sm">
                    <div className="text-4xl font-bold text-primary">{performanceRating}</div>
                    <div className="text-muted-foreground">Performance</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-2xl">Detailed Statistics</CardTitle>
                <CardDescription>
                  Breakdown of your typing performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">Accuracy</span>
                      <span className="font-medium">{accuracy}%</span>
                    </div>
                    <Progress value={accuracy} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-muted/50 rounded-2xl backdrop-blur-sm">
                      <div className="text-2xl font-bold">{correctChars}</div>
                      <div className="text-muted-foreground text-sm">Correct Characters</div>
                    </div>
                    
                    <div className="p-4 bg-muted/50 rounded-2xl backdrop-blur-sm">
                      <div className="text-2xl font-bold text-destructive">{incorrectChars}</div>
                      <div className="text-muted-foreground text-sm">Incorrect Characters</div>
                    </div>
                    
                    <div className="p-4 bg-muted/50 rounded-2xl backdrop-blur-sm">
                      <div className="text-2xl font-bold">{totalChars}</div>
                      <div className="text-muted-foreground text-sm">Total Characters</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between p-4 bg-muted/50 rounded-2xl backdrop-blur-sm">
                    <div>
                      <div className="text-muted-foreground">Time Elapsed</div>
                      <div className="text-xl font-bold">{timeElapsed}s</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Characters/Second</div>
                      <div className="text-xl font-bold">
                        {(totalChars / timeElapsed).toFixed(1)}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Performance Insights</CardTitle>
                <CardDescription>
                  Tips to improve your typing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {wpm < 40 && (
                    <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl backdrop-blur-sm">
                      <h3 className="font-medium text-primary mb-1">Beginner Tip</h3>
                      <p className="text-sm text-muted-foreground">
                        Focus on accuracy first. Speed will come naturally with practice.
                      </p>
                    </div>
                  )}
                  
                  {accuracy < 90 && (
                    <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl backdrop-blur-sm">
                      <h3 className="font-medium text-primary mb-1">Accuracy Focus</h3>
                      <p className="text-sm text-muted-foreground">
                        Slow down and focus on hitting the correct keys. Use the accuracy-focused test mode.
                      </p>
                    </div>
                  )}
                  
                  {wpm >= 40 && (
                    <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl backdrop-blur-sm">
                      <h3 className="font-medium text-primary mb-1">Keep Going!</h3>
                      <p className="text-sm text-muted-foreground">
                        You&apos;re making great progress. Consistent daily practice is key.
                      </p>
                    </div>
                  )}
                  
                  {wpm >= 80 && (
                    <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl backdrop-blur-sm">
                      <h3 className="font-medium text-primary mb-1">Excellent Work!</h3>
                      <p className="text-sm text-muted-foreground">
                        Your typing speed is impressive! Consider challenging yourself with more difficult texts.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
                <CardDescription>
                  Continue improving your skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button 
                    onClick={onRetry}
                    className="w-full px-6 py-6 rounded-xl text-lg font-bold bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:shadow-lg"
                  >
                    Retry Test
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="w-full px-6 py-6 rounded-xl border border-border bg-background hover:bg-muted hover:text-foreground"
                  >
                    View Statistics
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="w-full px-6 py-6 rounded-xl border border-border bg-background hover:bg-muted hover:text-foreground"
                  >
                    Try Different Mode
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}