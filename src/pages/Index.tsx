
import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import StatusCard from "@/components/dashboard/StatusCard";
import SyncChart from "@/components/dashboard/SyncChart";
import DeploymentHistory from "@/components/dashboard/DeploymentHistory";
import ClusterStatusChart from "@/components/dashboard/ClusterStatusChart";
import ApplicationsTable from "@/components/dashboard/ApplicationsTable";
import { Monitor, GitBranch, Database, Server, AlertCircle } from "lucide-react";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 overflow-auto">
          <div className="container py-6">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-1">GitOps Console</h1>
                <p className="text-muted-foreground">
                  Real-time infrastructure management with ArgoCD
                </p>
              </div>
              <SidebarTrigger />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatusCard 
                title="Applications" 
                statusCount={12}
                statusType="healthy"
                icon={<Monitor className="h-5 w-5 text-gitops-teal" />}
              />
              <StatusCard 
                title="Repositories" 
                statusCount={8}
                statusType="syncing"
                icon={<GitBranch className="h-5 w-5 text-gitops-lightBlue" />}
              />
              <StatusCard 
                title="Databases" 
                statusCount={5}
                statusType="warning"
                icon={<Database className="h-5 w-5 text-gitops-yellow" />}
              />
              <StatusCard 
                title="Servers" 
                statusCount={3}
                statusType="failed"
                icon={<AlertCircle className="h-5 w-5 text-gitops-red" />}
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <ClusterStatusChart />
              <SyncChart />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ApplicationsTable />
              </div>
              <div>
                <DeploymentHistory />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
