import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormArray,FormBuilder,AbstractControl,ValidatorFn } from '@angular/forms';
import { UserService } from './services/user.service';
import {ToastrService} from "ngx-toastr"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'user-form';
  userForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required,this.noSpaceValidator()]),
    email: new FormControl('', [Validators.required,Validators.email]),
    department: new FormControl('', [Validators.required]),
    mobileNumber: new FormControl('', [Validators.required]),
    telephoneNumber: new FormControl('', [Validators.required]),
    brandName: new FormControl('', [Validators.required]),

    deliveryName: new FormControl('', [Validators.required]),
    deliveryStreet: new FormControl('', [Validators.required]),
    deliveryHouseNr: new FormControl('', [Validators.required]),
    deliveryPostcode: new FormControl('', [Validators.required]),
    deliveryCity: new FormControl('', [Validators.required]),
    deliveryCountry: new FormControl('', [Validators.required]),

    checkbox: new FormControl(false),

    billingName: new FormControl('', [Validators.required]),
    billingStreet: new FormControl('', [Validators.required]),
    billingHouseNr: new FormControl('', [Validators.required]),
    billingPostcode: new FormControl('', [Validators.required]),
    billingCity: new FormControl('', [Validators.required]),
    billingCountry: new FormControl('', [Validators.required]),

    contactPersons: new FormArray([])
  })
  constructor(
    private formBuilder: FormBuilder,
    private userService:UserService,
    private ToasterService: ToastrService
  ){

  }
  ngOnInit(): void {
    this.addContactPerson()
  }
   noSpaceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (/\s/.test(value)) { // Check if value contains any whitespace
        return { 'noSpace': true }; // Return validation error
      }
      return null; // No validation error
    };
  }
  submitForm() {
    // this.ToasterService.info("checlk")
    const billingName = this.userForm.get("billingName")
    const billingStreet = this.userForm.get("billingStreet")
    const billingHouseNr = this.userForm.get("billingHouseNr")
    const billingPostcode = this.userForm.get("billingPostcode")
    const billingCity = this.userForm.get("billingCity")
    const billingCountry = this.userForm.get("billingCountry")
    if (this.userForm.value.checkbox) {
      billingName?.setValidators(Validators.required)
      billingStreet?.setValidators(Validators.required)
      billingHouseNr?.setValidators(Validators.required)
      billingPostcode?.setValidators(Validators.required)
      billingCity?.setValidators(Validators.required)
      billingCountry?.setValidators(Validators.required)
    } else {
      billingName?.clearValidators()
      billingStreet?.clearValidators()
      billingHouseNr?.clearValidators()
      billingPostcode?.clearValidators()
      billingCity?.clearValidators()
      billingCountry?.clearValidators()
    }

    billingName?.updateValueAndValidity()
    billingStreet?.updateValueAndValidity()
    billingHouseNr?.updateValueAndValidity()
    billingPostcode?.updateValueAndValidity()
    billingCity?.updateValueAndValidity()
    billingCountry?.updateValueAndValidity()

    Object.values(this.userForm.controls).forEach((control: any) => {
      control.markAsDirty();
    });
    this.contactPersons.controls.forEach((contactPerson: AbstractControl) => {
      if (contactPerson instanceof FormGroup) {
        this.markFormGroupTouched(contactPerson);
        Object.values(contactPerson.controls).forEach((control: any) => {
          control.markAsDirty();
        });
      }
    });
    if (!this.userForm.valid){
      return;
    }
    let payload = this.userForm.value
    this.userService.createUser(payload).subscribe((res)=>{
      console.log(res,"check res")
    })
    console.log(this.userForm.value, "check values")
  }
  get contactPersons(): FormArray {
    return this.userForm.get('contactPersons') as FormArray;
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
  
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
  addContactPerson(): void {
    if (this.contactPersons.length < 5) {
      const contactPersonGroup = this.formBuilder.group({
        id: [`${this.contactPersons.length+1}`],
        name: ['', Validators.required],
        telephone: ['', Validators.required],
        mobile: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        country: ['', Validators.required]
      });
      this.contactPersons.push(contactPersonGroup);
    }
  }
  removeContactPerson(index: number): void {
    if(this.contactPersons.length<2){
      return
    }
    this.contactPersons.removeAt(index);
  }
}
