import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators ,ReactiveFormsModule} from '@angular/forms';
import { User } from '../model/user.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    constructor(private authService: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router) { }

  ngOnInit() {
  }
  
async login(num: HTMLInputElement, pass:HTMLInputElement){
    let user={
            numero:num.value,
            password:pass.value
          };
    const loading = await this.loadingCtrl.create({ message: 'Logging in ...' });
        await loading.present();
        this.authService.login(user).subscribe(
          async token => {
            localStorage.setItem('token', token);
            loading.dismiss();
            this.router.navigateByUrl('/home');
          },
          async () => {
            const alert = await this.alertCtrl.create({ message: 'Login Failed', buttons: ['OK'] });
            await alert.present();
            loading.dismiss();
          }
        );
  }
}
