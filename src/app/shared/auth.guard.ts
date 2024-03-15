import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

export const authGuard: CanActivateFn = (route, state) => {
	const authService = inject(LoginService)
	const router = inject(Router)

	if (authService.isAuthenticated())
		return true

	router.navigate(["/account/login"])
	return false
}

export const authGuardAdmin: CanActivateFn = (route, state) => {
	const authService = inject(LoginService)

	if (authService.isAdminAuthenticated())
		return true

	return false
}
