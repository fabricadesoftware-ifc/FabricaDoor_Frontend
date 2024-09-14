<script setup>
defineProps({
    icon: Object,
    title: String,
    number: Number
})
</script>

<template>
    <article>
        <div class="text">
            <p> {{ title }}</p>
            <div>
                <component :is="icon" :size="30" />
            </div>
        </div>
        <div class="number">
            <p> {{ number }} </p>
        </div>
    </article>
</template>

<style scoped>
article {
    width: 100%;
    height: 20vh;
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 15px;
    border: 1px solid #ccc;
}

.text {
    display: flex;
    justify-content: space-between;
    font-weight: 500;
    font-size: 1.5rem;
    align-items: center;
}

.number{
    font-size: 1.5rem;
    font-weight: 500;
}

span{
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>