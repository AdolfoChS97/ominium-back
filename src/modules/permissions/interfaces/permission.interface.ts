export interface IPermission {
  name: string;
  execute?: boolean;
  read?: boolean;
  write?: boolean;
}

export interface IResources {
  id: string;
  name: string;
  route: string;
}

export interface IResourcesToPermission {
  id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  resources: IResources[];
  permission: IPermission;
}
