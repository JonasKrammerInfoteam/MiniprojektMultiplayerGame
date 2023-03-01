export class Developer{
    private devName : string;
    private projectActivities : string[];
    private profilePictureUrl: string;
    private isPictureLeft : boolean;

    constructor(devName : string, projectActivites : string[], isPictureLeft : boolean, profilePictureUrl : string = "../../assets/UnknownProfile.svg") {
        this.devName = devName;
        this.projectActivities = projectActivites;
        this.profilePictureUrl = profilePictureUrl;
        this.isPictureLeft = isPictureLeft;
    }

    public GetDevname() : string {
        return this.devName;
    }

    public GetPictureLeft() : boolean {
        return this.isPictureLeft;
    }

    public GetProjectActivites() : string[] {
        return this.projectActivities;
    }

    public GetProfilePictureUrl() : string {
        return this.profilePictureUrl;
    }

}