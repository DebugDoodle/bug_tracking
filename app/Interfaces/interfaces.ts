// interfaces.ts
export interface TeamMember {
    Id: number;
    ProjectID: number;
    EmployeeId: number;
    Name: string;
    Role: string;
    AvatarSrc: string | null;
  }
  
  export interface Project {
    Id: number;
    Title: string;
    Description: string;
    ProjectLogo: string;
    TeamMembers: TeamMember[];
  }
  
  export interface ProjectDetailsResponse {
    Projectdetails: Project[];
  }
  