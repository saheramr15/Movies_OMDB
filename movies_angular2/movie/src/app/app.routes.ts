import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FooterComponent } from './footer/footer.component';
import { MovielistComponent } from './movielist/movielist.component';
import { MoviedetailsComponent } from './moviedetails/moviedetails.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'home',
        pathMatch:"full"
    },
    {
        path:'home',
        children: [
            {
              path: '',
              component: NavbarComponent,
              outlet:'navbar'
              
            },{
                path: '',
                component: HomeComponent,
                outlet:'home'
            },{
                path: '',
                component:FooterComponent,
                outlet:'footer'
            }
          ]
    },
    {
        path:'movielist',
        children: [
            {
              path: '',
              component: NavbarComponent,
              outlet:'navbar'
              
            },{
                path: '',
                component: MovielistComponent,
                outlet:'movielist'
            },{
                path: '',
                component:FooterComponent,
                outlet:'footer'
            }
          ]
    },{
        path:'moviedetails/:id',
        children: [
            {
              path: '',
              component: NavbarComponent,
              outlet:'navbar'
              
            },{
                path: '',
                component: MoviedetailsComponent,
                outlet:'moviedetail'
            },{
                path: '',
                component:FooterComponent,
                outlet:'footer'
            }
          ]
    },{
        path:'moviedetails/:id',
        children: [
            {
              path: '',
              component: NavbarComponent,
              outlet:'navbar'
              
            },{
                path: '',
                component: MoviedetailsComponent,
                outlet:'moviedetail'
            },{
                path: '',
                component:FooterComponent,
                outlet:'footer'
            }
          ]
    },
    {
        path:'login',
        children: [
            {
              path: '',
              component: LoginComponent,
              outlet:'login' 
            }
          ]
    },
    {
        path:'signup',
        children: [
            {
              path: '',
              component: SignupComponent,
              outlet:'signup' 
            }
          ]
        
    }


];
