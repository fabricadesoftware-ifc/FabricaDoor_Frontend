<script setup>
import Help from "vue-material-design-icons/Help.vue";
</script>

<template>
    <footer>
        <div class="container">
            <div class="logo">
                <img src="/public//ifcLogoGreen.png" width="50%" alt="">
                <img src="/public/logoFabrica.png" alt="">
            </div>
            <router-link class="support">
                <div class="icon">
                    <Help />
                </div>
            </router-link>
        </div>
    </footer>
</template>

<style scoped>
footer {
    width: 100%;
    padding: 1rem;
    text-align: center;
    /* border-top: 1px solid #ccc; */
    margin-top: 5rem;
    font-weight: 250;
    color: #6d6d6d;
}

.container {
    width: 80%;
    margin: 10px auto;
    display: flex;
    justify-content: space-between;
}


.logo {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: baseline;
}

a.support {
    display: flex;
    align-items: center;
    justify-content: center;
}

.icon {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    color: #6d6d6d;
    border: 2px solid #6d6d6d;
    border-radius: 50%;
    width: 50px;
    height: 50px;
}

span {
    display: flex;
    align-items: center;
    justify-content: center;
}

@media (max-width: 1024px) {
    .container {
        width: 95%;
        
    }

    .logo{
        flex-direction: column;
        align-items: start;
    }
}
</style>