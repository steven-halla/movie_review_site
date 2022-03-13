export type RoleName = 'user' | 'admin' | 'moderator';

export interface Role {
  id: number;
  name: RoleName;
}
