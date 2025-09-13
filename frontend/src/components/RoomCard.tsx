import { RoomDTO } from '@/types/api';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Thermometer, Home, Dumbbell, BookOpen, Shirt } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RoomCardProps {
  room: RoomDTO;
  onClick?: () => void;
}

export function RoomCard({ room, onClick }: RoomCardProps) {
  const getStatusColor = () => {
    if (room.heatingEnabled) return 'heating';
    if (room.coolingEnabled) return 'cooling';
    return 'neutral';
  };

  const getStatusText = () => {
    if (room.heatingEnabled) return 'Heating';
    if (room.coolingEnabled) return 'Cooling';
    return 'Neutral';
  };

  const getRoomTypeColor = () => {
    return room.type === 'Apartment' ? 'apartment' : 'common';
  };

  const getCommonRoomIcon = () => {
    switch (room.commonRoomType) {
      case 'GYM': return <Dumbbell className="h-4 w-4" />;
      case 'LIBRARY': return <BookOpen className="h-4 w-4" />;
      case 'LAUNDRY': return <Shirt className="h-4 w-4" />;
      default: return null;
    }
  };

  const status = getStatusColor();
  const roomType = getRoomTypeColor();
  
  return (
    <Card 
      className={cn(
        "w-56 flex-shrink-0 cursor-pointer transition-all duration-200 hover:shadow-medium hover:-translate-y-1",
        "border-l-4",
        roomType === 'apartment' && "border-l-blue-500 bg-gradient-to-br from-blue-50 to-white",
        roomType === 'common' && "border-l-purple-500 bg-gradient-to-br from-purple-50 to-white"
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <Badge 
            className={cn(
              "text-xs font-medium",
              roomType === 'apartment' && "bg-blue-100 text-blue-800 border-blue-200",
              roomType === 'common' && "bg-purple-100 text-purple-800 border-purple-200"
            )}
          >
            {room.type}
          </Badge>
          <Badge 
            className={cn(
              "text-xs",
              status === 'heating' && "bg-heating text-heating-foreground",
              status === 'cooling' && "bg-cooling text-cooling-foreground",
              status === 'neutral' && "bg-neutral text-neutral-foreground"
            )}
          >
            {getStatusText()}
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            {room.type === 'Apartment' ? (
              <Home className="h-4 w-4 text-muted-foreground" />
            ) : (
              getCommonRoomIcon()
            )}
            <div className="flex-1 min-w-0">
              {room.type === 'Apartment' ? (
                <p className="font-medium text-card-foreground truncate">
                  {room.ownerName}
                </p>
              ) : (
                <p className="font-medium text-card-foreground">
                  {room.commonRoomType}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Thermometer className="h-4 w-4 text-muted-foreground" />
            <span className="text-2xl font-bold text-card-foreground">
              {room.temperature.toFixed(1)}°C
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}