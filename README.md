# Tp Project Films Series

## Create Ionic projet
Run `ionic start`

## Run serve
Run `ionic serve` 

## Database with Firebase (hosting)

Need a Google account.
On Firebase => Get started => Add project.
!!! Disable Google Analytics for the project (illegal in Europe because of the RGPD) !!!
Create a "Realtime Database"
Start in test mode. (Everyone car write, delete, update datas in DB)

Save on firebase (*.page.ts) :

export class HomePage implements OnInit{
    //http
    constructor(private http:HttpClient){}

    let url = // db url
    info:string = '' ;
    nom: string = '';

    ngOnInit(){
        this.http.get<any>(this.url).subscribe(
            (data) => {
                this.info = data.nom
            }
        );
    }

    onSave(){
        let personne:any = {};
        let val = this.nom
        personne.nom = val;
        this.http.put(this.url, personne).subscribe(
            (data) => {
                console.log(data);
            }
        );
    }
}

