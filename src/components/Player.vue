<template>
	<section>
		<h3>{{ player?.user.username }}</h3>
	</section>
</template>

<script lang="ts" setup>
import AuthService from '@/utils/auth/auth.service';

const player = AuthService.getCurrentUser();
</script>
