import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/custom/sidebar/AppSidebar";

export default async function Sidebar({
  children,
  params
}: Readonly<{
  children: React.ReactNode,
  params: Promise<{ userId: string }>
}>) {
  const { userId } = await params;

  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}