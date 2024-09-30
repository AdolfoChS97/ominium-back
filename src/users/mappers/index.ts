import { UserDto } from "../dto/created-user.dto";
import { User } from "../entities/user.entity";

export const UserMapper = (user: User): UserDto => {
    const data = {
        id: user.id,
        email: user.email,
        user_name: user.user_name,
        name: user.name,
        last_name: user.last_name,
        phone_number: user.phone_number,
        rol_id: user.rol as number,
        created_at: user.created_at,
        updated_at: user.updated_at,
    }

    return data;
}