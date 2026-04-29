export type UserRole = "superadmin" | "user";

export type LoggedInUserDto = {
    id: string;
    name: string;
    mobileNo: string;
    role: UserRole;
};