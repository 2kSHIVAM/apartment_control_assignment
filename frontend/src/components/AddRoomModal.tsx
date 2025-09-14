import { useState, useEffect } from 'react';
import { useBuildings, useAddApartment, useAddCommonRoom, useUpdateApartment, useUpdateCommonRoom, useCommonRoomTypes } from '@/hooks/useBuildings';
import { RoomDTO } from '@/types/api';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Edit3, Loader2 } from 'lucide-react';

interface AddRoomModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editRoom?: RoomDTO;
  editBuildingId?: string;
}

type RoomType = 'Apartment' | 'CommonRoom';

export function AddRoomModal({ open, onOpenChange, editRoom, editBuildingId }: AddRoomModalProps) {
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [roomType, setRoomType] = useState<RoomType>('Apartment');
  const [ownerName, setOwnerName] = useState('');
  const [commonRoomType, setCommonRoomType] = useState('');
  const [temperature, setTemperature] = useState('22');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { data: buildingsResponse } = useBuildings();
  const { data: commonRoomTypesResponse } = useCommonRoomTypes();
  const addApartment = useAddApartment();
  const addCommonRoom = useAddCommonRoom();
  const updateApartment = useUpdateApartment();
  const updateCommonRoom = useUpdateCommonRoom();

  const buildings = buildingsResponse?.data || [];
  const commonRoomTypes = commonRoomTypesResponse?.data || [];
  const isEditMode = !!editRoom;
  const isLoading = addApartment.isPending || addCommonRoom.isPending || updateApartment.isPending || updateCommonRoom.isPending;

  // Populate form when editing
  useEffect(() => {
    if (editRoom && editBuildingId) {
      setSelectedBuilding(editBuildingId);
      setRoomType(editRoom.type === 'Apartment' ? 'Apartment' : 'CommonRoom');
      setOwnerName(editRoom.ownerName || '');
      setCommonRoomType(editRoom.commonRoomType || '');
      setTemperature(editRoom.temperature.toString());
    } else if (!open) {
      // Reset form when modal closes and not editing
      resetForm();
    }
  }, [editRoom, editBuildingId, open]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!selectedBuilding) {
      newErrors.building = 'Please select a building';
    }

    if (roomType === 'Apartment' && !ownerName.trim()) {
      newErrors.ownerName = 'Owner name is required for apartments';
    }

    if (roomType === 'CommonRoom' && !commonRoomType) {
      newErrors.commonRoomType = 'Common room type is required';
    }

    const temp = parseFloat(temperature);
    if (isNaN(temp) || temp <= 0) {
      newErrors.temperature = 'Temperature must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      if (isEditMode && editRoom) {
        // Update existing room
        if (roomType === 'Apartment') {
          await updateApartment.mutateAsync({
            buildingId: selectedBuilding,
            roomId: editRoom.id,
            data: {
              ownerName: ownerName.trim(),
              temp: parseFloat(temperature),
            },
          });
        } else {
          await updateCommonRoom.mutateAsync({
            buildingId: selectedBuilding,
            roomId: editRoom.id,
            data: {
              type: commonRoomType as 'GYM' | 'LIBRARY' | 'LAUNDRY',
              temp: parseFloat(temperature),
            },
          });
        }
      } else {
        // Create new room
        if (roomType === 'Apartment') {
          await addApartment.mutateAsync({
            buildingId: selectedBuilding,
            data: {
              ownerName: ownerName.trim(),
              temp: parseFloat(temperature),
            },
          });
        } else {
          await addCommonRoom.mutateAsync({
            buildingId: selectedBuilding,
            data: {
              type: commonRoomType as 'GYM' | 'LIBRARY' | 'LAUNDRY',
              temp: parseFloat(temperature),
            },
          });
        }
      }

      // Reset form and close modal on success
      resetForm();
      onOpenChange(false);
    } catch (error) {
      // Error handled by the hooks
    }
  };

  const resetForm = () => {
    setSelectedBuilding('');
    setRoomType('Apartment');
    setOwnerName('');
    setCommonRoomType('');
    setTemperature('22');
    setErrors({});
  };

  const handleCancel = () => {
    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isEditMode ? (
              <>
                <Edit3 className="h-5 w-5 text-primary" />
                Edit Room
              </>
            ) : (
              <>
                <Plus className="h-5 w-5 text-primary" />
                Add New Room
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="building-select">Select Building</Label>
            <Select value={selectedBuilding} onValueChange={setSelectedBuilding} disabled={isEditMode}>
              <SelectTrigger className={errors.building ? 'border-destructive' : ''}>
                <SelectValue placeholder="Choose a building" />
              </SelectTrigger>
              <SelectContent>
                {buildings.map((building) => (
                  <SelectItem key={building.id} value={building.id}>
                    {building.id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.building && (
              <p className="text-sm text-destructive">{errors.building}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="room-type">Room Type</Label>
            <Select value={roomType} onValueChange={(value: RoomType) => setRoomType(value)} disabled={isEditMode}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Apartment">Apartment</SelectItem>
                <SelectItem value="CommonRoom">Common Room</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {roomType === 'Apartment' ? (
            <div className="space-y-2">
              <Label htmlFor="owner-name">Owner Name</Label>
              <Input
                id="owner-name"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                placeholder="Enter owner name"
                className={errors.ownerName ? 'border-destructive' : ''}
              />
              {errors.ownerName && (
                <p className="text-sm text-destructive">{errors.ownerName}</p>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="common-room-type">Common Room Type</Label>
              <Select value={commonRoomType} onValueChange={setCommonRoomType}>
                <SelectTrigger className={errors.commonRoomType ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Select a common room type" />
                </SelectTrigger>
                <SelectContent>
                  {commonRoomTypes.length > 0 ? (
                    commonRoomTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type.charAt(0) + type.slice(1).toLowerCase()}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="" disabled>
                      Loading room types...
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              {errors.commonRoomType && (
                <p className="text-sm text-destructive">{errors.commonRoomType}</p>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="room-temperature">Initial Temperature (°C)</Label>
            <Input
              id="room-temperature"
              type="number"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              min="0"
              step="0.1"
              className={errors.temperature ? 'border-destructive' : ''}
            />
            {errors.temperature && (
              <p className="text-sm text-destructive">{errors.temperature}</p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-primary"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEditMode ? 'Saving...' : 'Adding...'}
                </>
              ) : (
                isEditMode ? 'Save Changes' : 'Add Room'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}