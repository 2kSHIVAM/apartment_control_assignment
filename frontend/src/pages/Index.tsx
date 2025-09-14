import { useState } from 'react';
import { useBuildings } from '@/hooks/useBuildings';
import { RoomDTO } from '@/types/api';
import { Header } from '@/components/Header';
import { BuildingSection } from '@/components/BuildingSection';
import { AddBuildingModal } from '@/components/AddBuildingModal';
import { AddRoomModal } from '@/components/AddRoomModal';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Building2, Plus } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

const Index = () => {
  const [showAddBuilding, setShowAddBuilding] = useState(false);
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [editRoom, setEditRoom] = useState<RoomDTO | undefined>();
  const [editBuildingId, setEditBuildingId] = useState<string | undefined>();

  const handleEditRoom = (room: RoomDTO) => {
    // Find the building that contains this room
    const buildingWithRoom = buildings.find(building =>
      building.rooms.some(r => r.id === room.id)
    );

    if (buildingWithRoom) {
      setEditRoom(room);
      setEditBuildingId(buildingWithRoom.id);
      setShowAddRoom(true);
    }
  };

  const handleCloseRoomModal = (open: boolean) => {
    if (!open) {
      setEditRoom(undefined);
      setEditBuildingId(undefined);
    }
    setShowAddRoom(open);
  };

  const { data: buildingsResponse, isLoading, error } = useBuildings();

  const buildings = buildingsResponse?.data || [];

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header
          onAddBuilding={() => setShowAddBuilding(true)}
          onAddRoom={() => setShowAddRoom(true)}
        />
        <div className="container py-8">
          <div className="flex items-center justify-center py-16 text-center">
            <div className="space-y-4">
              <div className="text-destructive text-lg font-medium">
                Failed to load buildings
              </div>
              <p className="text-muted-foreground">
                Please check your connection and try again
              </p>
              <Button onClick={() => window.location.reload()}>
                Retry
              </Button>
            </div>
          </div>
        </div>
        <Toaster position="top-right" />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header
          onAddBuilding={() => setShowAddBuilding(true)}
          onAddRoom={() => setShowAddRoom(true)}
        />
        <div className="container py-8 space-y-8">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="bg-gradient-building rounded-lg p-4 shadow-soft border">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-lg" />
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-24" />
                </div>
              </div>
              <div className="flex gap-4">
                {Array.from({ length: 3 }).map((_, j) => (
                  <Skeleton key={j} className="w-56 h-32 flex-shrink-0 rounded-lg" />
                ))}
              </div>
            </div>
          ))}
        </div>
        <Toaster position="top-right" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        onAddBuilding={() => setShowAddBuilding(true)}
        onAddRoom={() => setShowAddRoom(true)}
      />

      <main className="container py-8">
        {buildings.length === 0 ? (
          <div className="flex items-center justify-center py-16 text-center">
            <div className="space-y-6 max-w-md">
              <div className="flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                  <Building2 className="h-10 w-10 text-primary" />
                </div>
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold text-building-header">
                  No Buildings Yet
                </h2>
                <p className="text-muted-foreground">
                  Get started by creating your first building to manage rooms and temperature control.
                </p>
              </div>
              <Button
                onClick={() => setShowAddBuilding(true)}
                className="bg-gradient-primary shadow-medium hover:shadow-large transition-all duration-200"
                size="lg"
              >
                <Building2 className="mr-2 h-5 w-5" />
                Add Your First Building
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {buildings.map((building) => (
              <BuildingSection
                key={building.id}
                building={building}
                onEditRoom={handleEditRoom}
              />
            ))}
          </div>
        )}
      </main>

      <AddBuildingModal
        open={showAddBuilding}
        onOpenChange={setShowAddBuilding}
      />

      <AddRoomModal
        open={showAddRoom}
        onOpenChange={handleCloseRoomModal}
        editRoom={editRoom}
        editBuildingId={editBuildingId}
      />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'hsl(var(--card))',
            color: 'hsl(var(--card-foreground))',
            border: '1px solid hsl(var(--border))',
          },
          success: {
            iconTheme: {
              primary: 'hsl(var(--primary))',
              secondary: 'hsl(var(--primary-foreground))',
            },
          },
          error: {
            iconTheme: {
              primary: 'hsl(var(--destructive))',
              secondary: 'hsl(var(--destructive-foreground))',
            },
          },
        }}
      />
    </div>
  );
};

export default Index;