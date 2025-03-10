import * as React from "react"


import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
 
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      items: [
        {
          title: "Analytics",
          url: "/dashboard",
        },
        {
          title: "Project Structure",
          url: "#",
        },
      ],
    },
    {
      title: "User-Focused Features",
      url: "#",
      items: [
        {
          title: "Account",
          url: "#",
        },
        {
          title: "Cart",
          url: "#",
          isActive: true,
        },
        {
          title: "Deals and Discounts",
          url: "#",
        },
        {
          title: "Featured Authors",
          url: "#",
        },
        {
          title: "Best Sellers",
          url: "#",
        },
        {
          title: "About us",
          url: "#",
        },
        {
          title: "Blog/News",
          url: "#",
        },
        {
          title: "Help & Support",
          url: "#",
        },
        {
          title: "Events Calender",
          url: "#",
        },
        {
          title: "Language/Currency Switcher",
          url: "#",
        },
        {
          title: "Accessibility Tools",
          url: "#",
        },
        {
          title: "Social Media Links",
          url: "#",
        },
      ],
    },
    
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
       
        
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
