// types/prisma.ts
// Généré automatiquement à partir de votre schema.prisma
// Correspond exactement aux modèles Prisma

import {
  CompanyCreateWithoutUsersInput,
  CompanyWhereUniqueInput,
  RestaurantCreateWithoutTicketsInput,
  SessionCreateNestedManyWithoutUserInput,
  SessionCreateNestedOneWithoutTicketsInput,
  TicketCreateNestedManyWithoutUserInput,
  UserCreateNestedOneWithoutTicketsInput,
} from "@/generated/prisma/models";

export type Json =
  | null
  | boolean
  | number
  | string
  | Json[]
  | { [key: string]: Json };

export enum UserRole {
  VALET = "VALET",
  CLIENT = "CLIENT",
  ADMIN = "ADMIN",
}

// Modèles principaux
export interface User {
  id: string;
  role: UserRole;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
  phoneNumber: string | null;
  password: string | null;
  email: string | null;
  resetToken: string | null;
  companyId: string | null;
  // Relations
  sessions?: Session[];
  tickets?: Ticket[];
  company?: Company | null;
}

export interface TicketCreated {
  ticketId: string;
}
export interface Ticket {
  id: string;
  userId: string;
  restaurantId: string;
  scannedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  ticketNumber: number;
  sessionId: string | null;
  immatriculation: string | null;
  // Relations
  restaurant: Restaurant;
  session?: Session | null;
  user: User;
}

export interface Restaurant {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  ticketPrice: string;
  companyId: string;
  // Relations
  sessions?: Session[];
  tickets?: Ticket[];
  company?: Company;
}

export interface Session {
  id: string;
  userId: string;
  endAt: Date | null;
  restaurantId: string;
  createdAt: Date;
  startedAt: Date | null;
  // Relations
  restaurant: Restaurant;
  user: User;
  tickets?: Ticket[];
}

export interface CguPart {
  subtitle: string;
  text: string;
}

export interface Company {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  cgu: CguPart[] | null;
  // Relations
  restaurants?: Restaurant[];
  users?: User[];
}

// Types pour les inputs Prisma (création/mise à jour)
export interface UserCreateInput {
  role: UserRole;
  name?: string | null;
  phoneNumber?: string | null;
  password?: string | null;
  email?: string | null;
  resetToken?: string | null;
  company?: CompanyCreateNestedOneWithoutUsersInput;
  sessions?: SessionCreateNestedManyWithoutUserInput;
  tickets?: TicketCreateNestedManyWithoutUserInput;
}

export interface TicketCreateInput {
  scannedAt: Date;
  ticketNumber?: number;
  sessionId?: string | null;
  immatriculation?: string | null;
  restaurant: RestaurantCreateNestedOneWithoutTicketsInput;
  user: UserCreateNestedOneWithoutTicketsInput;
  session?: SessionCreateNestedOneWithoutTicketsInput;
}

// Types pour les relations imbriquées
export interface CompanyCreateNestedOneWithoutUsersInput {
  create?: CompanyCreateWithoutUsersInput;
  connect?: CompanyWhereUniqueInput;
}

export interface RestaurantCreateNestedOneWithoutTicketsInput {
  create?: RestaurantCreateWithoutTicketsInput;
  connect: RestaurantWhereUniqueInput;
}

// Types pour les requêtes
export interface UserWhereUniqueInput {
  id?: string;
  phoneNumber?: string;
  resetToken?: string;
}

export interface RestaurantWhereUniqueInput {
  id?: string;
}

// Types pour les réponses API (version simplifiée)
export interface ApiUser {
  id: string;
  role: UserRole;
  name: string | null;
  phoneNumber: string | null;
  email: string | null;
}

export interface ApiTicket {
  id: string;
  ticketNumber: number;
  scannedAt: string;
  restaurant: {
    id: string;
    name: string;
    ticketPrice: string | null;
  };
  user: ApiUser;
}

export interface ApiRestaurant {
  id: string;
  name: string;
  ticketPrice: string | null;
  company?: {
    id: string;
    name: string;
  } | null;
}

// Fonctions utilitaires pour convertir les dates
export function convertPrismaDates<
  T extends { createdAt: Date; updatedAt: Date }
>(data: T): T {
  return {
    ...data,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  };
}

export function convertApiDates<
  T extends { createdAt: string; updatedAt: string }
>(
  data: T
): Omit<T, "createdAt" | "updatedAt"> & { createdAt: Date; updatedAt: Date } {
  return {
    ...data,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  };
}
