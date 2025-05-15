
import React, { useState, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Database, CheckCircle, AlertCircle, Clock, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface DatabaseItem {
  id: string;
  name: string;
  type: string;
  status: 'Healthy' | 'Degraded' | 'Syncing' | 'Pending';
  replicas: number;
  size: string;
  lastBackup: string;
}

const initialDatabases: DatabaseItem[] = [
  {
    id: "1",
    name: "production-postgres",
    type: "PostgreSQL",
    status: "Healthy",
    replicas: 3,
    size: "250GB",
    lastBackup: "2 hours ago"
  },
  {
    id: "2",
    name: "auth-mongodb",
    type: "MongoDB",
    status: "Syncing",
    replicas: 3,
    size: "120GB",
    lastBackup: "6 hours ago"
  },
  {
    id: "3",
    name: "cache-redis",
    type: "Redis",
    status: "Healthy",
    replicas: 2,
    size: "40GB",
    lastBackup: "1 hour ago"
  },
  {
    id: "4",
    name: "analytics-clickhouse",
    type: "ClickHouse",
    status: "Degraded",
    replicas: 3,
    size: "500GB",
    lastBackup: "1 day ago"
  },
  {
    id: "5",
    name: "search-elasticsearch",
    type: "Elasticsearch",
    status: "Pending",
    replicas: 5,
    size: "750GB",
    lastBackup: "3 hours ago"
  }
];

const Databases = () => {
  const [databases, setDatabases] = useState<DatabaseItem[]>(initialDatabases);
  
  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDatabases(prevDBs => {
        return prevDBs.map(db => {
          // Occasionally change status
          if (Math.random() > 0.85) {
            const statuses: DatabaseItem['status'][] = ['Healthy', 'Degraded', 'Syncing', 'Pending'];
            const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
            return { ...db, status: newStatus };
          }
          return db;
        });
      });
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusBadge = (status: DatabaseItem['status']) => {
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
      case 'Syncing':
        return (
          <Badge variant="default" className="flex items-center gap-1">
            <RefreshCw className="h-3 w-3 animate-spin-slow" /> Syncing
          </Badge>
        );
      case 'Pending':
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> Pending
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 overflow-auto">
          <div className="container py-6">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-1">Database Management</h1>
                <p className="text-muted-foreground">
                  Manage and monitor GitOps-controlled databases
                </p>
              </div>
              <SidebarTrigger />
            </div>

            <Card className="mb-6">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Database className="mr-2 h-5 w-5 text-gitops-teal" />
                      Database Instances
                    </CardTitle>
                    <CardDescription>Kubernetes-managed database instances</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Replicas</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Last Backup</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {databases.map(db => (
                      <TableRow key={db.id} className={cn(
                        "transition-colors",
                        db.status === 'Degraded' && "bg-gitops-red/5"
                      )}>
                        <TableCell className="font-medium">{db.name}</TableCell>
                        <TableCell>{db.type}</TableCell>
                        <TableCell>{getStatusBadge(db.status)}</TableCell>
                        <TableCell>{db.replicas}</TableCell>
                        <TableCell>{db.size}</TableCell>
                        <TableCell className="text-muted-foreground">{db.lastBackup}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Database Performance</CardTitle>
                  <CardDescription>Average query response time (ms)</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-[300px]">
                  <p className="text-muted-foreground text-center">Performance charts will appear here</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Storage Usage</CardTitle>
                  <CardDescription>Database storage allocation and usage</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-[300px]">
                  <p className="text-muted-foreground text-center">Storage usage charts will appear here</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Databases;
