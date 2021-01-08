<template>
    <div class="min-h-screen antialiased flex justify-center bg-gray-50">
        <div class="w-full max-w-md px-6 md:px-0 py-8">
            <NuxtLink to="/" class="inline-flex items-center text-sm font-semibold text-teal-600 hover:text-teal-500 uppercase tracking-wide focus:outline-none transition ease-in-out duration-150">
                <svg class="w-4 h-4 inline-block mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back To Home
            </NuxtLink>
          
            <h2 class="my-8 text-center text-3xl font-extrabold text-teal-600 tracking-wider">
                <NuxtLink :to="{ name: 'index' }">Bazzar</NuxtLink>
            </h2>

            <main class="w-full md:px-8 py-6 md:bg-white md:rounded-lg md:shadow">
                <Nuxt />
            </main>
            
        </div>    
    </div>
</template>