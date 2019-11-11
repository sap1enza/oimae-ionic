import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { WatsonConfig } from '../watson.config';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { error } from 'util';

@Injectable()
export class watsonConversation {
    version = WatsonConfig.authURL.conversation.version_date;
    watsonConfig = WatsonConfig.authURL.conversation;
    token = btoa(this.watsonConfig.authUsername+":"+this.watsonConfig.authPassword);

    public constructor(
        public http: Http
    ) {}

    public createSession(): Observable<any> {
        const options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Basic ${this.token}`
            })
        });
        const link = this.watsonConfig.baseAssistantLink + '/sessions?version=' + this.version;
        
        return this.http.post(link,{},options) // ...using post request
            .map((res: Response) => res.json())
            .catch((error: any) => {
                console.log(error);
                return Observable.throw(error.json().error || 'Server error');
            });
    }

    public sendMessage(text): Observable<any> {
        const options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Basic ${this.token}`
            })
        });
        const link = this.watsonConfig.baseLinkWorkspace + '?version=' + this.version;

        const bodyObject = {
            input:{
                text,
            }
        };
        const bodyString = JSON.stringify(bodyObject); // Stringify payload
        return this.http.post(link,bodyString,options) // ...using post request
            .map((res: Response) => res.json())
            .catch((error: any) => {
                console.log(error);
                return Observable.throw(error.json().error || 'Server error');
            });
    }

}
