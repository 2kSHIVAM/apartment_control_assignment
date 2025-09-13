import axios from 'axios';
import { 
  ApiResponse, 
  BuildingDTO, 
  CreateBuildingRequest,
  AddApartmentRequest,
  AddCommonRoomRequest,
  UpdateTemperatureRequest
} from '../types/api';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  headers: { 
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: false
});

export async function getAllBuildings(): Promise<ApiResponse<BuildingDTO[]>> {
  const response = await api.get('/api/buildings');
  return response.data;
}

export async function getBuilding(id: string): Promise<ApiResponse<BuildingDTO>> {
  const response = await api.get(`/api/buildings/${id}`);
  return response.data;
}

export async function createBuilding(payload: CreateBuildingRequest): Promise<ApiResponse<BuildingDTO>> {
  const response = await api.post('/api/buildings', payload);
  return response.data;
}

export async function addApartment(buildingId: string, payload: AddApartmentRequest): Promise<ApiResponse<null>> {
  const response = await api.post(`/api/buildings/${buildingId}/apartments`, payload);
  return response.data;
}

export async function addCommonRoom(buildingId: string, payload: AddCommonRoomRequest): Promise<ApiResponse<null>> {
  const response = await api.post(`/api/buildings/${buildingId}/common-rooms`, payload);
  return response.data;
}

export async function setBuildingTemperature(buildingId: string, temp: number): Promise<ApiResponse<null>> {
  const response = await api.put('/api/buildings/setTemperature', { 
    id: buildingId, 
    requestedTemp: temp 
  });
  return response.data;
}