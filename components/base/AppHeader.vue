<template>
    <header>
        <div class="flex justify-between bg-yellow-300">
            <div class="flex-1">
                <div class="flex items-center">
                    <div class="w-auto md:w-56 pl-3 flex">
                        <button class="p-3 text-gray-800 hover:bg-red-600 hover:text-white focus:outline-none">
                            <svg class="w-8 h-8 md:w-6 md:h-6 fill-current" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </button>

                        <h1 class="hidden md:block text-gray-800 text-3xl font-semibold ml-3 mr-6"><nuxt-link to="/">eBazar</nuxt-link></h1>
                    </div>

                    <div class="flex-1 relative mr-3">
                        <input type="text" class="w-full md:my-2 pl-2 pr-12 py-2 text-base text-gray-600 placeholder-gray-600 focus:outline-none" placeholder="Search anything...">
                        <button class="h-10 w-12 inline-block absolute right-0 mt-1 px-2 focus:outline-none">
                            <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </button>
                    </div>
                </div>
               
            </div>
            <div class="flex items-center">
                <div class="pl-6 pr-8 hidden lg:block">
                    <button class="text-gray-800 font-semibold focus:outline-none">EN</button>
                    <span class="text-gray-800">|</span>
                    <button class="text-red-600 font-semibold focus:outline-none">BN</button>
                </div>
                <button class="hidden md:block w-32 lg:w-48 self-stretch bg-red-600 hover:bg-red-700 text-white font-bold focus:outline-none">Sign in</button>
                <button class="md:hidden px-4 self-stretch bg-red-600 hover:bg-red-700 text-white font-bold focus:outline-none">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
                </button>
            </div>
        </div>
    </header>
</template>

<script>
export default {

}
</script>

<style>

</style>