import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css'],
})
export class FormBuilderComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private formStateService: FormService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      formName: ['', Validators.required],
      fields: this.fb.array([]),
    });
    this.formStateService.getFormData().subscribe(
      (forms) => {
        // Assuming you want to populate the form with the first fetched form (you can adjust as needed)
        if (forms && forms.length > 0) {
          this.populateForm(forms[0]);
        }
      },
      (error) => {
        console.error('Error fetching forms:', error);
      }
    );
    
  }
  



addTextField() {
  this.fields.push(this.createTextField());
}

addDropdownField() {
  this.fields.push(this.createDropdownField());
}

addCheckboxField() {
  this.fields.push(this.createCheckboxField());
}

createTextField() {
  return this.fb.group({
    type: 'text',
    label: '',
    placeholder: '',
  });
}

createDropdownField() {
  return this.fb.group({
    type: 'dropdown',
    label: '',
    options: this.fb.array([]),
  });
}

createCheckboxField() {
  return this.fb.group({
    type: 'checkbox',
    label: '',
    options: this.fb.array([]),
  });
}
populateForm(formData: any) {
  // ... (existing code)

  const fieldsArray = this.form.get('fields') as FormArray;
  formData.fields.forEach((field: any) => {
    if (field.type === 'text') {
      fieldsArray.push(this.createTextField());
    } else if (field.type === 'dropdown') {
      fieldsArray.push(this.createDropdownField());
    } else if (field.type === 'checkbox') {
      fieldsArray.push(this.createCheckboxField());
    }
  });
}
removeField(index: number) {
  this.fields.removeAt(index);
}

  get fields(): FormArray {
  return this.form.get('fields') as FormArray;
}

// saveForm() {
//   console.log(this.form.value)
//   this.formStateService.updateFormData(this.form.value);
//   this.form.reset();
// }
// saveForm() {
//   console.log('Form values to be saved:', this.form.value);
//   this.formStateService.updateFormData(this.form.value);
//   this.form.reset();
// }
saveForm() {
  console.log('Form values to be saved:', this.form.value);
  this.formStateService.updateFormData(this.form.value)
    .subscribe(
      (response) => {
        console.log('Form data saved successfully:', response);
        this.form.reset();
      },
      (error) => {
        console.error('Error saving form data:', error);
      }
    );
}






// Helper methods for nested form arrays
getDropdownOptions(index: number): FormArray {
  return (this.fields.at(index).get('options') as FormArray);
}

getCheckboxOptions(index: number): FormArray {
  return (this.fields.at(index).get('options') as FormArray);
}


// addOption(parentIndex: number, type: string) {
//   const optionsArray = (type === 'dropdown') ? this.getDropdownOptions(parentIndex) : this.getCheckboxOptions(parentIndex);
//   optionsArray.push(this.fb.control(''));
// }
addOption(parentIndex: number, type: string) {
  const optionsArray = (type === 'dropdown') ? this.getDropdownOptions(parentIndex) : this.getCheckboxOptions(parentIndex);
  optionsArray.push(this.fb.group({
    option: ['', Validators.required]  // Add the 'option' control directly to the FormGroup
  }));
}


removeOption(parentIndex: number, optionIndex: number, type: string) {
  const optionsArray = (type === 'dropdown') ? this.getDropdownOptions(parentIndex) : this.getCheckboxOptions(parentIndex);
  optionsArray.removeAt(optionIndex);
}
getOptionsArray(index: number): FormArray {
  return (this.fields.at(index).get('options') as FormArray);
}
getFieldOptions(field: AbstractControl): FormArray {
  return (field.get('options') as FormArray);
}
  

}