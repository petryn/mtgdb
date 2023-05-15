<script setup>
	import { getCurrentUser } from 'vuefire';
	import { Dropdown } from 'bootstrap';

	const user = await getCurrentUser();
</script>

<template>
	<header class="pt-2 pb-2">
		<div class="container">
			<div class="d-flex align-items-center ">
				<router-link to="/" class="navbar-brand">
					<i class="ss ss-2x text-light"></i>
				</router-link>

				<template v-if="user">
					<ul class="nav flex-fill nav-underline ms-3">
						<li class="nav-item">
							<router-link to="/" class="nav-link text-light">Database</router-link>
						</li>
						<li class="nav-item dropdown-center">
							<a class="nav-link dropdown-toggle text-light" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Collection</a>
							<ul class="dropdown-menu rounded-0 border-1">
								<li>
									<router-link to="/collection/sets" class="dropdown-item">Sets</router-link>
								</li>
								<li>
									<router-link to="/collection/cards" class="dropdown-item">Cards</router-link>
								</li>								
							</ul>
						</li>
						<li class="nav-item">
							<router-link :to="'/swap/' + user.uid" class="nav-link text-light">Swap</router-link>
						</li>
					</ul>

					<div>
						<span>{{user.email}}</span>
					</div>
				</template>
				<template v-else>
					<ul class="nav flex-fill nav-underline ms-3">

					</ul>
					<div>
						<span>Login</span>
					</div>
				</template>				
			</div>
		</div>
	</header>
</template>