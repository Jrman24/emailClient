import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {MatchPassword} from '../validators/match-password';
import {UniqueUsername} from '../validators/unique-username';
import {AuthService} from '../auth.service';


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    authForm = new FormGroup({
        username: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
            Validators.pattern(/^[a-z0-9]+$/)
        ], [this.uniqueUserName.validate]),
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(8),
        ]),
        passwordConfirmation: new FormControl('', [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(8),
        ])
    }, {validators: [this.matchPassWord.validate]});

    constructor(
        private matchPassWord: MatchPassword,
        private uniqueUserName: UniqueUsername,
        private authService: AuthService
    ) {
        console.log(this.authForm);
    }

    ngOnInit(): void {
    }

    onSubmit() {
        if (this.authForm.invalid) {
            return;
        }
        this.authService.signup(this.authForm.value).
        subscribe({
            next:  response => {

            },
            error: (err) => {
                if (!err.status) {
                    this.authForm.setErrors({ noConnection: true });
                } else {
                    this.authForm.setErrors({ unknownError: true });
                }
            }
        });
    }
}
