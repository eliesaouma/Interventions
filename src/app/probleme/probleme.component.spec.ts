import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { emailMatcherValidator } from '../shared/email-matcher/email-matcher.component';

import { ProblemeComponent } from './probleme.component';
import { ProblemeService } from './probleme.service';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [ ProblemeComponent ],
      providers: [ProblemeService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    it("#1 | Zone PRÉNOM invalide avec 2 caractères", () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue("a".repeat(2));
    let errors = zone.errors || {};
    expect(errors['nbreCaracteresInsuffisant']).toBeTruthy();
    });

    it("#2 | Zone PRÉNOM valide avec 3 caractères", () =>{
      let zone = component.problemeForm.controls['prenom'];
      zone.setValue("a".repeat(3));
      let errors = zone.errors || {};
      expect(errors['minlength']).toBeFalsy();
    });

    it("#3 | Zone PRÉNOM valide avec 200 caractères", () =>{
      let zone = component.problemeForm.controls['prenom'];
      zone.setValue("a".repeat(200));
      let errors = zone.errors || {};
      expect(errors['minlength']).toBeFalsy();
    }); 
  
    it("#4 | Zone PRÉNOM invalide avec aucune valeur", () =>{
      let zone = component.problemeForm.controls['prenom'];
      zone.setValue(null);
      let errors = zone.errors || {};
      expect(errors['nbreCaracteresInsuffisant']).toBeTruthy();
    }); 
  
    it("#5 | Zone PRÉNOM INVALIDE avec 10 espaces", () =>{
      let zone = component.problemeForm.controls['prenom'];
      zone.setValue(" ".repeat(10));
      let errors = zone.errors || {};
      expect(errors['nbreCaracteresInsuffisant']).toBeTruthy();
    });

    it("#6 | Zone PRÉNOM INVALIDE avec 2 espaces et 1 caractère", () =>{
      let zone = component.problemeForm.controls['prenom'];
      zone.setValue(" ".repeat(2) + "a".repeat(1));
      let errors = zone.errors || {};
      expect(errors['minlength']).toBeFalsy();
    }); 

    it("#15 | Zone TELEPHONE est désactivée quand ne pas me notifier", () =>{
      component.appliquerNotifications('ne pas notifier');

      let zone = component.problemeForm.get('telephone');
      expect(zone.status).toEqual('DISABLED');
    }); 

    it("#16 | Zone TELEPHONE est vide quand ne pas me notifier", () =>{
      component.appliquerNotifications('ne pas notifier');

      let zone = component.problemeForm.get('telephone');
      expect(zone.value).toBeNull;
    }); 

    it("#17 | Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier", () =>{
      component.appliquerNotifications('ne pas notifier');

      let zone = component.problemeForm.get('courrielGroup.courriel');
      expect(zone.status).toEqual('DISABLED');
    }); 

    it("#18 | Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier", () =>{
      component.appliquerNotifications('ne pas notifier');

      let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
      expect(zone.status).toEqual('DISABLED');
    }); 

    it("#19 | Zone TELEPHONE est désactivée quand notifier par courriel", () =>{
      component.appliquerNotifications('courriel');

      let zone = component.problemeForm.get('telephone');
      expect(zone.status).toEqual('DISABLED');
    }); 

    it("#20 | Zone ADRESSE COURRIEL est activée quand notifier par courriel", () =>{
      component.appliquerNotifications('courriel');

      let zone = component.problemeForm.get('courrielGroup.courriel');
      expect(zone.enabled).toBeTrue();
    }); 

    it("#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel", () =>{
      component.appliquerNotifications('courriel');

      let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
      expect(zone.enabled).toBeTrue();
    }); 

    it("#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel", () =>{
      component.appliquerNotifications('courriel');
      
      let errors = {};
      let zone = component.problemeForm.get('courrielGroup.courriel');
      zone.setValue('');
      errors = zone.errors || {};
      expect(errors['required']).toBeTruthy();
    }); 

    it("#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel", () =>{
      component.appliquerNotifications('courriel');
      
      let errors = {};
      let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
      zone.setValue('');
      errors = zone.errors || {};
      expect(errors['required']).toBeTruthy();
    }); 

    it("#24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme", () =>{
      component.appliquerNotifications('courriel');

      let errors = {};
      let zone = component.problemeForm.get('courrielGroup.courriel');
      zone.setValue('aaaa');
      errors = zone.errors || {};
      expect(errors['pattern']).toBeTruthy();
    }); 

    it("#25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null", () =>{
      component.appliquerNotifications('courriel');

      let courriel = component.problemeForm.get('courrielGroup.courriel');
      let courrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
      let groupe = component.problemeForm.get('courrielGroup');
      let errors = {};
      courriel.setValue('');
      courrielConfirmation.setValue('aaa@asd.com');  
      errors = groupe.errors || {};
      expect(errors['match']).toBeUndefined();
    }); 

    it("#26 | Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null", () =>{
      component.appliquerNotifications('courriel');

      let courriel = component.problemeForm.get('courrielGroup.courriel');
      let courrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
      let groupe = component.problemeForm.get('courrielGroup');
      let errors = {};
      courriel.setValue('aaa@asd.com');
      courrielConfirmation.setValue('');  
      errors = groupe.errors || {};
      expect(errors['match']).toBeUndefined();
    }); 

    it("#27 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel", () =>{
      component.appliquerNotifications('courriel');
      let courriel = component.problemeForm.get('courrielGroup.courriel');
      let courrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
      let groupe = component.problemeForm.get('courrielGroup');
      let errors = {};
      courriel.setValue('xxx@asd.com');
      courrielConfirmation.setValue('aaa@asd.com');
      errors = groupe.errors || {};
      expect(errors['match']).toBe(true);
      });
    
    it("#28 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel", () =>{
      component.appliquerNotifications('courriel');
      let courriel = component.problemeForm.get('courrielGroup.courriel');
      let courrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
      let groupe = component.problemeForm.get('courrielGroup');
      let errors = {};
      courriel.setValue('aaa@asd.com');
      courrielConfirmation.setValue('aaa@asd.com');
      errors = groupe.errors || {};
      expect(errors['match']).toBeUndefined();
      });

    it("#29 | Zone TELEPHONE est activée quand notifier par messagerie texte", () =>{
      component.appliquerNotifications('messageTexte'); 
 
      let zone = component.problemeForm.get('telephone'); 
      expect(zone.enabled).toBeTrue(); 
      });

    it("#30 | Zone ADRESSE COURRIEL est désactivée quand notifier par messagerie texte", () =>{
      component.appliquerNotifications('messageTexte');

      let zone = component.problemeForm.get('courrielGroup.courriel');
      expect(zone.status).toEqual('DISABLED');
      });

    it("#31 | Zone CONFIRMER COURRIEL est désactivée quand notifier par messagerie texte", () =>{
      component.appliquerNotifications('messageTexte');
  
      let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
      expect(zone.status).toEqual('DISABLED');
      });

    it("#32 | Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte", () =>{
      component.appliquerNotifications('messageTexte');
    
      let errors = {};
      let zone = component.problemeForm.get('telephone');
      zone.setValue('');
      errors = zone.errors || {};
      expect(errors['required']).toBeTruthy();
      });

    it("#33 | Zone TELEPHONE est invalide avec des caractères non-numériques quand notifier par messagerie texte", () =>{
      component.appliquerNotifications('messageTexte');

      let errors = {};
      let zone = component.problemeForm.get('telephone');
      zone.setValue('allo');
      errors = zone.errors || {};
      expect(errors['pattern']).toBeTruthy();
    }); 

    it("#34 | Zone TELEPHONE est invalide avec 9 chiffres consécutifs quand notifier par messagerie texte", () =>{
      component.appliquerNotifications('messageTexte');

      let errors = {};
      let zone = component.problemeForm.get('telephone');
      zone.setValue('514972404');
      errors = zone.errors || {};
      expect(errors['minlength']).toBeTruthy();
    }); 

    it("#35 | Zone TELEPHONE est invalide avec 11 chiffres consécutifs quand notifier par messagerie texte", () =>{
      component.appliquerNotifications('messageTexte');

      let errors = {};
      let zone = component.problemeForm.get('telephone');
      zone.setValue('51497240465');
      errors = zone.errors || {};
      expect(errors['maxlength']).toBeTruthy();
    }); 

    it("#36 | Zone TELEPHONE est valide avec 10 chiffres consécutifs quand notifier par messagerie texte", () =>{
      component.appliquerNotifications('messageTexte');

      let errors = {};
      let zone = component.problemeForm.get('telephone');
      zone.setValue('5149724046');
      errors = zone.errors || {};
      expect(errors['minlength']).toBeUndefined();
    }); 
});
