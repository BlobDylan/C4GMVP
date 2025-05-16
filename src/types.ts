export enum EventStatus {
  PENDING = "pending",
  APPROVED = "approved",
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  permissions: string;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  status: EventStatus;
  spotsAvailable: number;
  assignedPeople?: string;
}

export interface CreateEventRequest {
  title: string;
  description: string;
  date: Date;
  location: string;
  spotsAvailable: number;
}

export interface EventCardType {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  spotsAvailable: number;
}

export interface MyEventCardType {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  status: EventStatus;
}
