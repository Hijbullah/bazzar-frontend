<template>
    <div class="w-full h-96 flex flex-col justify-center items-center bg-white rounded shadow-sm">
        <p class="text-gray-600">
            <svg class="w-20 h-20 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </p>
        <h2 class="mt-6 text-gray-600 font-semibold uppercase tracking-wider">{{ error.message }}</h2>
        <NuxtLink class="mt-5 text-teal-600 hover:text-teal-500 text-sm font-semibold uppercase tracking-widest" :to="{ name: 'index' }">Back to Home</NuxtLink>
    </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  }
}
</script>