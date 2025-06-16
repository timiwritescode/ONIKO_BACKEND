export class GeneralResponse {
    success: boolean;
    message: string;
    data: any

    constructor(success: boolean, messsage: string, data: any) {
        this.success = success;
        this.message = messsage;
        this.data = data;
    }
    
}