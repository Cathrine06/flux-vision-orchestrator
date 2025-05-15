
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusCardProps {
  title: string;
  description?: string;
  statusCount: number;
  statusType: 'healthy' | 'syncing' | 'failed' | 'warning';
  icon?: React.ReactNode;
  className?: string;
}

export const StatusCard: React.FC<StatusCardProps> = ({
  title,
  description,
  statusCount,
  statusType,
  icon,
  className
}) => {
  const statusColors = {
    healthy: "bg-gitops-green/20 text-gitops-green border-gitops-green/30",
    syncing: "bg-gitops-blue/20 text-gitops-lightBlue border-gitops-blue/30",
    warning: "bg-gitops-yellow/20 text-gitops-yellow border-gitops-yellow/30",
    failed: "bg-gitops-red/20 text-gitops-red border-gitops-red/30"
  };

  const badgeVariant = {
    healthy: "success",
    syncing: "default",
    warning: "warning",
    failed: "destructive"
  } as const;

  const statusLabel = {
    healthy: "Healthy",
    syncing: "Syncing",
    warning: "Warning",
    failed: "Failed"
  };

  return (
    <Card className={cn("overflow-hidden border", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          {title}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between">
          <div className="text-3xl font-bold">{statusCount}</div>
          <Badge variant={badgeVariant[statusType]}>
            {statusLabel[statusType]}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusCard;
