import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { AuthService } from 'src/app/auth/services/auth.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective {

  constructor(private authService: AuthService, private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) { }

  @Input() set appHasRole(roles: string[]) {
    if (this.authService.hasRole(roles)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      return;
    }

    this.viewContainer.clear();
  }

}
