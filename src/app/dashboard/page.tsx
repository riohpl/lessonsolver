import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import CardContainer from "./CardContainer";
import { Button } from "@/components/ui/button";
import { Mail, RefreshCw } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <CardContainer />
          <div className="flex gap-4">
            <Button variant={"outline"}>
              <Mail />
              Send Reminders
            </Button>
            <Button variant={"default"}>
              <RefreshCw />
              Generate Schedule
            </Button>
          </div>
          <Separator />
          <Card className="flex flex-col gap-4 p-6">
            <CardHeader>
              <CardTitle>Student Submission Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Card className="flex flex-row gap-4 p-6">
                <CardHeader>
                  <CardTitle>John Doe</CardTitle>
                </CardHeader>
              </Card>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
