
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ArrowUpRight, CheckCircle, AlertCircle, Clock, RefreshCw } from "lucide-react";

interface Application {
  id: string;
  name: string;
  namespace: string;
  cluster: string;
  status: 'Healthy' | 'Degraded' | 'Progressing' | 'Suspended';
  syncStatus: 'Synced' | 'OutOfSync' | 'Unknown';
  lastDeployed: string;
}

// Sample data
const applications: Application[] = [
  {
    id: "1",
    name: "frontend",
    namespace: "default",
    cluster: "production",
    status: "Healthy",
    syncStatus: "Synced",
    lastDeployed: "10 minutes ago"
  },
  {
    id: "2",
    name: "backend-api",
    namespace: "backend",
    cluster: "production",
    status: "Progressing",
    syncStatus: "OutOfSync",
    lastDeployed: "25 minutes ago"
  },
  {
    id: "3",
    name: "database",
    namespace: "db",
    cluster: "production",
    status: "Healthy",
    syncStatus: "Synced",
    lastDeployed: "2 hours ago"
  },
  {
    id: "4",
    name: "redis-cache",
    namespace: "cache",
    cluster: "staging",
    status: "Degraded",
    syncStatus: "OutOfSync",
    lastDeployed: "1 day ago"
  },
  {
    id: "5",
    name: "monitoring",
    namespace: "tools",
    cluster: "production",
    status: "Healthy",
    syncStatus: "Synced",
    lastDeployed: "5 days ago"
  }
];

export const ApplicationsTable = () => {
  const getStatusBadge = (status: Application['status']) => {
    switch (status) {
      case 'Healthy':
        return (
          <Badge variant="success" className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3" /> Healthy
          </Badge>
        );
      case 'Degraded':
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertCircle className="h-3 w-3" /> Degraded
          </Badge>
        );
      case 'Progressing':
        return (
          <Badge variant="default" className="flex items-center gap-1">
            <RefreshCw className="h-3 w-3 animate-spin-slow" /> Progressing
          </Badge>
        );
      case 'Suspended':
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> Suspended
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getSyncBadge = (syncStatus: Application['syncStatus']) => {
    switch (syncStatus) {
      case 'Synced':
        return <Badge variant="success">Synced</Badge>;
      case 'OutOfSync':
        return <Badge variant="warning">Out of Sync</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card className="h-full transition-all hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Applications</CardTitle>
            <CardDescription>Current status of your deployed applications</CardDescription>
          </div>
          <a href="#" className="text-sm text-primary flex items-center hover:underline">
            View all <ArrowUpRight className="ml-1 h-3 w-3" />
          </a>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Namespace</TableHead>
                <TableHead>Cluster</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sync</TableHead>
                <TableHead>Last Deployed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map(app => (
                <TableRow key={app.id} className={cn(
                  app.status === 'Degraded' && "bg-gitops-red/5",
                  app.status === 'Progressing' && "bg-gitops-blue/5",
                  "hover:bg-muted/50 transition-colors"
                )}>
                  <TableCell className="font-medium">{app.name}</TableCell>
                  <TableCell>{app.namespace}</TableCell>
                  <TableCell>{app.cluster}</TableCell>
                  <TableCell>{getStatusBadge(app.status)}</TableCell>
                  <TableCell>{getSyncBadge(app.syncStatus)}</TableCell>
                  <TableCell className="text-muted-foreground">{app.lastDeployed}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationsTable;
