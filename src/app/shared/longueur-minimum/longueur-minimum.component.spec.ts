import { AbstractControl } from "@angular/forms";
import { VerifierCaracteresValidator } from "./longueur-minimum.component";

describe('longueur zone Validator', () => {
      it("#7 | une chaîne avec 10 espaces est invalide ", () => {
        let validator = VerifierCaracteresValidator.longueurMinimum(3);
        let control = { value: '           ' };
        let errors = validator(control as AbstractControl);
        expect(errors['nbreCaracteresInsuffisant']).toBe(true);
      }); 

      it("#8 | Une phrase avec des mots est valide ", () => {
        let validator = VerifierCaracteresValidator.longueurMinimum(3);
        let control = { value: 'Vive angular' };
        let errors = validator(control as AbstractControl);
        expect(errors).toBeFalsy();
      }); 

      it("#9 | Une phrase avec 3 espaces, des mots et ensuite 3 espaces est valide ", () => { 
        let validator = VerifierCaracteresValidator.longueurMinimum(3);
        let control = { value: '   je le veux   ' };
        let errors = validator(control as AbstractControl);
        expect(errors).toBeFalsy();
      }); 

      it("#10 | Une phrase avec 1 espace et 2 caractères est invalide. ", () => { 
        let validator = VerifierCaracteresValidator.longueurMinimum(3);
        let control = { value: ' xx' };
        let errors = validator(control as AbstractControl);
        expect(errors).toBeTruthy();
      }); 

      it("#11 | Une phrase avec 2 espaces et 1 caractère est invalide. ", () => { 
        let validator = VerifierCaracteresValidator.longueurMinimum(3);
        let control = { value: '  x' };
        let errors = validator(control as AbstractControl);
        expect(errors).toBeTruthy();
      }); 

      it("#12 | Une phrase avec 3 espaces et 3 caractères est valide ", () => { 
        let validator = VerifierCaracteresValidator.longueurMinimum(3);
        let control = { value: '   xxx' };
        let errors = validator(control as AbstractControl);
        expect(errors).toBeFalsy();
      }); 

      it("#13 | Une phrase avec 5 espaces, 5 caractères et 5 espaces est valide ", () => { 
        let validator = VerifierCaracteresValidator.longueurMinimum(3);
        let control = { value: '     xxxxx     ' };
        let errors = validator(control as AbstractControl);
        expect(errors).toBeFalsy();
      }); 

      it("#14 | Une chaîne nulle est invalide  ", () => { 
        let validator = VerifierCaracteresValidator.longueurMinimum(3);
        let control = { value: '' };
        let errors = validator(control as AbstractControl);
        expect(errors).toBeTruthy();
      }); 
});