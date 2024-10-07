import { UserDto } from '../dto/created-user.dto';
import { Users } from '../entities/users.entity';

export const UserMapper = (user: Users): UserDto => {
  const data = {
    id: user.id,
    email: user.email,
    user_name: user.user_name,
    name: user.name,
    last_name: user.last_name,
    phone_number: user.phone_number,
    role: user.role as string,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };

  return data;
};
