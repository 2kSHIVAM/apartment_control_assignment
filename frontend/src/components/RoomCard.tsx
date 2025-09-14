import { RoomDTO } from '@/types/api';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Thermometer, Home, Dumbbell, BookOpen, Shirt, Edit3, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RoomCardProps {
  room: RoomDTO;
  buildingId: string;
  onClick?: () => void;
  onEdit?: (room: RoomDTO) => void;
  onDelete?: (buildingId: string, roomId: string) => void;
}

export function RoomCard({ room, buildingId, onClick, onEdit, onDelete }: RoomCardProps) {
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
        "w-64 flex-shrink-0 transition-all duration-200 hover:shadow-medium hover:-translate-y-1 relative",
        "border-l-4",
        roomType === 'apartment' && "border-l-blue-500 bg-gradient-to-br from-blue-50 to-white",
        roomType === 'common' && "border-l-purple-500 bg-gradient-to-br from-purple-50 to-white"
      )}
    >
      <CardContent className="p-4">
        {/* Action buttons */}
        <div className="absolute top-2 right-2 flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(room);
            }}
            className="h-6 w-6 p-0 hover:bg-blue-100"
          >
            <Edit3 className="h-3 w-3" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => e.stopPropagation()}
                className="h-6 w-6 p-0 hover:bg-red-100 text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Room</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this {room.type.toLowerCase()}? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete?.(buildingId, room.id)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Delete Room
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div className="flex items-center justify-between mb-3 pr-12">
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

        <div
          className="space-y-3 cursor-pointer"
          onClick={onClick}
        >
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