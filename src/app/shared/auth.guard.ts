import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
	const authService = inject(LoginService)
	const router = inject(Router)

	if (authService.isAuthenticated())
		return true
	router.navigate(["/login"])
	return false
}
