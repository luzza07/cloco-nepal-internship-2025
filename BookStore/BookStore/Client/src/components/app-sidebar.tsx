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
          title: "Home",
          url: "/dashboard",
        },
      ],
    },
    {
      title: " Features",
      url: "#",
      items: [
        {
          title: "Books",
          url: "/books",
        },
        {
          title: "Authors",
          url: "/authors/",
          isActive: true,
        },
        {
          title: "Categories",
          url: "#",
        },
        {
          title: "Publishers",
          url: "#",
        },
        {
          title: "Customers",
          url: "#",
        },
        {
          title: "Orders",
          url: "#",
        },
        {
          title: "Reviews",
          url: "#",
        },
        {
          title: "Payments",
          url: "#",
        },
        {
          title: "Cart",
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
