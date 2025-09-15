import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getAllBuildings, 
  getBuilding, 
  createBuilding, 
  addApartment, 
  addCommonRoom,
  setBuildingTemperature,
  updateApartment,
  updateCommonRoom,
  deleteRoom,
  deleteBuilding,
  getCommonRoomTypes
} from '../lib/api';
import { 
  CreateBuildingRequest, 
  AddApartmentRequest, 
  AddCommonRoomRequest 
} from '../types/api';
import { toast } from 'react-hot-toast';

export function useBuildings() {
  return useQuery({
    queryKey: ['buildings'],
    queryFn: getAllBuildings,
    refetchInterval: 5000, // Real-time updates every 5 seconds
  });
}

export function useBuilding(id: string) {
  return useQuery({
    queryKey: ['building', id],
    queryFn: () => getBuilding(id),
    enabled: !!id,
  });
}

export function useCreateBuilding() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createBuilding,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['buildings'] });
      toast.success(data.message || 'Building created successfully');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to create building';
      toast.error(message);
    },
  });
}

export function useAddApartment() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ buildingId, data }: { buildingId: string; data: AddApartmentRequest }) =>
      addApartment(buildingId, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['buildings'] });
      queryClient.invalidateQueries({ queryKey: ['building', variables.buildingId] });
      toast.success(data.message || 'Apartment added successfully');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to add apartment';
      toast.error(message);
    },
  });
}

export function useAddCommonRoom() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ buildingId, data }: { buildingId: string; data: AddCommonRoomRequest }) =>
      addCommonRoom(buildingId, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['buildings'] });
      queryClient.invalidateQueries({ queryKey: ['building', variables.buildingId] });
      toast.success(data.message || 'Common room added successfully');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to add common room';
      toast.error(message);
    },
  });
}

export function useUpdateBuildingTemperature() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ buildingId, temp }: { buildingId: string; temp: number }) =>
      setBuildingTemperature(buildingId, temp),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['buildings'] });
      queryClient.invalidateQueries({ queryKey: ['building', variables.buildingId] });
      toast.success(data.message || 'Temperature updated successfully');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to update temperature';
      toast.error(message);
    },
  });
}

export function useUpdateApartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ buildingId, roomId, data }: { buildingId: string; roomId: string; data: AddApartmentRequest }) =>
      updateApartment(buildingId, roomId, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['buildings'] });
      queryClient.invalidateQueries({ queryKey: ['building', variables.buildingId] });
      toast.success(data.message || 'Apartment updated successfully');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to update apartment';
      toast.error(message);
    },
  });
}

export function useUpdateCommonRoom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ buildingId, roomId, data }: { buildingId: string; roomId: string; data: AddCommonRoomRequest }) =>
      updateCommonRoom(buildingId, roomId, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['buildings'] });
      queryClient.invalidateQueries({ queryKey: ['building', variables.buildingId] });
      toast.success(data.message || 'Common room updated successfully');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to update common room';
      toast.error(message);
    },
  });
}

export function useDeleteRoom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ buildingId, roomId }: { buildingId: string; roomId: string }) =>
      deleteRoom(buildingId, roomId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['buildings'] });
      queryClient.invalidateQueries({ queryKey: ['building', variables.buildingId] });
      toast.success(data.message || 'Room deleted successfully');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to delete room';
      toast.error(message);
    },
  });
}

export function useDeleteBuilding() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (buildingId: string) => deleteBuilding(buildingId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['buildings'] });
      toast.success(data.message || 'Building deleted successfully');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to delete building';
      toast.error(message);
    },
  });
}

export function useCommonRoomTypes() {
  return useQuery({
    queryKey: ['common-room-types'],
    queryFn: getCommonRoomTypes,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
}