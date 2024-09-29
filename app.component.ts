import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,FormsModule, MatFormFieldModule,CommonModule,
    MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'string_calculator';
  calculatorForm!: FormGroup;
  result: number | null = null;
  errorMessage: any;
  ngOnInit(){
    this.calculatorForm = new FormGroup({
      stringControl:new FormControl('',[Validators.required])
    });
  }
  onSubmit(): any {
    const inputString = this.calculatorForm.get('stringControl')?.value;
    try {
      if(!inputString) {
        return 0;
      } else {
        this.result = this.getValue(inputString);
        this.errorMessage = null;
      }
    } catch (error) {
      this.errorMessage = error;
      this.result = null;
    }
  }
  getValue(input: string): number {
    let delimiter = /,|\n/;
    if (input.startsWith('//')) {
      if(input.includes('\\n')) {
        const delimiterEndIndex = input.indexOf('\\n');
        delimiter = new RegExp(input.substring(2, delimiterEndIndex));
        input = input.substring(delimiterEndIndex + 2);
      } else {
        return 0;
      }
    } 
    const numberList = input.split(delimiter).map(n => parseInt(n.trim()));
    const negativeNumber = numberList.filter(n => n < 0);
    if (negativeNumber.length) {
      throw 'Negative numbers not allowed';
    }
    return numberList.reduce((sum, current) => sum + (isNaN(current) ? 0 : current), 0);
  }
}
