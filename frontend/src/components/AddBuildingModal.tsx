import { useState } from 'react';
import { useCreateBuilding } from '@/hooks/useBuildings';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building2, Loader2 } from 'lucide-react';

interface AddBuildingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddBuildingModal({ open, onOpenChange }: AddBuildingModalProps) {
  const [buildingId, setBuildingId] = useState('');
  const [requestedTemp, setRequestedTemp] = useState('22');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const createBuilding = useCreateBuilding();

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!buildingId.trim()) {
      newErrors.buildingId = 'Building ID is required';
    }
    
    const temp = parseFloat(requestedTemp);
    if (isNaN(temp) || temp <= 0) {
      newErrors.requestedTemp = 'Temperature must be a positive number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    try {
      await createBuilding.mutateAsync({
        id: buildingId.trim(),
        requestedTemp: parseFloat(requestedTemp),
      });
      
      // Reset form and close modal on success
      setBuildingId('');
      setRequestedTemp('22');
      setErrors({});
      onOpenChange(false);
    } catch (error) {
      // Error handled by the hook
    }
  };

  const handleCancel = () => {
    setBuildingId('');
    setRequestedTemp('22');
    setErrors({});
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            Add New Building
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="building-id">Building ID</Label>
            <Input
              id="building-id"
              value={buildingId}
              onChange={(e) => setBuildingId(e.target.value)}
              placeholder="e.g., Building-A, Tower-1"
              className={errors.buildingId ? 'border-destructive' : ''}
            />
            {errors.buildingId && (
              <p className="text-sm text-destructive">{errors.buildingId}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="requested-temp">Requested Temperature (°C)</Label>
            <Input
              id="requested-temp"
              type="number"
              value={requestedTemp}
              onChange={(e) => setRequestedTemp(e.target.value)}
              min="0"
              step="0.1"
              className={errors.requestedTemp ? 'border-destructive' : ''}
            />
            {errors.requestedTemp && (
              <p className="text-sm text-destructive">{errors.requestedTemp}</p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={createBuilding.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createBuilding.isPending}
              className="bg-gradient-primary"
            >
              {createBuilding.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Building'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}