import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { emailMatcherValidator } from '../shared/email-matcher/email-matcher.component';
import { VerifierCaracteresValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { IProbleme } from './probleme';
import { ProblemeService } from './probleme.service';
import { Router } from '@angular/router';
import { ITypeProbleme } from './typeprobleme';
import { TypeProblemeService } from './typeprobleme.service';

@Component({
  selector: 'stk-produit',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {

  problemeForm: FormGroup;
  categoriesProblemes: ITypeProbleme[];
  errorMessage: string;
  probleme: IProbleme;
  constructor(private fb: FormBuilder, private typeProblemeService: TypeProblemeService, private problemeService: ProblemeService, private route: Router) { }

  ngOnInit() {
    this.problemeForm = this.fb.group({
       prenom: ['', [VerifierCaracteresValidator.longueurMinimum(3), Validators.required]],
       nom: ['', [VerifierCaracteresValidator.longueurMinimum(3), Validators.required]],
       noTypeProbleme: ['', [Validators.required]],
       courrielGroup: this.fb.group({
       courriel: [{value: '', disabled: true}],
       courrielConfirmation: [{value: '', disabled: true}],
       }),
       telephone: [{value: '', disabled: true}],
       notification:['pasnotification'],
       descriptionProbleme: ['', [Validators.required, Validators.minLength(5)]],
       noUnite: '',
       dateProbleme: {value: Date(), disabled: true}
    });

    this.typeProblemeService.obtenirTypesProbleme()
    .subscribe(cat => this.categoriesProblemes = cat,
               error => this.errorMessage = <any>error);  
    
    this.problemeForm.get('notification').valueChanges
    .subscribe(value => this.appliquerNotifications(value));

  }
  
  save(): void {
    if (this.problemeForm.dirty && this.problemeForm.valid) {
        // Copy the form values over the problem object values
        this.probleme = this.problemeForm.value;
        this.probleme.id = 0;
        this.probleme.courriel = this.problemeForm.get('courrielGroup.courriel').value;
        //this.probleme.dateProbleme = new Date();
        this.problemeService.saveProbleme(this.probleme)
            .subscribe( // on s'abonne car on a un retour du serveur à un moment donné avec la callback fonction
                () => this.onSaveComplete(),  // Fonction callback
                (error: any) => this.errorMessage = <any>error
            );
    } else if (!this.problemeForm.dirty) {
        this.onSaveComplete();
    }
  }
  
  onSaveComplete(): void { 
    // Reset the form to clear the flags
    this.problemeForm.reset();  // Pour remettre Dirty à false.  Autrement le Route Guard va dire que le formulaire n'est pas sauvegardé
    this.route.navigate(['/accueil']);
  }

  appliquerNotifications(notifyVia: string): void {
    const telephoneControl = this.problemeForm.get('telephone');
    const adresseCourrielControl = this.problemeForm.get('courrielGroup.courriel');   
    const confirmerCourrielControl = this.problemeForm.get('courrielGroup.courrielConfirmation');   
    const courrielGroupControl = this.problemeForm.get('courrielGroup');

    telephoneControl.clearValidators();
    telephoneControl.reset();
    telephoneControl.disable();  

    adresseCourrielControl.clearValidators();
    adresseCourrielControl.reset();    
    adresseCourrielControl.disable();

    confirmerCourrielControl.clearValidators();
    confirmerCourrielControl.reset();    
    confirmerCourrielControl.disable();

    if (notifyVia === 'courriel') {
      courrielGroupControl.setValidators([Validators.compose([emailMatcherValidator.courrielDifferents()])])
      adresseCourrielControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);
      confirmerCourrielControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);
      adresseCourrielControl.enable();
      confirmerCourrielControl.enable();
    } else {
    
    if (notifyVia === 'messageTexte') {
      telephoneControl.setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]+')]);
      telephoneControl.enable();
    }
    
    telephoneControl.updateValueAndValidity();   
    adresseCourrielControl.updateValueAndValidity();    
    confirmerCourrielControl.updateValueAndValidity();         
  }
}
}