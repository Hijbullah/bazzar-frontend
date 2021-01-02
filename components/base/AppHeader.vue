<template>
    <header>
       <div class="flex justify-between items-center px-8 py-4  bg-white shadow">
            <h1 class="text-3xl text-teal-600 leading-none font-bold">
                <NuxtLink to="/">Bazzar</NuxtLink>
            </h1>

            <div class="relative flex-1 ml-24 mr-12">
                <input type="text" class="appearance-none w-full h-11 m-0 pl-6 pr-12 bg-gray-50 text-gray-500 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-0 focus:border-teal-600" placeholder="Search anything...">
                <span class="inline-block absolute top-2 right-4 ml-1 focus:outline-none">
                    <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </span>
            </div>

            <div class="flex items-center space-x-8">
                <a href="#" class="font-semibold hover:text-teal-600">Offer</a>
                <a href="#" class="inline-flex items-center font-semibold hover:text-teal-600">
                    <span class="mr-1">
                        <svg class="w-4 h-4 stroke-current" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </span>
                    Need Help
                </a>
                <AppNavDropdown />
            </div>
       </div>
    </header>
</template>
