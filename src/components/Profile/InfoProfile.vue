<script setup>
import { useAuthStore, useDoorStore } from '@/stores';
import { OpenDoor } from '..';
import { debounce } from 'lodash';
const authStore = useAuthStore();
const doorStore = useDoorStore();

const ShowDataUsedTimes = (data) => {

    if (data <= 50) {
        return 'ta pouco';
    } else if (data <= 100) {
        return 'melhore';
    } else if (data <= 150) {
        return 'ta começando';
    } else if (data <= 200) {
        return 'ta bastante';
    } else if (data <= 300) {
        return 'ta interessante';
    } else if (data <= 400) {
        return 'vem bastante hein';
    } else if (data >= 500) {
        return 'já mora aqui';
    }


}

const handleOpenDoor = debounce(() => {
    doorStore.openDoor(authStore.$state.authUser.token);
}, 200); 

</script>

<template>
    <article>
        <div class="photo">
            <img src="https://www.portaldoholanda.com.br/sites/default/files/imagecache/portal2014_fotonoticiagrande/portaldoholanda-626973-imagem-foto-amazonas.jpg"
                alt="">
        </div>
        <div class="info">
            <div class="align">
                <h2>{{ authStore.$state.authUser.user.name }}</h2>
                <p>{{ authStore.$state.authUser.user.email }}</p>
                <div class="tags">
                    <span class="admin" v-if="authStore.$state.authUser.user.isSuper">
                        admin
                    </span>
                    <span class="tag">
                        {{ ShowDataUsedTimes(1) }}
                    </span>
                </div>
            </div>
            <OpenDoor @click="handleOpenDoor" />

        </div>
    </article>
</template>

<style scoped>
article {
    display: grid;
    width: 95%;
    grid-template-columns: 2fr 5fr;
}

.align {
    display: flex;
    gap: 1rem;
    flex-direction: column;

}

.photo {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.info {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;

}

.photo img {
    width: 8rem;
    height: 8rem;
    object-fit: cover;
    border-radius: 50%;
    border: 1px solid #ccc;
}

.admin {
    border: 1px solid #ccc;
    padding: 0.25rem;
    font-size: 70%;
    border-radius: 20px;
}

.tags {
    display: flex;
    gap: 0.5rem;
}

.tag {
    background-color: transparent;
    border: 1px solid #ccc;
    padding: 0.25rem;
    font-size: 70%;
    border-radius: 20px;
}

@media screen and (max-width: 1024px) {
    article {
        display: flex;
        flex-direction: column;
        margin: auto;
    }

    .photo {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
    }

    .photo img {
        width: 10rem;
        height: 10rem;
    }

    .info {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
        margin: auto;
    }

    .tags {
        justify-content: center;
    }

}
</style>