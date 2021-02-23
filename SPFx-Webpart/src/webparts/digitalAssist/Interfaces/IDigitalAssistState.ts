
import { IMember } from '../Interfaces/IMember';

export interface IDigitalAssistState {
    teamMembers: IMember[];
    email: string;
    filteredUser: IMember[];
    
}