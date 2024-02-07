<script setup>
import { auth } from '@/firebase/config'
import { useRouter } from 'vue-router'
import { signOut } from 'firebase/auth'

const router = useRouter()

const logout = () => {
    signOut(auth).then(() => {
        router.push({ name: 'login' })
    }).catch((error) => {
        console.log(error);
        alert("Failed to signout")
    }).finally(() => {
        document.querySelector('.btn-close').click()
    })

}

</script>

<template>
    <nav class="shadow">
        <h1>LOGO</h1>
        <ul>
            <li data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Home">
                <router-link :to="{ name: 'home' }">
                    <i class="bi bi-houses-fill"></i>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'home' }">
                    <i class="bi bi-search"></i>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'home' }">
                    <i class="bi bi-patch-plus-fill"></i>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'home' }" class="position-relative">
                    <i class="bi bi-bell-fill"></i>
                    <span class="position-absolute p-1 bg-danger rounded-circle notification">
                    </span>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'profile' }">
                    <i class="bi bi-person-fill"></i>
                </router-link>
            </li>
            <li>
                <div class="dropdown">
                    <button class="dropdown-menu-icon" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-three-dots"></i>
                    </button>
                    <ul class="dropdown-menu">
                        <li>
                            <button class="dropdown-item" data-bs-toggle="modal" data-bs-target="#logout-modal">
                                Logout
                            </button>
                        </li>
                        <li><a class="dropdown-item">Settings</a></li>
                        <li><a class="dropdown-item">Something</a></li>
                    </ul>
                </div>
            </li>
        </ul>
    </nav>

    <!-- Logout Modal -->
    <div class="modal" id="logout-modal" tabindex="-1" aria-labelledby="Logout Modal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">Are you sure to logout?</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-danger" @click="logout">Logout</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
nav {
    width: 5em;
    height: 100vh;
    position: sticky;
    top: 0;
}

h1 {
    font-size: 1.25em;
    text-align: center;
    margin: 1em 0;
}

ul {
    list-style: none;
    padding: 0.25em;

}

li {
    width: 100%;
    margin-top: 0.5em;
    display: grid;
    place-items: center;
    padding: 5px 0;
}

li i {
    font-size: 2em;
    color: #000;
    cursor: pointer;
    transition: color 250ms;
}

li i:hover {
    color: var(--bs-blue);
}

.dropdown-menu-icon {
    border: none;
    background: transparent;
}

.notification {
    top: 8px;
    right: -2px;
}
</style>