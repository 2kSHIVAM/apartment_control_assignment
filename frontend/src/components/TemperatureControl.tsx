import { useState } from 'react';
import { useUpdateBuildingTemperature } from '@/hooks/useBuildings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Check, X } from 'lucide-react';

interface TemperatureControlProps {
  buildingId: string;
  currentTemp: number;
  onCancel: () => void;
  onComplete: () => void;
}

export function TemperatureControl({ 
  buildingId, 
  currentTemp, 
  onCancel, 
  onComplete 
}: TemperatureControlProps) {
  const [temperature, setTemperature] = useState(currentTemp.toString());
  const updateTemperature = useUpdateBuildingTemperature();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const temp = parseFloat(temperature);
    
    if (isNaN(temp) || temp <= 0) {
      return;
    }

    try {
      await updateTemperature.mutateAsync({ buildingId, temp });
      onComplete();
    } catch (error) {
      // Error handled by the hook
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input
        type="number"
        value={temperature}
        onChange={(e) => setTemperature(e.target.value)}
        className="w-20 h-8 text-sm"
        min="0"
        step="0.1"
        autoFocus
      />
      <span className="text-sm text-muted-foreground">°C</span>
      
      <div className="flex gap-1">
        <Button
          type="submit"
          size="sm"
          className="h-8 w-8 p-0"
          disabled={updateTemperature.isPending}
        >
          {updateTemperature.isPending ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            <Check className="h-3 w-3" />
          )}
        </Button>
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={onCancel}
          disabled={updateTemperature.isPending}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </form>
  );
}