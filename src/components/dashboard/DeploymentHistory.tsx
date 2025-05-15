
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { GitBranch, GitCommit, CheckCircle, XCircle, Clock } from 'lucide-react';

interface DeploymentEvent {
  id: string;
  application: string;
  status: 'success' | 'failed' | 'in-progress';
  timestamp: string;
  author: string;
  message: string;
  commit: string;
  branch: string;
}

const initialEvents: DeploymentEvent[] = [
  {
    id: "1",
    application: "payment-service",
    status: "success",
    timestamp: "2 minutes ago",
    author: "Jane Smith",
    message: "Update payment gateway configuration",
    commit: "a1b2c3d",
    branch: "main"
  },
  {
    id: "2",
    application: "user-auth",
    status: "in-progress",
    timestamp: "15 minutes ago",
    author: "John Doe",
    message: "Add OAuth2 provider integration",
    commit: "e4f5g6h",
    branch: "feature/oauth"
  },
  {
    id: "3",
    application: "api-gateway",
    status: "failed",
    timestamp: "1 hour ago",
    author: "Alex Johnson",
    message: "Update rate limiting policy",
    commit: "i7j8k9l",
    branch: "main"
  },
  {
    id: "4",
    application: "notification-service",
    status: "success",
    timestamp: "3 hours ago",
    author: "Sarah Williams",
    message: "Add push notification templates",
    commit: "m1n2o3p",
    branch: "feature/push-notifications"
  }
];

export const DeploymentHistory = () => {
  const [events, setEvents] = useState<DeploymentEvent[]>(initialEvents);

  // Function to get status icon based on status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-gitops-green" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-gitops-red" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-gitops-blue animate-spin-slow" />;
      default:
        return null;
    }
  };

  // Simulate a new deployment coming in
  useEffect(() => {
    const timer = setTimeout(() => {
      const newEvent: DeploymentEvent = {
        id: "5",
        application: "inventory-service",
        status: "in-progress",
        timestamp: "just now",
        author: "Michael Brown",
        message: "Update stock management algorithm",
        commit: "q1r2s3t",
        branch: "feature/inventory-optimization"
      };
      
      setEvents(prevEvents => [newEvent, ...prevEvents.slice(0, 3)]);
    }, 20000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent Deployments</CardTitle>
        <CardDescription>Latest application deployments and their status</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 overflow-auto max-h-[350px]">
        {events.map(event => (
          <div 
            key={event.id}
            className={cn(
              "p-3 border rounded-md animate-fade-in",
              event.status === 'in-progress' && "border-gitops-blue/30 bg-gitops-blue/5",
              event.status === 'success' && "border-gitops-green/30 bg-gitops-green/5",
              event.status === 'failed' && "border-gitops-red/30 bg-gitops-red/5"
            )}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <span className="mr-2">{getStatusIcon(event.status)}</span>
                <span className="font-medium">{event.application}</span>
              </div>
              <span className="text-sm text-muted-foreground">{event.timestamp}</span>
            </div>
            
            <div className="mt-2 text-sm">{event.message}</div>
            
            <div className="mt-2 flex items-center text-xs text-muted-foreground space-x-4">
              <div className="flex items-center">
                <GitCommit className="h-3 w-3 mr-1" />
                <span>{event.commit}</span>
              </div>
              <div className="flex items-center">
                <GitBranch className="h-3 w-3 mr-1" />
                <span>{event.branch}</span>
              </div>
              <div>by {event.author}</div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default DeploymentHistory;
