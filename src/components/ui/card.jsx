import * as React from "react";
import { cn } from "@/lib/utils";

const Card = ({ className, ...props }) => (
  <div className={cn("flex flex-col gap-4 rounded-lg border bg-card p-5 text-card-foreground shadow-sm", className)} {...props} />
);
const CardHeader = ({ className, ...props }) => <div className={cn("flex flex-col gap-1.5", className)} {...props} />;
const CardTitle = ({ className, ...props }) => <h3 className={cn("text-lg font-semibold leading-none", className)} {...props} />;
const CardDescription = ({ className, ...props }) => <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
const CardContent = ({ className, ...props }) => <div className={cn("", className)} {...props} />;
const CardFooter = ({ className, ...props }) => <div className={cn("flex items-center", className)} {...props} />;

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };