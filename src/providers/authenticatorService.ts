import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { GooglePlus } from '@ionic-native/google-plus';
import * as firebase from 'firebase/app';
import { Platform} from 'ionic-angular';


@Injectable()
export class AuthenticatorService {

  constructor(
    private afAuth: AngularFireAuth,
    private googlePlus: GooglePlus,
    private platform: Platform) { }


  
  doOauthLogin(provider: string): Promise<any> {
    const promise = new Promise<any>((resolve, reject) => {
      if(!this.platform.is('cordova')){
        this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then((request) => {
          var user = {
            email: (<any>request).user.email, 
            accessToken: (<any>request).credential.accessToken, 
            nombre: (<any>request).additionalUserInfo.profile.given_name, 
            apellido: (<any>request).additionalUserInfo.profile.family_name,
            picture: (<any>request).user.photoURL
          }
          resolve(user);
        })
        .catch(e => {
          console.error(`${provider} Login Failure:`, e);
          reject(e);
        });
      }
      else{
        this.googlePlus.login({})
        .then((res) => {
          var user = {
            name: res.displayName,
            email: res.email,
            picture: res.imageUrl
          }
          resolve(user);
        })
        .catch((err) => {
          reject(err);
        });
      }
      
    });

    return promise;
  }

  doOauthLogout(provider: string): Promise<any> {
    const promise = new Promise<any>((resolve, reject) => {
      if(!this.platform.is('cordova')){
        this.afAuth.auth.signOut()
        .then(() => resolve())
        .catch(err => {
          console.error(`${provider} Logout Failure:`, err);
          reject(err);
        });
      }
      else{
        this.googlePlus.logout()
        .then(res => {
          resolve(res) 
        }, err => {
          console.error(`${provider} Login Failure:`, err);
          reject(err);
        });
      }
      
    });

    return promise;
  }

  

}