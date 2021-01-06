<template>
    <header>
        <div class="flex justify-between items-center px-4 sm:px-4 py-3 bg-teal-500 shadow-lg">
            <app-side-bar-mobile />
            <div class="relative flex-1 mx-4 sm:mx-4">
                <input type="text" class="appearance-none w-full h-10 pr-10 text-sm text-gray-500 border-0 focus:outline-none focus:ring-0" placeholder="Search anything...">
                <span class="inline-block absolute top-3 right-2 ml-1 focus:outline-none">
                    <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </span>
            </div>
        
            <button class="inline-flex items-center text-white hover:text-gray-200 focus:outline-none">
                <svg class="w-8 h-8 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
            </button>
        </div>
    </header>
</template>

