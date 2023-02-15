<template>
    <section class="AttacksAndSpells">
        <Attacks />
        <SpellsList />
    </section>
</template>

<script setup>
import SpellsList from '@/components/PlayerSheet/SpellsList.vue';
import Attacks from "@/components/PlayerSheet/Attacks.vue";

</script>

<style lang="scss" scoped>
.AttacksAndSpells {
  grid-area: AttacksAndSpells;
  display: flex;
  flex-direction: column;
  gap: 50px;
}
</style>