
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center py-8 md:py-12">
      <Card className="w-full max-w-2xl shadow-xl rounded-lg">
        <CardHeader className="text-center">
          <ShieldCheck size={48} className="mx-auto text-primary mb-4" />
          <CardTitle className="text-3xl font-headline text-primary">Admin Dashboard</CardTitle>
          <CardDescription>Welcome to the admin portal. Manage your listings and settings here.</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-lg text-muted-foreground">
            This is where your admin-specific content and listing management tools will go.
          </p>
          {/* Add more admin-specific components and functionality here */}
        </CardContent>
      </Card>
    </div>
  );
}
