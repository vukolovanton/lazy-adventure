<template>
	<section>
		<h3>{{ characterName }}</h3>
	</section>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { usePlayerBaseInfo } from '@/store/palyerStats/playerBaseInfoStore';

const store = usePlayerBaseInfo();
const { characterName } = storeToRefs(store);
</script>
