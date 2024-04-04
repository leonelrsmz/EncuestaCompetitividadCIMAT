export class UserModel {
    Username: string;
    Password: string;
}

export class RegisterModel {
    Name: string;
    Username: string;
    Password: string;
}

export class UserInsFireBaseModel {
    Name: string;
    Email: string;
    Company: string;
    RolId: number;
    UId: string;
}

export class UserSearchModel {
    PageNumber: number;
    RowsOfPage: number;
    SearchText: string;
    ByField: string;
    SortType: string;
}

export class UserSearchReslt {
    UserId: number;
    Name: string;
    Email: string;
    Company: string;
    RolId: number;
    Description: string;
    IsActive: boolean;
    Total: number;
    Page: number;
    RowsOfPage: number;
}
