export interface RoomDTO {
  id: string;
  temperature: number;
  heatingEnabled: boolean;
  coolingEnabled: boolean;
  type: "Apartment" | "CommonRoom";
  apartmentNumber?: string | null;
  ownerName?: string | null;
  commonRoomType?: "GYM" | "LIBRARY" | "LAUNDRY" | null;
}

export interface BuildingDTO {
  id: string;
  requestedTemperature: number;
  rooms: RoomDTO[];
}

export interface ApiResponse<T> {
  message: string;
  data: T | null;
}

export interface CreateBuildingRequest {
  id: string;
  requestedTemp: number;
}

export interface AddApartmentRequest {
  ownerName: string;
  apartmentNumber: string;
  temp: number;
}

export interface AddCommonRoomRequest {
  type: "GYM" | "LIBRARY" | "LAUNDRY";
  temp: number;
}

export interface UpdateTemperatureRequest {
  temp: number;
}