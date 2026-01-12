// types/prisma.ts
// Generated automatically from your schema.prisma
// Corresponds exactly to Prisma models

import {
  CompanyCreateWithoutUsersInput,
  CompanyWhereUniqueInput,
  SiteCreateWithoutTicketsInput,
  SessionCreateNestedManyWithoutUserInput,
  WorkSessionCreateNestedManyWithoutUserInput,
  WorkSessionCreateNestedOneWithoutTicketsInput,
  TicketCreateNestedManyWithoutUserInput,
  UserCreateNestedOneWithoutTicketsInput,
  AccountCreateNestedManyWithoutUserInput,
} from "@/generated/prisma/models";
import { LottieRefCurrentProps } from "lottie-react";

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

// Main Models
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
  emailVerified: boolean;
  image: string | null;
  // Relations
  sessions?: Session[];
  workSessions?: WorkSession[];
  tickets?: Ticket[];
  company?: Company | null;
  accounts?: Account[];
}

export interface TicketCreated {
  ticketId: string;
}

export interface Ticket {
  id: string;
  userId: string;
  siteId: string;
  scannedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  ticketNumber: number;
  workSessionId: string | null;
  immatriculation: string | null;
  // Relations
  site: Site;
  workSession?: WorkSession | null;
  user: User;
}

export interface Site {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  ticketPrice: string;
  companyId: string | null;
  // Relations
  workSessions?: WorkSession[];
  tickets?: Ticket[];
  company?: Company | null;
}

// Better Auth Session (authentication)
export interface Session {
  id: string;
  userId: string;
  expiresAt: Date;
  token: string;
  createdAt: Date;
  updatedAt: Date;
  ipAddress: string | null;
  userAgent: string | null;
  // Relations
  user: User;
}

// Work Session (site shifts)
export interface WorkSession {
  id: string;
  userId: string;
  siteId: string;
  startedAt: Date;
  endAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  site: Site;
  user: User;
  tickets?: Ticket[];
}

export interface Account {
  id: string;
  accountId: string;
  providerId: string;
  userId: string;
  accessToken: string | null;
  refreshToken: string | null;
  idToken: string | null;
  accessTokenExpiresAt: Date | null;
  refreshTokenExpiresAt: Date | null;
  scope: string | null;
  password: string | null;
  createdAt: Date;
  updatedAt: Date;
  // Relations
  user: User;
}

export interface Verification {
  id: string;
  identifier: string;
  value: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
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
  cgu?: CguPart[] | null;
  // Relations
  sites?: Site[];
  users?: User[];
}

// Types for Prisma inputs (create/update)
export interface UserCreateInput {
  role: UserRole;
  name?: string | null;
  phoneNumber?: string | null;
  password?: string | null;
  email?: string | null;
  resetToken?: string | null;
  emailVerified?: boolean;
  image?: string | null;
  company?: CompanyCreateNestedOneWithoutUsersInput;
  sessions?: SessionCreateNestedManyWithoutUserInput;
  workSessions?: WorkSessionCreateNestedManyWithoutUserInput;
  tickets?: TicketCreateNestedManyWithoutUserInput;
  accounts?: AccountCreateNestedManyWithoutUserInput;
}

export interface TicketCreateInput {
  scannedAt: Date;
  ticketNumber?: number;
  workSessionId?: string | null;
  immatriculation?: string | null;
  site: SiteCreateNestedOneWithoutTicketsInput;
  user: UserCreateNestedOneWithoutTicketsInput;
  workSession?: WorkSessionCreateNestedOneWithoutTicketsInput;
}

export interface WorkSessionCreateInput {
  userId: string;
  siteId: string;
  startedAt?: Date;
  endAt?: Date | null;
}

// Types for nested relations
export interface CompanyCreateNestedOneWithoutUsersInput {
  create?: CompanyCreateWithoutUsersInput;
  connect?: CompanyWhereUniqueInput;
}

export interface SiteCreateNestedOneWithoutTicketsInput {
  create?: SiteCreateWithoutTicketsInput;
  connect: SiteWhereUniqueInput;
}

// Types for queries
export interface UserWhereUniqueInput {
  id?: string;
  phoneNumber?: string;
  resetToken?: string;
  email?: string;
}

export interface SiteWhereUniqueInput {
  id?: string;
}

export interface WorkSessionWhereInput {
  userId?: string;
  siteId?: string;
  endAt?: null | { not: null };
}

// Types for API responses (simplified version)
export interface ApiUser {
  id: string;
  role: UserRole;
  name: string | null;
  phoneNumber: string | null;
  email: string | null;
  emailVerified: boolean;
  image: string | null;
}

export interface ApiTicket {
  id: string;
  ticketNumber: number;
  scannedAt: string;
  immatriculation: string | null;
  site: {
    id: string;
    name: string;
    ticketPrice: string | null;
  };
  user: ApiUser;
  workSession?: {
    id: string;
    startedAt: string;
    endAt: string | null;
  } | null;
}

export interface ApiSite {
  id: string;
  name: string;
  ticketPrice: string | null;
  company?: {
    id: string;
    name: string;
  } | null;
}

export interface ApiWorkSession {
  id: string;
  userId: string;
  siteId: string;
  startedAt: string;
  endAt: string | null;
  site: ApiSite;
  tickets?: ApiTicket[];
}

export interface EmailProps {
  siteName: string;
  scannedAt: string;
  ticketPrice: string;
  ticketNumber: number;
  email: string;
  companyCgu?: CguPart[] | null;
}

export interface EmailTemplateProps {
  siteName: string;
  scannedAt: string;
  ticketPrice: string;
  ticketNumber: number;
  companyCgu?: CguPart[] | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  userId: string;
}

export interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export interface EmailTicketActionProps {
  siteName: string;
  scannedAt: string;
  ticketPrice: string;
  ticketNumber: number;
  companyCgu?: CguPart[] | null;
}

export interface EmailTicketProps {
  email: string;
  siteName: string;
  scannedAt: string;
  ticketPrice: string;
  ticketNumber: number;
  companyCgu?: CguPart[] | null;
}

export interface RegisterValet {
  name?: string;
  email?: string;
  password?: string;
}

export interface RegisterValetData {
  name: string;
  email: string;
  password: string;
  companyId: string | null;
  siteId: string;
}

export interface LoginValet {
  email?: string;
  password?: string;
}

export interface LoginValetData {
  email: string;
  password: string;
  companyId: string | null;
  siteId: string;
}

export interface PlayAnimationInput {
  name: boolean;
  email: boolean;
  password: boolean;
}

export interface LottieRefsRegister {
  name?: LottieRefCurrentProps | null;
  email?: LottieRefCurrentProps | null;
  password?: LottieRefCurrentProps | null;
}

// Utility functions to convert dates
export function convertPrismaDates<
  T extends { createdAt: Date; updatedAt: Date },
>(data: T): T {
  return {
    ...data,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  };
}

export function convertApiDates<
  T extends { createdAt: string; updatedAt: string },
>(
  data: T
): Omit<T, "createdAt" | "updatedAt"> & { createdAt: Date; updatedAt: Date } {
  return {
    ...data,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  };
}

// Utility function to convert work session dates
export function convertWorkSessionDates(data: {
  startedAt: string;
  endAt: string | null;
  createdAt: string;
  updatedAt: string;
}): {
  startedAt: Date;
  endAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
} {
  return {
    startedAt: new Date(data.startedAt),
    endAt: data.endAt ? new Date(data.endAt) : null,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  };
}
