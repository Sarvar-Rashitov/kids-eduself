import { Bell, Menu } from "lucide-react";

interface HeaderProps {
  title?: string;
  showMenu?: boolean;
  showNotifications?: boolean;
}

export function Header({ title, showMenu = true, showNotifications = true }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 py-3 max-w-md mx-auto">
        <div className="flex items-center gap-3">
          {showMenu && (
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Menu className="h-6 w-6 text-gray-700" />
            </button>
          )}
          {title ? (
            <h1 className="text-xl font-bold text-gray-900">{title}</h1>
          ) : (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                EduSelf
              </span>
            </div>
          )}
        </div>
        
        {showNotifications && (
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="h-6 w-6 text-gray-700" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
        )}
      </div>
    </header>
  );
}
