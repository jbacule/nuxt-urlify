<template>
  <div class="max-h-screen">
    <div v-if="pending">Loading...</div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const { data, pending } = await useFetch(`/api/url/${route.params.code}`);
if (data.value?.url) {
  navigateTo(data.value.url.longUrl, { external: true });
} else {
  navigateTo("/");
}
</script>
