/**
 * Role-Based Access Control (RBAC) types
 */

export interface Permission {
  id: number;
  permissionId: number | null;
  code: string;
  name: string;
  description: string | null;
  category: string | null;
}

export interface Role {
  id: number;
  roleId: number | null;
  name: string;
  description: string;
  permissionCount: number;
  permissions: Permission[];
}

export interface RolesResponse {
  success: boolean;
  message: string;
  data: {
    roles: Role[];
  };
  timestamp: string;
}

export interface AssignRoleRequest {
  roleName: string;
}

export interface AssignRoleResponse {
  success: boolean;
  message: string;
  data: unknown;
  timestamp: string;
  statusCode: number | null;
  errorCode: string | null;
}

// Permissions API types
export interface PermissionsResponse {
  success: boolean;
  message: string;
  data: {
    permissions: Permission[];
  };
  timestamp: string;
}

export interface CreatePermissionRequest {
  name: string;
  code: string;
  description: string;
  category: string;
}

export interface CreatePermissionResponse {
  success: boolean;
  message: string;
  data: Permission;
  timestamp: string;
  statusCode: number | null;
  errorCode: string | null;
}

// Role creation types
export interface CreateRoleRequest {
  name: string;
  description: string;
  permissionCodes: string[];
}

export interface CreateRoleResponse {
  success: boolean;
  message: string;
  data: Role;
  timestamp: string;
  statusCode: number | null;
  errorCode: string | null;
}
