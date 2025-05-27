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
  channel: string;
  language: string;
  location: string;
  status: EventStatus;
  group_size: number;
  num_instructors_needed: number;
  num_representatives_needed: number;
  assignedPeople?: string;
}

export interface CreateEventRequest {
  title: string;
  description: string;
  date: Date;
  channel: string;
  language: string;
  location: string;
  group_size: number;
  num_instructors_needed: number;
  num_representatives_needed: number;
}
