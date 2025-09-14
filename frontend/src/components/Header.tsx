import { Button } from '@/components/ui/button';
import { User, Building2, Plus } from 'lucide-react';

interface HeaderProps {
  onAddBuilding: () => void;
  onAddRoom: () => void;
}

export function Header({ onAddBuilding, onAddRoom }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <Building2 className="h-8 w-8 text-primary" />
          <h1 className="text-xl font-semibold text-building-header">
            Building Control System
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Button 
              onClick={onAddBuilding}
              className="bg-gradient-primary shadow-medium hover:shadow-large transition-all duration-200"
            >
              <Building2 className="mr-2 h-4 w-4" />
              Add Building
            </Button>
            <Button 
              onClick={onAddRoom}
              className="bg-gradient-primary shadow-medium hover:shadow-large transition-all duration-200"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Room
            </Button>
          </div>
          
          <div className="h-6 w-px bg-border mx-2" />
          
          <div className="flex flex-col items-center gap-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <User className="h-4 w-4 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}