"use client";

import { Search, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";

interface HeaderProps {
  onSearch?: (query: string) => void;
  onMenuClick?: () => void;
}

export function Header({ onSearch, onMenuClick }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  return (
    <header className="h-14 border-b border-gray-200 bg-white flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Rechercher un contact, une entreprise..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-9 h-9 bg-gray-50 border-gray-200 text-sm"
          />
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors cursor-pointer">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-rose-100 text-rose-700 text-xs font-medium">
              PC
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-gray-700 hidden sm:inline">
            Paul Clark
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Mon profil</DropdownMenuItem>
          <DropdownMenuItem>Paramètres</DropdownMenuItem>
          <DropdownMenuItem>Déconnexion</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
