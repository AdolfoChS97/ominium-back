export interface IPermission {
  name: string;
  execute?: boolean;
  read?: boolean;
  write?: boolean;
}
