import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { FormGroup, FormControl, Validators ,ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router) { }


  ngOnInit() {
  }
async register(num: HTMLInputElement, pass:HTMLInputElement,nombre: HTMLInputElement, apellido_paterno:HTMLInputElement,apellido_materno: HTMLInputElement){
    //console.log(numero.value,password.value);
  let user={
            numero:num.value,
            password:pass.value,
            nombre:nombre.value,
            apellido_paterno:apellido_paterno.value,
            apellido_materno:apellido_materno.value

          };
    const loading = await this.loadingCtrl.create({ message: 'Logging in ...' });
        await loading.present();
        this.authService.register(user).subscribe(
          async msg  => {
            //console.log(msg);
            loading.dismiss();
            this.router.navigateByUrl('/login');
          },
          async msg => {
            //console.log(msg);
            const alert = await this.alertCtrl.create({ message: 'Number Exist', buttons: ['OK'] });
            await alert.present();
            loading.dismiss();
          }
        );
    }
}
