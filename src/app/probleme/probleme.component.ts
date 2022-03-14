import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { ITypeProbleme } from './probleme';
import { ProblemeService } from './probleme.service';

@Component({
  selector: 'stk-produit',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {

  problemeForm: FormGroup;
  categoriesProblemes: ITypeProbleme[];
  errorMessage: string;
  constructor(private fb: FormBuilder, private problemes: ProblemeService) { }

  ngOnInit() {
    this.problemeForm = this.fb.group({
       prenom: ['', [VerifierCaracteresValidator.longueurMinimum(3), Validators.required]],
       noTypeProbleme: ['', [Validators.required]],
       courrielGroup: this.fb.group({
       courriel: [{value: '', disabled: true}],
       courrielConfirmation: [{value: '', disabled: true}],
       }),
       telephone: [{value: '', disabled: true}]
    });

    this.problemes.obtenirTypesProbleme()
    .subscribe(cat => this.categoriesProblemes = cat,
               error => this.errorMessage = <any>error);  
  }

  save(): void {
  }

  appliquerNotifications(typeProbleme: string): void {
    const telephoneControl = this.problemeForm.get('telephone');
    const adresseCourrielControl = this.problemeForm.get('courrielGroup.courriel');   
    const confirmerCourrielControl = this.problemeForm.get('courrielGroup.courrielConfirmation');   

    telephoneControl.clearValidators();
    telephoneControl.reset();
    telephoneControl.disable();  

    adresseCourrielControl.clearValidators();
    adresseCourrielControl.reset();    
    adresseCourrielControl.disable();

    confirmerCourrielControl.clearValidators();
    confirmerCourrielControl.reset();    
    confirmerCourrielControl.disable();

    telephoneControl.updateValueAndValidity();   
    adresseCourrielControl.updateValueAndValidity();    
    confirmerCourrielControl.updateValueAndValidity();         
  }
}
