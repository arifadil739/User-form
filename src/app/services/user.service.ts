import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SpinnerService } from 'src/shared/services/spinner.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(
        private http: HttpClient,
        private spinnerService: SpinnerService
    ) { }

    createUser(payload: any) {
        this.spinnerService.setLoading(true);
        return this.http.post(environment.apiUrl + '/Auth/signup', payload, {
            observe: 'response',
             withCredentials: true 
        }
        );
    }

}