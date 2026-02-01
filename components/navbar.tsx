"use client";

import * as React from "react";
import Link from "next/link";
import { BookOpen, Briefcase, Clock, FileText } from "lucide-react";

import { navigationLinks } from "@/lib/navigation-links";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function Navbar() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navigationLinks?.map((item) => (
          <NavigationMenuItem key={item.title.trim()}>
            {item.content ? (
              <>
                <NavigationMenuTrigger>
                  {item.icon && <span className="mr-2 text-sm font-medium text-slate-900">{item.icon}</span>}
                  {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {item.content.map((subItem) => (
                      <ListItem
                        key={subItem.href.trim()}
                        title={subItem.title}
                        href={subItem.href}
                        target={subItem.href.startsWith("http") || subItem.blank ? "_blank" : "_self"}
                        download={subItem.download}
                      >
                        {subItem.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <Link href={item.href as string} legacyBehavior passHref>
                <NavigationMenuLink
                  target={item?.href?.startsWith("http") ? "_blank" : "_self"}
                  className={navigationMenuTriggerStyle()}
                >
                  {item.title}
                </NavigationMenuLink>
              </Link>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          {/* TODO: Figure out how to type this */}
          {/* @ts-expect-error */}
          <Link
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
