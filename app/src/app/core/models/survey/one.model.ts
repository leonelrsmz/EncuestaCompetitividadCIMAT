export class OneModel {
    Id: string;
    CompanyName: string;
    Street: string;
    Number: string;
    Colony: string;
    Municipality: string;
    ZipCode: string;
    State: string;
    WebSite: string;
    CompanySize: string;
    TypeCompanyOrganization: string;
    FoundationYear: string;
    EconomicActivity: string;
    MainActivituyCompany: string;
    Factors: MainCompetitivenessFactors[];
    LocalCapital: string;
    NationalCapital: string;
    ForeignCapital: string;
    CountryOriginForeignCapital: string;
    MainProductServiceCompany: string;
    GroupConsortium: GroupConsortium;
    ClusterAssociation: ClusterAssociation;
}
export class MainCompetitivenessFactors {
    Id: string;
    Desciption: string;
}
export class GroupConsortium {
    Id: string;
    Belongs: boolean;
    Name: string;
}
export class ClusterAssociation {
    Id: string;
    Belongs: boolean;
    Name: string;
}
