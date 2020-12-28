<template>
    <div class="px-4 py-3">
        <section>
            <div class="w-full bg-center bg-no-repeat bg-cover" style="height: 20rem; background-image: url('https://cdn.chaldal.net/asset/Egg.Grocery.Fabric/Egg.Grocery.Web/1.5.0+Release-1609/Default/stores/chaldal/components/landingPage2/LandingPage/images/landingBannerTop.jpg')">
                <div class="flex flex-col justify-center items-center h-full">
                    <h2 class="text-xl md:text-4xl text-gray-900 font-bold">Groceries delivered in 1 hour</h2>
                    <p class="text-sm md:text-xl text-gray-700">Everything you need! We are Here!</p>
                </div>
            </div>
            <div class="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-4 mt-4">
                <div>
                    <img class="object-cover" src="https://cdn.chaldal.net/asset/Egg.Grocery.Fabric/Egg.Grocery.Web/1.5.0+Release-1436/Default/stores/chaldal/components/landingPage2/LandingPage/images/pet_banner2.png?q=best&webp=1" alt="">
                </div>
                <div>
                    <img class="object-cover" src="https://cdn.chaldal.net/asset/Egg.Grocery.Fabric/Egg.Grocery.Web/1.5.0+Release-1436/Default/stores/chaldal/components/landingPage2/LandingPage/images/diaper_banner2.png?q=best&webp=1" alt="">
                </div>
            </div>
        </section>
        
        <section>
            modal Test 
            <br>
            <button @click.prevent="openModal">Open Model</button>

            <ModalAddress />
        </section>
       
        
    </div>
</template>

<script>
export default {
    methods: {
        openModal() {
            this.$modal.show('modal-address');
        }
    }
}
</script>
