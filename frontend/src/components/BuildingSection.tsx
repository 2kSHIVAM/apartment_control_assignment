import { useState } from 'react';
import { BuildingDTO } from '@/types/api';
import { RoomCard } from './RoomCard';
import { TemperatureControl } from './TemperatureControl';
import { Button } from '@/components/ui/button';
import { Building2, Edit3, Thermometer } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BuildingSectionProps {
  building: BuildingDTO;
}

export function BuildingSection({ building }: BuildingSectionProps) {
  const [showTempControl, setShowTempControl] = useState(false);

  return (
    <section className="space-y-4">
      <div className="bg-gradient-building rounded-lg p-4 shadow-soft border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-building-header">
                {building.id}
              </h2>
              <p className="text-sm text-muted-foreground">
                {building.rooms.length} room{building.rooms.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {showTempControl ? (
              <TemperatureControl
                buildingId={building.id}
                currentTemp={building.requestedTemperature}
                onCancel={() => setShowTempControl(false)}
                onComplete={() => setShowTempControl(false)}
              />
            ) : (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 text-building-header">
                  <Thermometer className="h-4 w-4" />
                  <span className="font-medium">
                    Target: {building.requestedTemperature.toFixed(1)}°C
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTempControl(true)}
                  className="h-8 w-8 p-0 hover:bg-primary/10"
                >
                  <Edit3 className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {building.rooms.length > 0 ? (
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-4 px-1 min-w-full">
              {building.rooms.map((room) => (
                <RoomCard 
                  key={room.id} 
                  room={room}
                  onClick={() => {
                    // Optional: implement room details modal
                    console.log('Room clicked:', room);
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-8 text-center">
            <div className="space-y-2">
              <p className="text-muted-foreground">No rooms in this building</p>
              <p className="text-sm text-muted-foreground">
                Use the "Add Room" button to add apartments or common rooms
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}