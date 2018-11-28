import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { User } from '../../models/user.model';
import { BaseService } from '../../services/base.service';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable()
export class UserProvider extends BaseService{

  usersRef: AngularFireList<User[]>;

  //Não usado mais
  //currentUser: FirebaseObjectObservable<User>;
  currentUser: AngularFireObject<User>;

  users;

  constructor(
    //public http: HttpClient
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) {

    super();
    this.usersRef = this.db.list(`/ionic/udemy/app11-0/users`);
    this.listenAuthState();
  }

  create(user: User, uuid: string) {
    //user.$key = uuid;
    return this.db.object(`/ionic/udemy/app11-0/users/${uuid}`)
      .set(user)
      .catch(this.handlePromiseError);
  }

  private listenAuthState(): void {
    this.afAuth.authState
      .subscribe((authState: firebase.User) => {
        //console.log('authState', authState);

        if(authState) {
          console.log('authState alterado!');

          this.currentUser = this.db.object(`/ionic/udemy/app11-0/users/${authState.uid}`)
          //this.setUsers(authState.uid);
          this.setUsers(authState.uid);

        }
      });
  }

  private setUsers(uidToExclude: string): void {
    this.users = this.db.list<User>(`/ionic/udemy/app11-0/users`,
    //(ref: firebase.database.Reference) => ref.orderByChild('name'))
    ref => ref.orderByChild('name'))
      .snapshotChanges()
      .pipe(
        map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))),
        map((users: User[]) => {
          return users.filter((user: User) => user.key !== uidToExclude);
        })
      )

  }


  //Não pode ser Observable<boolean> porque retorna Observable<AngularFireAction<firebase.database.DataSnapshot>[]>
  userExists1(username: string): Observable<boolean> {

  //userExists1(username: string): Observable<AngularFireAction<firebase.database.DataSnapshot>[]> {
  //userExists1(username: string) {
    //Vamos procurar na url a partir do nó-filho username de forma ordenada e essa procura vai ter que ser igual ao valor de username passado
    return this.db.list(`/ionic/udemy/app11-0/users/`, ref => ref.orderByChild('username').equalTo(username))
           .valueChanges()
           .pipe(
             map((users: User[]) => {
               //Se o nome de usuário constar logo ele será maior que zero
               return users.length > 0;
             }),
             catchError(this.handleObservableError)
           );

  }

  /* userExists0(username: string): Observable<boolean> {
  //userExists(username: string): AngularFireList<boolean> {
    return this.db.list(`/ionic/udemy/app11-0/users`, {
      query: {
        orderByChild: 'username',
        equalTo: username
      }
    }).map((users: User[]) => {
      return users.length > 0;
    }).catch(this.handleObservableError);

  } */

}
