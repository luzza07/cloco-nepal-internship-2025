import { ModeToggle } from "./themeswitch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function NavBar() {
  const navItems = [
    {
      name: "Home",
      href: "/dashboard",
    },
    {
      name: "About us",
      href: "#",
    },
    {
      name: "Contact",
      href: "#",
    },
    {
      name: "Books",
      href: "/books",
    },
    {
      name: "Login",
      href: "/login",
    },
  ];

  return (
    <div className="flex justify-center items-center  space-x-4 space-y-4">
      <NavigationMenu>
        <NavigationMenuList>
          {navItems.map((item, index) => (
            <NavigationMenuItem key={index} className="pt-7 pr-7 pl-7">
              <a href={item.href}>{item.name}</a>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input type="email" placeholder="Search for books..." />
        <Button type="submit">Search</Button>
      </div>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <ModeToggle />
    </div>
  );
}
